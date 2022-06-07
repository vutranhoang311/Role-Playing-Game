import Character from "./Character.js";
import characterData from "./data.js";
let monstersArray = ["orc", "goblin", "demon"];
let isWaiting = false;
const newMonster = () => {
  const nextMonster = characterData[monstersArray.shift()];
  return nextMonster ? new Character(nextMonster) : {};
};
const renderAllCharacters = () => {
  document.getElementById("hero").innerHTML = wizard.renderCharacters();
  document.getElementById("monster").innerHTML = monster.renderCharacters();
};

const attack = () => {
  if (!isWaiting) {
    renderAllCharacters();
    monster.setDiceHTML();
    wizard.setDiceHTML();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    renderAllCharacters();

    if (wizard.dead) {
      isWaiting = true;
      endGame();
    }
    if (monster.dead) {
      isWaiting = true;

      if (monstersArray.length > 0) {
        setTimeout(() => {
          monster = newMonster();
          renderAllCharacters();
          isWaiting = false;
        }, 1500);
      } else
        setTimeout(() => {
          endGame();
        }, 1500);
    }
  }
};

const getPercentageHealth = (maxHealth, remainingHealth) =>
  (100 * remainingHealth) / maxHealth;

const endGame = () => {
  isWaiting = true;
  const endMessage =
    wizard.health === 0 && monster.health === 0
      ? "No victors - all creatures are dead"
      : wizard.health > 0
      ? "The Wizard Wins"
      : `The monsters is Victorious`;
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  document.body.innerHTML = `
  <div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
  </div>`;
};

const wizard = new Character(characterData.hero);
let monster = newMonster();
renderAllCharacters();

document.getElementById("attack-button").addEventListener("click", attack);
