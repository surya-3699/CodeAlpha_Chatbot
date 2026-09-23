import { fallbackResponse, knowledgeBase } from "./knowledge.js";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "do", "does", "for", "from",
  "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "to", "what", "when",
  "where", "which", "with", "you", "your", "we", "our", "this", "that", "there"
]);

const SYNONYMS = new Map([
  ["cost", "price"], ["prices", "price"], ["pricing", "price"], ["expensive", "price"],
  ["plans", "plan"], ["subscriptions", "subscription"], ["membership", "subscription"],
  ["cancelled", "cancel"], ["cancellation", "cancel"], ["terminate", "cancel"], ["stop", "cancel"],
  ["refunds", "refund"], ["reimburse", "refund"], ["reimbursement", "refund"],
  ["signin", "login"], ["log", "login"], ["passwords", "password"],
  ["integrate", "integration"], ["integrations", "integration"], ["connects", "connect"], ["connected", "connect"],
  ["safe", "security"], ["secure", "security"], ["privacy", "security"],
  ["issues", "issue"], ["problems", "issue"], ["problem", "issue"], ["errors", "error"],
  ["features", "feature"], ["services", "service"], ["products", "product"],
  ["hours", "hour"], ["available", "availability"], ["availability", "available"],
  ["trial", "trial"], ["demo", "trial"], ["testing", "test"],
  ["start", "onboarding"], ["setup", "onboarding"], ["started", "onboarding"]
]);

function normalizeToken(token) {
  let value = token.toLowerCase();
  const direct = SYNONYMS.get(value);
  if (direct) return direct;
  if (value.endsWith("ies") && value.length > 4) value = `${value.slice(0, -3)}y`;
  else if (value.endsWith("ing") && value.length > 5) value = value.slice(0, -3);
  else if (value.endsWith("ed") && value.length > 4) value = value.slice(0, -2);
  else if (value.endsWith("s") && value.length > 3 && !value.endsWith("ss")) value = value.slice(0, -1);
  return SYNONYMS.get(value) ?? value;
}

export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9@.\-\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeToken)
    .filter(token => !STOP_WORDS.has(token));
}

function termFrequency(tokens) {
  const counts = new Map();
  for (const token of tokens) counts.set(token, (counts.get(token) ?? 0) + 1);
  const divisor = Math.max(tokens.length, 1);
  return new Map([...counts].map(([term, count]) => [term, count / divisor]));
}

function idfFor(term, docs) {
  const containing = docs.reduce((count, doc) => count + (doc.includes(term) ? 1 : 0), 0);
  return Math.log((docs.length + 1) / (containing + 1)) + 1;
}

function vectorize(tokens, vocabulary, docs) {
  const tf = termFrequency(tokens);
  return vocabulary.map(term => (tf.get(term) ?? 0) * idfFor(term, docs));
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function ngrams(text, n = 3) {
  const normalized = String(text).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalized.length <= n) return new Set(normalized ? [normalized] : []);
  const grams = new Set();
  for (let i = 0; i <= normalized.length - n; i += 1) grams.add(normalized.slice(i, i + n));
  return grams;
}

function diceCoefficient(a, b) {
  const gramsA = ngrams(a);
  const gramsB = ngrams(b);
  if (!gramsA.size || !gramsB.size) return 0;
  let overlap = 0;
  for (const gram of gramsA) if (gramsB.has(gram)) overlap += 1;
  return (2 * overlap) / (gramsA.size + gramsB.size);
}


function levenshteinDistance(a, b) {
  const left = String(a);
  const right = String(b);
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = previous[j];
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + cost);
      diagonal = above;
    }
  }
  return previous[right.length];
}

function fuzzyTokenMatch(a, b) {
  if (a === b) return true;
  if (Math.min(a.length, b.length) < 4) return false;
  const distance = levenshteinDistance(a, b);
  const allowance = Math.max(a.length, b.length) >= 8 ? 2 : 1;
  return distance <= allowance;
}

function fuzzyTokenOverlap(queryTokens, patternTokens) {
  if (!queryTokens.length || !patternTokens.length) return 0;
  let matched = 0;
  const used = new Set();
  for (const patternToken of patternTokens) {
    const index = queryTokens.findIndex((queryToken, i) => !used.has(i) && fuzzyTokenMatch(queryToken, patternToken));
    if (index >= 0) {
      used.add(index);
      matched += 1;
    }
  }
  return matched / patternTokens.length;
}

function keywordCoverage(queryTokens, keywords) {
  if (!keywords.length) return 0;
  const normalizedKeywords = keywords.map(normalizeToken);
  const found = normalizedKeywords.filter(keyword => queryTokens.some(token => fuzzyTokenMatch(token, keyword))).length;
  return found / normalizedKeywords.length;
}

function buildCorpus(intents) {
  return intents.flatMap(intent => intent.patterns.map(pattern => ({
    intentId: intent.id,
    pattern,
    tokens: tokenize(pattern)
  })));
}

function stableResponse(intent, query) {
  const hash = [...query].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
  return intent.responses[hash % intent.responses.length];
}

export function retrieve(query, options = {}) {
  const intents = options.knowledgeBase ?? knowledgeBase;
  const threshold = options.threshold ?? 0.32;
  const cleanQuery = String(query).trim();
  if (!cleanQuery) {
    return { matched: false, intentId: "fallback", label: "Fallback", confidence: 0, response: fallbackResponse };
  }

  const corpus = buildCorpus(intents);
  const docs = corpus.map(item => item.tokens);
  const queryTokens = tokenize(cleanQuery);
  const vocabulary = [...new Set([...docs.flat(), ...queryTokens])];
  const queryVector = vectorize(queryTokens, vocabulary, docs);

  const ranked = intents.map(intent => {
    let bestPatternScore = 0;
    let bestTypoScore = 0;
    let bestPattern = "";

    for (const pattern of intent.patterns) {
      const patternTokens = tokenize(pattern);
      const patternVector = vectorize(patternTokens, vocabulary, docs);
      const cosine = cosineSimilarity(queryVector, patternVector);
      const typo = diceCoefficient(cleanQuery, pattern);
      const fuzzy = fuzzyTokenOverlap(queryTokens, patternTokens);
      const combinedPattern = (cosine * 0.40) + (typo * 0.15) + (fuzzy * 0.45);
      if (combinedPattern > bestPatternScore) {
        bestPatternScore = combinedPattern;
        bestTypoScore = typo;
        bestPattern = pattern;
      }
    }

    const keyword = keywordCoverage(queryTokens, intent.keywords);
    const exactPhrase = intent.patterns.some(pattern => cleanQuery.toLowerCase().includes(pattern.toLowerCase())) ? 1 : 0;
    const score = Math.min(1, (bestPatternScore * 0.76) + (keyword * 0.18) + (exactPhrase * 0.06));
    return { intent, score, bestPattern, bestTypoScore, keyword };
  }).sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const second = ranked[1];
  const separation = best.score - (second?.score ?? 0);
  const adjustedThreshold = queryTokens.length <= 1 ? Math.max(threshold, 0.38) : threshold;
  const matched = best.score >= adjustedThreshold && (best.score >= 0.54 || separation >= 0.035);

  if (!matched) {
    return {
      matched: false,
      intentId: "fallback",
      label: "Fallback",
      confidence: Number(best.score.toFixed(3)),
      response: fallbackResponse,
      debug: { candidate: best.intent.id, bestPattern: best.bestPattern, separation: Number(separation.toFixed(3)) }
    };
  }

  return {
    matched: true,
    intentId: best.intent.id,
    label: best.intent.label,
    confidence: Number(best.score.toFixed(3)),
    response: stableResponse(best.intent, cleanQuery),
    debug: { bestPattern: best.bestPattern, typo: Number(best.bestTypoScore.toFixed(3)), separation: Number(separation.toFixed(3)) }
  };
}
