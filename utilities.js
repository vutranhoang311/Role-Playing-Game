const getDiceRollArray = (diceCount) => {
  let newDiceRolls = new Array(diceCount).fill();
  return newDiceRolls.map(() => Math.floor(Math.random() * 6) + 1);
};
const getDicePlaceholderHtml = (diceCount) => {
  let result = new Array(diceCount).fill();
  return result
    .map((item) => `<div class="placeholder-dice">item</div>`)
    .join("");
};
const getPercentageHealth = (remainingHealth, maxHealth) =>
  (100 * remainingHealth) / maxHealth;

export { getDiceRollArray, getDicePlaceholderHtml, getPercentageHealth };
