
/*
 * ------------------------------------------------------
 * VIDHWAAN NEET — DAILY CONTENT VALIDATOR
 * Hindi / Devanagari validation
 * ------------------------------------------------------
 *
 * IMPORTANT:
 *
 * - Syllabus topics remain English.
 * - Lesson content must contain Hindi.
 * - MCQ questions and explanations must contain Hindi.
 * - Scientific formulas and symbols are permitted.
 * ------------------------------------------------------
 */


/*
 * ------------------------------------------------------
 * HINDI SCRIPT DETECTION
 * ------------------------------------------------------
 */

function containsHindi(value) {
  return (
    typeof value === "string" &&
    /[\u0900-\u097F]/.test(value)
  );
}


function requireHindi(
  value,
  label
) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${label}: missing content.`
    );
  }

  if (!containsHindi(value)) {
    throw new Error(
      `${label}: Hindi Devanagari content is missing.`
    );
  }
}


/*
 * ------------------------------------------------------
 * VALIDATE HINDI STRING ARRAY
 * ------------------------------------------------------
 */

function validateHindiArray(
  values,
  label,
  minimum = 1
) {
  if (!Array.isArray(values)) {
    throw new Error(
      `${label} must be an array.`
    );
  }

  if (values.length < minimum) {
    throw new Error(
      `${label} must contain at least ${minimum} items.`
    );
  }

  for (
    const [index, value]
    of values.entries()
  ) {
    requireHindi(
      value,
      `${label} item ${index + 1}`
    );
  }
}


/*
 * ------------------------------------------------------
 * VALIDATE DAILY LESSON
 * ------------------------------------------------------
 */

export function validateDayContent(
  data,
  expectedDay,
  expectedTopics
) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error(
      "Generated lesson is not an object."
    );
  }


  /*
   * ----------------------------------------------------
   * TITLE
   * ----------------------------------------------------
   */

  requireHindi(
    data.title,
    "Lesson title"
  );


  /*
   * ----------------------------------------------------
   * INTRODUCTION
   * ----------------------------------------------------
   */

  requireHindi(
    data.introduction,
    "Lesson introduction"
  );


  /*
   * ----------------------------------------------------
   * SECTIONS
   * ----------------------------------------------------
   */

  if (
    !Array.isArray(data.sections) ||
    data.sections.length === 0
  ) {
    throw new Error(
      "Lesson contains no sections."
    );
  }


  /*
   * ----------------------------------------------------
   * LEARNING OUTCOME
   * ----------------------------------------------------
   */

  validateHindiArray(
    data.learningOutcome,
    "learningOutcome",
    1
  );


  /*
   * ----------------------------------------------------
   * VALIDATE EVERY SECTION
   * ----------------------------------------------------
   */

  for (
    const [index, section]
    of data.sections.entries()
  ) {
    const sectionNumber =
      index + 1;


    /*
     * topic:
     *
     * IMPORTANT:
     * This field must remain English and match
     * the syllabus topic exactly.
     *
     * Do NOT require Hindi in this field.
     */

    if (
      typeof section.topic !== "string" ||
      !section.topic.trim()
    ) {
      throw new Error(
        `Section ${sectionNumber}: missing topic.`
      );
    }


    /*
     * heading
     */

    requireHindi(
      section.heading,
      `Section ${sectionNumber} heading`
    );


    /*
     * content
     */

    requireHindi(
      section.content,
      `Section ${sectionNumber} content`
    );


    /*
     * keyPoints
     */

    validateHindiArray(
      section.keyPoints,
      `Section ${sectionNumber} keyPoints`,
      1
    );


    /*
     * neetTips
     */

    validateHindiArray(
      section.neetTips,
      `Section ${sectionNumber} neetTips`,
      1
    );
  }


  /*
   * ----------------------------------------------------
   * EXPECTED TOPIC CHECK
   * ----------------------------------------------------
   *
   * Syllabus topic identifiers are English.
   *
   * Exact topic and order validation is performed
   * separately by generate-day.js.
   */

  if (
    Array.isArray(expectedTopics) &&
    expectedTopics.length > 0
  ) {
    const generatedTopics =
      data.sections.map(
        section =>
          String(section.topic)
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase()
      );


    for (const topic of expectedTopics) {
      const name =
        String(topic)
          .trim()
          .replace(/\s+/g, " ")
            .toLowerCase();

      if (
        !generatedTopics.includes(name)
      ) {
        throw new Error(
          `Syllabus topic has no matching section: ${topic}`
        );
      }
    }
  }


  return true;
}


/*
 * ------------------------------------------------------
 * VALIDATE MCQs
 * ------------------------------------------------------
 */

export function validateMcqs(
  mcqs,
  minCount = 1,
  maxCount = Infinity
) {
  if (!Array.isArray(mcqs)) {
    throw new Error(
      "MCQs must be an array."
    );
  }


  /*
   * ----------------------------------------------------
   * MCQ COUNT
   * ----------------------------------------------------
   */

  if (
    mcqs.length < minCount ||
    mcqs.length > maxCount
  ) {
    throw new Error(
      `MCQs must contain between ${minCount} and ${maxCount} items. Received ${mcqs.length}.`
    );
  }


  /*
   * ----------------------------------------------------
   * VALIDATE EACH MCQ
   * ----------------------------------------------------
   */

  for (
    const [index, mcq]
    of mcqs.entries()
  ) {
    const mcqNumber =
      index + 1;


    /*
     * QUESTION
     *
     * Must contain Hindi Devanagari.
     */

    requireHindi(
      mcq.question,
      `MCQ ${mcqNumber} question`
    );


    /*
     * ----------------------------------------------------
     * EXACTLY FOUR OPTIONS
     * ----------------------------------------------------
     */

    if (
      !Array.isArray(mcq.options) ||
      mcq.options.length !== 4
    ) {
      throw new Error(
        `MCQ ${mcqNumber}: must have exactly 4 options.`
      );
    }


    /*
     * ----------------------------------------------------
     * OPTION CONTENT
     * ----------------------------------------------------
     */

    if (
      mcq.options.some(
        option =>
          typeof option !== "string" ||
          !option.trim()
      )
    ) {
      throw new Error(
        `MCQ ${mcqNumber}: empty option.`
      );
    }


    /*
     * ----------------------------------------------------
     * OPTION UNIQUENESS
     * ----------------------------------------------------
     */

    const normalizedOptions =
      mcq.options.map(
        option =>
          option
            .trim()
            .toLowerCase()
      );


    if (
      new Set(normalizedOptions).size !== 4
    ) {
      throw new Error(
        `MCQ ${mcqNumber}: options must be unique.`
      );
    }


    /*
     * ----------------------------------------------------
     * ANSWER INDEX
     * ----------------------------------------------------
     *
     * 0 = option A
     * 1 = option B
     * 2 = option C
     * 3 = option D
     */

    if (
      !Number.isInteger(mcq.answer) ||
      mcq.answer < 0 ||
      mcq.answer > 3
    ) {
      throw new Error(
        `MCQ ${mcqNumber}: invalid answer index.`
      );
    }


    /*
     * ----------------------------------------------------
     * EXPLANATION
     *
     * Must contain Hindi Devanagari.
     * ----------------------------------------------------
     */

    requireHindi(
      mcq.explanation,
      `MCQ ${mcqNumber} explanation`
    );
  }


  return true;
}
