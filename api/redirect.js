export default async function handler(request, response) {
  const grupos = [
    "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47", // Grupo 1
    "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V", // Grupo 2
    "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK", // Grupo 3
    "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ", // Grupo 4
    "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"  // Grupo 5
  ];

  try {
    // NUEVO contador global limpio
    const res = await fetch("https://api.countapi.xyz/hit/teamorly-v2/vercel");
    const data = await res.json();

    // Cálculo de grupo correspondiente
    const index = (data.value - 1) % grupos.length;
    const destino = grupos[index];

    // Redirigir
    return response.writeHead(302, { Location: destino }).end();
  } catch (error) {
    return response.status(500).send("Error en la redirección global.");
  }
}
