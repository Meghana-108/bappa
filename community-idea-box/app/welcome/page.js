'use client'

import { useRouter } from 'next/navigation'


export default function WelcomePage() {
  const router = useRouter()

  const handleExplore = () => {
    router.push('/explore')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="relative min-h-screen bg-[#F5ECD5] text-[#626F47] overflow-hidden flex items-center justify-center px-6">
      {/* 🔘 Logout button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* 🔵 Abstract blobs / background shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#F0BB78] rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#A4B465] rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-[30%] left-[10%] w-[200px] h-[200px] bg-[#626F47] rounded-full opacity-10 blur-2xl"></div>

      {/* 🧠 Main content */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Welcome to the Community Idea Box 🎉
        </h1>
        <p className="text-lg mb-10">
          Share your ideas. Vote on what matters. Make change happen together!
        </p>
        <button
          onClick={handleExplore}
          className="bg-[#F0BB78] hover:bg-[#A4B465] text-white font-bold px-6 py-3 rounded-xl text-lg transition"
        >
          🚀 Explore Ideas
        </button>
      </div>
    </div>
  )
}
