'use client'
import type { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-gray-50 mt-12 border-t">
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-4 gap-6">
        <div className="space-y-3">
          <img src="/images/Ginfinai_small_nobg.png" alt="logo" className="w-20" />
          <p className="text-sm text-gray-600">Web & AI to infinity and always!</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Menu</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="#home">Home</a></li>
            <li><a href="#doen">Wat kan ik voor u doen?</a></li>
            <li><a href="#wiebenik">Wie ben ik?</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">info@ginfinai.be</p>
          <p className="text-sm">+32 498 42 01 78</p>
          <p className="text-sm">Notestraat 64, 1742 Ternat</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow</h4>
          <div className="flex gap-3 items-center">
            <a aria-label="WhatsApp" href="https://wa.me/+32498420178"><img src="/images/whatsapp.png" className="w-8" /></a>
            <a aria-label="GinfinAI" href="mailto:info@ginfinai.be" className="text-sm">Email us</a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-3">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">© {new Date().getFullYear()} GinfinAI — BTW BE1012.619.721</div>
      </div>
    </footer>
  )
}

export default Footer