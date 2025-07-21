import { loadGuessCharacter } from "./modes/guessCharacter.js";
import { loadGuessSilhouette } from "./modes/guessSilhouette.js";
import { loadMultipleChoice } from "./modes/multipleChoice.js";

// Elementos del DOM
const startButton = document.getElementById("startGame") as HTMLButtonElement;
const gameTypeSelect = document.getElementById("gameType") as HTMLSelectElement;
const modeSelector = document.getElementById("modeSelector") as HTMLDivElement;
const gameContainer = document.getElementById("gameContainer") as HTMLDivElement;

// Al hacer clic en "Comenzar Juego"
startButton.addEventListener("click", () => {
  const selectedMode = gameTypeSelect.value;

  // Oculta el selector y muestra el juego
  modeSelector.style.display = "none";
  gameContainer.style.display = "block";

  // Carga el modo elegido
  loadMode(selectedMode);
});

function loadMode(mode: string) {
  gameContainer.innerHTML = ""; // Limpia el contenedor

  switch (mode) {
    case "guessCharacter":
      loadGuessCharacter(gameContainer);
      break;
    case "guessSilhouette":
      loadGuessSilhouette(gameContainer);
      break;
    case "multipleChoice":
      loadMultipleChoice(gameContainer);
      break;
    default:
      gameContainer.innerHTML = "<p class='text-danger'>⚠️ Modo no disponible.</p>";
  }
}
