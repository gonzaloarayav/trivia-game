(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function m(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=m(t);fetch(t.href,n)}})();const P=[{name:"Naruto",hints:["Es un ninja.","Tiene el pelo rubio.","Es de Konoha.","Tiene un zorro dentro de él."],image:"naruto.png"},{name:"Goku",hints:["Viene de otro planeta.","Es muy fuerte.","Se transforma en Super Saiyajin.","Le encanta comer."],image:"naruto.png"},{name:"Luffy",hints:["Es un pirata.","Tiene un sombrero de paja.","Su poder es estirar su cuerpo.","Busca el tesoro llamado One Piece."],image:"naruto.png"},{name:"Saitama",hints:["Es un héroe calvo.","Puede derrotar a cualquiera con un solo golpe.","Le aburre la vida de héroe.","Protagonista de One Punch Man."],image:"naruto.png"},{name:"Ichigo Kurosaki",hints:["Puede ver espíritus.","Es un shinigami sustituto.","Tiene pelo naranja.","Protege a sus amigos de hollows."],image:"naruto.png"},{name:"Edward Elric",hints:["Es alquimista.","Tiene brazo y pierna mecánicos.","Busca la piedra filosofal.","Hermano menor de Alphonse."],image:"naruto.png"},{name:"Mikasa Ackerman",hints:["Es la mejor soldado.","Protege a Eren.","Tiene cabello corto negro.","Pertenece a los ataques contra titanes."],image:"naruto.png"},{name:"Light Yagami",hints:["Encuentra una libreta mortal.","Se hace llamar Kira.","Quiere crear un mundo sin crimen.","Es muy inteligente."],image:"naruto.png"},{name:"Natsu Dragneel",hints:["Es un mago de fuego.","Busca a su dragón padre.","Pertenece a Fairy Tail.","Muy fuerte y valiente."],image:"naruto.png"},{name:"Sailor Moon",hints:["Guerrera de la luna.","Lleva uniforme escolar y diadema.","Protege la tierra junto a sus amigas.","Su nombre real es Usagi Tsukino."],image:"naruto.png"}],q=[{name:"Harry Potter",hints:["Es un mago.","Usa gafas y una cicatriz en la frente.","Estudió en Hogwarts.","Tiene un amigo pelirrojo."]},{name:"Iron Man",hints:["Es un millonario genio.","Tiene una armadura tecnológica.","Pertenece a los Vengadores.","Se llama Tony Stark."]}],L={anime:P,movies:q};function k(e){e.innerHTML=`
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
  `;const o=e.querySelector("#category"),m=e.querySelector("#hint-container"),c=e.querySelector("#answer"),t=e.querySelector("#submit"),n=e.querySelector("#next"),u=e.querySelector("#result"),y=e.querySelector("#progress"),E=e.querySelector("#suggestions");let h=L.anime,r=[],l=0,g=0;const f=100;let s=0;function d(i){return i.sort(()=>Math.random()-.5).slice(0,f)}function v(){if(l<r.length){const p=r[l].hints.slice(0,s+1).join(", ");m.textContent=p,y.textContent=`Pregunta ${l+1} / ${f} | Puntos: ${g}`,u.textContent="",c.value="",c.focus()}else e.innerHTML=`
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${g}</strong> de ${f} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `,e.querySelector("#playAgain").addEventListener("click",()=>{l=0,g=0,s=0,r=d(h),e.innerHTML="",k(e)})}function w(){const i=c.value.trim().toLowerCase(),p=r[l].name.toLowerCase();if(i===p)u.textContent="✅ ¡Correcto! 🎉",g++,l++,s=0,setTimeout(v,800);else{const a=r[l].hints.length;s<a-1&&s++,v(),u.textContent="❌ Incorrecto, intenta de nuevo."}}function x(){l++,s=0,v()}function C(i){E.innerHTML="",L[i].forEach(p=>{const a=document.createElement("option");a.value=p.name,E.appendChild(a)})}o.addEventListener("change",()=>{const i=o.value;h=L[i],r=d(h),l=0,g=0,s=0,v(),C(i)}),t.addEventListener("click",()=>{w()}),n.addEventListener("click",()=>{x()}),c.addEventListener("keypress",i=>{i.key==="Enter"&&w()}),C(o.value),r=d(h),v()}const M="https://api.jikan.moe/v4";async function I(){try{const o=await(await fetch(`${M}/anime?order_by=popularity&limit=25`)).json(),m=o.data[Math.floor(Math.random()*o.data.length)],t=await(await fetch(`${M}/anime/${m.mal_id}/characters`)).json(),n=t.data[Math.floor(Math.random()*t.data.length)];return{name:n.character.name,image:n.character.images.webp.image_url}}catch(e){return console.error("Error obteniendo personaje de Jikan:",e),null}}function A(e){e.innerHTML=`
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
  `;const o=e.querySelector("#silhouetteCanvas"),m=o.getContext("2d"),c=e.querySelector("#loading"),t=e.querySelector("#answer"),n=e.querySelector("#submit"),u=e.querySelector("#next"),y=e.querySelector("#result"),E=e.querySelector("#progress");let h=null,r=0,l=0;const g=10,f=4;let s=[],d;function v(a){return a.sort(()=>Math.random()-.5)}async function w(){c.style.display="block",y.textContent="",t.value="",t.disabled=!0,n.disabled=!0,u.disabled=!0,h=await I(),h?(d=new Image,d.crossOrigin="anonymous",d.src=h.image,d.onload=()=>{c.style.display="none",o.width=d.width,o.height=d.height,s=[];for(let a=0;a<f;a++)for(let b=0;b<f;b++)s.push({x:a,y:b});s=v(s),m.drawImage(d,0,0),s.pop(),x(),E.textContent=`Pregunta ${r+1} / ${g} | Puntos: ${l}`,t.disabled=!1,n.disabled=!1,u.disabled=!1,t.focus()},d.onerror=()=>{c.textContent="❌ Error al cargar la imagen, intenta nuevamente.",t.disabled=!1,n.disabled=!1,u.disabled=!1}):(c.style.display="none",y.textContent="❌ No se pudo cargar personaje. Intenta nuevamente.",t.disabled=!1,n.disabled=!1,u.disabled=!1)}function x(){const a=o.width/f,b=o.height/f;s.forEach(T=>{m.fillStyle="black",m.fillRect(T.x*a,T.y*b,a,b)})}function C(){s.length>0&&(m.drawImage(d,0,0),s.pop(),x())}function i(){const a=t.value.trim().toLowerCase(),b=h?.name.toLowerCase()??"";a===b?(y.textContent="✅ ¡Correcto!",l++,r++,r<g?setTimeout(w,800):p()):(y.textContent="❌ Incorrecto, parte revelada.",C(),s.length===0&&(y.textContent=`📢 Era: ${h?.name}`,setTimeout(()=>{r++,r<g?w():p()},1500)))}function p(){e.innerHTML=`
      <div class="card p-4 bg-success text-center">
        <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
        <p class="fs-4">Obtuviste <strong>${l}</strong> de ${g} puntos.</p>
        <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
      </div>
    `,e.querySelector("#playAgain").addEventListener("click",()=>{r=0,l=0,e.innerHTML="",A(e)})}n.addEventListener("click",()=>i()),u.addEventListener("click",()=>{r++,r<g?w():p()}),t.addEventListener("keypress",a=>{a.key==="Enter"&&i()}),w()}function B(e){e.innerHTML=`
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `,console.log("Modo Trivia cargado.")}const H=document.getElementById("startGame"),j=document.getElementById("gameType"),$=document.getElementById("modeSelector"),S=document.getElementById("gameContainer");H.addEventListener("click",()=>{const e=j.value;$.style.display="none",S.style.display="block",O(e)});function O(e){switch(S.innerHTML="",e){case"guessCharacter":k(S);break;case"guessSilhouette":A(S);break;case"multipleChoice":B(S);break;default:S.innerHTML="<p class='text-danger'>⚠️ Modo no disponible.</p>"}}
