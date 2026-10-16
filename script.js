// ==========================================================================
// SINTETIZADOR DE AUDIO (WEB AUDIO API) Y COREOGRAFÍA JS
// ==========================================================================

// Contexto de Audio Global
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * EFECTO 1: Click UI Táctil y Amortiguado
 */
function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * EFECTO 2: Whoosh Suave para el Vuelo Parabólico del Producto
 */
function playWhooshSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.2);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.4);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.43);
}

/**
 * EFECTO 3: Pop / Impacto Táctil cuando el Producto ingresa al Carrito
 */
function playImpactSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.095);
}

/**
 * EFECTO 4: Chime Cristalino Ascendente de Confirmación (E Major Arpeggio)
 */
function playConfirmationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [
    { freq: 659.25, time: 0.00, duration: 0.45 }, // E5
    { freq: 830.61, time: 0.06, duration: 0.50 }, // G#5
    { freq: 987.77, time: 0.12, duration: 0.55 }, // B5
    { freq: 1318.51, time: 0.18, duration: 0.65 }  // E6
  ];

  notes.forEach(note => {
    const noteTime = now + note.time;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, noteTime);

    gain.gain.setValueAtTime(0.0001, noteTime);
    gain.gain.linearRampToValueAtTime(0.09, noteTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + note.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + note.duration + 0.01);
  });
}

/**
 * EFECTO 5: Campanita del paquete que se apila (escala pentatónica ascendente)
 */
function playStackSound(k) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const f = [523.25, 587.33, 659.25, 783.99, 880][k];
  [f, f * 2].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + 0.03);
    gain.gain.setValueAtTime(0.0001, now + 0.03);
    gain.gain.linearRampToValueAtTime(i ? 0.03 : 0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + 0.03);
    osc.stop(now + 0.4);
  });
}

/* ==========================================================================
   LÓGICA Y COREOGRAFÍA DE ANIMACIÓN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartBtn');
  const cartWrapper = document.getElementById('cartWrapper');
  const productBox = document.getElementById('productBox');
  const flyingProduct = document.getElementById('flyingProduct');
  const impactGlow = document.getElementById('impactGlow');
  const floatingPlus = document.getElementById('floatingPlus');
  const cartBadge = document.getElementById('cartBadge');
  const checkSvg = document.getElementById('checkSvg');
  const btnText = document.getElementById('btnText');

  let isAnimating = false;
  let count = 0;

  // Cada producto tiene el color del paquete que va a aparecer en el carrito
  const palette = [
    { a: '#f472b6', b: '#db2777' }, { a: '#fbbf24', b: '#d97706' },
    { a: '#38bdf8', b: '#0284c7' }, { a: '#34d399', b: '#059669' },
    { a: '#fb923c', b: '#ea580c' }
  ];
  const pkgs = [...document.querySelectorAll('.pkg')];

  function paintBoxes() {
    const c = palette[count % 5];
    document.querySelectorAll('.box-face').forEach(f => {
      f.style.background = `linear-gradient(135deg, ${c.a} 0%, ${c.b} 100%)`;
      f.style.boxShadow = `inset 0 1px 2px rgba(255,255,255,0.5), 0 8px 18px ${c.a}59`;
    });
    flyingProduct.style.filter = `drop-shadow(0 0 12px ${c.a}cc)`;
  }
  paintBoxes();

  // El paquete cae dentro de la cesta (tras 5, el de arriba solo rebota)
  function landPackage(k) {
    const g = pkgs[Math.min(k, 4)];
    g.classList.add('on');
    g.animate(k < 5 ? [
      { transform: 'translateY(-18px) scale(0.7)', opacity: 0 },
      { transform: 'translateY(2px) scale(1.06)', opacity: 1, offset: 0.6 },
      { transform: 'none', opacity: 1 }
    ] : [
      { transform: 'none' }, { transform: 'translateY(-3px) scale(1.08)', offset: 0.4 }, { transform: 'none' }
    ], { duration: 340, easing: 'ease-out' });
  }

  // Helper para pausas precisas en ms
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Creación de micro-partículas en el punto de impacto
  function createImpactParticles(col) {
    const rect = cartWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.background = col.a;
      p.style.boxShadow = `0 0 8px ${col.a}`;
      document.body.appendChild(p);

      const angle = (i / 6) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = 18 + Math.random() * 16;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 8;

      p.style.left = `${centerX}px`;
      p.style.top = `${centerY}px`;

      p.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: 350 + Math.random() * 150,
        easing: 'cubic-bezier(0, 0.9, 0.57, 1)',
        fill: 'forwards'
      }).onfinish = () => p.remove();
    }
  }

  cartBtn.addEventListener('click', async () => {
    if (isAnimating) return;
    isAnimating = true;
    cartBtn.classList.add('disabled');

    // Reproducir sonido de click
    playClickSound();

    // ---------------------------------------------------------------------
    // FASE 1: ANTICIPACIÓN EN BOTÓN Y DESPRENDIMIENTO (120ms)
    // Carrito permanece estático como objetivo durante el vuelo inicial
    // ---------------------------------------------------------------------
    cartBtn.classList.add('is-pressing');
    productBox.classList.add('anticipate');

    await wait(120);

    cartBtn.classList.remove('is-pressing');
    productBox.classList.remove('anticipate');

    // ---------------------------------------------------------------------
    // FASE 2: VUELO PARABÓLICO DEL PRODUCTO
    // ---------------------------------------------------------------------
    const startRect = productBox.getBoundingClientRect();
    const endRect = cartWrapper.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - 24;
    const startY = startRect.top + startRect.height / 2 - 24;
    const endX = endRect.left + endRect.width / 2 - 24;
    const endY = endRect.top + endRect.height / 3 - 24;

    // Ocultar caja original y preparar flying product
    productBox.style.opacity = '0';
    flyingProduct.style.left = `${startX}px`;
    flyingProduct.style.top = `${startY}px`;
    flyingProduct.style.opacity = '1';

    // Iniciar sonido de vuelo
    playWhooshSound();

    const flightDuration = 420; // ms
    const startTime = performance.now();
    let preparedImpact = false;

    // Control de trayectoria bezier con requestAnimationFrame
    await new Promise(resolve => {
      function animateFlight(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / flightDuration, 1);

        // FASE 2 — ANTICIPACIÓN DEL IMPACTO EN EL CARRITO
        // Activar preparación ~80ms antes de la llegada (a partir del 80% del trayecto)
        if (progress >= 0.8 && !preparedImpact) {
          preparedImpact = true;
          cartWrapper.classList.add('prepare-impact');
        }

        // Curva de progresión de tiempo
        const easeP = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Coordenadas parabólicas intactas (Arc ↗ ↗ ↘ 🛒)
        const currX = startX + (endX - startX) * easeP;
        const arcHeight = -65 * Math.sin(progress * Math.PI);
        const currY = startY + (endY - startY) * easeP + arcHeight;

        // Rotación y escala progresivas del producto
        const scale = 1 - 0.52 * easeP;
        const rotate = 28 * Math.sin(progress * Math.PI);

        flyingProduct.style.transform = `translate(${currX - startX}px, ${currY - startY}px) scale(${scale}) rotate(${rotate}deg)`;

        if (progress < 1) {
          requestAnimationFrame(animateFlight);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(animateFlight);
    });

    // Ocultar flying product al llegar
    flyingProduct.style.opacity = '0';
    flyingProduct.style.transform = 'none';

    // ---------------------------------------------------------------------
    // FASE 3 Y FASE 4: IMPACTO FÍSICO Y SINCRONIZACIÓN VISUAL
    // ---------------------------------------------------------------------
    cartWrapper.classList.remove('prepare-impact');
    cartWrapper.classList.add('impact');

    playImpactSound();
    const col = palette[count % 5];
    landPackage(count);
    playStackSound(Math.min(count, 4));
    count++;
    cartWrapper.classList.add('wheels-spin');
    impactGlow.classList.add('active');
    createImpactParticles(col);

    setTimeout(() => {
      impactGlow.classList.remove('active');
    }, 350);

    await wait(160);

    // ---------------------------------------------------------------------
    // FASE 5: CONTADOR (+1 & BADGE PERSISTENTE)
    // ---------------------------------------------------------------------
    floatingPlus.classList.add('animate');
    cartBadge.textContent = count;
    cartBadge.classList.add('is-visible');

    await wait(380);
    cartWrapper.classList.remove('impact', 'wheels-spin');
    cartWrapper.style.transform = 'none';
    floatingPlus.classList.remove('animate');

    // ---------------------------------------------------------------------
    // FASE 6: CONFIRMACIÓN Y CÍRCULO CON AURA 360°
    // ---------------------------------------------------------------------
    cartBtn.classList.add('is-circle');
    await wait(260);

    // Dibuja el Check
    checkSvg.classList.add('draw');

    // Giro de Aura + Pulso + Chime de Confirmación
    cartBtn.classList.add('is-aura-active', 'is-pulsing');
    playConfirmationChime();

    await wait(600);

    cartBtn.classList.remove('is-aura-active', 'is-pulsing');

    // ---------------------------------------------------------------------
    // FASE 7: ESTADO FINAL "ADDED TO CART" Y RESET AUTOMÁTICO
    // ---------------------------------------------------------------------
    cartBtn.classList.remove('is-circle');
    checkSvg.classList.remove('draw');
    cartBtn.classList.add('is-success');

    // Cambiar texto
    btnText.innerHTML = '✓ Added to Cart';
    cartWrapper.classList.add('pop-in', 'wheels-spin');

    // Mantener estado de éxito durante ~1.4s
    await wait(1100);

    // Reset Limpio para poder repetir la interacción
    cartBtn.classList.remove('is-success');
    btnText.innerHTML = 'Add to Cart';
    cartWrapper.classList.remove('pop-in', 'wheels-spin');

    // Restaurar caja de producto original con animación suave de aparición
    paintBoxes(); // el siguiente producto ya trae el color del próximo paquete
    productBox.animate([
      { opacity: 0, transform: 'scale(0.7)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 350,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    });

    await wait(350);
    productBox.style.opacity = '1';
    productBox.style.transform = 'none';
    cartWrapper.style.transform = 'none';

    cartBtn.classList.remove('disabled');
    isAnimating = false;
  });
});
