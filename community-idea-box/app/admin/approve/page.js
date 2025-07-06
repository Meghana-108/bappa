'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import Link from 'next/link'

export default function AdminApprovePage() {
  const [pendingIdeas, setPendingIdeas] = useState([])
  const [approvedIdeas, setApprovedIdeas] = useState([])

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    const { data: pending, error: pendingError } = await supabase
      .from('ideas')
      .select('*')
      .eq('status', 'pending')

    const { data: approved, error: approvedError } = await supabase
      .from('ideas')
      .select('*')
      .eq('status', 'approved')

    if (!pendingError) setPendingIdeas(pending)
    if (!approvedError) setApprovedIdeas(approved)
  }

  const updateIdeaStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('ideas')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) fetchIdeas()
    else alert('Update failed: ' + error.message)
  }

  return (
    <main className="min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🛠️ Admin Idea Approval Panel</h1>



<div className="flex justify-end mb-6">
  <Link
    href="/admin/approved"
    className="bg-[#F0BB78] hover:bg-[#A4B465] text-white font-semibold px-4 py-2 rounded"
  >
    🔁 View Approved Ideas
  </Link>
</div>

      {/* Pending Ideas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Pending Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingIdeas.length === 0 && <p>No pending ideas.</p>}
          {pendingIdeas.map((idea) => (
            <div key={idea.id} className="p-6 bg-white border rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-1">{idea.title}</h3>
              <p>{idea.description}</p>
              <p className="text-sm text-[#626F47]">Category: {idea.category}</p>
              <p className="text-sm text-[#626F47] mb-3">Votes: {idea.votes}</p>
              <button
                onClick={() => updateIdeaStatus(idea.id, 'approved')}
                className="bg-[#A4B465] text-white px-4 py-2 rounded font-semibold"
              >
                ✅ Approve
              </button>
            </div>
          ))}
        </div>
      </section>

     
    </main>
  )
}
