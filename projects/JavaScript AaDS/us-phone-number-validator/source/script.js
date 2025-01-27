const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

// Function to clear input and results
const clearAll = () => {
    userInput.value = "";
    resultsDiv.innerText = "";
};

clearBtn.addEventListener("click", clearAll);

// Function to validate US phone numbers
const validatePhNum = (phNum) => {
    // Extract all digits from the phone number
    const extractDigits = (str) => str.replace(/\D/g, '');
    const digits = extractDigits(phNum);
    
    // Check if the total number of digits is either 10 or 11
    if (digits.length !== 10 && digits.length !== 11) {
        return false;
    }
    
    // Regex to match valid US phone number formats
    const regex = /^\+?1?[\s.-]*(?:\(\d{3}\)|\d{3})[\s.-]*\d{3}[\s.-]*\d{4}$/;
    return regex.test(phNum);
};

checkBtn.addEventListener("click", () => {
    const phNum = userInput.value.trim();
    if (phNum === "") {
        alert("Please provide a phone number");
    } else if (validatePhNum(phNum)) {
        resultsDiv.innerText = "Valid US number: " + phNum;
    } else {
        resultsDiv.innerText = "Invalid US number: " + phNum;
    }
});