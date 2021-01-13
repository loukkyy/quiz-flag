export default function setupModal() {
  const modal = document.querySelector("#modal")
  const overlay = document.querySelector("#overlay")

  overlay.addEventListener("click", (e) => {
    modal.classList.remove("open")
    overlay.classList.remove("open")
  })
}
