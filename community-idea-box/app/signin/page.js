'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Community')

  const handleSignIn = () => {
    // 🔐 Placeholder for future Supabase Auth
    localStorage.setItem('role', role)
    localStorage.setItem('email', email)

    if (role === 'Admin') {
      router.push('/admin/welcome')
    } else {
      router.push('/welcome')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5ECD5] text-[#626F47] p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-3 border border-gray-300 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Community">Community Member</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            onClick={handleSignIn}
            className="w-full bg-[#F0BB78] hover:bg-[#A4B465] text-white font-semibold py-2 rounded"
          >
            Sign In
          </button>

          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-[#A4B465] underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
