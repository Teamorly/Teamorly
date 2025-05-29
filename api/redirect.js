import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

// Configuración de Firebase (tu proyecto "teamorly-c7cb0")
const firebaseConfig = {
  apiKey: "AIzaSyD7mvF3tnOzMBCH3R7i1QMgsbKyneeyTSg",
  authDomain: "teamorly-c7cb0.firebaseapp.com",
  databaseURL: "https://teamorly-c7cb0-default-rtdb.firebaseio.com/",
  projectId: "teamorly-c7cb0",
  storageBucket: "teamorly-c7cb0.appspot.com",
  messagingSenderId: "54759106725",
  appId: "1:54759106725:web:c8e58eacad97b8aaabc54c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lista de grupos del Team Orly 👑
const grupos = [
  "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47",
  "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V",
  "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK",
  "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ",
  "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"
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
    res.status(500).send("Error al redirigir.");
  }
}
