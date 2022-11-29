import Game from './game.js'

const startGameBtn = document.querySelector('#start-game')
const gameDiv = document.querySelector('#game')

const userScoreSpan = document.querySelector('#user-score')
const computerScoreSpan = document.querySelector('#computer-score')
const pointsNeededSpan = document.querySelector('#points-needed')
const resultParagraph = document.querySelector('#result')
const gameOverParagraph = document.querySelector('#game-over')

const rockBtn = document.querySelector('#rock')
const paperBtn = document.querySelector('#paper')
const scissorsBtn = document.querySelector('#scissors')
const exitBtn = document.querySelector('#exit')

const POINTS_NEEDED = 3

startGameBtn.addEventListener('click', () => {
  startGameBtn.classList.add('hidden')
  gameDiv.classList.remove('hidden')
  userScoreSpan.textContent = computerScoreSpan.textContent = 0
  pointsNeededSpan.textContent = POINTS_NEEDED

  const game = new Game(POINTS_NEEDED)
  const gameButtons = [rockBtn, paperBtn, scissorsBtn]

  let timeoutId

  const refreshDisplay = ({ userMove, computerMove, winner, tie, done }) => {
    userScoreSpan.textContent = game.userScore
    computerScoreSpan.textContent = game.computerScore

    resultParagraph.textContent = 
      `You chose ${userMove}, computer chose ${computerMove}.`
    
    if (tie) {
      resultParagraph.textContent += ' It\'s a tie!'
    } else {
      resultParagraph.textContent += 
        ` ${winner === 'user' ? 'You win' : 'Computer wins'} this round!`
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

      gameButtons.forEach(button => button.disabled = true)
      timeoutId = setTimeout(reset, resetSeconds)
    }
  }

  const reset = () => {
    clearTimeout(timeoutId)

    gameDiv.classList.add('hidden')
    startGameBtn.classList.remove('hidden')
    resultParagraph.textContent = ''
    gameOverParagraph.textContent = ''

    gameButtons.forEach(button => button.disabled = false)

    rockBtn.removeEventListener('click', handleRockClick)
    paperBtn.removeEventListener('click', handlePaperClick)
    scissorsBtn.removeEventListener('click', handleScissorsClick)

    exitBtn.removeEventListener('click', reset)
  }

  exitBtn.addEventListener('click', reset)

  const handleRockClick = () => refreshDisplay(game.playNextTurn('rock'))
  const handlePaperClick = () => refreshDisplay(game.playNextTurn('paper'))
  const handleScissorsClick = () => refreshDisplay(game.playNextTurn('scissors'))

  rockBtn.addEventListener('click', handleRockClick)
  paperBtn.addEventListener('click', handlePaperClick)
  scissorsBtn.addEventListener('click', handleScissorsClick)
})


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