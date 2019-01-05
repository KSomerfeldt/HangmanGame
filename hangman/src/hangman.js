class Hangman {
    constructor (word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = [' ']
        this.status = 'playing'
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter))
         if (this.remainingGuesses === 0) {
             this.status = 'failed'
         } else if (finished) {
             this.status = 'finished'
         } else {
             this.status = 'playing'
         }
    }
    get statusMessage () {
        if (this.status === 'playing')   { 
            return `Guesses left: ${this.remainingGuesses}` 
        }else if (this.status === 'failed'){
            return `Nice Try! The word was "${this.word.join('')}".`
        } else {
            return `Great work! You guessed the word!`
        }
    }
    get displayGuesses () {
        let guesses = ''
        this.guessedLetters.sort()
        this.guessedLetters.forEach((letter) => {
            if (!this.word.includes(letter)) {
                guesses += letter + '\xa0\xa0'
            }
            guesses = guesses.toUpperCase()
       })
        return `You have guessed: ${guesses}`
    }
    get puzzle() {
        let puzzle = ''
        this.word.forEach( (letter) => {
            if (this.guessedLetters.includes(letter)) {
                puzzle += letter  
            } else {
                puzzle += '*' 
            }
        })
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isWrong = !this.word.includes(guess)

        if (this.status !== 'playing'){
          return
        }
        if (isUnique){
            this.guessedLetters = [guess, ...this.guessedLetters]
        } 
        if (isUnique && isWrong) {
            this.remainingGuesses -= 1 
        }
    this.calculateStatus()
    }
}

export { Hangman as default }