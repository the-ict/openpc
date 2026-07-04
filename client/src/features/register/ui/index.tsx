"use client"

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRegister } from '../lib/hooks'
import user_store from '@/src/shared/store/user.store'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { mutateAsync: register_mutation, isPending: register_loading } = useRegister();
  const router = useRouter();

  const {token} = user_store.getState();

  if(token.length > 0) router.push("/");
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
            <button disabled={register_loading} onClick={() => window.location.replace("http://localhost:3001/api/auth/google")} className="w-full cursor-pointer bg-white border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors duration-200 text-base flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google bilan ro'yxatdan o'tish
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">yoki</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

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

            <button disabled={register_loading} onClick={async () => await register_mutation({ name, email, password })} className="w-full bg-[#C4D335] cursor-pointer text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b3c22e] transition-colors duration-200 text-base mt-4 flex items-center justify-center gap-4">
              {register_loading && <svg aria-hidden="true" className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>} Ro'yxatdan o'tish
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
