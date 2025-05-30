export default async function handler(req, res) {
  const SUPABASE_URL = 'https://xxxxx.supabase.co'; // reemplaza con tu URL
  const SUPABASE_API_KEY = 'eyJhbGciOi...'; // reemplaza con tu clave secreta

  const GROUPS = [
    'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
    'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
    'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
    'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
    'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
  ];

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/czechgirls?id=eq.1`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        Accept: 'application/json'
      }
    });

    const data = await response.json();
    const currentClicks = data[0]?.clicks ?? 0;
    const nextClicks = currentClicks + 1;
    const groupIndex = currentClicks % GROUPS.length;
    const redirectUrl = GROUPS[groupIndex];

    await fetch(`${SUPABASE_URL}/rest/v1/czechgirls?id=eq.1`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clicks: nextClicks })
    });

    return res.writeHead(302, { Location: redirectUrl }).end();
  } catch (error) {
    console.error('Redirect error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
