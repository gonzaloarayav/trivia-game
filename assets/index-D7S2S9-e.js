(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const U=[{name:"Naruto",hints:["Es un ninja.","Tiene el pelo rubio.","Es de Konoha.","Tiene un zorro dentro de él."],image:"naruto.png"},{name:"Goku",hints:["Viene de otro planeta.","Es muy fuerte.","Se transforma en Super Saiyajin.","Le encanta comer."],image:"naruto.png"},{name:"Luffy",hints:["Es un pirata.","Tiene un sombrero de paja.","Su poder es estirar su cuerpo.","Busca el tesoro llamado One Piece."],image:"naruto.png"},{name:"Saitama",hints:["Es un héroe calvo.","Puede derrotar a cualquiera con un solo golpe.","Le aburre la vida de héroe.","Protagonista de One Punch Man."],image:"naruto.png"},{name:"Ichigo Kurosaki",hints:["Puede ver espíritus.","Es un shinigami sustituto.","Tiene pelo naranja.","Protege a sus amigos de hollows."],image:"naruto.png"},{name:"Edward Elric",hints:["Es alquimista.","Tiene brazo y pierna mecánicos.","Busca la piedra filosofal.","Hermano menor de Alphonse."],image:"naruto.png"},{name:"Mikasa Ackerman",hints:["Es la mejor soldado.","Protege a Eren.","Tiene cabello corto negro.","Pertenece a los ataques contra titanes."],image:"naruto.png"},{name:"Light Yagami",hints:["Encuentra una libreta mortal.","Se hace llamar Kira.","Quiere crear un mundo sin crimen.","Es muy inteligente."],image:"naruto.png"},{name:"Natsu Dragneel",hints:["Es un mago de fuego.","Busca a su dragón padre.","Pertenece a Fairy Tail.","Muy fuerte y valiente."],image:"naruto.png"},{name:"Sailor Moon",hints:["Guerrera de la luna.","Lleva uniforme escolar y diadema.","Protege la tierra junto a sus amigas.","Su nombre real es Usagi Tsukino."],image:"naruto.png"}],V=[{name:"Harry Potter",hints:["Es un mago.","Usa gafas y una cicatriz en la frente.","Estudió en Hogwarts.","Tiene un amigo pelirrojo."]},{name:"Iron Man",hints:["Es un millonario genio.","Tiene una armadura tecnológica.","Pertenece a los Vengadores.","Se llama Tony Stark."]}],H={anime:U,movies:V};function J(e,a){const r=e.length>a.length?e:a,n=e.length>a.length?a:e,t=r.length;if(t===0)return 1;const s=W(r,n);return(t-s)/t}function W(e,a){const r=Array.from({length:e.length+1},(n,t)=>Array(a.length+1).fill(0));for(let n=0;n<=e.length;n++)r[n][0]=n;for(let n=0;n<=a.length;n++)r[0][n]=n;for(let n=1;n<=e.length;n++)for(let t=1;t<=a.length;t++){const s=e[n-1]===a[t-1]?0:1;r[n][t]=Math.min(r[n-1][t]+1,r[n][t-1]+1,r[n-1][t-1]+s)}return r[e.length][a.length]}function _(e){e.innerHTML=`
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
  `;const a=e.querySelector("#category"),r=e.querySelector("#hint-container"),n=e.querySelector("#answer"),t=e.querySelector("#submit"),s=e.querySelector("#next"),i=e.querySelector("#result"),v=e.querySelector("#progress"),g=e.querySelector("#suggestions");let h=H.anime,b=[],c=0,w=0;const y=100;let d=0;function x(l){return l.sort(()=>Math.random()-.5).slice(0,y)}function p(){if(c<b.length){const u=b[c].hints.slice(0,d+1).join(", ");r.textContent=u,v.textContent=`Pregunta ${c+1} / ${y} | Puntos: ${w}`,i.textContent="",n.value="",n.focus()}else e.innerHTML=`
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${w}</strong> de ${y} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `,e.querySelector("#playAgain").addEventListener("click",()=>{c=0,w=0,d=0,b=x(h),e.innerHTML="",_(e)})}function S(){const l=n.value.trim().toLowerCase(),u=b[c].name.toLowerCase();if(J(l,u)>.6)i.innerHTML='✅ <strong class="text-white"> ¡Correcto! </strong> 🎉',w++,c++,d=0,setTimeout(p,800);else{const f=b[c].hints.length;d<f-1&&d++,p(),i.innerHTML='❌ <strong class="text-white"> Incorrecto, intenta de nuevo. </strong>'}}function L(){c++,d=0,p()}function C(l){g.innerHTML="",H[l].forEach(u=>{const f=document.createElement("option");f.value=u.name,g.appendChild(f)})}a.addEventListener("change",()=>{const l=a.value;h=H[l],b=x(h),c=0,w=0,d=0,p(),C(l)}),t.addEventListener("click",()=>{S()}),s.addEventListener("click",()=>{L()}),n.addEventListener("keypress",l=>{l.key==="Enter"&&S()}),C(a.value),b=x(h),p()}const G="https://api.jikan.moe/v4";async function Y(){try{const a=await(await fetch(`${G}/anime?order_by=popularity&limit=25`)).json(),r=a.data[Math.floor(Math.random()*a.data.length)],t=await(await fetch(`${G}/anime/${r.mal_id}/characters`)).json(),s=t.data[Math.floor(Math.random()*t.data.length)];let i=s.character.name;if(i.includes(",")){const[v,g]=i.split(",").map(h=>h.trim());i=`${g} ${v}`}return console.log("Personaje obtenido:",i),{name:i,image:s.character.images.webp.image_url}}catch(e){return console.error("Error obteniendo personaje de Jikan:",e),null}}function z(e){e.innerHTML=`
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
  `,e.querySelector("#startGame").addEventListener("click",()=>{const r=e.querySelector("#difficulty").value,n=parseInt(e.querySelector("#questionCount").value),t=e.querySelector("#enableTimer").checked,s=parseInt(e.querySelector("#livesCount").value);e.innerHTML="",X(e,r,n,t,s)})}function X(e,a,r,n,t){e.innerHTML=`
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
  `;const s=e.querySelector("#silhouetteCanvas"),i=s.getContext("2d"),v=e.querySelector("#loading"),g=e.querySelector("#answer"),h=e.querySelector("#submit"),b=e.querySelector("#next"),c=e.querySelector("#result"),w=e.querySelector("#progress");let y=null,d=0,x=0,p=t,S=15,L,C=!1;const l=a==="easy"?2:a==="hard"?5:3;let u=[],f;function F(o){return o.sort(()=>Math.random()-.5)}function K(){n&&(clearInterval(L),S=15,L=setInterval(()=>{S--,I(),S<=0&&(clearInterval(L),$(),c.innerHTML="⌛ Tiempo agotado: se reveló un bloque.",p--,O())},1e3))}function I(){w.textContent=`Pregunta ${d+1} / ${r} | ❤️ ${p} | Puntos: ${x} ${n?"| ⏳ "+S+"s":""}`}async function M(){C=!1,v.style.display="block",c.textContent="",g.value="",g.disabled=!0,h.disabled=!0,b.disabled=!0,y=await Y(),y?(f=new Image,f.crossOrigin="anonymous",f.src=y.image,f.onload=()=>{v.style.display="none",s.width=300,s.height=300,B(f),u=[];for(let o=0;o<l;o++)for(let m=0;m<l;m++)u.push({x:o,y:m});u=F(u),u.pop(),j(),I(),K(),g.disabled=!1,h.disabled=!1,g.focus()}):(v.style.display="none",c.textContent="❌ No se pudo cargar personaje.")}function B(o){const m=s.width,T=s.height,Q=o.width/o.height,q=m/T;let R=0,D=0,A=o.width,P=o.height;Q>q?(A=o.height*q,R=(o.width-A)/2):(P=o.width/q,D=(o.height-P)/2),i.clearRect(0,0,m,T),i.drawImage(o,R,D,A,P,0,0,m,T)}function j(){const o=s.width/l,m=s.height/l;u.forEach(T=>{i.fillStyle="black",i.fillRect(T.x*o,T.y*m,o,m)})}function $(){u.length>0&&(B(f),u.pop(),j()),u.length===0&&!C&&(C=!0,c.innerHTML=`📢 <strong class="text-white"> Era: ${y?.name}</strong>`,h.disabled=!0,g.disabled=!0,b.disabled=!0,setTimeout(()=>{d++,d<r?M():k()},2e3))}function N(){const o=g.value.trim().toLowerCase(),m=y?.name.toLowerCase()??"";J(o,m)>.4?(c.innerHTML='✅ <strong class="text-white"> ¡Correcto! </strong>',x++,d++,d<r?setTimeout(()=>{M()},1e3):k()):(console.log(d),$(),p--,O(),p>0&&(c.innerHTML='❌ <strong class="text-white"> Incorrecto, parte revelada. </strong>'))}function O(){p<=0&&(clearInterval(L),k())}function k(){e.innerHTML=`
      <div class="card p-4 bg-success text-center">
        <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
        <p class="fs-4">Puntaje final: <strong>${x}</strong></p>
        <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
      </div>
    `,e.querySelector("#playAgain").addEventListener("click",()=>z(e))}h.addEventListener("click",()=>N()),g.addEventListener("keypress",o=>{o.key==="Enter"&&N()}),M()}function Z(e){e.innerHTML=`
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `,console.log("Modo Trivia cargado.")}const ee=document.getElementById("startGame"),te=document.getElementById("gameType"),ne=document.getElementById("modeSelector"),E=document.getElementById("gameContainer");ee.addEventListener("click",()=>{const e=te.value;ne.style.display="none",E.style.display="block",se(e)});function se(e){switch(E.innerHTML="",e){case"guessCharacter":_(E);break;case"guessSilhouette":z(E);break;case"multipleChoice":Z(E);break;default:E.innerHTML="<p class='text-danger'>⚠️ Modo no disponible.</p>"}}
