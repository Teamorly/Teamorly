// /api/redirect.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dedjdbiyymmviggpfusp.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const whatsappLinks = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
];

export default async function handler(req, res) {
  try {
    const { data, error: fetchError } = await supabase
      .from('Czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (fetchError) throw fetchError;

    let currentClick = data?.clicks ?? 0;
    const nextClick = currentClick + 1;
    const nextGroupIndex = currentClick % whatsappLinks.length;

    const { error: updateError } = await supabase
      .from('Czechgirls')
      .update({ clicks: nextClick })
      .eq('id', 1);

    if (updateError) throw updateError;

    const nextLink = whatsappLinks[nextGroupIndex];
    res.writeHead(302, { Location: nextLink });
    res.end();
  } catch (err) {
    console.error('Redirection failed:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
