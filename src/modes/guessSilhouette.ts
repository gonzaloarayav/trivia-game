import { getRandomAnimeCharacter } from "../services/jikanService";

export function loadGuessSilhouette(container: HTMLElement) {
  container.innerHTML = `
    <div class="card p-3 bg-dark">
      <h2 class="text-light">🖤 Adivina la Silueta (API)</h2>
      <div id="progress" class="text-light mb-2"></div>
      <div id="loading" class="text-light mb-2" style="font-style: italic;">Cargando imagen...</div>
      <div id="silhouette-container" class="mb-3 text-center">
        <canvas id="silhouetteCanvas" class="img-fluid rounded shadow"></canvas>
      </div>
      <input type="text" id="answer" class="form-control mb-2" placeholder="¿Quién es?">
      <button id="submit" class="btn btn-warning w-100 mb-2">Responder</button>
      <button id="next" class="btn btn-outline-light w-100 mb-2">Siguiente</button>
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
  const totalQuestions = 10;

  // Configuración del efecto mosaico
  const gridSize = 4; // 4x4 = 16 bloques
  let coveredBlocks: { x: number; y: number }[] = [];
  let img: HTMLImageElement;

  function shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  async function loadNewCharacter() {
    loadingDiv.style.display = "block";    // Mostrar loading
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
        loadingDiv.style.display = "none"; // Ocultar loading

        silhouetteCanvas.width = img.width;
        silhouetteCanvas.height = img.height;

        // Inicializar bloques cubiertos (todos)
        coveredBlocks = [];
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            coveredBlocks.push({ x: i, y: j });
          }
        }
        coveredBlocks = shuffleArray(coveredBlocks);

        // Mostrar imagen completa primero
        ctx.drawImage(img, 0, 0);

        // Revelar sólo 1 bloque (quitarlo de coveredBlocks)
        coveredBlocks.pop();

        // Cubrir el resto
        coverImage();

        progressDiv.textContent = `Pregunta ${currentIndex + 1} / ${totalQuestions} | Puntos: ${score}`;
        answerInput.disabled = false;
        submitBtn.disabled = false;
        nextBtn.disabled = false;
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
      ctx.drawImage(img, 0, 0); // Dibuja la imagen completa
      coveredBlocks.pop();      // Descubre un bloque
      coverImage();             // Cubre los bloques restantes
    }
  }

  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentCharacter?.name.toLowerCase() ?? "";

    if (userAnswer === correctAnswer) {
      resultP.textContent = "✅ ¡Correcto!";
      score++;
      currentIndex++;
      if (currentIndex < totalQuestions) {
        setTimeout(loadNewCharacter, 800);
      } else {
        showFinalScore();
      }
    } else {
      resultP.textContent = "❌ Incorrecto, parte revelada.";
      revealBlock();

      if (coveredBlocks.length === 0) {
        resultP.textContent = `📢 Era: ${currentCharacter?.name}`;
        setTimeout(() => {
          currentIndex++;
          if (currentIndex < totalQuestions) {
            loadNewCharacter();
          } else {
            showFinalScore();
          }
        }, 1500);
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
    currentIndex++;
    if (currentIndex < totalQuestions) {
      loadNewCharacter();
    } else {
      showFinalScore();
    }
  });
  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  // Carga inicial
  loadNewCharacter();
}
