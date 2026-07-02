const preguntas = [
  { enunciado: "¿Cuál es la función principal de la membrana plasmática?", tipo: 'multiple', opciones: ['A. Produce ATP', 'B. Controla el intercambio de sustancias', 'C. Almacena ADN', 'D. Sintetiza proteínas'], correcta: 'B. Controla el intercambio de sustancias' },
  { enunciado: "¿Qué organelo produce la mayor parte del ATP?", tipo: 'multiple', opciones: ['A. Lisosoma', 'B. Mitocondria', 'C. Ribosoma', 'D. Núcleo'], correcta: 'B. Mitocondria' },
  { enunciado: "¿Qué estructura tienen en común procariotas y eucariotas?", tipo: 'multiple', opciones: ['A. Núcleo', 'B. Mitocondrias', 'C. Ribosomas', 'D. Golgi'], correcta: 'C. Ribosomas' },
  { enunciado: "En una solución hipertónica, una célula animal...", tipo: 'multiple', opciones: ['A. Gana agua', 'B. Pierde agua', 'C. No cambia', 'D. Se divide'], correcta: 'B. Pierde agua' },
  { enunciado: "La difusión facilitada requiere...", tipo: 'multiple', opciones: ['A. ATP', 'B. Proteínas de membrana', 'C. ADN', 'D. Oxígeno'], correcta: 'B. Proteínas de membrana' },
  { enunciado: "¿Qué ocurre en la profase?", tipo: 'multiple', opciones: ['A. Se alinean los cromosomas', 'B. Se condensan los cromosomas', 'C. Se separan las cromátidas', 'D. Se forman dos núcleos'], correcta: 'B. Se condensan los cromosomas' },
  { enunciado: "La mitosis produce...", tipo: 'multiple', opciones: ['A. 4 células distintas', 'B. 2 células idénticas', 'C. Gametos', 'D. Esporas'], correcta: 'B. 2 células idénticas' },
  { enunciado: "¿Cuál de estos organelos NO tiene membrana?", tipo: 'multiple', opciones: ['A. Ribosoma', 'B. Mitocondria', 'C. Núcleo', 'D. Retículo endoplasmático'], correcta: 'A. Ribosoma' },
  { enunciado: "El aparato de Golgi principalmente...", tipo: 'multiple', opciones: ['A. Produce glucosa', 'B. Modifica y empaqueta proteínas', 'C. Replica el ADN', 'D. Produce ATP'], correcta: 'B. Modifica y empaqueta proteínas' },
  { enunciado: "Los lisosomas contienen...", tipo: 'multiple', opciones: ['A. Pigmentos', 'B. Enzimas digestivas', 'C. ADN', 'D. Hemoglobina'], correcta: 'B. Enzimas digestivas' },
  { enunciado: "¿Dónde se sintetizan las proteínas?", tipo: 'multiple', opciones: ['A. Ribosomas', 'B. Lisosomas', 'C. Aparato de Golgi', 'D. Centriolos'], correcta: 'A. Ribosomas' },
  { enunciado: "La ósmosis es...", tipo: 'multiple', opciones: ['A. Movimiento de solutos', 'B. Movimiento de agua a través de membrana semipermeable', 'C. Transporte activo', 'D. Endocitosis'], correcta: 'B. Movimiento de agua a través de membrana semipermeable' },
  { enunciado: "¿Qué fase de la mitosis sigue a la metafase?", tipo: 'multiple', opciones: ['A. Profase', 'B. Telofase', 'C. Anafase', 'D. Interfase'], correcta: 'C. Anafase' },
  { enunciado: "El citoesqueleto sirve para...", tipo: 'multiple', opciones: ['A. Almacenar genes', 'B. Dar forma a la célula y transporte interno', 'C. Realizar la respiración', 'D. Fotosíntesis'], correcta: 'B. Dar forma a la célula y transporte interno' },
  { enunciado: "La interfase del ciclo celular incluye...", tipo: 'multiple', opciones: ['A. Solo G1', 'B. G1, S y G2', 'C. Solo la fase M', 'D. La citocinesis'], correcta: 'B. G1, S y G2' },
  { enunciado: "Define brevemente qué es el transporte activo.", tipo: 'abierta' },
  { enunciado: "Explica una diferencia clave entre el ADN y el ARN.", tipo: 'abierta' },
  { enunciado: "¿Por qué las mitocondrias son abundantes en las células musculares?", tipo: 'abierta' },
  { enunciado: "Caso clínico: una toxina impide el funcionamiento de los ribosomas. ¿Qué proceso celular se vería afectado primero y por qué?", tipo: 'abierta' },
  { enunciado: "En una escala del 1 al 10, ¿cómo calificas tu confianza en los temas de biología celular vistos hoy? Justifica tu respuesta.", tipo: 'abierta' }
];

let tiempoSegundos = 0;
let intervalId = null;
let pausado = false;
let respuestas = {};
let marcadas = new Set();
let currentIndex = 0;

// ---- INIT ----
document.getElementById('fecha').innerText = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

function iniciarSimulacro() {
  document.getElementById('pantalla-inicio').style.display = 'none';
  document.getElementById('pantalla-quiz').style.display = 'block';
  tiempoSegundos = 0;
  pausado = false;
  respuestas = {};
  marcadas = new Set();
  currentIndex = 0;
  iniciarTimer();
  renderMapa();
  renderizarPregunta();
}

// ---- TIMER ----
function iniciarTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!pausado) {
      tiempoSegundos++;
      document.getElementById('cronometro').innerText = formatTime(tiempoSegundos);
    }
  }, 1000);
}

function formatTime(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

function togglePausa() {
  pausado = !pausado;
  const pausaScreen = document.getElementById('pantalla-pausa');
  const btnPausa = document.getElementById('btnPausa');
  if (pausado) {
    pausaScreen.style.display = 'flex';
    btnPausa.innerText = '▶';
    btnPausa.title = 'Reanudar';
  } else {
    pausaScreen.style.display = 'none';
    btnPausa.innerText = '⏸';
    btnPausa.title = 'Pausar';
  }
}

// ---- RENDER ----
function renderizarPregunta() {
  const p = preguntas[currentIndex];
  document.getElementById('contador-preguntas').innerText = `${currentIndex + 1} / ${preguntas.length}`;
  document.getElementById('progreso').style.width = `${((currentIndex + 1) / preguntas.length) * 100}%`;

  const badge = p.tipo === 'multiple'
    ? `<span class="question-type-badge badge-multiple">Opción múltiple</span>`
    : `<span class="question-type-badge badge-abierta">Pregunta abierta</span>`;

  let opciones = '';
  if (p.tipo === 'multiple') {
    opciones = p.opciones.map(opt => {
      const letra = opt.split('.')[0];
      const selected = respuestas[currentIndex] === opt ? 'selected' : '';
      return `<div class="opcion ${selected}" onclick="seleccionar('${opt.replace(/'/g, "\\'")}')">
        <span class="opcion-letra">${letra}</span>
        <span>${opt.substring(3)}</span>
      </div>`;
    }).join('');
  } else {
    const val = (respuestas[currentIndex] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    opciones = `<textarea class="open-answer" id="textRespuesta" placeholder="Escribe tu respuesta aquí..." oninput="guardarAbierta(this.value)">${val}</textarea>`;
  }

  // Mark button state
  const esMarcada = marcadas.has(currentIndex);
  document.getElementById('btnMarcar').classList.toggle('active', esMarcada);
  document.getElementById('btnMarcar').innerText = esMarcada ? '🔖 Marcada' : '🔖 Marcar';

  document.getElementById('contenedorPregunta').innerHTML = `
    ${badge}
    <div class="question-text">${currentIndex + 1}. ${p.enunciado}</div>
    ${opciones}
  `;

  renderMapa();
}

function renderMapa() {
  const mapa = document.getElementById('mapa-preguntas');
  mapa.innerHTML = preguntas.map((_, i) => {
    let cls = 'mapa-btn';
    if (i === currentIndex) cls += ' actual';
    else if (marcadas.has(i)) cls += ' marcada';
    else if (respuestas[i] !== undefined && respuestas[i] !== '') cls += ' respondida';
    return `<button class="${cls}" onclick="irA(${i})">${i + 1}</button>`;
  }).join('');
}

// ---- INTERACTIONS ----
function seleccionar(opt) {
  respuestas[currentIndex] = opt;
  renderizarPregunta();
}

function guardarAbierta(val) {
  respuestas[currentIndex] = val;
  renderMapa();
}

function marcar() {
  if (marcadas.has(currentIndex)) marcadas.delete(currentIndex);
  else marcadas.add(currentIndex);
  renderizarPregunta();
}

function anterior() {
  if (currentIndex > 0) { currentIndex--; renderizarPregunta(); }
}

function siguiente() {
  if (currentIndex < preguntas.length - 1) { currentIndex++; renderizarPregunta(); }
}

function irA(i) {
  currentIndex = i;
  renderizarPregunta();
}

// ---- FINISH ----
function confirmarFinalizar() {
  const sinResponder = preguntas.filter((_, i) => !respuestas[i] || respuestas[i] === '').length;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'modal-confirmar';
  modal.innerHTML = `
    <div class="modal-card">
      <h3>¿Terminar simulacro?</h3>
      <p>${sinResponder > 0 ? `Tienes <strong>${sinResponder} pregunta(s) sin responder</strong>.` : 'Has respondido todas las preguntas.'}</p>
      <div class="modal-btns">
        <button class="btn-secondary" onclick="cerrarModal()">Cancelar</button>
        <button class="btn-primary" onclick="finalizar()">Terminar</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function cerrarModal() {
  const m = document.getElementById('modal-confirmar');
  if (m) m.remove();
}

function finalizar() {
  cerrarModal();
  clearInterval(intervalId);
  document.getElementById('pantalla-quiz').style.display = 'none';
  document.getElementById('pantalla-pausa').style.display = 'none';
  document.getElementById('pantalla-fin').style.display = 'block';
  mostrarResumen();
}

function mostrarResumen() {
  const multiple = preguntas.filter(p => p.tipo === 'multiple');
  const correctas = multiple.filter((p, i) => {
    const idx = preguntas.indexOf(p);
    return respuestas[idx] === p.correcta;
  }).length;
  const pct = Math.round((correctas / multiple.length) * 100);
  const sinResponder = preguntas.filter((_, i) => !respuestas[i] || respuestas[i] === '').length;

  document.getElementById('resumen-score').innerHTML = `
    <div class="score-box">
      <div class="score-number">${pct}%</div>
      <div class="score-label">puntaje en opción múltiple</div>
      <div class="score-details">
        <div class="score-stat"><div class="val" style="color:#4caf50">${correctas}</div><div class="lbl">Correctas</div></div>
        <div class="score-stat"><div class="val" style="color:#e57373">${multiple.length - correctas}</div><div class="lbl">Incorrectas</div></div>
        <div class="score-stat"><div class="val" style="color:#ff9800">${sinResponder}</div><div class="lbl">Sin responder</div></div>
        <div class="score-stat"><div class="val">${formatTime(tiempoSegundos)}</div><div class="lbl">Tiempo</div></div>
      </div>
    </div>`;
}

// ---- DOWNLOAD ----
function descargarRevision() {
  let html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
  <title>Revisión - Biología Celular</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #fff5f7; padding: 40px; color: #555; max-width: 700px; margin: auto; }
    h1 { color: #e57373; margin-bottom: 4px; } .meta { color: #aaa; font-size: 0.9rem; margin-bottom: 24px; }
    .pregunta { background: #fff; border-radius: 14px; padding: 18px; margin-bottom: 16px; border: 1.5px solid #ffd6dc; }
    .pregunta h3 { font-size: 1rem; color: #444; margin-bottom: 10px; }
    .correcta-tag { display:inline-block; padding:3px 10px; border-radius:20px; font-size:0.8rem; font-weight:700; margin-right:6px; }
    .ok { background:#e8f5e9; color:#388e3c; } .fail { background:#fce4ec; color:#c62828; }
    .marcada-tag { background:#fffde7; color:#f9a825; }
    .respuesta { margin-top:6px; font-size:0.92rem; }
    .correcta-res { color:#388e3c; font-weight:600; } .incorrecta-res { color:#c62828; }
    .abierta-res { color:#5c6bc0; font-style: italic; }
    hr { border: none; border-top: 1px solid #ffe4e8; margin: 0; }
  </style></head><body>
  <h1>🧬 Revisión de Simulacro — Biología Celular</h1>
  <p class="meta">Fecha: ${new Date().toLocaleDateString('es-ES', { year:'numeric', month:'long', day:'numeric' })} &nbsp;|&nbsp; Tiempo: ${formatTime(tiempoSegundos)}</p>`;

  preguntas.forEach((p, i) => {
    const miRes = respuestas[i] || 'Sin respuesta';
    const esMarcada = marcadas.has(i);
    let evaluacion = '';
    if (p.tipo === 'multiple') {
      if (miRes === p.correcta) {
        evaluacion = `<span class="correcta-tag ok">✓ Correcta</span>`;
      } else {
        evaluacion = `<span class="correcta-tag fail">✗ Incorrecta</span><span class="respuesta incorrecta-res">Respuesta correcta: ${p.correcta}</span>`;
      }
    } else {
      evaluacion = `<span class="correcta-tag" style="background:#e8eaf6;color:#5c6bc0;">Abierta</span>`;
    }

    html += `<div class="pregunta">
      <h3>${i + 1}. ${p.enunciado} ${esMarcada ? '<span class="correcta-tag marcada-tag">🔖 Marcada</span>' : ''}</h3>
      <div class="respuesta">Tu respuesta: <span class="${p.tipo === 'abierta' ? 'abierta-res' : (miRes === p.correcta ? 'correcta-res' : 'incorrecta-res')}">${miRes}</span></div>
      <div style="margin-top:6px">${evaluacion}</div>
    </div>`;
  });

  html += `</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Revision_Biologia_${new Date().toISOString().slice(0,10)}.html`;
  a.click();
}

// ---- RESTART ----
function reiniciar() {
  document.getElementById('pantalla-fin').style.display = 'none';
  document.getElementById('pantalla-inicio').style.display = 'block';
}
