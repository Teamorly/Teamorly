const admin = require("firebase-admin");
const serviceAccount = {
  "type": "service_account",
  "project_id": "teamorly-c7cb0",
  "private_key_id": "tu_private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\ntu_clave_aquí\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@teamorly-c7cb0.iam.gserviceaccount.com",
  "client_id": "54759106725",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk@teamorly-c7cb0.iam.gserviceaccount.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://teamorly-c7cb0-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

export default async function handler(req, res) {
  const ref = db.ref("contador");
  const snapshot = await ref.once("value");
  const valor = snapshot.val() || 0;

  const enlaces = [
    "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47",
    "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V",
    "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK",
    "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ",
    "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"
  ];

  const siguiente = valor % enlaces.length;
  await ref.set(valor + 1);

  res.writeHead(302, { Location: enlaces[siguiente] });
  res.end();
}
