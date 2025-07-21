export function loadGuessSilhouette(container: HTMLElement) {
  container.innerHTML = `
    <div class="card p-3 bg-secondary text-center">
      <h2 class="text-light">🖤 Adivina la Silueta</h2>
      <img src="/assets/silhouette-example.png" class="img-fluid mb-2" alt="Silueta">
      <input type="text" id="answer" class="form-control mb-2" placeholder="¿Quién es?">
      <button class="btn btn-warning w-100">Responder</button>
    </div>
  `;
  console.log("Modo Adivina la Silueta cargado.");
}
