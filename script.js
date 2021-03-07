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
const cardToColorObj = {};
const counterEl = document.querySelector(".counter");

const generateCards = () => {
  for (let i = 0; i < NUM_OF_CARDS; ++i) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = `${i + 1}`;
    document.querySelector(".game-container").appendChild(card);
  }
};

const randomizeCardsColors = () => {
  let randColorNumberIndex;
  cards.forEach((card) => {
    randColorNumberIndex = Math.floor(Math.random() * colors.length);
    console.log(randColorNumberIndex);
    // card.setAttribute("data-color", colors[randColorNumberIndex]);
    cardToColorObj[card.id] = colors[randColorNumberIndex];
    colors.splice(randColorNumberIndex, 1);
  });
};

function cardClick(e) {
  if (!selectedCard) {
    selectedCard = e.target;
    selectedCard.classList.add("selected", "disabled");
  } else {
    console.log(compareCards(e.target));
    if (compareCards(e.target)) {
      e.target.removeEventListener("click", cardClick);
      e.target.style.backgroundColor = cardToColorObj[e.target.id];
      console.log(cardToColorObj[e.target.id]);
      selectedCard.removeEventListener("click", cardClick);
      selectedCard.style.backgroundColor = cardToColorObj[e.target.id];
      //   selectedCard.classList.remove("selected", "disabled");
    } else {
      counterEl.textContent = Number(counterEl.textContent) + 1;
      cards.forEach((card) => card.classList.add("disabled"));
      //   selectedCard.classList.remove("selected");
      setTimeout(() => {
        cards.forEach((card) => card.classList.remove("disabled"));
      }, 1000);
    }
    selectedCard.classList.remove("selected", "disabled"); // to remove
    selectedCard = null;
  }
}

const handleClicks = () => {
  cards.forEach((c) => c.addEventListener("click", cardClick));
};

generateCards();
const cards = document.querySelectorAll(".card");
randomizeCardsColors();
handleClicks();

const compareCards = (card) => {
  return cardToColorObj[card.id] === cardToColorObj[selectedCard.id];
};
