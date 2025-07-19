'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import Link from 'next/link'

export default function ApprovedIdeasPage() {
  const [approvedIdeas, setApprovedIdeas] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchApprovedIdeas()
  }, [])

  const fetchApprovedIdeas = async () => {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('status', 'approved')

    if (!error) setApprovedIdeas(data)
    else alert('Error fetching approved ideas: ' + error.message)
  }

  const disapproveIdea = async (id) => {
    const { error } = await supabase
      .from('ideas')
      .update({ status: 'pending' })
      .eq('id', id)

    if (!error) fetchApprovedIdeas()
    else alert('Disapprove failed: ' + error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="relative min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-10">

      {/* 🔴 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-[#626F47] hover:bg-[#4d5838] text-white font-semibold px-4 py-2 rounded-lg shadow transition"
      >
        🚪 Logout
      </button>

      <h1 className="text-4xl font-bold mb-6 text-center">✅ Approved Ideas</h1>

      <div className="flex justify-end mb-6">
        <Link
          href="/admin/approve"
          className="bg-[#F0BB78] hover:bg-[#A4B465] text-white font-semibold px-4 py-2 rounded"
        >
          🔙 Back to Pendings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approvedIdeas.length === 0 && <p>No approved ideas yet.</p>}
        {approvedIdeas.map((idea) => (
          <div key={idea.id} className="p-6 bg-white border rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
            <p className="mb-2">{idea.description}</p>
            <p className="text-sm text-[#626F47]">Category: {idea.category}</p>
            <p className="text-sm text-[#626F47] mb-3">Votes: {idea.votes}</p>
            <button
              onClick={() => disapproveIdea(idea.id)}
              className="bg-[#F0BB78] hover:bg-[#A4B465] text-white px-4 py-2 rounded font-semibold"
            >
              ❌ Disapprove
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
