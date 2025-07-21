(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const P=[{name:"Naruto",hints:["Es un ninja.","Tiene el pelo rubio.","Es de Konoha.","Tiene un zorro dentro de él."],image:"naruto.png"},{name:"Goku",hints:["Viene de otro planeta.","Es muy fuerte.","Se transforma en Super Saiyajin.","Le encanta comer."],image:"naruto.png"},{name:"Luffy",hints:["Es un pirata.","Tiene un sombrero de paja.","Su poder es estirar su cuerpo.","Busca el tesoro llamado One Piece."],image:"naruto.png"},{name:"Saitama",hints:["Es un héroe calvo.","Puede derrotar a cualquiera con un solo golpe.","Le aburre la vida de héroe.","Protagonista de One Punch Man."],image:"naruto.png"},{name:"Ichigo Kurosaki",hints:["Puede ver espíritus.","Es un shinigami sustituto.","Tiene pelo naranja.","Protege a sus amigos de hollows."],image:"naruto.png"},{name:"Edward Elric",hints:["Es alquimista.","Tiene brazo y pierna mecánicos.","Busca la piedra filosofal.","Hermano menor de Alphonse."],image:"naruto.png"},{name:"Mikasa Ackerman",hints:["Es la mejor soldado.","Protege a Eren.","Tiene cabello corto negro.","Pertenece a los ataques contra titanes."],image:"naruto.png"},{name:"Light Yagami",hints:["Encuentra una libreta mortal.","Se hace llamar Kira.","Quiere crear un mundo sin crimen.","Es muy inteligente."],image:"naruto.png"},{name:"Natsu Dragneel",hints:["Es un mago de fuego.","Busca a su dragón padre.","Pertenece a Fairy Tail.","Muy fuerte y valiente."],image:"naruto.png"},{name:"Sailor Moon",hints:["Guerrera de la luna.","Lleva uniforme escolar y diadema.","Protege la tierra junto a sus amigas.","Su nombre real es Usagi Tsukino."],image:"naruto.png"}],q=[{name:"Harry Potter",hints:["Es un mago.","Usa gafas y una cicatriz en la frente.","Estudió en Hogwarts.","Tiene un amigo pelirrojo."]},{name:"Iron Man",hints:["Es un millonario genio.","Tiene una armadura tecnológica.","Pertenece a los Vengadores.","Se llama Tony Stark."]}],L={anime:P,movies:q};function A(e){e.innerHTML=`
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
  `;const s=e.querySelector("#category"),o=e.querySelector("#hint-container"),n=e.querySelector("#answer"),t=e.querySelector("#submit"),a=e.querySelector("#next"),u=e.querySelector("#result"),p=e.querySelector("#progress"),x=e.querySelector("#suggestions");let m=L.anime,d=[],l=0,h=0;const f=100;let r=0;function g(c){return c.sort(()=>Math.random()-.5).slice(0,f)}function v(){if(l<d.length){const b=d[l].hints.slice(0,r+1).join(", ");o.textContent=b,p.textContent=`Pregunta ${l+1} / ${f} | Puntos: ${h}`,u.textContent="",n.value="",n.focus()}else e.innerHTML=`
        <div class="card p-4 bg-success text-center">
          <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
          <p class="fs-4">Obtuviste <strong>${h}</strong> de ${f} puntos.</p>
          <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
        </div>
      `,e.querySelector("#playAgain").addEventListener("click",()=>{l=0,h=0,r=0,d=g(m),e.innerHTML="",A(e)})}function w(){const c=n.value.trim().toLowerCase(),b=d[l].name.toLowerCase();if(c===b)u.textContent="✅ ¡Correcto! 🎉",h++,l++,r=0,setTimeout(v,800);else{const i=d[l].hints.length;r<i-1&&r++,v(),u.textContent="❌ Incorrecto, intenta de nuevo."}}function E(){l++,r=0,v()}function C(c){x.innerHTML="",L[c].forEach(b=>{const i=document.createElement("option");i.value=b.name,x.appendChild(i)})}s.addEventListener("change",()=>{const c=s.value;m=L[c],d=g(m),l=0,h=0,r=0,v(),C(c)}),t.addEventListener("click",()=>{w()}),a.addEventListener("click",()=>{E()}),n.addEventListener("keypress",c=>{c.key==="Enter"&&w()}),C(s.value),d=g(m),v()}function B(e,s){const o=e.length>s.length?e:s,n=e.length>s.length?s:e,t=o.length;if(t===0)return 1;const a=I(o,n);return(t-a)/t}function I(e,s){const o=Array.from({length:e.length+1},(n,t)=>Array(s.length+1).fill(0));for(let n=0;n<=e.length;n++)o[n][0]=n;for(let n=0;n<=s.length;n++)o[0][n]=n;for(let n=1;n<=e.length;n++)for(let t=1;t<=s.length;t++){const a=e[n-1]===s[t-1]?0:1;o[n][t]=Math.min(o[n-1][t]+1,o[n][t-1]+1,o[n-1][t-1]+a)}return o[e.length][s.length]}const M="https://api.jikan.moe/v4";async function H(){try{const s=await(await fetch(`${M}/anime?order_by=popularity&limit=25`)).json(),o=s.data[Math.floor(Math.random()*s.data.length)],t=await(await fetch(`${M}/anime/${o.mal_id}/characters`)).json(),a=t.data[Math.floor(Math.random()*t.data.length)];return{name:a.character.name,image:a.character.images.webp.image_url}}catch(e){return console.error("Error obteniendo personaje de Jikan:",e),null}}function k(e){e.innerHTML=`
    <div class="card p-3 bg-dark">
      <h2 class="text-light">Adivina la Silueta </h2>
      <div id="progress" class="text-light mb-2"></div>
      <div id="loading" class="text-light mb-2" style="font-style: italic;">Cargando imagen...</div>
      <div id="silhouette-container" class="mb-3 text-center">
        <canvas id="silhouetteCanvas" class="img-fluid rounded shadow"></canvas>
      </div>
      <input type="text" id="answer" class="form-control mb-2" placeholder="¿Quién es?">
      <button id="submit" class="btn btn-warning w-100 mb-2">Responder</button>
      <button id="next" class="btn btn-outline-light w-100 mb-2" disabled>Siguiente</button>
      <p id="result" class="mt-2"></p>
    </div>
  `;const s=e.querySelector("#silhouetteCanvas"),o=s.getContext("2d"),n=e.querySelector("#loading"),t=e.querySelector("#answer"),a=e.querySelector("#submit"),u=e.querySelector("#next"),p=e.querySelector("#result"),x=e.querySelector("#progress");let m=null,d=0,l=0;const h=20,f=3;let r=[],g;function v(i){return i.sort(()=>Math.random()-.5)}async function w(){n.style.display="block",p.textContent="",t.value="",t.disabled=!0,a.disabled=!0,u.disabled=!0,m=await H(),m?(g=new Image,g.crossOrigin="anonymous",g.src=m.image,g.onload=()=>{n.style.display="none",s.width=g.width,s.height=g.height,r=[];for(let i=0;i<f;i++)for(let y=0;y<f;y++)r.push({x:i,y});r=v(r),o.drawImage(g,0,0),r.pop(),E(),x.textContent=`Pregunta ${d+1} / ${h} | Puntos: ${l}`,t.disabled=!1,a.disabled=!1,t.focus()},g.onerror=()=>{n.textContent="❌ Error al cargar la imagen, intenta nuevamente.",t.disabled=!1,a.disabled=!1,u.disabled=!1}):(n.style.display="none",p.textContent="❌ No se pudo cargar personaje. Intenta nuevamente.",t.disabled=!1,a.disabled=!1,u.disabled=!1)}function E(){const i=s.width/f,y=s.height/f;r.forEach(T=>{o.fillStyle="black",o.fillRect(T.x*i,T.y*y,i,y)})}function C(){r.length>0&&(o.drawImage(g,0,0),r.pop(),E()),r.length===0&&(p.innerHTML=`📢 <strong class="text-white"> Era: ${m?.name}</strong>`,a.disabled=!0,t.disabled=!0,u.disabled=!0,setTimeout(()=>{d++,d<h?w():b()},2e3))}function c(){const i=t.value.trim().toLowerCase(),y=m?.name.toLowerCase()??"";B(i,y)>.7?(p.textContent="✅ ¡Correcto!",l++,d++,a.disabled=!0,t.disabled=!0,u.disabled=!0,setTimeout(()=>{d<h?w():b()},800)):(C(),l--,r.length>0&&(p.innerHTML='❌ <strong class="text-white"> Incorrecto, parte revelada. </strong>'))}function b(){e.innerHTML=`
      <div class="card p-4 bg-success text-center">
        <h2 class="text-light">🎉 ¡Juego Terminado!</h2>
        <p class="fs-4">Obtuviste <strong>${l}</strong> de ${h} puntos.</p>
        <button id="playAgain" class="btn btn-warning mt-3">Jugar de Nuevo</button>
      </div>
    `,e.querySelector("#playAgain").addEventListener("click",()=>{d=0,l=0,e.innerHTML="",k(e)})}a.addEventListener("click",()=>c()),u.addEventListener("click",()=>{r.length>0&&(p.textContent="⚠️ Aún puedes intentar descubrirlo.")}),t.addEventListener("keypress",i=>{i.key==="Enter"&&c()}),w()}function j(e){e.innerHTML=`
    <div class="card p-3 bg-secondary">
      <h2 class="text-light">❓ Trivia de Opción Múltiple</h2>
      <p class="mb-3">¿Quién es el protagonista de Dragon Ball?</p>
      <div class="d-grid gap-2">
        <button class="btn btn-outline-light">Naruto</button>
        <button class="btn btn-outline-light">Goku</button>
        <button class="btn btn-outline-light">Luffy</button>
      </div>
    </div>
  `,console.log("Modo Trivia cargado.")}const $=document.getElementById("startGame"),O=document.getElementById("gameType"),N=document.getElementById("modeSelector"),S=document.getElementById("gameContainer");$.addEventListener("click",()=>{const e=O.value;N.style.display="none",S.style.display="block",R(e)});function R(e){switch(S.innerHTML="",e){case"guessCharacter":A(S);break;case"guessSilhouette":k(S);break;case"multipleChoice":j(S);break;default:S.innerHTML="<p class='text-danger'>⚠️ Modo no disponible.</p>"}}
