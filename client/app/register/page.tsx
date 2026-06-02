"use client"

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <section className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-20 font-sans select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        <a
          href="/"
          className="self-start mb-8 text-[#C4D335] font-medium flex items-center gap-1 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </a>

        <h1 className="text-3xl md:text-4xl font-bold tracking-wide uppercase leading-tight mb-6 text-center">
          Ro'yxatdan o'tish
        </h1>

        <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed text-center">
          Hisob yarating va kompyuter yig'ishni boshlang
        </p>

        <div className="w-full bg-[#D9D9D9] text-black rounded-2xl p-8">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Ism
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#C4D335] focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#C4D335] focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#C4D335] focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#C4D335] focus:outline-none transition-colors bg-white"
              />
            </div>

            <button className="w-full bg-[#C4D335] cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-base mt-4">
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-8 text-center">
          Hisobingiz bormi?{' '}
          <a href="/login" className="text-[#C4D335] font-medium hover:underline">
            Tizimga kiring
          </a>
        </p>
      </div>
    </section>
  )
}
