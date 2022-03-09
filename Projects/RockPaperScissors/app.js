let userScore = 0;
let computerScore = 0;

// DOM Variables: (store DOM elements)
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreboard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
// Here, we have 'cached the DOM'. Cache -- store something for future use. 
/* This is useful for ease of writing code, but also for performance.
   this way, everytime you want to access a DOM element, you don't have to fetch
   it, you can just access it via these variables. 
*/

function getComputerChoice() 
{
  const choices = ['r', 'p', 's'];
  const randomChoice = Math.floor(Math.random() * 3);
  return choices[randomChoice];
}

function convertToWord(char)
{ 
  if (char === 'r') return "Rock";
  else if (char === 'p') return "Paper";
  else return "Scissors";
}

function win(combination) 
{
  // Update userScore_span/scoreboard_div:
  userScore++;
  userScore_span.innerHTML = userScore;
  // Update result_p:
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  result_p.innerHTML = `${convertToWord(combination[0])}${smallUserWord} beats 
                        ${convertToWord(combination[1])}${smallCompWord}. You win!`;
  // Green glow around userChoice_div: 
  const userChoice_div = document.getElementById(combination[0]);
  userChoice_div.classList.add('green-glow');
  setTimeout(() => userChoice_div.classList.remove('green-glow'), 250);
  // Dark red glow around computerChoice_div:
  const computerChoice_div = document.getElementById(combination[1]);
  computerChoice_div.classList.add('comp-red-glow');
  setTimeout(() => computerChoice_div.classList.remove('comp-red-glow'), 250);
}

function lose(combination) 
{
  // Update computerScore_span/scoreboard_div:
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  // Update result_p:
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  result_p.innerHTML = `${convertToWord(combination[0])}${smallUserWord} loses to 
                        ${convertToWord(combination[1])}${smallCompWord}. You lose!`;
  // Red glow around userChoice_div:
  const userChoice_div = document.getElementById(combination[0]);
  userChoice_div.classList.add('red-glow');
  setTimeout(() => userChoice_div.classList.remove('red-glow'), 250);
  // Dark red glow around computerChoice_div:
  const computerChoice_div = document.getElementById(combination[1]);
  computerChoice_div.classList.add('comp-red-glow');
  setTimeout(() => computerChoice_div.classList.remove('comp-red-glow'), 250);
}

function draw(combination) 
{
  // Update result_p:
  result_p.innerHTML = `Both picked ${convertToWord(combination[0])}. It's a draw.`;
  // Grey glow around userChoice_div:
  const userChoice_div = document.getElementById(combination[0]);
  userChoice_div.classList.add('grey-glow');
  setTimeout(() => userChoice_div.classList.remove('grey-glow'), 250);
}

function game(userChoice) 
{
  const computerChoice = getComputerChoice();
  let combination = userChoice + computerChoice;
  switch (combination)
  {
    // Win cases:
    case "rs":
    case "pr":
    case "sp":
      win(combination);
      break;
    // Lose cases:
    case "rp":
    case "ps":
    case "sr":
      lose(combination);
      break;
    // Draw cases:
    case "rr":
    case "pp":
    case "ss":
      draw(combination);
      break;
    default:
      console.log("Default switch case entered");
      break;
  }
}

function main() 
{
  rock_div.addEventListener('click', () => game('r'));
  paper_div.addEventListener('click', () => game('p'));
  scissors_div.addEventListener('click', () => game('s'));
}

main();