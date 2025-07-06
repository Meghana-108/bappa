import { supabase } from '../../../lib/supabaseClient'


export async function POST(req) {
  try {
    const { id } = await req.json()

    const { data, error } = await supabase.rpc('increment_votes', { row_id: id })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
