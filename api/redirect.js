import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7mvF3tnOzMBCH3R7i1QMgsbKyneeyTSg",
  authDomain: "teamorly-c7cb0.firebaseapp.com",
  databaseURL: "https://teamorly-c7cb0-default-rtdb.firebaseio.com/",
  projectId: "teamorly-c7cb0",
  storageBucket: "teamorly-c7cb0.appspot.com",
  messagingSenderId: "54759106725",
  appId: "1:54759106725:web:c8e58eacad97b8aaabc54c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Enlaces de grupos de WhatsApp del Team Orly 👑
const grupos = [
  "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47", // Grupo 1
  "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V", // Grupo 2
  "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK", // Grupo 3
  "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ", // Grupo 4
  "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"  // Grupo 5
];

export default async function handler(req, res) {
  const contadorRef = ref(db, "contadorTeamOrly");

  try {
    const snapshot = await get(contadorRef);
    let count = snapshot.exists() ? snapshot.val() : 0;

    const grupoIndex = count % grupos.length;
    const destino = grupos[grupoIndex];

    await set(contadorRef, count + 1);

    res.writeHead(302, { Location: destino });
    res.end();
  } catch (error) {
    res.status(500).send("Error en la redirección.");
  }
}
