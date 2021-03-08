const NUM_OF_CARDS = 12;
const colors = [
  "red",
  "red",
  "blue",
  "blue",
  "green",
  "green",
  "yellow",
  "yellow",
  "purple",
  "purple",
  "black",
  "black",
];
let selectedCard = null;
let cardToColorObj = {};
const counterEl = document.querySelector(".counter");
let pairsLeft = NUM_OF_CARDS / 2;
const gameContainer = document.querySelector(".game-container");
let cards;

const generateCards = () => {
  for (let i = 0; i < NUM_OF_CARDS; ++i) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = `${i + 1}`;
    gameContainer.appendChild(card);
  }
};

const randomizeCardsColors = () => {
  let tempColors = new Array(...colors);
  let randColorNumberIndex;
  cards.forEach((card) => {
    randColorNumberIndex = Math.floor(Math.random() * tempColors.length);
    cardToColorObj[card.id] = tempColors[randColorNumberIndex];
    tempColors.splice(randColorNumberIndex, 1);
  });
};

function cardClick(e) {
  if (!selectedCard) {
    selectedCard = e.target;
    selectedCard.classList.add("selected", "disabled");
    selectedCard.style.backgroundColor = cardToColorObj[e.target.id];
  } else {
    if (compareCards(e.target)) {
      // a match
      e.target.removeEventListener("click", cardClick);
      e.target.style.backgroundColor = cardToColorObj[e.target.id];
      selectedCard.removeEventListener("click", cardClick);
      selectedCard.classList.remove("selected", "disabled");
      selectedCard = null;
      pairsLeft--;
      checkWin();
    } else {
      // not a match
      counterEl.textContent = Number(counterEl.textContent) + 1;
      cards.forEach((card) => card.classList.add("disabled"));
      selectedCard.classList.remove("selected");
      selectedCard.style.backgroundColor = cardToColorObj[selectedCard.id];
      e.target.style.backgroundColor = cardToColorObj[e.target.id];
      setTimeout(() => {
        cards.forEach((card) => card.classList.remove("disabled"));
        selectedCard.style.backgroundColor = "";
        e.target.style.backgroundColor = "";
        selectedCard = null;
      }, 1000);
    }
  }
}

const handleClicks = () => {
  cards.forEach((c) => c.addEventListener("click", cardClick));
};

const startGame = () => {
  generateCards();
  cards = document.querySelectorAll(".card");
  randomizeCardsColors();
  handleClicks();
};

// STARTING POINT!
startGame();

const compareCards = (card) => {
  return cardToColorObj[card.id] === cardToColorObj[selectedCard.id];
};

const restartGame = () => {
  cardToColorObj = {};
  pairsLeft = NUM_OF_CARDS / 2;
  counterEl.textContent = 0;
  clearContainer();
  startGame();
};

const checkWin = () => {
  if (!pairsLeft) {
    youWonMsg = document.createElement("h1");
    youWonMsg.textContent = "You Won!!";
    gameContainer.appendChild(youWonMsg);
    restartGameButton = document.createElement("button");
    restartGameButton.textContent = "Restart Game";
    gameContainer.appendChild(restartGameButton);
    restartGameButton.addEventListener("click", restartGame);
  }
};

const clearContainer = () => {
  while (gameContainer.hasChildNodes()) {
    gameContainer.firstChild.remove();
  }
};
