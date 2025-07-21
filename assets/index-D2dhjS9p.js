(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function f(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=f(t);fetch(t.href,n)}})();const M=[{name:"Naruto",hints:["Es un ninja.","Tiene el pelo rubio.","Es de Konoha.","Tiene un zorro dentro de él."]},{name:"Goku",hints:["Viene de otro planeta.","Es muy fuerte.","Se transforma en Super Saiyajin.","Le encanta comer."]},{name:"Luffy",hints:["Es un pirata.","Tiene un sombrero de paja.","Su poder es estirar su cuerpo.","Busca el tesoro llamado One Piece."]},{name:"Saitama",hints:["Es un héroe calvo.","Puede derrotar a cualquiera con un solo golpe.","Le aburre la vida de héroe.","Protagonista de One Punch Man."]},{name:"Ichigo Kurosaki",hints:["Puede ver espíritus.","Es un shinigami sustituto.","Tiene pelo naranja.","Protege a sus amigos de hollows."]},{name:"Edward Elric",hints:["Es alquimista.","Tiene brazo y pierna mecánicos.","Busca la piedra filosofal.","Hermano menor de Alphonse."]},{name:"Mikasa Ackerman",hints:["Es la mejor soldado.","Protege a Eren.","Tiene cabello corto negro.","Pertenece a los ataques contra titanes."]},{name:"Light Yagami",hints:["Encuentra una libreta mortal.","Se hace llamar Kira.","Quiere crear un mundo sin crimen.","Es muy inteligente."]},{name:"Natsu Dragneel",hints:["Es un mago de fuego.","Busca a su dragón padre.","Pertenece a Fairy Tail.","Muy fuerte y valiente."]},{name:"Sailor Moon",hints:["Guerrera de la luna.","Lleva uniforme escolar y diadema.","Protege la tierra junto a sus amigas.","Su nombre real es Usagi Tsukino."]}],C=[{name:"Harry Potter",hints:["Es un mago.","Usa gafas y una cicatriz en la frente.","Estudió en Hogwarts.","Tiene un amigo pelirrojo."]},{name:"Iron Man",hints:["Es un millonario genio.","Tiene una armadura tecnológica.","Pertenece a los Vengadores.","Se llama Tony Stark."]}],v={anime:M,movies:C};function T(e){e.innerHTML=`
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
  `;const a=e.querySelector("#category"),f=e.querySelector("#hint-container"),r=e.querySelector("#answer"),t=e.querySelector("#submit"),n=e.querySelector("#next"),i=e.querySelector("#result"),w=e.querySelector("#progress"),S=e.querySelector("#suggestions");let p=v.anime,l=[],o=0,d=0;const b=100;let c=0;function y(s){return s.sort(()=>Math.random()-.5).slice(0,b)}function m(){if(o<l.length){const g=l[o].hints.slice(0,c+1).join(", ");f.textContent=g,w.textContent=`Pregunta ${o+1} / ${b} | Puntos: ${d}`,i.textContent="",r.value="",r.focus()}else e.innerHTML=`
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${d}</strong> de ${b} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `,e.querySelector("#playAgain").addEventListener("click",()=>{o=0,d=0,c=0,l=y(p),e.innerHTML="",T(e)})}function E(){const s=r.value.trim().toLowerCase(),g=l[o].name.toLowerCase();if(s===g)i.textContent="✅ ¡Correcto! 🎉",d++,o++,c=0,setTimeout(m,800);else{const h=l[o].hints.length;c<h-1&&c++,m(),i.textContent="❌ Incorrecto, intenta de nuevo."}}function x(){o++,c=0,m()}function L(s){S.innerHTML="",v[s].forEach(g=>{const h=document.createElement("option");h.value=g.name,S.appendChild(h)})}a.addEventListener("change",()=>{const s=a.value;p=v[s],l=y(p),o=0,d=0,c=0,m(),L(s)}),t.addEventListener("click",()=>{E()}),n.addEventListener("click",()=>{x()}),r.addEventListener("keypress",s=>{s.key==="Enter"&&E()}),L(a.value),l=y(p),m()}function P(e){e.innerHTML=`
    <div class="card p-3 bg-secondary text-center">
      <h2 class="text-light">🖤 Adivina la Silueta</h2>
      <img src="/assets/silhouette-example.png" class="img-fluid mb-2" alt="Silueta">
      <input type="text" id="answer" class="form-control mb-2" placeholder="¿Quién es?">
      <button class="btn btn-warning w-100">Responder</button>
    </div>
  `,console.log("Modo Adivina la Silueta cargado.")}function A(e){e.innerHTML=`
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `,console.log("Modo Trivia cargado.")}const k=document.getElementById("startGame"),q=document.getElementById("gameType"),B=document.getElementById("modeSelector"),u=document.getElementById("gameContainer");k.addEventListener("click",()=>{const e=q.value;B.style.display="none",u.style.display="block",H(e)});function H(e){switch(u.innerHTML="",e){case"guessCharacter":T(u);break;case"guessSilhouette":P(u);break;case"multipleChoice":A(u);break;default:u.innerHTML="<p class='text-danger'>⚠️ Modo no disponible.</p>"}}
