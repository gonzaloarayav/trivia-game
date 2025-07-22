import { categories } from "../data";
import { similarity } from "../helpers/verificadores";

export function loadGuessCharacter(container: HTMLElement) {
  container.innerHTML = `
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">🎯 Adivina el Personaje</h2>
      <select id="category" class="form-select mb-2">
        <option value="anime" selected>Anime</option>
        <option value="movies">Películas</option>
      </select>
      <datalist id="suggestions"></datalist>
      <div id="progress" class="text-light mb-2"></div>
      <div id="hint-container" class="mb-2"></div>
      <input type="text" id="answer" list="suggestions" class="form-control mb-2" placeholder="¿Quién es?">
      <button id="submit" class="btn btn-warning w-100 mb-2">Responder</button>
      <button id="next" class="btn btn-outline-light w-100 mb-2">Siguiente</button>
      <p id="result" class="mt-2"></p>
    </div>
  `;

  const categorySelect = container.querySelector("#category") as HTMLSelectElement;
  const hintContainer = container.querySelector("#hint-container")!;
  const answerInput = container.querySelector("#answer") as HTMLInputElement;
  const submitBtn = container.querySelector("#submit")!;
  const nextBtn = container.querySelector("#next")!;
  const resultP = container.querySelector("#result")!;
  const progressDiv = container.querySelector("#progress")!;
  const datalist = container.querySelector("#suggestions") as HTMLDataListElement;

  let allCharacters = categories.anime;
  let shuffledCharacters: typeof allCharacters = [];
  let currentIndex = 0;
  let score = 0;
  const totalQuestions = 100;
  let currentHintIndex = 0; // índice para la pista actual del personaje

  function shuffleArray(array: typeof allCharacters) {
    return array.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  }

  function showHint() {
     if (currentIndex < shuffledCharacters.length) {
        const character = shuffledCharacters[currentIndex];
        // Mostrar todas las pistas desde la 0 hasta currentHintIndex, separadas por coma
        const hintsToShow = character.hints.slice(0, currentHintIndex + 1).join(", ");
        hintContainer.textContent = hintsToShow;
        progressDiv.textContent = `Pregunta ${currentIndex + 1} / ${totalQuestions} | Puntos: ${score}`;
        resultP.textContent = "";
        answerInput.value = "";
        answerInput.focus();
    } else {
      container.innerHTML = `
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${score}</strong> de ${totalQuestions} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `;
      const playAgainBtn = container.querySelector("#playAgain") as HTMLButtonElement;
      playAgainBtn.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        currentHintIndex = 0;
        shuffledCharacters = shuffleArray(allCharacters);
        container.innerHTML = ""; 
        loadGuessCharacter(container);
      });
    }
  }

  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = shuffledCharacters[currentIndex].name.toLowerCase();

    if (similarity(userAnswer, correctAnswer) > 0.6) {
        resultP.innerHTML = `✅ <strong class="text-white"> ¡Correcto! </strong> 🎉`;
        score++;
        currentIndex++;
        currentHintIndex = 0;
        setTimeout(showHint, 800);
        } else {
        const hintsCount = shuffledCharacters[currentIndex].hints.length;
        if (currentHintIndex < hintsCount - 1) {
            currentHintIndex++;
        }
        // Mostrar las pistas acumuladas actualizadas
        showHint();
        resultP.innerHTML = `❌ <strong class="text-white"> Incorrecto, intenta de nuevo. </strong>`;
        }
  }

  function nextQuestion() {
    currentIndex++;
    currentHintIndex = 0;
    showHint();
  }

  function updateSuggestions(category: keyof typeof categories) {
    datalist.innerHTML = "";
    categories[category].forEach((character: any) => {
      const option = document.createElement("option");
      option.value = character.name;
      datalist.appendChild(option);
    });
  }

  categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value as keyof typeof categories;
    allCharacters = categories[selected];
    shuffledCharacters = shuffleArray(allCharacters);
    currentIndex = 0;
    score = 0;
    currentHintIndex = 0;
    showHint();
    updateSuggestions(selected);
  });

  submitBtn.addEventListener("click", () => {
    checkAnswer();
  });

  nextBtn.addEventListener("click", () => {
    nextQuestion();
  });

  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  updateSuggestions(categorySelect.value as keyof typeof categories);
  shuffledCharacters = shuffleArray(allCharacters);
  showHint();
}
