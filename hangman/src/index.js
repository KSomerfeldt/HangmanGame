
import Hangman from './hangman'
import getPuzzle from './requests'


const puzzleEl = document.querySelector('#puzzle')
const statusEl = document.querySelector('#status')
const guessesEl = document.querySelector('#guesses')

let game    

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    statusEl.textContent = game.statusMessage
    guessesEl.textContent = game.displayGuesses

    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()