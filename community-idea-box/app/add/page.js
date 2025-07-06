'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AddIdeaPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('General')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from('ideas').insert([
      {
        title,
        description,
        category,
        votes: 0,
        status: 'pending',
      },
    ])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      router.push('/explore') // Redirect after submission
    }
  }

  return (
    <main className="min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">💬 Share a New Idea</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Idea Title"
            className="w-full p-4 border border-[#A4B465] rounded bg-white text-[#626F47] placeholder:text-[#A4B465]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe your idea"
            className="w-full p-4 border border-[#A4B465] rounded bg-white text-[#626F47] placeholder:text-[#A4B465] min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full p-4 border border-[#A4B465] rounded bg-[#A4B465] text-white font-semibold"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Environment">Environment</option>
            <option value="Events">Events</option>
            <option value="Safety">Safety</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#F0BB78] hover:bg-[#A4B465] text-white py-3 rounded text-lg font-bold transition"
          >
            🚀 Submit Idea
          </button>
        </form>
      </div>
    </main>
  )
}
