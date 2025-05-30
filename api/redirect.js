import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const groups = [
  "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47",
  "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V",
  "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK",
  "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ",
  "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"
];

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('Czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (error) throw error;

    let clicks = data?.clicks ?? 0;
    const nextClicks = clicks + 1;
    const nextGroup = groups[(nextClicks - 1) % groups.length];

    const { error: updateError } = await supabase
      .from('Czechgirls')
      .update({ clicks: nextClicks })
      .eq('id', 1);

    if (updateError) throw updateError;

    return res.writeHead(302, { Location: nextGroup }).end();

  } catch (err) {
    console.error("Redirect error:", err.message);
    return res.status(500).json({ error: 'Redirection failed.' });
  }
}
