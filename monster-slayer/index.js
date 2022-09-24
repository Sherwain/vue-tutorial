Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      events: [],
      winner: null,
    };
  },

  methods: {
    attackMonster() {
      const blow = getHealthImpact(5, 12);
      this.monsterHealth -= blow;
      this.attackPlayer();
      this.currentRound += 1;
      this.events.push(
        `You dealt a blow of: ${blow} to monster's health. Monster health: ${this.monsterHealth}`
      );
    },

    attackPlayer() {
      const blow = getHealthImpact(8, 15);
      this.playerHealth -= blow;
      this.events.push(
        `Monster dealt a blow of: ${blow} to Your health. Your health: ${this.playerHealth}`
      );
    },

    specialAttackMonster() {
      const blow = getHealthImpact(10, 25);
      this.monsterHealth -= blow;
      this.events.push(
        `You launched a special attack of: ${blow} to monster's health. Monster's health: ${this.monsterHealth}`
      );
      this.attackPlayer();
      this.currentRound += 1;
    },

    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },

    healPlayer() {
      this.currentRound += 1;
      const heal = getHealthImpact(8, 20);
      const total = this.playerHealth + heal;

      this.playerHealth = 100 % total == 100 ? 100 : total;
      this.events.push(
        `You health increased by: ${heal}. Your health: ${this.playerHealth}`
      );

      this.attackPlayer();
    },

    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.events = [];
      this.winner = null;
    },
  },

  computed: {
    monsterBarStyle() {
      const width = this.monsterHealth < 0 ? 0 : this.monsterHealth;
      return { width: width + "%" };
    },

    playerBarStyle() {
      const width = this.playerHealth < 0 ? 0 : this.playerHealth;
      return { width: width + "%" };
    },

    specialAttack() {
      return this.currentRound % 3 === 0 && this.currentRound != 0
        ? false
        : true;
    },
  },

  watch: {
    playerHealth() {
      if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      } else if (this.playerHealth <= 0) {
        this.winner = "Monster";
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
    },

    monsterHealth() {
      if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      } else if (this.monsterHealth <= 0) {
        this.winner = "You";
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
    },
  },
}).mount(".game");

function getHealthImpact(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
