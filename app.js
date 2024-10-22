const inputElm = document.querySelector("input");
const cardBtn = document.querySelector(".card__btn");
const imageElm = document.querySelector("img");
const imageDiv = document.querySelector(".card__image");
const modal = document.querySelector(".modal");

async function fetchQRHandler() {
    const inputValue = inputElm.value.trim().toLowerCase();

    if (!inputValue) {
        imageDiv.style.display = "none";
        showModal("Please enter a valid input!");
        return;
    }

    try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch QR code.");
        }

        imageElm.setAttribute("src", response.url);
        imageDiv.style.display = "block";
        
        inputElm.value = "";
    } catch (error) {
        console.warn("Error:", error);
        showModal("An error occurred while generating the QR code. Please try again.");
    }
}

function showModal(message) {
    modal.textContent = message;
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);
}

cardBtn.addEventListener("click", fetchQRHandler);
inputElm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchQRHandler();
    }
});
