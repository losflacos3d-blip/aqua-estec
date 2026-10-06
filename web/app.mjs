/**
 * AQUA ESTEC - Prototipo Local
 * Script de interactividad accesible y validación de formulario
 * - Cero dependencias externas
 * - Sin almacenamiento ni transmisión de datos
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú móvil accesible
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');
    });

    // Cerrar con la tecla Escape para mejorar la accesibilidad
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // Helper central de evaluación de rutas por Código Postal
  function evaluarRuta(cp) {
    const limpio = cp.trim();
    if (limpio === '12600') {
      return {
        esRuta: true,
        tipo: 'prioritaria',
        nombre: 'Vall d’Uixó (12600)',
        titulo: '⭐ ¡Ruta prioritaria verificada: Vall d’Uixó (12600)!',
        desc: 'Sede central de AQUA ESTEC. Tienes servicio prioritario continuo, reparto semanal directo y atención personalizada sin intermediarios.',
        perks: ['⚡ Reparto semanal directo', '📦 Sin compromiso rígido', '🔄 Retorno de envases', '⏱️ Máxima agilidad'],
        btnText: '💧 Pedir agua para Vall d’Uixó (12600) →'
      };
    } else if (limpio.startsWith('12') || limpio.startsWith('46')) {
      return {
        esRuta: true,
        tipo: 'comarcal',
        nombre: `Castellón / Valencia (${limpio})`,
        titulo: `🚚 ¡Ruta comarcal activa en tu zona (${limpio})!`,
        desc: 'Cobertura comarcal confirmada. Dispones de reparto programado periódico directo a tu domicilio o empresa sin coste de desplazamiento.',
        perks: ['🚚 Ruta comarcal periódica', '💧 Manantiales seleccionados', '📞 Asignación directa de día'],
        btnText: `💧 Pedir agua para CP ${limpio} →`
      };
    } else {
      return {
        esRuta: false,
        tipo: 'consulta',
        nombre: `Zona en consulta (${limpio})`,
        titulo: `📍 Código postal fuera de ruta habitual (${limpio})`,
        desc: 'AQUA ESTEC centra su reparto en comarcas de Castellón y Valencia. Envíanos tu solicitud y revisaremos si podemos coordinar una entrega especial.',
        perks: ['📍 Consulta de viabilidad personalizada'],
        btnText: `Consultar viabilidad de ruta para ${limpio} →`
      };
    }
  }

  // 2. Lógica interactiva en tiempo real del Código Postal en el Formulario
  const cpInput = document.getElementById('codigo-postal');
  const cpContainer = document.getElementById('cp-input-container');
  const cpLiveStatus = document.getElementById('cp-live-status');
  const btnSubmitForm = document.getElementById('btn-submit-form');
  const fastTrackContainer = document.getElementById('fast-track-container');
  const fastCpText = document.getElementById('fast-cp-text');
  const btnFastWhatsapp = document.getElementById('btn-fast-whatsapp');

  function actualizarEstadoRutaEnFormulario(valorCP) {
    if (!cpLiveStatus) return;

    const val = valorCP.trim();
    if (/^\d{5}$/.test(val)) {
      const ruta = evaluarRuta(val);

      if (cpContainer) cpContainer.classList.add('is-verified');

      cpLiveStatus.className = `cp-live-status is-visible is-${ruta.tipo}`;
      cpLiveStatus.innerHTML = `
        <div class="cp-status-header">
          <span>${ruta.titulo}</span>
        </div>
        <p class="cp-status-desc">${ruta.desc}</p>
        <div class="cp-quick-perks">
          ${ruta.perks.map(p => `<span>${p}</span>`).join('')}
        </div>
      `;

      if (btnSubmitForm) {
        btnSubmitForm.textContent = ruta.btnText;
      }

      if (fastTrackContainer && fastCpText) {
        fastCpText.textContent = val;
        fastTrackContainer.style.display = 'block';
      }
    } else {
      if (cpContainer) cpContainer.classList.remove('is-verified');
      cpLiveStatus.className = 'cp-live-status';
      cpLiveStatus.innerHTML = '';
      if (btnSubmitForm) {
        btnSubmitForm.textContent = '💧 Solicitar información y comprobar ruta';
      }
      if (fastTrackContainer) {
        fastTrackContainer.style.display = 'none';
      }
    }
  }

  if (cpInput) {
    cpInput.addEventListener('input', (e) => {
      actualizarEstadoRutaEnFormulario(e.target.value);
    });

    cpInput.addEventListener('change', (e) => {
      actualizarEstadoRutaEnFormulario(e.target.value);
    });
  }

  // Auto-completado si se llega con parámetro en la URL (?cp=12600)
  const urlParams = new URLSearchParams(window.location.search);
  const cpParam = urlParams.get('cp');
  if (cpParam && cpInput) {
    cpInput.value = cpParam;
    actualizarEstadoRutaEnFormulario(cpParam);
    
    // Si viene de comprobar la zona, hacemos scroll suave al formulario
    const seccionForm = document.getElementById('seccion-formulario') || document.getElementById('form-pedir-agua');
    if (seccionForm) {
      setTimeout(() => {
        seccionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const telInput = document.getElementById('telefono');
        if (telInput) telInput.focus();
      }, 250);
    }
  }

  // 3. Validación local del formulario
  const form = document.getElementById('form-pedir-agua');
  const feedbackModal = document.getElementById('form-feedback');
  const feedbackResumen = document.getElementById('feedback-resumen');
  const btnReiniciar = document.getElementById('btn-reiniciar-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // PREVIENE CUALQUIER ENVÍO EXTERNO O RECARGA

      let isValid = true;

      // Campo Código Postal (Paso 1)
      const cpError = document.getElementById('cp-error');
      const cpValor = cpInput ? cpInput.value.trim() : '';
      const regexCP = /^\d{5}$/; // 5 dígitos numéricos

      if (!regexCP.test(cpValor)) {
        mostrarError(cpInput, cpError, 'Introduce un código postal válido de 5 dígitos (ej. 12600).');
        isValid = false;
      } else {
        limpiarError(cpInput, cpError);
      }

      // Campo Tipo de Cliente (Paso 2)
      const tipoInputs = document.querySelectorAll('input[name="tipo_cliente"]');
      const tipoError = document.getElementById('tipo-error');
      let tipoSeleccionado = '';

      tipoInputs.forEach(input => {
        if (input.checked) {
          tipoSeleccionado = input.value;
        }
      });

      if (!tipoSeleccionado) {
        if (tipoError) {
          tipoError.textContent = 'Selecciona si el servicio es para tu hogar o para tu empresa.';
          tipoError.classList.add('is-visible');
        }
        isValid = false;
      } else {
        if (tipoError) {
          tipoError.classList.remove('is-visible');
        }
      }

      // Campo Teléfono Móvil (Paso 3)
      const telefonoInput = document.getElementById('telefono');
      const telefonoError = document.getElementById('telefono-error');
      const telValor = telefonoInput ? telefonoInput.value.trim().replace(/\s+/g, '') : '';
      const regexTelefono = /^[67]\d{8}$/; // Móvil español: 9 dígitos comenzando por 6 o 7

      if (!regexTelefono.test(telValor)) {
        mostrarError(telefonoInput, telefonoError, 'Introduce un número de teléfono móvil válido (9 dígitos comenzando por 6 o 7).');
        isValid = false;
      } else {
        limpiarError(telefonoInput, telefonoError);
      }

      // Campo Consumo Mensual Aproximado (Paso 4)
      const consumoSelect = document.getElementById('consumo-aproximado');
      const consumoError = document.getElementById('consumo-error');
      const consumoValor = consumoSelect ? consumoSelect.value : '';

      // Si todo es válido, mostramos la pantalla de éxito simulada SIN enviar nada a ningún servidor
      if (isValid) {
        const rutaInfo = evaluarRuta(cpValor);

        if (feedbackResumen) {
          feedbackResumen.innerHTML = `
            <strong>📍 Ruta de entrega:</strong> ${escapeHtml(rutaInfo.nombre)} (${rutaInfo.tipo === 'prioritaria' ? '⭐ Ruta Prioritaria Vall d’Uixó' : '🚚 Ruta Comarcal'})<br>
            <strong>📱 Teléfono de aviso:</strong> ${escapeHtml(telValor)}<br>
            <strong>🏠 Destino:</strong> ${escapeHtml(tipoSeleccionado)}<br>
            <strong>📦 Consumo orientativo:</strong> ${escapeHtml(consumoSelect ? consumoSelect.options[consumoSelect.selectedIndex].text : 'Sin especificar')}
          `;
        }

        form.style.display = 'none';
        if (fastTrackContainer) fastTrackContainer.style.display = 'none';
        if (feedbackModal) {
          feedbackModal.classList.add('is-active');
          feedbackModal.focus();
        }
      }
    });

    if (btnReiniciar) {
      btnReiniciar.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        actualizarEstadoRutaEnFormulario('');
        if (feedbackModal) {
          feedbackModal.classList.remove('is-active');
        }
        if (cpInput) cpInput.focus();
      });
    }
  }

  // 4. Comprobador de Código Postal interactivo en zonas-reparto.html
  const formCP = document.getElementById('form-check-cp');
  const resultCP = document.getElementById('result-check-cp');

  if (formCP && resultCP) {
    formCP.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputCP = document.getElementById('input-zona-cp');
      const val = inputCP ? inputCP.value.trim() : '';

      if (!/^\d{5}$/.test(val)) {
        resultCP.innerHTML = `<span style="color: var(--color-error-text); font-weight: 600;">Por favor, introduce un código postal de 5 dígitos.</span>`;
        return;
      }

      const ruta = evaluarRuta(val);

      if (ruta.tipo === 'prioritaria') {
        resultCP.innerHTML = `
          <div class="cp-live-status is-prioritaria is-visible" style="margin-top: 14px;">
            <div class="cp-status-header">
              <span>⭐ ¡Ruta prioritaria verificada: Vall d’Uixó (12600)!</span>
            </div>
            <p class="cp-status-desc">
              Sede central de AQUA ESTEC. Tienes servicio continuo, reparto semanal directo y atención prioritaria sin intermediarios.
            </p>
            <div class="cp-quick-perks">
              <span>⚡ Reparto directo</span>
              <span>📦 Sin compromiso</span>
              <span>🔄 Retorno de envases</span>
            </div>
            <div class="cp-direct-actions">
              <a href="pedir-agua.html?cp=12600" class="btn btn-primary btn-block" style="font-weight: 800;">
                💧 Pedir agua para Vall d'Uixó ahora →
              </a>
              <button type="button" class="btn btn-whatsapp-fast btn-wa-route" data-cp="12600">
                <span>💬</span> Pedir directamente por WhatsApp con CP 12600
              </button>
            </div>
          </div>
        `;
      } else if (ruta.tipo === 'comarcal') {
        resultCP.innerHTML = `
          <div class="cp-live-status is-comarcal is-visible" style="margin-top: 14px;">
            <div class="cp-status-header">
              <span>🚚 ¡Ruta comarcal activa en tu zona (${val})!</span>
            </div>
            <p class="cp-status-desc">
              AQUA ESTEC reparte periódicamente en poblaciones de Castellón y Valencia sin gastos de desplazamiento.
            </p>
            <div class="cp-quick-perks">
              <span>🚚 Ruta comarcal activa</span>
              <span>💧 Manantiales seleccionados</span>
              <span>📞 Asignación directa de día</span>
            </div>
            <div class="cp-direct-actions">
              <a href="pedir-agua.html?cp=${val}" class="btn btn-primary btn-block" style="font-weight: 800;">
                💧 Solicitar reparto para CP ${val} →
              </a>
              <button type="button" class="btn btn-whatsapp-fast btn-wa-route" data-cp="${val}">
                <span>💬</span> Consultar día de ruta por WhatsApp
              </button>
            </div>
          </div>
        `;
      } else {
        resultCP.innerHTML = `
          <div class="cp-live-status is-consulta is-visible" style="margin-top: 14px;">
            <div class="cp-status-header">
              <span>📍 Código postal fuera del área habitual (${val})</span>
            </div>
            <p class="cp-status-desc">
              AQUA ESTEC opera principalmente en Castellón y Valencia. Puedes solicitar comprobación manual para ver si encaja en una ruta cercana.
            </p>
            <div class="cp-direct-actions">
              <a href="pedir-agua.html?cp=${val}" class="btn btn-outline btn-block">
                Consultar viabilidad de ruta para ${val} →
              </a>
            </div>
          </div>
        `;
      }
    });
  }

  // Delegación de eventos para botones de WhatsApp dinámicos
  document.addEventListener('click', (e) => {
    const btnWA = e.target.closest('.btn-wa-route') || e.target.closest('#btn-fast-whatsapp');
    if (btnWA) {
      const cp = btnWA.getAttribute('data-cp') || (cpInput ? cpInput.value.trim() : '12600') || '12600';
      const text = encodeURIComponent(`Hola AQUA ESTEC, quiero consultar suministro y reparto para el código postal ${cp}.`);
      window.open(`https://wa.me/34630359472?text=${text}`, '_blank');
    }
  });

  // Funciones auxiliares accesibles
  function mostrarError(inputElement, errorElement, mensaje) {
    if (inputElement) {
      inputElement.setAttribute('aria-invalid', 'true');
    }
    if (errorElement) {
      errorElement.textContent = mensaje;
      errorElement.classList.add('is-visible');
    }
  }

  function limpiarError(inputElement, errorElement) {
    if (inputElement) {
      inputElement.removeAttribute('aria-invalid');
    }
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('is-visible');
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 5. Botón flotante accesible de WhatsApp
  const btnFloatingWA = document.getElementById('btn-floating-whatsapp');
  if (btnFloatingWA) {
    btnFloatingWA.addEventListener('click', () => {
      alert('⏳ Canal directo de WhatsApp:\n\nEl número oficial de WhatsApp para atención al cliente está pendiente de confirmación por parte de AQUA ESTEC.\n\nEn la versión de producción aprobada, este botón abrirá directamente el chat de WhatsApp con el mensaje predefinido para pedir agua o consultar tu zona.');
    });
  }
});
