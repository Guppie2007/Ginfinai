'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { FC } from 'react'

const Header: FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center p-4 gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/Ginfinai_small_nobg.png" alt="logo" className="w-12" />
          <span className="font-semibold text-primary text-lg">GinfinAI</span>
        </Link>
        <button className="ml-auto md:hidden p-2 rounded-md" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <nav className={`md:block ${open ? 'block' : 'hidden'} w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row gap-3 md:items-center md:gap-6 md:ml-6">
            <li><a className="text-primary hover:text-primary/80" href="#home">Home</a></li>
            <li><a className="text-primary hover:text-primary/80" href="#doen">Diensten</a></li>
            <li><a className="text-primary hover:text-primary/80" href="#wiebenik">Wie ben ik?</a></li>
            <li><a className="inline-block bg-primary text-white px-3 py-2 rounded-md" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header