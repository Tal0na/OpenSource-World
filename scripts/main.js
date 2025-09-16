// === Pesquisa ===
const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search-bar")
const searchInput = document.getElementById("search")
const cards = document.querySelectorAll(".card")

// Mostra/esconde a barra de pesquisa
searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("hidden")
  if (!searchBar.classList.contains("hidden")) {
    searchInput.focus()
  }
})

// Filtro de busca
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase()
  cards.forEach((card) => {
    const name = card.dataset.name || ""
    const text = card.innerText.toLowerCase()
    const visible = q === "" || name.includes(q) || text.includes(q)
    card.style.display = visible ? "" : "none"
  })
})

// === Carrossel com um card por vez ===
const track = document.querySelector(".carousel-track")
const slides = document.querySelectorAll(".carousel-card")
const prevBtn = document.querySelector(".carousel-btn.prev")
const nextBtn = document.querySelector(".carousel-btn.next")

let currentIndex = 0

// Atualiza posição
function updateCarousel() {
  const offset = -currentIndex * 100 // 100% por card
  track.style.transform = `translateX(${offset}%)`
}

// Botões
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length
    updateCarousel()
  })

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    updateCarousel()
  })
}

// Troca automática mais lenta (8s)
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length
  updateCarousel()
}, 5000)

const dropdowns = document.querySelectorAll(".dropdown")

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".category-btn")
  const menu = dropdown.querySelector(".dropdown-content")
  let timeout

  button.addEventListener("mouseenter", () => {
    clearTimeout(timeout) // cancela qualquer timeout pendente
    menu.style.display = "block"
  })

  button.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      menu.style.display = "none"
    }, 300) // espera 3 segundos antes de sumir
  })

  menu.addEventListener("mouseenter", () => {
    clearTimeout(timeout) // mantém aberto se o mouse entrar no menu
  })

  menu.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      menu.style.display = "none"
    }, 300) // espera 3 segundos antes de sumir
  })
})
