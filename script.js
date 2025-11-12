const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is measured in words per minute.",
  "JavaScript powers the interactive web.",
  "Practice makes perfect when typing fast.",
  "Coding is fun when you build cool things.",
  "Always write clean and maintainable code."
];

let quote = "";
let startTime;
let timerInterval;

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function displayNewQuote() {
  quote = getRandomQuote();
  document.getElementById("quoteDisplay").textContent = quote;
  document.getElementById("quoteInput").value = "";
  document.getElementById("wpm").textContent = "0";
  document.getElementById("accuracy").textContent = "0";
  document.getElementById("timer").textContent = "0";
  clearInterval(timerInterval);
}

function startTyping() {
  const input = document.getElementById("quoteInput").value;

  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }

  if (input === quote) {
    clearInterval(timerInterval);
    calculateResults();
  }
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.getElementById("timer").textContent = elapsedTime;
}

function calculateResults() {
  const input = document.getElementById("quoteInput").value;
  const totalTime = Math.floor((new Date() - startTime) / 1000);
  const wordCount = input.trim().split(/\s+/).length;
  const wpm = Math.round((wordCount / totalTime) * 60);
  const correctChars = input.split('').filter((ch, i) => ch === quote[i]).length;
  const accuracy = Math.round((correctChars / quote.length) * 100);

  document.getElementById("wpm").textContent = isNaN(wpm) ? 0 : wpm;
  document.getElementById("accuracy").textContent = isNaN(accuracy) ? 0 : accuracy;
}

function resetTest() {
  startTime = null;
  clearInterval(timerInterval);
  displayNewQuote();
}

window.onload = displayNewQuote;