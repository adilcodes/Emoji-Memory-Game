// Variables
let score = 0;
let cards_data = [];

// Fetch Data Using async/await
const FetchingData = async () => {
    try {
        let response = await fetch("./data/data.json");
        if(response.ok){
            let result = await response.json();
            cards_data = [...result, ...result];
            ShuffleData(cards_data);
        }
    } catch (error) {
        console.error(error);
    }
}

// Run Function on load
FetchingData();

// Shuffling Data Function
const ShuffleData = (data) => {
    // Shuffling The Data
    console.log(data);

    // Creating Cards
    CreateCards();
}

// Creating Cards Function
const CreateCards = () => {
    console.log("creating cards...");
}

// DOM Targetting
let cards_container = document.querySelector(".cards-container");
let single_card_array = document.querySelectorAll(".single-card");

// Event Listeners
single_card_array.forEach((single_card) => {
    single_card.addEventListener("click", () => {
        let single_card_inner = single_card.querySelector(".single-card-inner");
        single_card_inner.classList.add("single-card-inner-rotate");
    });
});