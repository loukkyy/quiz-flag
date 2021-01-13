import setupModal from "./modal.js"
import countries from "./countries.json"
const container = document.querySelector(".container")

setupModal()

const modalContent = document.querySelector("#modal-content")

function renderModal(element) {
  const flag = element.querySelector(".flag-icon").cloneNode(true)
  modal.classList.add("open")
  overlay.classList.add("open")
  modalContent.innerHTML = ""
  flag.classList.add("big-icon")
  modalContent.append(flag)
}

// total countries
const totalCountriesElement = document.querySelector("[data-total-countries]")
totalCountriesElement.innerText = `Total number of countries: ${countries.length}`

// render countries on DOM
countries.forEach((country) => {
  const parent = document.createElement("div")
  parent.classList.add("country")
  const text = document.createElement("span")
  text.innerText = country.name
  const flag = document.createElement("span")
  flag.classList.add("flag-icon")
  flag.innerText = country.flag
  parent.append(text, flag)
  container.append(parent)

  // add event listener on click
  parent.addEventListener("click", (e) => {
    let parent = e.target
    if (!e.target.classList.contains("country")) {
      parent = e.target.closest(".country")
    }
    if (parent != null) {
      renderModal(parent)
    }
  })
})
