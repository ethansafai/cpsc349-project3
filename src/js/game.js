/* global localStorage */
class Game {
  /**
   * @type {boolean}
   */
  #isNewGame

  /** @type {number} */
  #pointsNeeded

  /** @type {number} */
  #userScore

  /** @type {number} */
  #computerScore

  /** @type {boolean} */
  #done

  /**
   * Initialize the Game object with pointsNeeded
   *
   * @param {number} pointsNeeded
   */
  constructor ({ isNewGame, pointsNeeded }) {
    this.#isNewGame = isNewGame
    this.#pointsNeeded = pointsNeeded
    if (this.#isNewGame) {
      this.reset()
    } else {
      this.load()
    }
  }

  /**
   * Plays the next turn of the game
   *
   * @param {'rock' | 'paper' | 'scissors'} userMove
   */
  playNextTurn (userMove) {
    if (this.#done) {
      return {
        userMove: undefined,
        computerMove: undefined,
        winner: undefined,
        tie: undefined,
        done: this.#done
      }
    }

    const computerMove = this.#computerMove()
    const winner = this.#winner(userMove, computerMove)
    let tie = false

    if (winner === 'user') {
      this.#userScore++
      console.log('user score ', this.#userScore)
    } else if (winner === 'computer') {
      this.#computerScore++
      console.log('computer score', this.#computerScore)
    } else {
      tie = true
    }

    if (this.#userScore === this.#pointsNeeded ||
        this.#computerScore === this.#pointsNeeded) {
      this.#done = true
    }

    return { userMove, computerMove, winner, tie, done: this.#done }
  }

  /**
   * Resets the game's state
   */
  reset () {
    this.#userScore = 0
    this.#computerScore = 0
    this.#done = false
  }

  /**
   * Load the saved game state from local storage if not a new game
   */
  load () {
    this.#userScore = Number(localStorage.getItem('userScore'))
    this.#computerScore = Number(localStorage.getItem('computerScore'))
    this.#done = localStorage.getItem('done') === 'true'
  }

  /**
   * Returns the computer's random move
   *
   * @returns {'rock' | 'paper' | 'scissors'}
   */
  #computerMove () {
    const moves = ['rock', 'paper', 'scissors']
    const choiceIdx = Math.floor(Math.random() * moves.length)
    return moves[choiceIdx]
  }

  /**
   * Returns 'user' if the user won, 'tie' if there's a tie, else 'computer'
   *
   * @param {'rock' | 'paper' | 'scissors'} user
   * @param {'rock' | 'paper' | 'scissors'} computer
   *
   * @returns {'user' | 'tie' | 'computer'} winner
   */
  #winner (user, computer) {
    if (user === computer) {
      return 'tie'
    }
    if (user === 'rock') {
      if (computer === 'scissors') {
        return 'user'
      }
      return 'computer'
    }
    if (user === 'paper') {
      if (computer === 'rock') {
        return 'user'
      }
      return 'computer'
    }
    // user chose scissors
    if (computer === 'paper') {
      return 'user'
    }
    return 'computer'
  }

  /**
   * Save the point needed to win the game,
   * current score of the user and computer,
   * and the state of the game (done or not)
   *
   */
  saveGame () {
    localStorage.setItem('userScore', String(this.userScore))
    localStorage.setItem('computerScore', String(this.computerScore))
    localStorage.setItem('done', String(this.#done))
  }

  get userScore () { return this.#userScore }
  get computerScore () { return this.#computerScore }
  get done () { return this.#done }
}

export default Game
