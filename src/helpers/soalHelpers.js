export function isAnswered(answer) {
  if (answer === undefined || answer === null) return false;

  // String
  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }

  // Number (anggap null/undefined = belum jawab, tapi 0,1,2... valid)
  if (typeof answer === "number") {
    return true; // ✅ semua angka sah, termasuk 0
  }

  // Array (checkbox dsb.)
  if (Array.isArray(answer)) {
    return answer.some((val) => {
      if (typeof val === "string") return val.trim().length > 0;
      if (typeof val === "number") return true; // ✅ 0 juga dianggap valid
      if (val && typeof val === "object") {
        return Object.values(val).some(
          (v) => v !== undefined && v !== null && String(v).trim() !== ""
        );
      }
      return false;
    });
  }

  // Object (matching, fillblank dsb.)
  if (typeof answer === "object") {
    return Object.values(answer).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== ""
    );
  }

  return false;
}

export function getAnswerStatus(currentIndex, i, userAnswers, qId, raguRagu) {
  if (raguRagu && raguRagu[qId]) return "Ragu-ragu";
  if (isAnswered(userAnswers[qId])) return "Dijawab"; // ✅ hijau dulu
  if (currentIndex === i) return "Dimulai";
  return "Disiapkan";
}

export function getAnswerClass(currentIndex, i, userAnswers, qId, raguRagu) {
  if (raguRagu && raguRagu[qId])
    return "bg-yellow-100 text-yellow-700 font-semibold";

  if (isAnswered(userAnswers[qId]))
    return "bg-green-100 text-green-700 font-semibold";

  if (currentIndex === i)
    return "border-brand bg-blue-50 text-brand font-semibold";

  return "bg-gray-100 text-gray-600";
}
