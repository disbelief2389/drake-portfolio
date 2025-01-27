// Select elements
const userInput = document.getElementById("text-input");
const checkPalindromeBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

// Event listener for button click
checkPalindromeBtn.addEventListener("click", () => {
  // Get and trim user input
  const input = userInput.value.trim();

  // Handle empty or whitespace-only input
  if (input === "") {
    alert("Please input a value.");
    return;
  }

  // Clean the input
  const cleanedInput = input.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // Check if palindrome
  const isPalindrome = checkPalindrome(cleanedInput);

  // Update the result content
  if (isPalindrome) {
      resultDiv.textContent = `${input} is a palindrome`;
  } else {
      resultDiv.textContent = `${input} is not a palindrome`;
  }

  // Clear the input field for easy new entries
  userInput.value = "";
});

// Function to check if a string is a palindrome
function checkPalindrome(str) {
  return str === str.split('').reverse().join('');
}