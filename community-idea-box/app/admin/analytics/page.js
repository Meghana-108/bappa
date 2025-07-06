'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#A4B465', '#F0BB78', '#626F47', '#F5ECD5']

export default function AdminAnalyticsPage() {
  const [ideasByDate, setIdeasByDate] = useState([])
  const [ideasByCategory, setIdeasByCategory] = useState([])

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    // Get all ideas
    const { data, error } = await supabase.from('ideas').select('*')

    if (error) {
      console.error('Error fetching ideas:', error)
      return
    }

    // Group by date
    const dateCountMap = {}
    const categoryCountMap = {}

    data.forEach((idea) => {
      const date = new Date(idea.created_at).toLocaleDateString()
      dateCountMap[date] = (dateCountMap[date] || 0) + 1
      categoryCountMap[idea.category] = (categoryCountMap[idea.category] || 0) + 1
    })

    const formattedDateData = Object.keys(dateCountMap).map((date) => ({
      date,
      count: dateCountMap[date],
    }))

    const formattedCategoryData = Object.keys(categoryCountMap).map((category) => ({
      name: category,
      value: categoryCountMap[category],
    }))

    setIdeasByDate(formattedDateData)
    setIdeasByCategory(formattedCategoryData)
  }

  return (
    <main className="min-h-screen bg-[#F5ECD5] text-[#626F47] px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">📈 Admin Analytics</h1>

      {/* Ideas by Date */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Ideas Submitted Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ideasByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#A4B465" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Ideas by Category */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Ideas by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ideasByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {ideasByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </main>
  )
}
