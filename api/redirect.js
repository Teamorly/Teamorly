import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://teamorlys-project--chicas-checas.supabase.co'; // Reemplazado con tu URL real
const supabaseKey = 'TU_CLAVE_SECRETA_DE_SUPABASE'; // ← Asegúrate de copiar aquí tu clave secreta
const supabase = createClient(supabaseUrl, supabaseKey);

const groups = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC',
];

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('Czechgirls')
    .select('clicks')
    .order('id', { ascending: false })
    .limit(1);

  let newCount = 1;
  if (data && data.length > 0) {
    newCount = data[0].clicks + 1;
  }

  const { error: insertError } = await supabase
    .from('Czechgirls')
    .insert([{ clicks: newCount }]);

  if (insertError) {
    console.error('Insert error:', insertError);
    return res.status(500).send('Internal Server Error');
  }

  const index = (newCount - 1) % groups.length;
  return res.redirect(302, groups[index]);
}
