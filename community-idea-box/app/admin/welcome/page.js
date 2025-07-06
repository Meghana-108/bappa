'use client'

import { useRouter } from 'next/navigation'

export default function AdminWelcomePage() {
  const router = useRouter()

  const goToExplore = () => router.push('/admin/approve')
  const goToAnalytics = () => router.push('/admin/analytics')

  return (
    <div className="relative min-h-screen bg-[#F5ECD5] text-[#626F47] overflow-hidden flex items-center justify-center px-6">
      {/* 🔵 Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#F0BB78] rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#A4B465] rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-[30%] left-[10%] w-[200px] h-[200px] bg-[#626F47] rounded-full opacity-10 blur-2xl" />

      {/* Main Content */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Welcome, Admin 👋
        </h1>
        <p className="text-lg mb-10">
          Manage community ideas and track engagement through analytics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goToExplore}
            className="bg-[#F0BB78] hover:bg-[#A4B465] text-white font-bold px-6 py-3 rounded-xl text-lg transition"
          >
            💡 Explore Ideas
          </button>
          <button
            onClick={goToAnalytics}
            className="bg-[#A4B465] hover:bg-[#626F47] text-white font-bold px-6 py-3 rounded-xl text-lg transition"
          >
            📊 View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
