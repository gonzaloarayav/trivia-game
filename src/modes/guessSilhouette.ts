import { similarity } from "../helpers/verificadores";
import { getRandomAnimeCharacter } from "../services/jikanService";

type GameState = {
  difficulty: string,
  totalQuestions: number,
  enableTimer: boolean,
  totalLives: number,
  currentIndex: number,
  score: number,
  lives: number,
  coveredBlocks: { x: number; y: number }[],
  currentCharacter: { name: string; image: string } | null,
  lastSaved: number,
};

export function loadGuessSilhouette(container: HTMLElement) {
  // 🔥 Pantalla de configuración inicial
  container.innerHTML = `
    <div class="card p-4 bg-dark text-light">
      <h2 class="mb-3">🎮 Configuración del Juego</h2>
      
      <label for="difficulty" class="form-label">Dificultad:</label>
      <select id="difficulty" class="form-select mb-3">
        <option value="easy">Fácil (2x2 bloques)</option>
        <option value="normal" selected>Normal (3x3 bloques)</option>
        <option value="hard">Difícil (5x5 bloques)</option>
      </select>
      
      <label for="questionCount" class="form-label">Número de Preguntas:</label>
      <input type="number" id="questionCount" class="form-control mb-3" value="10" min="1" max="50">
      
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="enableTimer">
        <label class="form-check-label" for="enableTimer">
          ⏳ Habilitar Cronómetro (15s por pregunta)
        </label>
      </div>

      <label for="livesCount" class="form-label">Cantidad de Vidas:</label>
      <input type="number" id="livesCount" class="form-control mb-3" value="3" min="1" max="10">
      
      <button id="startGame" class="btn btn-warning w-100 mt-3">🚀 Empezar</button>
    </div>
  `;

  const startBtn = container.querySelector("#startGame") as HTMLButtonElement;

  startBtn.addEventListener("click", () => {
    const difficulty = (container.querySelector("#difficulty") as HTMLSelectElement).value;
    const totalQuestions = parseInt((container.querySelector("#questionCount") as HTMLInputElement).value);
    const enableTimer = (container.querySelector("#enableTimer") as HTMLInputElement).checked;
    const totalLives = parseInt((container.querySelector("#livesCount") as HTMLInputElement).value);

    container.innerHTML = ""; // limpia la pantalla
    startGame(container, difficulty, totalQuestions, enableTimer, totalLives);
  });
}

function startGame(
  container: HTMLElement,
  difficulty: string,
  totalQuestions: number,
  enableTimer: boolean,
  totalLives: number
) {
  container.innerHTML = `
    <div class="card p-3 bg-dark">
      <h2 class="text-light">Adivina la Silueta</h2>
      <div id="progress" class="text-light mb-2"></div>
      <div id="loading" class="text-light mb-2" style="font-style: italic;">Cargando imagen...</div>
      <div id="silhouette-container" class="mb-3 text-center">
        <canvas id="silhouetteCanvas" class="img-fluid rounded shadow" width="300" height="300"></canvas>
      </div>
      <input type="text" id="answer" class="form-control mb-2" placeholder="¿Quién es?">
      <button id="submit" class="btn btn-warning w-100 mb-2">Responder</button>
      <button id="next" class="btn btn-outline-light w-100 mb-2" disabled>Siguiente</button>
      <p id="result" class="mt-2"></p>
    </div>
  `;

  const silhouetteCanvas = container.querySelector("#silhouetteCanvas") as HTMLCanvasElement;
  const ctx = silhouetteCanvas.getContext("2d")!;
  const loadingDiv = container.querySelector("#loading") as HTMLDivElement;
  const answerInput = container.querySelector("#answer") as HTMLInputElement;
  const submitBtn = container.querySelector("#submit") as HTMLButtonElement;
  const nextBtn = container.querySelector("#next") as HTMLButtonElement;
  const resultP = container.querySelector("#result") as HTMLParagraphElement;
  const progressDiv = container.querySelector("#progress") as HTMLDivElement;

  let currentCharacter: { name: string; image: string } | null = null;
  let currentIndex = 0;
  let score = 0;
  let lives = totalLives;
  let timer = 15;
  let timerInterval: any;
  let questionFinished = false;

  const gridSize = difficulty === "easy" ? 2 : difficulty === "hard" ? 5 : 3;
  let coveredBlocks: { x: number; y: number }[] = [];
  let img: HTMLImageElement;

  function shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startTimer() {
    if (!enableTimer) return;
    clearInterval(timerInterval);
    timer = 15;
    timerInterval = setInterval(() => {
      timer--;
      updateProgress();
      if (timer <= 0) {
        clearInterval(timerInterval);
        revealBlock();
        resultP.innerHTML = "⌛ Tiempo agotado: se reveló un bloque.";
        lives--;
        checkGameOver();
      }
    }, 1000);
  }

  function updateProgress() {
    progressDiv.textContent = `Pregunta ${currentIndex + 1} / ${totalQuestions} | ❤️ ${lives} | Puntos: ${score} ${enableTimer ? "| ⏳ " + timer + "s" : ""}`;
  }

  async function loadNewCharacter() {
    questionFinished = false; // 🔥 reiniciamos el estado de la pregunta
    loadingDiv.style.display = "block";
    resultP.textContent = "";
    answerInput.value = "";
    answerInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = true;

    currentCharacter = await getRandomAnimeCharacter();

    if (currentCharacter) {
      img = new Image();
      img.crossOrigin = "anonymous";
      img.src = currentCharacter.image;

      img.onload = () => {
        loadingDiv.style.display = "none";

        silhouetteCanvas.width = 300;
        silhouetteCanvas.height = 300;

        drawCenteredImage(img);

        coveredBlocks = [];
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            coveredBlocks.push({ x: i, y: j });
          }
        }
        coveredBlocks = shuffleArray(coveredBlocks);

        coveredBlocks.pop();
        coverImage();

        updateProgress();
        startTimer();

        answerInput.disabled = false;
        submitBtn.disabled = false;
        answerInput.focus();
      };
    } else {
      loadingDiv.style.display = "none";
      resultP.textContent = "❌ No se pudo cargar personaje.";
    }
  }

  function drawCenteredImage(image: HTMLImageElement) {
    const canvasWidth = silhouetteCanvas.width;
    const canvasHeight = silhouetteCanvas.height;
    const imgRatio = image.width / image.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let sx = 0, sy = 0, sWidth = image.width, sHeight = image.height;

    if (imgRatio > canvasRatio) {
      sWidth = image.height * canvasRatio;
      sx = (image.width - sWidth) / 2;
    } else {
      sHeight = image.width / canvasRatio;
      sy = (image.height - sHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  }

  function coverImage() {
    const blockWidth = silhouetteCanvas.width / gridSize;
    const blockHeight = silhouetteCanvas.height / gridSize;
    coveredBlocks.forEach((block) => {
      ctx.fillStyle = "black";
      ctx.fillRect(block.x * blockWidth, block.y * blockHeight, blockWidth, blockHeight);
    });
  }

  function revealBlock() {
    if (coveredBlocks.length > 0) {
      drawCenteredImage(img);
      coveredBlocks.pop();
      coverImage();
    }


    if (coveredBlocks.length === 0 && !questionFinished) {
      questionFinished = true; // 🔥 marcamos la pregunta como terminada
      resultP.innerHTML = `📢 <strong class="text-white"> Era: ${currentCharacter?.name}</strong>`;
      submitBtn.disabled = true;
      answerInput.disabled = true;
      nextBtn.disabled = true;

      setTimeout(() => {
        currentIndex++;
        if (currentIndex < totalQuestions) {
          loadNewCharacter();
        } else {
          showFinalScore();
        }
      }, 2000);
    }

  }

  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentCharacter?.name.toLowerCase() ?? "";

    if (similarity(userAnswer, correctAnswer) > 0.4) {
      resultP.innerHTML = `✅ <strong class="text-white"> ¡Correcto! </strong>`;
      score++;
      currentIndex++;

      if (currentIndex < totalQuestions) {
        // Espera 1 segundo para que se vea el mensaje
        setTimeout(() => {
          loadNewCharacter();
        }, 1000);
      } else {
        showFinalScore();
      }
    } else {
      console.log(currentIndex)

      revealBlock();
      lives--;
      checkGameOver();
      if (lives > 0) {
        resultP.innerHTML = `❌ <strong class="text-white"> Incorrecto, parte revelada. </strong>`;
      }
    }
  }

  function checkGameOver() {
    if (lives <= 0) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }

  function showFinalScore() {
    container.innerHTML = `
      <div class="card p-4 bg-success text-center">
        <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
        <p class="fs-4">Puntaje final: <strong>${score}</strong></p>
        <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
      </div>
    `;
    const playAgainBtn = container.querySelector("#playAgain") as HTMLButtonElement;
    playAgainBtn.addEventListener("click", () => loadGuessSilhouette(container));
  }

  submitBtn.addEventListener("click", () => checkAnswer());
  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  loadNewCharacter();
}
