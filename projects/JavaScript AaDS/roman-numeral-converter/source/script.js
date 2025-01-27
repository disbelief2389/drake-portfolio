const form = document.getElementById("form");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertToRoman = inputNum => {
    const reference = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ];
    const result = [];
    
    reference.forEach(function (array) {
        while (inputNum >= array[1]) {
            result.push(array[0]);
            inputNum -= array[1];
        }
    });
    return result.join("");
};

const inputValidation = (inputString, inputInt) => {
    let errorText = "";
    
    if (!inputString || inputString.match(/[e.]/g)) {
        errorText = "Please enter a valid number";
    } else if (inputInt < 1) {
        errorText = "Please enter a number greater than or equal to 1";
    } else if (inputInt > 3999) {
        errorText = "Please enter a number less than or equal to 3999";
    } else {
        return true;
    }
    
    output.innerText = errorText;
    output.classList.add("alert");
    return false;
    
};

const clearOutput = () => {
    output.innerText = "";
    output.classList.remove("alert");
};

const updateUI = () => {
    const numberString = document.getElementById("number").value;
    const integer = parseInt(numberString, 10);
    
    output.classList.remove("hidden");
    
    clearOutput();
    
    if (inputValidation(numberString, integer)) {
        output.innerText = convertToRoman(integer);
    }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  updateUI();
});

convertBtn.addEventListener("click", () => {
    updateUI();
});