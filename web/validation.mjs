export function validatePostcode(value) {
  return /^\d{5}$/.test(String(value).trim());
}

export function validateContact({ phone = '', postcode = '', client = '', consumption = '', unknown = false } = {}) {
  const errors = {};
  const normalizedPhone = String(phone).replace(/[\s()-]/g, '');
  if (!/^\+?\d{9,15}$/.test(normalizedPhone)) errors.phone = 'Escribe un teléfono de 9 a 15 cifras. Puedes incluir el prefijo internacional.';
  if (!validatePostcode(postcode)) errors.postcode = 'Escribe un código postal de 5 cifras.';
  if (!['hogar', 'empresa'].includes(client)) errors.client = 'Elige hogar o empresa.';
  if (!unknown && (!/^\d+$/.test(String(consumption)) || !Number.isSafeInteger(Number(consumption)) || Number(consumption) <= 0)) errors.consumption = 'Indica los litros aproximados al mes o marca «Todavía no lo sé».';
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
