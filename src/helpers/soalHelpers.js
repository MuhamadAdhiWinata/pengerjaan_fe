export function isAnswered(answer) {
  if (answer === undefined || answer === null) return false;

  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }

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

  if (typeof answer === "object") {
    return Object.values(answer).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== ""
    );
  }

  if (typeof answer === "number") {
    return true;
  }

  return false;
}

export function getAnswerStatus(currentIndex, i, userAnswers, qId, raguRagu) {
  if (currentIndex === i) return "Dimulai";
  if (raguRagu && raguRagu[qId]) return "Ragu-ragu";
  if (isAnswered(userAnswers[qId])) return "Dijawab";
  return "Disiapkan";
}

export function getAnswerClass(currentIndex, i, userAnswers, qId, raguRagu) {
  if (currentIndex === i)
    return "border-brand bg-blue-50 text-brand font-semibold";

  if (raguRagu && raguRagu[qId])
    return "bg-yellow-100 text-yellow-700 font-semibold";

  if (isAnswered(userAnswers[qId]))
    return "bg-green-100 text-green-700 font-semibold";

  return "bg-gray-100 text-gray-600";
}
