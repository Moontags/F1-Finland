import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-f1-red">Formula 1</span>
          <span className="text-white"> Finland</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Kaikki F1-data yhdessä paikassa
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors">
            <h2 className="text-2xl font-bold mb-3 text-white">Sarjatilanne</h2>
            <p className="text-gray-400 mb-4">
              Seuraa kuljettajien ja tallien pisteitä
            </p>
            <a
              href="/standings"
              className="inline-block bg-f1-red text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Näytä tilanne
            </a>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors">
            <h2 className="text-2xl font-bold mb-3 text-white">Kuljettajat</h2>
            <p className="text-gray-400 mb-4">
              Tutki F1-kuljettajien tietoja ja tilastoja
            </p>
            <a
              href="/drivers"
              className="inline-block bg-f1-red text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Näytä kuljettajat
            </a>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors">
            <h2 className="text-2xl font-bold mb-3 text-white">Radat</h2>
            <p className="text-gray-400 mb-4">
              Selaa F1-ratoja ja kisatapahtumia
            </p>
            <a
              href="/circuits"
              className="inline-block bg-f1-red text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Näytä radat
            </a>
          </div>
        </div>

       
        
        {/* Suomalaiset kuljettajat - chronological section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6">Suomalaiset kuljettajat</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Keke Rosberg */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/keke.jpeg" alt="Keke Rosberg" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Keke Rosberg (s. 1948)</h3>
                <p className="text-gray-400 text-sm mb-2">Suomen ensimmäinen F1-maailmanmestari (1982). Voittoja ja palkintosijoja 1970- ja 1980-luvuilla.</p>
                <ul className="text-gray-300 text-sm list-disc list-inside">
                  <li>F1 maailmanmestari 1982</li>
                  <li>Useita osakilpailuvoittoja</li>
                </ul>
              </div>
            </div>

            {/* Mika Häkkinen */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/mika.jpeg" alt="Mika Häkkinen" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mika Häkkinen (s. 1968)</h3>
                <p className="text-gray-400 text-sm mb-2">Kaksi kertaa F1-maailmanmestari (1998, 1999) — tunnettu kovasta kilpailutahdostaan ja ikonisesta ajotyylistään.</p>
                <ul className="text-gray-300 text-sm list-disc list-inside">
                  <li>Maailmanmestari 1998, 1999</li>
                  <li>Monet voitot McLarenilla</li>
                </ul>
              </div>
            </div>

            {/* Jukka Järvilehto */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/jj.jpeg" alt="Jukka Järvilehto" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Jukka Järvilehto</h3>
                <p className="text-gray-400 text-sm mb-2">Suomalainen tallipäällikkö ja pitkän linjan moottoriurheilutoimija — tunnettu kehittäjä ja tukija suomalaisille kuljettajille.</p>
              </div>
            </div>

            {/* Kimi Räikkönen */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/kimi.jpeg" alt="Kimi Räikkönen" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Kimi Räikkönen (s. 1979)</h3>
                <p className="text-gray-400 text-sm mb-2">F1-maailmanmestari 2007, pitkä ura useilla talleilla ja yksi kaikkien aikojen suosituimmista kuljettajista.</p>
                <ul className="text-gray-300 text-sm list-disc list-inside">
                  <li>Maailmanmestari 2007</li>
                  <li>Monet palkintosijat ja voitot</li>
                </ul>
              </div>
            </div>

            {/* Heikki Kovalainen */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/heikki.jpeg" alt="Heikki Kovalainen" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Heikki Kovalainen (s. 1981)</h3>
                <p className="text-gray-400 text-sm mb-2">Voittoisen kauden huippu: Grand Prix -voitto Monacossa 2008.</p>
                <ul className="text-gray-300 text-sm list-disc list-inside">
                  <li>F1-voitto: Magny-Cours / Monacon GP - 2008</li>
                </ul>
              </div>
            </div>

            {/* Valtteri Bottas */}
            <div className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src="/valtteri.jpeg" alt="Valtteri Bottas" width={96} height={96} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Valtteri Bottas (s. 1989)</h3>
                <p className="text-gray-400 text-sm mb-2">Menestynyt kuljettaja useilla F1-talleilla; monia podium-sijoituksia ja useita osakilpailuvoittoja.</p>
                <ul className="text-gray-300 text-sm list-disc list-inside">
                  <li>Useita osakilpailuvoittoja</li>
                  <li>Monia podium-sijoituksia Mercedes- ja Alfa Romeo -aikoina</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-sm text-gray-500">
          Powered by <a href="https://openf1.org/" target="_blank" rel="noopener noreferrer" className="text-f1-red hover:underline">OpenF1 API</a>
        </div>
      </div>
    </div>
  );
}
