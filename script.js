'use strict';

let gameOver = false;
let previousHighScore = 0;
let currentScore = 20;
let randomNumberToGuess = GetRandomNumber();
const initialScore = 20;
const winColor = "#60b347";
const loseColor = "#710202";
const defaultColor = "#222";
const queryScore = document.querySelector(".score");
const checkButton = document.querySelector(".check");
const againButton = document.querySelector(".again");
const queryUserGuess = document.querySelector(".guess");
const queryHighScore = document.querySelector(".highscore");
const queryNumberToGuess = document.querySelector(".number");
const queryMessageToUser = document.querySelector(".message");

checkButton.addEventListener("click", OnClickCheck); 
againButton.addEventListener("click", OnClickAgain);

function OnClickCheck()
{
    //console.log("Clic");
    if(gameOver) return;

    const userGuess = Number(queryUserGuess.value);
    if(!userGuess)
    {
        queryMessageToUser.textContent = "No input!";
    }
    else
    {
        if(userGuess === randomNumberToGuess)
        {
            //Win
            queryNumberToGuess.textContent = randomNumberToGuess;
            queryMessageToUser.textContent = "CORRECT!";
            Number(queryUserGuess.value = "");

            //console.log("La puntuacion maxima anterior era: " + previousHighScore);
            if(currentScore > previousHighScore)
            {
                //console.log("Nueva puntuacion maxima: " + currentScore);
                queryHighScore.textContent = currentScore;
                previousHighScore = currentScore;
                DisableUserGuessInput(true);
                SetCSSBackgroundColor(winColor);
            }
            gameOver = true;
        }
        else
        {
            //Lose
            queryMessageToUser.textContent = userGuess > randomNumberToGuess ? "Too high..." : "Too low...";
            DecreaseScore();
        }
    }
}

function OnClickAgain()
{
    //console.log("Restart game");

    queryUserGuess.value = "";
    queryNumberToGuess.textContent = "?";
    queryScore.textContent = initialScore;
    queryMessageToUser.textContent = "Start guessing...";

    randomNumberToGuess = GetRandomNumber();
    currentScore = initialScore;
    gameOver = false;
    SetCSSBackgroundColor(defaultColor);
    DisableUserGuessInput(false);
}

function DecreaseScore()
{
    currentScore--;
    queryScore.textContent = currentScore;
    if(currentScore === 0)
    {
        Number(queryUserGuess.value = "");
        queryMessageToUser.textContent = "GAME OVER!";
        gameOver = true;
        SetCSSBackgroundColor(loseColor);
        DisableUserGuessInput(true);
    }
}

function GetRandomNumber()
{
    return Math.trunc(Math.random() * 20)+1;
}

function DisableUserGuessInput(_bool)
{
    queryUserGuess.disabled = _bool;
}

function SetCSSBackgroundColor(_hexColor)
{
    document.querySelector("body").style.backgroundColor = _hexColor;
}