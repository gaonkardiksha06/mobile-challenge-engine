
/**
 * AI Review Layer for Challenge Missions Course
 *
 * Uses Groq API to provide qualitative code review.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// courses/04-challenge-missions/ai-review
// -> mobile-challenge-engine
const repoRoot = join(__dirname, '..', '..', '..');

const envPath = join(repoRoot, '.env');

function loadGroqApiKey() {
  if (!existsSync(envPath)) {
    return '';
  }

  const envContent = readFileSync(envPath, 'utf-8');

  for (const line of envContent.split(/\r?\n/)) {
    const match = line.match(
      /^\s*GROQ_API_KEY\s*=\s*(.*?)\s*$/
    );

    if (match) {
      return match[1]
        .trim()
        .replace(/^["']|["']$/g, '');
    }
  }

  return '';
}

const GROQ_API_URL =
  'https://api.groq.com/openai/v1/chat/completions';

const MODEL = 'openai/gpt-oss-20b';

export async function reviewCodeWithAI(
  challengeId,
  filesToReview,
  projectDir
) {
  const results = {
    challengeId,
    timestamp: new Date().toISOString(),
    score: 0,
    feedback: [],
    strengths: [],
    improvements: [],
    readability: 0,
    maintainability: 0,
    overall: ''
  };

  try {
    // -------------------------------------------------------
    // Load API key
    // -------------------------------------------------------

    const GROQ_API_KEY =
      process.env.GROQ_API_KEY || loadGroqApiKey();

    if (!GROQ_API_KEY) {
      return {
        ...results,
        error:
          `GROQ_API_KEY not found. Expected it in ${envPath}`
      };
    }

    // -------------------------------------------------------
    // Load challenge README
    // -------------------------------------------------------

    const challengeDir = join(
      projectDir,
      'challenges',
      challengeId
    );

    const readmePath = join(
      challengeDir,
      'README.md'
    );

    let challengeContext = '';

    if (existsSync(readmePath)) {
      challengeContext = readFileSync(
        readmePath,
        'utf-8'
      );
    }

    // -------------------------------------------------------
    // Read files
    // -------------------------------------------------------

    const codeSnippets = [];

    for (const file of filesToReview || []) {
      const filePath = join(projectDir, file);

      if (!existsSync(filePath)) {
        continue;
      }

      const content = readFileSync(
        filePath,
        'utf-8'
      );

      codeSnippets.push({
        file,
        content: content.substring(0, 10000)
      });
    }

    if (codeSnippets.length === 0) {
      return {
        ...results,
        error: 'No files found to review'
      };
    }

    // -------------------------------------------------------
    // Build prompt
    // -------------------------------------------------------

    const prompt = buildReviewPrompt(
      challengeId,
      codeSnippets,
      challengeContext
    );

    // -------------------------------------------------------
    // Call Groq
    // -------------------------------------------------------

    const aiResponse = await callGroqAPI(
      prompt,
      GROQ_API_KEY
    );

    // -------------------------------------------------------
    // Parse response
    // -------------------------------------------------------

    const parsedResponse =
      parseAIResponse(aiResponse);

    return {
      ...results,
      ...parsedResponse,
      score: calculateAIScore(parsedResponse)
    };

  } catch (error) {
    console.error(
      `❌ AI review error for ${challengeId}:`,
      error.message
    );

    return {
      ...results,
      error: error.message,
      score: 0
    };
  }
}

// ---------------------------------------------------------
// Build prompt
// ---------------------------------------------------------

function buildReviewPrompt(
  challengeId,
  codeSnippets,
  challengeContext = ''
) {
  const codeContext = codeSnippets
    .map(
      snippet =>
        `File: ${snippet.file}\n${snippet.content}`
    )
    .join('\n\n');

  const contextSection = challengeContext
    ? `
Challenge Instructions and Requirements:
${challengeContext.substring(0, 5000)}
`
    : '';

  return `
You are an expert React Native and TypeScript code reviewer.

Review the implementation for challenge "${challengeId}".

${contextSection}

Code to review:

${codeContext}

Evaluate:

1. Code readability from 0 to 100.
2. Code maintainability from 0 to 100.
3. Two or three specific strengths.
4. Two or three specific improvements.
5. A brief overall assessment.

Return ONLY valid JSON using exactly this structure:

{
  "readability": 85,
  "maintainability": 80,
  "strengths": [
    "Clear strength",
    "Another strength"
  ],
  "improvements": [
    "Specific improvement",
    "Another specific improvement"
  ],
  "overall": "Brief overall assessment"
}
`;
}

// ---------------------------------------------------------
// Call Groq API
// ---------------------------------------------------------

async function callGroqAPI(
  prompt,
  apiKey
) {
  const response = await fetch(
    GROQ_API_URL,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: 'system',
            content:
              'You are an expert React Native and TypeScript code reviewer. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],

        temperature: 0.1,

        max_completion_tokens: 2000,

        reasoning_effort: 'low',

        response_format: {
          type: 'json_object'
        }
      })
    }
  );

  const rawBody = await response.text();

  let data;

  try {
    data = JSON.parse(rawBody);
  } catch {
    throw new Error(
      `Groq returned invalid JSON: ${rawBody.substring(
        0,
        500
      )}`
    );
  }

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.error?.code ||
      data?.error ||
      response.statusText;

    throw new Error(
      `Groq API error (${response.status}): ${message}`
    );
  }

  const content =
    data?.choices?.[0]?.message?.content;

  if (
    typeof content !== 'string' ||
    content.trim() === ''
  ) {
    throw new Error(
      `Groq response contained no usable content. Response: ${JSON.stringify(
        data,
        null,
        2
      ).substring(0, 2000)}`
    );
  }

  return content.trim();
}

// ---------------------------------------------------------
// Parse AI response
// ---------------------------------------------------------

function parseAIResponse(response) {
  if (
    typeof response !== 'string' ||
    response.trim() === ''
  ) {
    throw new Error(
      'AI returned an empty response.'
    );
  }

  const trimmed = response.trim();

  const candidates = [
    trimmed,

    trimmed
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
  ];

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');

  if (
    firstBrace !== -1 &&
    lastBrace !== -1 &&
    lastBrace > firstBrace
  ) {
    candidates.push(
      trimmed.substring(
        firstBrace,
        lastBrace + 1
      )
    );
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);

      if (
        parsed &&
        typeof parsed === 'object'
      ) {
        return normalizeAIResponse(parsed);
      }
    } catch {
      // Try next candidate.
    }
  }

  throw new Error(
    `Unable to parse Groq AI response: ${response.substring(
      0,
      500
    )}`
  );
}

// ---------------------------------------------------------
// Normalize response
// ---------------------------------------------------------

function normalizeAIResponse(parsed) {
  const readability = clampScore(
    Number(parsed?.readability)
  );

  const maintainability = clampScore(
    Number(parsed?.maintainability)
  );

  const strengths = Array.isArray(
    parsed?.strengths
  )
    ? parsed.strengths
        .filter(
          item =>
            typeof item === 'string' &&
            item.trim().length > 0
        )
        .map(item => item.trim())
        .slice(0, 5)
    : [];

  const improvements = Array.isArray(
    parsed?.improvements
  )
    ? parsed.improvements
        .filter(
          item =>
            typeof item === 'string' &&
            item.trim().length > 0
        )
        .map(item => item.trim())
        .slice(0, 5)
    : [];

  const feedback = Array.isArray(
    parsed?.feedback
  )
    ? parsed.feedback
        .filter(
          item =>
            typeof item === 'string' &&
            item.trim().length > 0
        )
        .map(item => item.trim())
        .slice(0, 5)
    : [];

  const overall =
    typeof parsed?.overall === 'string'
      ? parsed.overall.trim()
      : '';

  return {
    readability,
    maintainability,
    strengths,
    improvements,
    feedback,
    overall
  };
}

// ---------------------------------------------------------
// Clamp scores
// ---------------------------------------------------------

function clampScore(value) {
  if (!Number.isFinite(value)) {
    return 50;
  }

  return Math.min(
    100,
    Math.max(0, Math.round(value))
  );
}

// ---------------------------------------------------------
// Calculate AI score
// ---------------------------------------------------------

function calculateAIScore(parsedResponse) {
  const readability =
    Number(parsedResponse?.readability);

  const maintainability =
    Number(parsedResponse?.maintainability);

  if (
    !Number.isFinite(readability) ||
    !Number.isFinite(maintainability)
  ) {
    return 0;
  }

  return Math.round(
    (readability + maintainability) / 2
  );
}

