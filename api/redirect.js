import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const links = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
]

export default async function handler(req, res) {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase
    .from('Czechgirls')
    .select('clicks')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Read error:', error)
    return res.status(500).send('Error reading counter')
  }

  let clicks = data?.clicks || 0
  let nextIndex = clicks % links.length
  let nextUrl = links[nextIndex]

  const { error: updateError } = await supabase
    .from('Czechgirls')
    .update({ clicks: clicks + 1 })
    .eq('id', 1)

  if (updateError) {
    console.error('Update error:', updateError)
    return res.status(500).send('Error updating counter')
  }

  res.writeHead(302, { Location: nextUrl })
  res.end()
}
