// Archivo: /api/redirect.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'TU_CLAVE_PUBLICA_AQUI'; // Reemplaza con tu anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const links = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47', // Grupo 1
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V', // Grupo 2
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK', // Grupo 3
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ', // Grupo 4
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'  // Grupo 5
];

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('Czechgirls')
    .select('clic')
    .eq('id', 1)
    .single();

  if (error || !data) {
    return res.status(500).send('Error obteniendo el contador');
  }

  const nextIndex = data.clic % links.length;

  const { error: updateError } = await supabase
    .from('Czechgirls')
    .update({ clic: data.clic + 1 })
    .eq('id', 1);

  if (updateError) {
    return res.status(500).send('Error actualizando el contador');
  }

  res.writeHead(302, { Location: links[nextIndex] });
  res.end();
}
