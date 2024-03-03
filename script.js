// Variables
let score = 0;
let cards_data = [];
let counter = 0;
let rotatedCards = [];

// DOM Targetting
let cards_container = document.querySelector(".cards-container");

// Fetch Data Using async/await
const FetchingData = async () => {
  try {
    let response = await fetch("./data/data.json");
    if (response.ok) {
      let result = await response.json();
      cards_data = [...result, ...result];
      ShuffleData(cards_data);
    }
  } catch (error) {
    console.error(error);
  }
};

// Run Function on load - Starting
FetchingData();

// Shuffling Data Function
const ShuffleData = (dataArray) => {
  // Shuffling The Data
  dataArray.sort(() => Math.random() - 0.5);

  // Creating Cards
  CreateCards(dataArray);
};

// Creating Cards Function
const CreateCards = (cardData) => {
  cardData = cardData.map((singleVal) => {
    let singleCard = `<div class="single-card">
        <div class="single-card-inner">
            <div class="single-card-back">
                <h1>🤔</h1>
            </div>
            <div class="single-card-front">
                <h1>${singleVal.content}</h1>
            </div>
        </div>
    </div>`;

    // Append
    cards_container.innerHTML += singleCard;
  });

  MakeCardsClickable();
};

const MakeCardsClickable = () => {
  let single_card_array = document.querySelectorAll(".single-card");
  single_card_array.forEach((single_card) => {
    single_card.addEventListener("click", function () {
      let single_card_inner = single_card.querySelector(".single-card-inner");
      if (counter < 2) {
        if (!(single_card_inner.classList.contains("single-card-inner-rotate"))) {
          single_card_inner.classList.add("single-card-inner-rotate");
          CardMatchChecker(this.querySelector(".single-card-front h1").innerText);
        }
      }
    });
  });
};

function CardMatchChecker(cardEmoji) {
  if (counter < 1) {
    counter++;
    rotatedCards.push(cardEmoji);
  } else if (counter == 1 && counter < 2) {
    counter++;
    rotatedCards.push(cardEmoji);
    let rotated_cards = document.querySelectorAll(".single-card-inner-rotate:not(.already-rotated)");
    if (rotatedCards[0] === rotatedCards[1]) {
      setTimeout(() => {
        rotated_cards.forEach((single_card) => {
          single_card.classList.add("already-rotated");
          single_card.querySelector(".single-card-front").classList.add("matched-cards");
        });
        score++;
        document.getElementById("score").innerText = score;
        counter = 0;
        rotatedCards = [];
      }, 1500);
    } else {
      setTimeout(() => {
        rotated_cards.forEach((single_card) => {
          single_card.classList.remove("single-card-inner-rotate");
        });
        counter = 0;
        rotatedCards = [];
      }, 1500);
    }
  }
}