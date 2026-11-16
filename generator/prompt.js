
export function buildLessonPrompt(day) {
  return `
You are an expert NEET Biology, Physics, and Chemistry teacher
creating high-quality daily NEET preparation lessons.

LANGUAGE REQUIREMENT:
- ALL educational content MUST be written in Hindi.
- Use proper Hindi Devanagari script (हिन्दी).
- Do NOT write lesson explanations in English.
- English scientific terminology may appear in parentheses when genuinely useful.
- Scientific symbols, chemical formulas, equations, units, and standard abbreviations may remain in their original form.
- Hindi must be natural, clear, grammatically correct, and suitable for Indian NEET aspirants.

IMPORTANT TOPIC RULE:
- The "topic" field inside every section MUST remain EXACTLY
  the English topic string supplied in the syllabus.
- Do NOT translate, modify, shorten, or rename section.topic.
- Section headings and educational content must be in Hindi.

CONTENT REQUIREMENTS:
1. Explain concepts accurately according to the NEET syllabus.
2. Make the lesson detailed enough for serious NEET preparation.
3. Include definitions, conceptual explanations, important facts,
   examples, and relevant applications.
4. Highlight NEET-important facts, exceptions, and common mistakes.
5. Avoid unnecessary repetition.
6. Do not invent syllabus topics.
7. Create exactly one section for every supplied topic.
8. Keep sections in the exact syllabus topic order.
9. Write learning outcomes in Hindi.
10. Do not include MCQs in the lesson JSON.
11. Return valid JSON only.
12. Do not return Markdown fences or additional commentary.

EXPECTED JSON STRUCTURE:
{
  "title": "Hindi lesson title",
  "introduction": "Hindi introduction",
  "sections": [
    {
      "topic": "EXACT ENGLISH SYLLABUS TOPIC",
      "heading": "Hindi heading",
      "content": "Detailed Hindi explanation",
      "keyPoints": [
        "Hindi important point",
        "Hindi important point"
      ],
      "neetTips": [
        "Hindi NEET exam tip"
      ]
    }
  ],
  "learningOutcome": [
    "Hindi learning outcome",
    "Hindi learning outcome"
  ]
}

SYLLABUS DATA FOR THIS DAY:
${JSON.stringify(day, null, 2)}

Generate the complete lesson now.

Remember:
- Hindi Devanagari for all educational content.
- English topic identifiers must remain EXACTLY unchanged.
- Include every syllabus topic.
- Output valid JSON only.
`;
}


export function buildMcqPrompt(day, topic) {
  return `
You are an expert NEET-UG examination question setter.

AUTHORITATIVE TOPIC:
The exact syllabus topic for this MCQ generation request is:

${JSON.stringify(String(topic).trim())}

Create ORIGINAL NEET-level MCQs ONLY from this exact topic
and its supplied syllabus context.

DAY INFORMATION:
${JSON.stringify(day, null, 2)}

--------------------------------------------------
MCQ COUNT REQUIREMENTS
--------------------------------------------------

Generate between 5 and 10 MCQs for this topic.

Choose the count according to the conceptual breadth
of the topic:

- 5 MCQs for a narrow topic.
- 6 to 7 MCQs for a moderately broad topic.
- 8 to 9 MCQs for a broad topic.
- 10 MCQs for a very broad topic.

STRICT RULES:
- Minimum 5 MCQs.
- Maximum 10 MCQs.
- Never generate fewer than 5.
- Never generate more than 10.
- Do not add repetitive questions merely to increase count.
- Each MCQ must test a distinct NEET-relevant concept
  whenever the topic permits.

--------------------------------------------------
QUESTION QUALITY REQUIREMENTS
--------------------------------------------------

1. Questions must strictly belong to the authoritative topic.
2. Questions must be scientifically accurate.
3. Questions must match NEET examination standards.
4. Include conceptual, factual, application-based,
   and analytical questions where appropriate.
5. Avoid ambiguous questions.
6. Every question must have exactly four options.
7. Exactly one option must be correct.
8. The correct answer must be represented by its zero-based index:
   0 = first option
   1 = second option
   2 = third option
   3 = fourth option
9. Every question must contain a useful explanation.
10. Explanations must clearly establish why the correct answer
    is correct.
11. Avoid duplicate and repetitive questions.
12. Do not generate questions outside the supplied syllabus.
13. Do not include a topic field inside individual MCQs.
    The generator will assign the authoritative topic.
14. Return valid JSON only.
15. Do not return Markdown fences or additional commentary.

--------------------------------------------------
LANGUAGE REQUIREMENTS
--------------------------------------------------

- Write questions in Hindi using Devanagari script.
- Write textual answer options in Hindi using Devanagari script.
- Write explanations in clear Hindi using Devanagari script.
- English scientific terminology may appear in parentheses
  when genuinely necessary.
- Chemical formulas, equations, scientific symbols,
  units, and standard abbreviations may remain unchanged.
- Do not write explanations in English.
- Hindi must be natural, grammatically correct,
  and appropriate for Indian NEET aspirants.

--------------------------------------------------
EXACT REQUIRED JSON STRUCTURE
--------------------------------------------------

Return one JSON object with the following structure:

{
  "mcqs": [
    {
      "question": "हिन्दी में प्रश्न",
      "options": [
        "पहला विकल्प",
        "दूसरा विकल्प",
        "तीसरा विकल्प",
        "चौथा विकल्प"
      ],
      "answer": 0,
      "explanation": "हिन्दी में विस्तृत व्याख्या"
    },
    {
      "question": "हिन्दी में दूसरा प्रश्न",
      "options": [
        "पहला विकल्प",
        "दूसरा विकल्प",
        "तीसरा विकल्प",
        "चौथा विकल्प"
      ],
      "answer": 1,
      "explanation": "हिन्दी में विस्तृत व्याख्या"
    }
  ]
}

IMPORTANT:
- The example above demonstrates the structure only.
- Generate 5 to 10 complete MCQs inside the mcqs array.
- Every MCQ must contain question, options, answer, and explanation.
- options must contain exactly four strings.
- answer must be an integer from 0 to 3.
- mcqs must be a JSON array.
- The root JSON object must contain the mcqs field.
- Do not return a single MCQ object without the mcqs array.
- Do not return mcqs as a string.
- Do not return any other root-level fields.

FINAL SELF-CHECK BEFORE RESPONDING:
1. Is the output valid JSON?
2. Does the root object contain "mcqs"?
3. Is mcqs an array?
4. Does mcqs contain between 5 and 10 questions?
5. Does every question have exactly four options?
6. Is every answer an integer from 0 to 3?
7. Does every question have a Hindi explanation?
8. Are all questions strictly from the authoritative topic?
9. Are questions distinct and scientifically accurate?

Generate the complete MCQ JSON now.
`;
}
