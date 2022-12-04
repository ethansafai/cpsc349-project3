import Game from './game.js'
import decreaseTimer from './timer.js'

const mainLink = document.querySelector('#main-link')
const aboutLink = document.querySelector('#about-link')

const startGameBtn = document.querySelector('#start-game')
const loadGameBtn = document.querySelector('#load-game')
const gameDiv = document.querySelector('#game')

const playerChoiceDiv = document.querySelector('#player-choice')
const computerChoiceDiv = document.querySelector('#computer-choice')
const playerChoice = document.querySelector('#playerChoice')
const computerChoice = document.querySelector('#computerChoice')

const userScoreSpan = document.querySelector('#user-score')
const computerScoreSpan = document.querySelector('#computer-score')
const pointsNeededSpan = document.querySelector('#points-needed')
const resultParagraph = document.querySelector('#result')
const gameOverParagraph = document.querySelector('#game-over')
const timerDiv = document.querySelector('#timer')

const rockBtn = document.querySelector('#rock')
const paperBtn = document.querySelector('#paper')
const scissorsBtn = document.querySelector('#scissors')
const saveBtn = document.querySelector('#save-game')
const exitBtn = document.querySelector('#exit')

const POINTS_NEEDED = 3

function loadGame ({ isNewGame }) {
  startGameBtn.classList.add('hidden')
  loadGameBtn.classList.add('hidden')
  gameDiv.classList.remove('hidden')

  const game = new Game({ isNewGame, pointsNeeded: POINTS_NEEDED })
  const gameButtons = [rockBtn, paperBtn, scissorsBtn]

  let timeoutId

  const updateScoreColor = (winner, loser, isTie) => {
    console.log(winner.textContent, loser.textContent)
    if (isTie) {
      if (winner.classList.contains('leading-text')) {
        winner.classList.remove('leading-text')
      }

      if (loser.classList.contains('leading-text')) {
        loser.classList.remove('leading-text')
      }

      if (winner.classList.contains('losing-text')) {
        winner.classList.remove('losing-text')
      }

      if (loser.classList.contains('losing-text')) {
        loser.classList.remove('losing-text')
      }

      if (!winner.classList.contains('tie-text')) {
        winner.classList.add('tie-text')
      }

      if (!loser.classList.contains('tie-text')) {
        loser.classList.add('tie-text')
      }
    } else {
      if (winner.classList.contains('tie-text')) {
        winner.classList.remove('tie-text')
      }

      if (loser.classList.contains('tie-text')) {
        loser.classList.remove('tie-text')
      }

      if (winner.classList.contains('losing-text')) {
        winner.classList.remove('losing-text')
      }

      if (loser.classList.contains('winning-text')) {
        loser.classList.remove('winning-text')
      }

      if (!winner.classList.contains('leading-text')) {
        winner.classList.add('leading-text')
      }

      if (!loser.classList.contains('losing-text')) {
        loser.classList.add('losing-text')
      }
    }
  }

  const refreshDisplay = ({ userMove, computerMove, winner, tie, done }) => {
    userScoreSpan.textContent = game.userScore
    computerScoreSpan.textContent = game.computerScore

    if (userMove && computerMove) {
      resultParagraph.textContent =
      `You chose ${userMove}, computer chose ${computerMove}.`
    }

    if (winner === 'user') {
      playerChoiceDiv.classList.add('animate-bounce')
      setTimeout(() => {
        playerChoiceDiv.classList.remove('animate-bounce')
      }, 2000)
    } else if (winner === 'computer') {
      computerChoiceDiv.classList.add('animate-bounce')
      setTimeout(() => {
        computerChoiceDiv.classList.remove('animate-bounce')
      }, 2000)
    } else {
      playerChoiceDiv.classList.add('animate-pulse')
      computerChoiceDiv.classList.add('animate-pulse')
      setTimeout(() => {
        playerChoiceDiv.classList.remove('animate-pulse')
        computerChoiceDiv.classList.remove('animate-pulse')
      }, 2000)
    }

    if (game.userScore > game.computerScore) {
      updateScoreColor(userScoreSpan, computerScoreSpan, false)
    } else if (game.userScore < game.computerScore) {
      updateScoreColor(computerScoreSpan, userScoreSpan, false)
    } else {
      updateScoreColor(userScoreSpan, computerScoreSpan, true)
    }

    if (done) {
      const resetSeconds = 10000

      gameOverParagraph.textContent = 'Game over!'
      if (game.userScore > game.computerScore) {
        gameOverParagraph.textContent += ' You won!'
      } else {
        gameOverParagraph.textContent += ' Computer won!'
      }
      gameOverParagraph.textContent +=
        ` Game will exit in ${resetSeconds / 1000} seconds.`

      gameButtons.forEach(button => { button.disabled = true })
      timerDiv.classList.remove('hidden')
      decreaseTimer()
      timeoutId = setTimeout(reset, resetSeconds)
    }

    if (tie) {
      resultParagraph.textContent += ' It\'s a tie!'
    } else {
      resultParagraph.textContent +=
        ` ${winner === 'user' ? 'You win' : 'Computer wins'} this round!`
    }
  }

  const removeHidden = (element) => {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden')
    }
  }

  const addHidden = (element) => {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden')
    }
  }

  const reset = () => {
    clearTimeout(timeoutId)

    gameDiv.classList.add('hidden')
    timerDiv.classList.add('hidden')
    startGameBtn.classList.remove('hidden')
    loadGameBtn.classList.remove('hidden')
    addHidden(playerChoiceDiv)
    addHidden(computerChoiceDiv)

    resultParagraph.textContent = ''
    gameOverParagraph.textContent = ''

    gameButtons.forEach(button => { button.disabled = false })

    rockBtn.removeEventListener('click', handleRockClick)
    paperBtn.removeEventListener('click', handlePaperClick)
    scissorsBtn.removeEventListener('click', handleScissorsClick)

    exitBtn.removeEventListener('click', reset)
  }

  const computerRefresh = (computerMove) => {
    if (computerMove === 'rock') {
      computerChoice.src = 'images/rock.png'
    } else if (computerMove === 'paper') {
      computerChoice.src = 'images/paper.png'
    } else {
      computerChoice.src = 'images/scissors.png'
    }
  }

  if (isNewGame) {
    userScoreSpan.textContent = computerScoreSpan.textContent = 0
    pointsNeededSpan.textContent = POINTS_NEEDED
    resultParagraph.textContent = ''
    gameOverParagraph.textContent = ''
  } else {
    userScoreSpan.textContent = game.userScore
    computerScoreSpan.textContent = game.computerScore
    pointsNeededSpan.textContent = POINTS_NEEDED
    resultParagraph.textContent = ''
    gameOverParagraph.textContent = ''
    removeHidden(playerChoiceDiv)
    removeHidden(computerChoiceDiv)

  }

  const saveGamePlay = () => game.saveGame()

  saveBtn.addEventListener('click', saveGamePlay)
  exitBtn.addEventListener('click', reset)

  const handleRockClick = () => {
    removeHidden(playerChoiceDiv)
    removeHidden(computerChoiceDiv)
    const move = game.playNextTurn('rock')
    refreshDisplay(move)
    playerChoice.src = 'images/rock.png'
    computerRefresh(move.computerMove)
  }

  const handlePaperClick = () => {
    removeHidden(playerChoiceDiv)
    removeHidden(computerChoiceDiv)
    const move = game.playNextTurn('paper')
    refreshDisplay(move)
    playerChoice.src = 'images/paper.png'
    computerRefresh(move.computerMove)
  }

  const handleScissorsClick = () => {
    removeHidden(playerChoiceDiv)
    removeHidden(computerChoiceDiv)
    const move = game.playNextTurn('scissors')
    refreshDisplay(move)
    playerChoice.src = 'images/scissors.png'
    computerRefresh(move.computerMove)
  }

  rockBtn.addEventListener('click', handleRockClick)
  paperBtn.addEventListener('click', handlePaperClick)
  scissorsBtn.addEventListener('click', handleScissorsClick)
}

startGameBtn.addEventListener('click', () => loadGame({ isNewGame: true }))
loadGameBtn.addEventListener('click', () => loadGame({ isNewGame: false }))

function show (shown, hidden) {
  document.getElementById(shown).style.display = 'block'
  document.getElementById(hidden).style.display = 'none'
  return false
}

mainLink.addEventListener('click', () => { show('main', 'AboutUs') })
aboutLink.addEventListener('click', () => { show('AboutUs', 'main') })

// const start = document.getElementById('start-game')
// start.onclick = function() {startGame()}
// function startGame() {
//     const main = document.getElementsByTagName('main')
//     for (const game of main) {
//         const div = document.createElement("div")
//         const choose = document.createElement("p")
//         choose.innerText = "Make Your Choice:"
//         const rock = document.createElement("button")
//         rock.setAttribute('id', 'rock')
//         const rockImage = document.createElement("img")
//         rockImage.setAttribute("src", "/images/rock.png")
//         rockImage.setAttribute("width", "200")
//         rockImage.setAttribute("height", "200")
//         rock.appendChild(rockImage)
//         const paper = document.createElement("button")
//         paper.setAttribute('id', 'paper')
//         const paperImage = document.createElement("img")
//         paperImage.setAttribute("src", "/images/paper.png")
//         paperImage.setAttribute("width", "200")
//         paperImage.setAttribute("height", "200")
//         paper.appendChild(paperImage)
//         const scissor = document.createElement("button")
//         scissor.setAttribute('id', 'scissor')
//         const scissorImage = document.createElement("img")
//         scissorImage.setAttribute("src", "/images/scissors.png")
//         scissorImage.setAttribute("width", "200")
//         scissorImage.setAttribute("height", "200")
//         scissor.appendChild(scissorImage)
//         div.insertAdjacentElement('beforeend',choose)
//         div.insertAdjacentElement('beforeend', rock)
//         div.insertAdjacentElement('beforeend', paper)
//         div.insertAdjacentElement('beforeend', scissor)
//         game.insertAdjacentElement('beforeend', div)
//     }
//     document.getElementById('start-game').remove()
// }
