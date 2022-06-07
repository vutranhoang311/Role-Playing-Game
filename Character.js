import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentageHealth,
} from "./utilities.js";

class Character {
  // this.elementId = data.elementId;
  // this.name = data.name;
  // this.avatar = data.avatar;
  // this.health = data.health;
  // this.diceCount = data.diceCount;
  constructor(data) {
    Object.assign(this, data);
    this.maxHealth = this.health;
    this.diceHtml = getDicePlaceholderHtml(this.diceCount);
  }

  setDiceHTML() {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((item) => `<div class="dice"> ${item} </div>`)
      .join("");
  }

  getPercentageHealthHtml() {
    const percent = getPercentageHealth(this.health, this.maxHealth);
    return `
      <div class="health-bar-outer">
          <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
          style="width:${percent}%;">
          </div>
      </div>`;
  }

  takeDamage(currentDiceScore) {
    const totalAttackScore = currentDiceScore.reduce(
      (total, item) => (total += item)
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  }

  renderCharacters() {
    const {
      elementId,
      name,
      avatar,
      health,
      currentDiceScore,
      diceCount,
      diceHtml,
    } = this;

    const healthBar = this.getPercentageHealthHtml();
    return `
    <div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}" />
        <div class="health">health: <b> ${health} </b></div>
        ${healthBar}
        <div class="dice-container">
            ${diceHtml}
        </div>
    </div>`;
  }
}

export default Character;
