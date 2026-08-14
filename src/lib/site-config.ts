// Datos centrales del negocio. Cambia aquí el nombre, teléfono y enlaces
// para actualizarlos en todo el sitio.
export const siteConfig = {
  businessName: "MAULFER CONSTRUCTORES",
  phoneDisplay: "+56 9 0000 0000",
  phoneHref: "tel:+56900000000",
  whatsappNumber: "56900000000",
  whatsappMessage: "Hola, me gustaría cotizar un cobertizo.",
  address: "Av. Principal 1234, Santiago, Chile",
  // Embed genérico sin API key: reemplaza el valor de "q" por la dirección real del showroom.
  mapsEmbedSrc: "https://www.google.com/maps?q=Santiago,+Chile&output=embed",
  schedule: "Lunes a viernes 9:30–18:00",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
};

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage
)}`;
