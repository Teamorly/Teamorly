import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dedjdbiyymmviggpfusp.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de grupos de WhatsApp
const groups = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
];

export default async function handler(req, res) {
  try {
    // Obtiene el valor actual del contador
    const { data, error } = await supabase
      .from('Czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (error) throw error;

    const currentClick = data?.clicks || 0;
    const nextClick = currentClick + 1;

    // Actualiza el contador
    const { error: updateError } = await supabase
      .from('Czechgirls')
      .update({ clicks: nextClick })
      .eq('id', 1);

    if (updateError) throw updateError;

    // Redirige al grupo correspondiente
    const targetIndex = currentClick % groups.length;
    const redirectUrl = groups[targetIndex];

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (err) {
    console.error('REDIRECT ERROR:', err);
    res.status(500).send('Error interno');
  }
}
