export function validatePostcode(value) {
  return /^\d{5}$/.test(String(value).trim());
}

export function validateContact({ phone = '', postcode = '', client = '', consumption = '', unknown = false, privacy = false, website_url = '' } = {}) {
  const errors = {};
  // 1. Honeypot Antispam: Si un bot rellena el campo trampa oculto
  if (website_url && String(website_url).trim().length > 0) {
    errors.spam = true;
    return errors;
  }
  // 2. Consentimiento explícito RGPD / LOPDGDD
  if (!privacy) {
    errors.privacy = 'Debes leer y aceptar la Política de Privacidad para enviar tu consulta.';
  }
  const normalizedPhone = String(phone).replace(/[\s()-]/g, '');
  if (!/^\+?\d{9,15}$/.test(normalizedPhone)) errors.phone = 'Escribe un teléfono de 9 a 15 cifras. Puedes incluir el prefijo internacional.';
  if (!validatePostcode(postcode)) errors.postcode = 'Escribe un código postal de 5 cifras.';
  if (!['hogar', 'empresa', 'Hogar / Particular', 'Empresa / Negocio'].includes(client)) errors.client = 'Elige hogar o empresa.';
  if (!unknown) {
    const num = Number(consumption);
    if (!/^\d+$/.test(String(consumption).trim()) || !Number.isSafeInteger(num) || num <= 0) {
      errors.consumption = 'Indica los litros aproximados al mes o marca «Todavía no lo sé».';
    }
  }
  return errors;
}

export function evaluarRuta(cp) {
  const limpio = (cp || '').toString().trim();
  if (limpio === '12600') {
    return {
      esRuta: true,
      tipo: 'prioritaria',
      nombre: "La Vall d'Uixó (12600)",
      mensaje: "⭐ ¡Ruta prioritaria verificada: La Vall d'Uixó (12600)! Sede central de AQUA ESTEC con reparto directo y prioritario."
    };
  }
  if (/^(12|46)\d{3}$/.test(limpio)) {
    return {
      esRuta: true,
      tipo: 'comarcal',
      nombre: `Zona comarcal (${limpio})`,
      mensaje: `📍 Código postal ${limpio} en área de cobertura (Castellón/Valencia). Ruta semanal programada según itinerario.`
    };
  }
  return {
    esRuta: false,
    tipo: 'revision',
    nombre: `Zona exterior (${limpio})`,
    mensaje: `ℹ️ Código postal ${limpio}: Fuera de ruta habitual fija. Puedes consultar disponibilidad especial para tu zona.`
  };
}
