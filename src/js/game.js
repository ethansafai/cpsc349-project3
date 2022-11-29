class Game {
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
  constructor (pointsNeeded) {
    this.#pointsNeeded = pointsNeeded
    this.reset()
  }

  /**
   * Plays the next turn of the game
   *
   * @param {'rock' | 'paper' | 'scissors'} userMove
   */
  playNextTurn (userMove) {
    if (this.#done) return

    const computerMove = this.#computerMove()
    const winner = this.#winner(userMove, computerMove)
    let tie = false

    if (winner === 'user') {
      this.#userScore++
    } else if (winner === 'computer') {
      this.#computerScore++
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

  get userScore () { return this.#userScore }
  get computerScore () { return this.#computerScore }
}

export default Game
