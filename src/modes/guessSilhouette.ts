import { similarity } from "../helpers/verificadores";
import { getRandomAnimeCharacter } from "../services/jikanService";

export function loadGuessSilhouette(container: HTMLElement) {
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
  const totalQuestions = 20;

  const gridSize = 3; 
  let coveredBlocks: { x: number; y: number }[] = [];
  let img: HTMLImageElement;

  function shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  async function loadNewCharacter() {
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

        // 🔥 Establece tamaño fijo del canvas
        silhouetteCanvas.width = 300;
        silhouetteCanvas.height = 300;

        // 🔥 Ajusta imagen para cubrir el canvas (crop centrado)
        drawCenteredImage(img);

        coveredBlocks = [];
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            coveredBlocks.push({ x: i, y: j });
          }
        }
        coveredBlocks = shuffleArray(coveredBlocks);

        // Revela un bloque inicial
        coveredBlocks.pop();
        coverImage();

        progressDiv.textContent = `Pregunta ${currentIndex + 1} / ${totalQuestions} | Puntos: ${score}`;
        answerInput.disabled = false;
        submitBtn.disabled = false;
        answerInput.focus();
      };

      img.onerror = () => {
        loadingDiv.textContent = "❌ Error al cargar la imagen, intenta nuevamente.";
        answerInput.disabled = false;
        submitBtn.disabled = false;
        nextBtn.disabled = false;
      };

    } else {
      loadingDiv.style.display = "none";
      resultP.textContent = "❌ No se pudo cargar personaje. Intenta nuevamente.";
      answerInput.disabled = false;
      submitBtn.disabled = false;
      nextBtn.disabled = false;
    }
  }

  function drawCenteredImage(image: HTMLImageElement) {
    const canvasWidth = silhouetteCanvas.width;
    const canvasHeight = silhouetteCanvas.height;

    const imgRatio = image.width / image.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let sx = 0, sy = 0, sWidth = image.width, sHeight = image.height;

    // 🔥 Corta la imagen para que sea cuadrada (centrada)
    if (imgRatio > canvasRatio) {
      // Imagen más ancha
      sWidth = image.height * canvasRatio;
      sx = (image.width - sWidth) / 2;
    } else {
      // Imagen más alta
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
      drawCenteredImage(img); // 🔥 Redibuja la imagen centrada
      coveredBlocks.pop();
      coverImage();
    }

    if (coveredBlocks.length === 0) {
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

    if (similarity(userAnswer, correctAnswer) > 0.7) {
      resultP.textContent = "✅ ¡Correcto!";
      score++;
      currentIndex++;
      submitBtn.disabled = true;
      answerInput.disabled = true;
      nextBtn.disabled = true;

      setTimeout(() => {
        if (currentIndex < totalQuestions) {
          loadNewCharacter();
        } else {
          showFinalScore();
        }
      }, 800);
    } else {
      revealBlock();
      score--;
      if (coveredBlocks.length > 0) {
        resultP.innerHTML = `❌ <strong class="text-white"> Incorrecto, parte revelada. </strong>`;
      }
    }
  }

  function showFinalScore() {
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
      container.innerHTML = "";
      loadGuessSilhouette(container);
    });
  }

  submitBtn.addEventListener("click", () => checkAnswer());
  nextBtn.addEventListener("click", () => {
    if (coveredBlocks.length > 0) {
      resultP.textContent = "⚠️ Aún puedes intentar descubrirlo.";
    }
  });
  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  // Carga inicial
  loadNewCharacter();
}
