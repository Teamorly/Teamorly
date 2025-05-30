import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dedjdbiyymmviggpfusp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZGpkYml5eW1tdmlnZ3BmdXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzA2MzAsImV4cCI6MjA2NDE0NjYzMH0.Ck-299baM34h1g-D8_1k2mE333g0vXNG7GGnGiZr2kw';
const supabase = createClient(supabaseUrl, supabaseKey);

const links = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
];

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (error) throw error;

    let count = data?.clicks ?? 0;
    const nextIndex = count % links.length;
    const nextLink = links[nextIndex];

    const { error: updateError } = await supabase
      .from('czechgirls')
      .update({ clicks: count + 1 })
      .eq('id', 1);

    if (updateError) throw updateError;

    return res.writeHead(302, { Location: nextLink }).end();
  } catch (err) {
    return res.status(500).json({ error: 'Redirect failed', details: err.message });
  }
}
