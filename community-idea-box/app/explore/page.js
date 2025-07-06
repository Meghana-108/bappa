'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

import Link from 'next/link'

export default function ExplorePage() {
  const [ideas, setIdeas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    async function fetchIdeas() {
      let query = supabase.from('ideas').select('*').order('votes', { ascending: false })

      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching ideas:', error)
      } else {
        setIdeas(data)
      }
    }

    fetchIdeas()
  }, [selectedCategory])

  const handleVote = async (id) => {
    const res = await fetch('/api/vote', {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
    const result = await res.json()

    if (result.success) {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
        )
      )
    } else {
      alert('Vote failed: ' + result.error)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-10">
      
      {/* Header: Left Title + Right Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        {/* Title Left */}
        <h1 className="text-3xl font-bold mb-4 md:mb-0">🌱 Explore Community Ideas</h1>

        {/* Buttons + Dropdown Right */}
        <div className="flex flex-wrap gap-3 md:gap-4 items-center">
          <select
            className="p-2 border border-[#A4B465] rounded bg-[#A4B465] text-white font-semibold"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Environment">Environment</option>
            <option value="Events">Events</option>
            <option value="Safety">Safety</option>
            <option value="General">General</option>
          </select>

          <Link
            href="/add"
            className="bg-[#A4B465] hover:bg-[#626F47] text-white px-4 py-2 rounded font-semibold transition"
          >
            ➕ Add Idea
          </Link>
          <Link
            href="/approved"
            className="bg-[#F0BB78] hover:bg-[#A4B465] text-white px-4 py-2 rounded font-semibold transition"
          >
            ✅ Approved Ideas
          </Link>
        </div>
      </div>

      {/* Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="relative p-6 bg-white shadow-md rounded-xl border border-[#A4B465]"
          >
            {/* Status Badge - Top Right */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                ${idea.status === 'approved'
                  ? 'bg-[#A4B465] text-white'
                  : idea.status === 'pending'
                  ? 'bg-[#F0BB78] text-white'
                  : 'bg-red-300 text-white'}`}
              >
                {idea.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
            <p className="mb-2">{idea.description}</p>
            <p className="text-sm text-[#626F47]">Category: {idea.category}</p>
            <p className="text-sm text-[#626F47] mb-4">Votes: {idea.votes}</p>

            <button
              onClick={() => handleVote(idea.id)}
              className="bg-[#F0BB78] hover:bg-[#A4B465] text-white px-4 py-2 rounded font-semibold transition"
            >
              👍 Vote
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
