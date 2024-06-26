// Variables
let score = 0,
  cards_data = [],
  counter = 0,
  rotatedCards = [],
  mins = 1,
  secs = 60,
  timer;

// DOM Targetting
let cards_container = document.querySelector(".cards-container"),
  score_plus_one = document.getElementById("score-plus-one"),
  reset_btn = document.getElementById("reset"),
  scoreTeller = document.getElementById("score"),
  preLoader = document.querySelector(".pre-loader"),
  minsElem = document.querySelector("#mins"),
  secsElem = document.querySelector("#secs");

// Timer IIFE - Starting
function CountDownTimer(){
  timer = setInterval(() => {
    mins > 0 ? mins-- : "";
    minsElem.innerText = `0${mins}`
    if(secs > 10){
      secs--;
      secsElem.innerText = secs;
    } else if(secs <= 10 && secs > 0){
      secs--;
      secsElem.innerText = `0${secs}`;
    } else if(secs == 0){
      GameLost();
    }
  }, 1000);
}

CountDownTimer();

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
        ScoreAnimation();
        score++;
        if (score == 10) {
          GameWon();
        }
        scoreTeller.innerText = score;
        counter = 0;
        rotatedCards = [];
      }, 1500);
    } else {
      setTimeout(() => {
        rotated_cards.forEach((single_card) => {
          single_card.classList.remove("single-card-inner-rotate", "already-rotated");
        });
        counter = 0;
        rotatedCards = [];
      }, 1500);
    }
  }
}

// Score Animation
const ScoreAnimation = () => {
  score_plus_one.classList.add("scored-animation");
  setTimeout(() => {
    score_plus_one.classList.remove("scored-animation");
  }, 1200)
}

// Game Won
const GameWon = () => {
  clearInterval(timer);
  Swal.fire({
    title: 'Hurrah! You Won',
    icon: 'success',
    iconColor: '#008674',
    confirmButtonText: 'Reset',
    confirmButtonColor: '#03111B',
  }).then((result) => {
    if(result.isConfirmed){
      GameReset();
    };
  });
}

// Game Lost
const GameLost = () => {
  clearInterval(timer);
  Swal.fire({
    title: 'Oops! You Lost',
    icon: 'error',
    iconColor: '#fa0740',
    confirmButtonText: 'Reset',
    confirmButtonColor: '#03111B',
  }).then((result) => {
    if(result.isConfirmed){
      GameReset();
    };
  });
}

// Game Reset
const GameReset = () => {
  clearInterval(timer);
  mins = 1,
  secs = 60,
  CountDownTimer();
  cards_data = [];
  cards_container.innerHTML = "";
  score = 0;
  scoreTeller.innerText = score;
  FetchingData();
}

// Event Listeners
reset_btn.addEventListener("click", GameReset);


// Loader
window.addEventListener("load", () => {
  preLoader.classList.add("pre-loader-hidden");
})