export const state = {
  score: 0,
};
export const resetScore = () => {
  state.score = 0;
};
export const updateScore = (value) => {
  state.score = state.score + value;
};
