// Assigning variables
const wordText = document.querySelector(".word");
const dictionaryText = document.querySelector(".definition");
const icons = document.querySelectorAll(".row i");
const searchBtn = document.querySelector("button");

//clearing translation on empyty inputs
wordText.addEventListener("keyup", () => {
    if(!wordText.value) {
        dictionaryText.value = "";
    }
});

// Dicitionary API button
searchBtn.addEventListener("click", () => {
    let text = wordText.value.trim();
    if (!text) return;
    dictionaryText.value = "";
    dictionaryText.setAttribute("placeholder", "Finding definition...");

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0 && data[0].meaning.length > 0) {
                dictionaryText.value = data[0].meanings[0].definitions[0].definition;
            } else {
                dictionaryText.value = "No definition found";
            }
            dictionaryText.setAttribute("placeholder", "Definition");
        })
        .catch(error => {
            dictionaryText.value = "Error in finding definition";
            console.error("Definition API Error:", error);
        })
});