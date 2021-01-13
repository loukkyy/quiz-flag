import setupModal from "./modal.js"
import countries from "./countries.json"
const scoreElement = document.querySelector("[data-score]")
let score = 0
let questionId = 0

newGame()

function checkAnswer(selectedAnswer) {
  if (selectedAnswer.dataset.value === "true") {
    selectedAnswer.classList.add("correct")
    score++
  } else {
    selectedAnswer.classList.add("incorrect")
    // show correct answer
    const answers = document.querySelectorAll(".answer")
    answers.forEach((answer) => {
      if (answer.dataset.value === "true") {
        answer.classList.add("correct")
      }
    })
  }
  if (questionId < 10) {
    setTimeout(loadQuestion, 2000)
  } else {
    setTimeout(showScore, 2000)
  }
}

function loadQuestion() {
  questionId++
  scoreElement.innerText = `Question ${questionId}/10 - Score ${score}`
  // clear answers
  const answerList = document.querySelector(".answer-list")
  answerList.innerHTML = ""

  // load 4 answers
  const answerOptions = []
  for (let i = 0; i < 4; i++) {
    answerOptions.push(getNewAnswer(answerOptions))
  }

  // select random correct answer
  const correctAnswerId = Math.floor(Math.random() * 4)

  // render question
  const country = answerOptions[correctAnswerId]
  const flag = document.querySelector(".flag-icon")
  flag.innerText = country.flag

  // render answers
  answerOptions.forEach((answer) => {
    const answerItem = document.createElement("li")
    answerItem.classList.add("answer")
    answerItem.innerText = answer.name
    if (answerOptions.indexOf(answer) === correctAnswerId) {
      answerItem.dataset.value = "true"
    } else {
      answerItem.dataset.value = "false"
    }
    // add event listener
    answerItem.addEventListener("click", (e) => {
      checkAnswer(answerItem)
    })
    answerList.append(answerItem)
  })
}

function getNewAnswer(answerOptions) {
  const country = countries[Math.floor(Math.random() * countries.length)]
  const value = answerOptions.find((elem) => elem.name === country.name)
  if (value != null) {
    return getNewAnswer(answerOptions)
  } else {
    return country
  }
}

function showScore() {
  modal.classList.add("open")
  overlay.classList.add("open")
  const modalContent = document.querySelector("#modal-content")
  modalContent.innerText = `Your score: ${score}/10`
  const scoreMessage = document.querySelector(".score-message")
  if (score <= 5) {
    scoreMessage.innerText =
      "My grand mother is better than you - Click below to study more"
  } else if (score < 10) {
    scoreMessage.innerText = "Pretty amazing!"
  } else {
    scoreMessage.innerText = "You're a god!!"
  }
}

const closeButton = document.querySelector("#close-modal-btn")
closeButton.addEventListener("click", (e) => {
  modal.classList.remove("open")
  overlay.classList.remove("open")
  newGame()
})

function newGame() {
  score = 0
  questionId = 0
  loadQuestion()
}
