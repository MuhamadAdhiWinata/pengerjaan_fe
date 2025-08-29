export function isAnswered(answer) {
  if (answer === undefined || answer === null) return false;

  // String (essay, fillblank)
  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }

  // Array (checkbox, fillblank multi, matching)
  if (Array.isArray(answer)) {
    return answer.some((val) => {
      if (typeof val === "string") return val.trim().length > 0;
      if (val && typeof val === "object") {
        return Object.values(val).some(
          (v) => v !== undefined && v !== null && String(v).trim() !== ""
        );
      }
      return val !== undefined && val !== null;
    });
  }

  // Object (fillblank tipe key-value)
  if (typeof answer === "object") {
    return Object.values(answer).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== ""
    );
  }

  // Number (multiple choice index)
  if (typeof answer === "number") {
    return true; // selalu valid meski 0
  }

  return false;
}

export function getAnswerStatus(currentIndex, i, userAnswers, qId) {
  if (currentIndex === i) return "Dimulai";
  if (isAnswered(userAnswers[qId])) return "Dijawab";
  return "Disiapkan";
}

export function getAnswerClass(currentIndex, i, userAnswers, qId) {
  if (currentIndex === i)
    return "border-brand bg-blue-50 text-brand font-semibold";
  if (isAnswered(userAnswers[qId]))
    return "bg-green-100 text-green-700 font-semibold";
  return "bg-gray-100 text-gray-600";
}
