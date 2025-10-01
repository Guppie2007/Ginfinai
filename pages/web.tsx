import Head from 'next/head'
import type { NextPage } from 'next'

const Web: NextPage = () => {
  return (
    <>
      <Head>
        <title>GinfinAI - Web</title>
      </Head>

      <section className="py-12 bg-gradient-to-r from-primary/10 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold">Web solutions tailored to you</h2>
          <p className="mt-2 text-gray-600">Choose whether to manage your site yourself or have us build and maintain it.</p>
        </div>
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 py-10">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold">Website in eigen beheer</h3>
            <p className="mt-3 text-gray-600">Wilt u de mogelijkheid om uw website achteraf zelf te beheren en te updaten? Gebruik een CMS zoals WordPress of similar.</p>
            <div className="mt-5">
              <a className="inline-block bg-primary text-white px-4 py-2 rounded" href="mailto:info@ginfinai.be?subject=Website in eigen beheer">Neem contact op!</a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold">Website in ons beheer</h3>
            <p className="mt-3 text-gray-600">Wij bouwen op maat en kunnen uw site hosten en onderhouden zodat u zich op uw core business kan focussen.</p>
            <div className="mt-5">
              <a className="inline-block bg-primary text-white px-4 py-2 rounded" href="mailto:info@ginfinai.be?subject=Website in ons beheer">Neem contact op!</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Web
