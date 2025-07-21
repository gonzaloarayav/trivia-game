export function loadMultipleChoice(container: HTMLElement) {
  container.innerHTML = `
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `;
  console.log("Modo Trivia cargado.");
}
