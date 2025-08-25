import { ref, computed } from "vue";

export function useSoal() {
  const questions = ref([]);
  const answers = ref({});
  const loading = ref(false);
  const error = ref(null);

  const totalQuestions = computed(() => questions.value.length);
  const answeredQuestions = computed(() => Object.keys(answers.value).length);
  const progress = computed(() =>
    totalQuestions.value > 0
      ? (answeredQuestions.value / totalQuestions.value) * 100
      : 0
  );

  const setQuestions = (data) => {
    questions.value = data;
  };

  const setAnswer = (questionId, answer) => {
    answers.value[questionId] = answer;
  };

  const getAnswer = (questionId) => {
    return answers.value[questionId];
  };

  const resetAnswers = () => {
    answers.value = {};
  };

  return {
    questions,
    answers,
    loading,
    error,
    totalQuestions,
    answeredQuestions,
    progress,
    setQuestions,
    setAnswer,
    getAnswer,
    resetAnswers,
  };
}
