// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundNumber = 0;
let results = [];

// Starts the game after validating that playerName is not empty
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = `Welcome, ${nameInput}!`;
    document.getElementById("startTime").innerHTML = `Started on: ${new Date()}`;
}

// Randomly selects "rock", "paper", or "scissors"
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round, updates images, score, result colour, and history table
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundNumber++;

    // Update player and computer images
    document.getElementById("playerImg").src = `${playerChoice}.png`;
    document.getElementById("computerImg").src = `${computerChoice}.png`;

    let outcome = "";
    const resultEl = document.getElementById("result");

    // Decide winner with if...else
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultEl.style.color = "green";
    } else {
        outcome = "Lose";
        losses++;
        resultEl.style.color = "red";
    }

    // Update result message, scoreboard, and results array
    resultEl.innerHTML = `Round ${roundNumber}: You chose ${playerChoice}, Computer chose ${computerChoice} — ${outcome}!`;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;
    results.push(outcome);

    // Append row to history table body
    const newRow = `
        <tr>
            <td>${roundNumber}</td>
            <td>${playerChoice}</td>
            <td>${computerChoice}</td>
            <td>${outcome}</td>
        </tr>
    `;
    document.getElementById("historyBody").innerHTML += newRow;
}

// Loops over results to count wins and displays total rounds and rounded win %
function showSummary() {
    let winCount = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const totalRounds = results.length;
    const winPercentage = totalRounds === 0 ? 0 : Math.round((winCount / totalRounds) * 100);

    document.getElementById("summaryText").innerHTML =
        `You played ${totalRounds} rounds and won ${winPercentage}%.`;
}

// Resets scores, results array, history table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundNumber = 0;
    results = [];
    gameStarted = false;

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "Game reset. Enter your name and click Start Game.";
    document.getElementById("result").style.color = "grey";
    document.getElementById("summaryText").innerHTML = "";
}