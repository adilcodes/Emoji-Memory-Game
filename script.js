// Targetting DOM
let single_card_array = document.querySelectorAll(".single-card");


// Event Listeners
single_card_array.forEach((single_card) => {
    single_card.addEventListener("click", () => {
        let single_card_inner = single_card.querySelector(".single-card-inner");
        single_card_inner.classList.add("single-card-inner-rotate");
    });
});