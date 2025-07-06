'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ApprovedIdeasPage() {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    async function fetchApprovedIdeas() {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('status', 'approved')
        .order('votes', { ascending: false })

      if (!error) {
        setIdeas(data)
      } else {
        console.error('Error fetching approved ideas:', error)
      }
    }

    fetchApprovedIdeas()
  }, [])

  return (
    <main className="min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        ✅ Approved Ideas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {ideas.length === 0 ? (
          <p className="text-center text-lg">No approved ideas yet.</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="p-6 bg-white shadow rounded-xl border border-[#A4B465]">
              <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
              <p className="mb-2">{idea.description}</p>
              <p className="text-sm text-[#626F47]">Category: {idea.category}</p>
              <p className="text-sm text-[#626F47]">Votes: {idea.votes}</p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800">
                ✅ Approved
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
