let timerId
let timer = 10
const countUnit = 1000
function decreaseTimer () {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, countUnit)
    timer--
    document.querySelector('#timerText').textContent = timer
  }

  if (timer === 0) {
    timerId = clearTimeout(timerId)
    // reset timer
    timer = 10
  }
}

export default decreaseTimer
