(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const O=[{name:"Naruto",hints:["Es un ninja.","Tiene el pelo rubio.","Es de Konoha.","Tiene un zorro dentro de él."],image:"naruto.png"},{name:"Goku",hints:["Viene de otro planeta.","Es muy fuerte.","Se transforma en Super Saiyajin.","Le encanta comer."],image:"naruto.png"},{name:"Luffy",hints:["Es un pirata.","Tiene un sombrero de paja.","Su poder es estirar su cuerpo.","Busca el tesoro llamado One Piece."],image:"naruto.png"},{name:"Saitama",hints:["Es un héroe calvo.","Puede derrotar a cualquiera con un solo golpe.","Le aburre la vida de héroe.","Protagonista de One Punch Man."],image:"naruto.png"},{name:"Ichigo Kurosaki",hints:["Puede ver espíritus.","Es un shinigami sustituto.","Tiene pelo naranja.","Protege a sus amigos de hollows."],image:"naruto.png"},{name:"Edward Elric",hints:["Es alquimista.","Tiene brazo y pierna mecánicos.","Busca la piedra filosofal.","Hermano menor de Alphonse."],image:"naruto.png"},{name:"Mikasa Ackerman",hints:["Es la mejor soldado.","Protege a Eren.","Tiene cabello corto negro.","Pertenece a los ataques contra titanes."],image:"naruto.png"},{name:"Light Yagami",hints:["Encuentra una libreta mortal.","Se hace llamar Kira.","Quiere crear un mundo sin crimen.","Es muy inteligente."],image:"naruto.png"},{name:"Natsu Dragneel",hints:["Es un mago de fuego.","Busca a su dragón padre.","Pertenece a Fairy Tail.","Muy fuerte y valiente."],image:"naruto.png"},{name:"Sailor Moon",hints:["Guerrera de la luna.","Lleva uniforme escolar y diadema.","Protege la tierra junto a sus amigas.","Su nombre real es Usagi Tsukino."],image:"naruto.png"}],R=[{name:"Harry Potter",hints:["Es un mago.","Usa gafas y una cicatriz en la frente.","Estudió en Hogwarts.","Tiene un amigo pelirrojo."]},{name:"Iron Man",hints:["Es un millonario genio.","Tiene una armadura tecnológica.","Pertenece a los Vengadores.","Se llama Tony Stark."]}],P={anime:O,movies:R};function I(e){e.innerHTML=`
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
  `;const s=e.querySelector("#category"),r=e.querySelector("#hint-container"),n=e.querySelector("#answer"),t=e.querySelector("#submit"),a=e.querySelector("#next"),c=e.querySelector("#result"),f=e.querySelector("#progress"),L=e.querySelector("#suggestions");let m=P.anime,u=[],l=0,p=0;const b=100;let i=0;function h(d){return d.sort(()=>Math.random()-.5).slice(0,b)}function v(){if(l<u.length){const y=u[l].hints.slice(0,i+1).join(", ");r.textContent=y,f.textContent=`Pregunta ${l+1} / ${b} | Puntos: ${p}`,c.textContent="",n.value="",n.focus()}else e.innerHTML=`
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${p}</strong> de ${b} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `,e.querySelector("#playAgain").addEventListener("click",()=>{l=0,p=0,i=0,u=h(m),e.innerHTML="",I(e)})}function x(){const d=n.value.trim().toLowerCase(),y=u[l].name.toLowerCase();if(d===y)c.textContent="✅ ¡Correcto! 🎉",p++,l++,i=0,setTimeout(v,800);else{const w=u[l].hints.length;i<w-1&&i++,v(),c.textContent="❌ Incorrecto, intenta de nuevo."}}function T(){l++,i=0,v()}function C(d){L.innerHTML="",P[d].forEach(y=>{const w=document.createElement("option");w.value=y.name,L.appendChild(w)})}s.addEventListener("change",()=>{const d=s.value;m=P[d],u=h(m),l=0,p=0,i=0,v(),C(d)}),t.addEventListener("click",()=>{x()}),a.addEventListener("click",()=>{T()}),n.addEventListener("keypress",d=>{d.key==="Enter"&&x()}),C(s.value),u=h(m),v()}function N(e,s){const r=e.length>s.length?e:s,n=e.length>s.length?s:e,t=r.length;if(t===0)return 1;const a=D(r,n);return(t-a)/t}function D(e,s){const r=Array.from({length:e.length+1},(n,t)=>Array(s.length+1).fill(0));for(let n=0;n<=e.length;n++)r[n][0]=n;for(let n=0;n<=s.length;n++)r[0][n]=n;for(let n=1;n<=e.length;n++)for(let t=1;t<=s.length;t++){const a=e[n-1]===s[t-1]?0:1;r[n][t]=Math.min(r[n-1][t]+1,r[n][t-1]+1,r[n-1][t-1]+a)}return r[e.length][s.length]}const H="https://api.jikan.moe/v4";async function Q(){try{const s=await(await fetch(`${H}/anime?order_by=popularity&limit=25`)).json(),r=s.data[Math.floor(Math.random()*s.data.length)],t=await(await fetch(`${H}/anime/${r.mal_id}/characters`)).json(),a=t.data[Math.floor(Math.random()*t.data.length)];return{name:a.character.name,image:a.character.images.webp.image_url}}catch(e){return console.error("Error obteniendo personaje de Jikan:",e),null}}function j(e){e.innerHTML=`
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
  `;const s=e.querySelector("#silhouetteCanvas"),r=s.getContext("2d"),n=e.querySelector("#loading"),t=e.querySelector("#answer"),a=e.querySelector("#submit"),c=e.querySelector("#next"),f=e.querySelector("#result"),L=e.querySelector("#progress");let m=null,u=0,l=0;const p=20,b=3;let i=[],h;function v(o){return o.sort(()=>Math.random()-.5)}async function x(){n.style.display="block",f.textContent="",t.value="",t.disabled=!0,a.disabled=!0,c.disabled=!0,m=await Q(),m?(h=new Image,h.crossOrigin="anonymous",h.src=m.image,h.onload=()=>{n.style.display="none",s.width=300,s.height=300,T(h),i=[];for(let o=0;o<b;o++)for(let g=0;g<b;g++)i.push({x:o,y:g});i=v(i),i.pop(),C(),L.textContent=`Pregunta ${u+1} / ${p} | Puntos: ${l}`,t.disabled=!1,a.disabled=!1,t.focus()},h.onerror=()=>{n.textContent="❌ Error al cargar la imagen, intenta nuevamente.",t.disabled=!1,a.disabled=!1,c.disabled=!1}):(n.style.display="none",f.textContent="❌ No se pudo cargar personaje. Intenta nuevamente.",t.disabled=!1,a.disabled=!1,c.disabled=!1)}function T(o){const g=s.width,S=s.height,$=o.width/o.height,M=g/S;let q=0,B=0,A=o.width,k=o.height;$>M?(A=o.height*M,q=(o.width-A)/2):(k=o.width/M,B=(o.height-k)/2),r.clearRect(0,0,g,S),r.drawImage(o,q,B,A,k,0,0,g,S)}function C(){const o=s.width/b,g=s.height/b;i.forEach(S=>{r.fillStyle="black",r.fillRect(S.x*o,S.y*g,o,g)})}function d(){i.length>0&&(T(h),i.pop(),C()),i.length===0&&(f.innerHTML=`📢 <strong class="text-white"> Era: ${m?.name}</strong>`,a.disabled=!0,t.disabled=!0,c.disabled=!0,setTimeout(()=>{u++,u<p?x():w()},2e3))}function y(){const o=t.value.trim().toLowerCase(),g=m?.name.toLowerCase()??"";N(o,g)>.7?(f.textContent="✅ ¡Correcto!",l++,u++,a.disabled=!0,t.disabled=!0,c.disabled=!0,setTimeout(()=>{u<p?x():w()},800)):(d(),l--,i.length>0&&(f.innerHTML='❌ <strong class="text-white"> Incorrecto, parte revelada. </strong>'))}function w(){e.innerHTML=`
      <div class="card p-4 bg-success text-center">
        <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
        <p class="fs-4">Obtuviste <strong>${l}</strong> de ${p} puntos.</p>
        <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
      </div>
    `,e.querySelector("#playAgain").addEventListener("click",()=>{u=0,l=0,e.innerHTML="",j(e)})}a.addEventListener("click",()=>y()),c.addEventListener("click",()=>{i.length>0&&(f.textContent="⚠️ Aún puedes intentar descubrirlo.")}),t.addEventListener("keypress",o=>{o.key==="Enter"&&y()}),x()}function G(e){e.innerHTML=`
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `,console.log("Modo Trivia cargado.")}const J=document.getElementById("startGame"),_=document.getElementById("gameType"),K=document.getElementById("modeSelector"),E=document.getElementById("gameContainer");J.addEventListener("click",()=>{const e=_.value;K.style.display="none",E.style.display="block",z(e)});function z(e){switch(E.innerHTML="",e){case"guessCharacter":I(E);break;case"guessSilhouette":j(E);break;case"multipleChoice":G(E);break;default:E.innerHTML="<p class='text-danger'>⚠️ Modo no disponible.</p>"}}
