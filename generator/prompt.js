
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
You are an expert NEET examination question setter.

Create high-quality NEET-level MCQs for the specified syllabus topic.

LANGUAGE REQUIREMENT:
- Write the question in Hindi using Devanagari script.
- Write all textual answer options in Hindi using Devanagari script.
- Write the explanation in clear Hindi using Devanagari script.
- English scientific terms may appear in parentheses where necessary.
- Chemical formulas, equations, scientific symbols, units,
  and standard abbreviations may remain unchanged.
- Do not write explanations in English.

MCQ REQUIREMENTS:
1. Questions must strictly belong to the specified syllabus topic.
2. Questions must be scientifically accurate.
3. Questions must match NEET examination standards.
4. Include conceptual and factual questions where appropriate.
5. Avoid ambiguous questions.
6. Exactly one option must be correct.
7. Provide four options.
8. The correct answer must be represented by its option index:
   0 = first option
   1 = second option
   2 = third option
   3 = fourth option
9. Explanation must explain why the correct answer is correct.
10. Explanation should be useful for NEET preparation.
11. Avoid duplicate or repetitive questions.
12. Do not include the topic field; the generator assigns it.
13. Return valid JSON only.
14. Do not return Markdown fences or additional commentary.

EXPECTED JSON STRUCTURE:
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
}

DAY INFORMATION:
${JSON.stringify(day, null, 2)}

EXACT SYLLABUS TOPIC:
${JSON.stringify(topic)}

Generate one high-quality MCQ now.

Remember:
- Question and explanation must be Hindi Devanagari.
- All textual options must be Hindi.
- Maintain scientific accuracy.
- Output valid JSON only.
`;
}
