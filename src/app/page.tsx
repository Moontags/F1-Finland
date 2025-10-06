'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.3, z: -100 }}
          animate={{ opacity: 1, scale: 1, z: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1],
            opacity: { duration: 0.6 }
          }}
          className="text-6xl font-bold mb-4"
        >
          <span className="text-f1-red">Formula 1</span>
          <span className="text-white"> Finland</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 mb-12"
        >
          Kaikki F1-data yhdessä paikassa
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatedSection delay={0}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors"
            >
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
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors"
            >
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
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors"
            >
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
            </motion.div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0}>
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-6">Suomalaiset kuljettajat</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  img: '/keke.jpeg',
                  name: 'Keke Rosberg',
                  year: 's. 1948',
                  desc: 'Suomen ensimmäinen F1-maailmanmestari (1982). Voittoja ja palkintosijoja 1970- ja 1980-luvuilla.',
                  achievements: ['F1 maailmanmestari 1982', 'Useita osakilpailuvoittoja']
                },
                {
                  img: '/mika.jpeg',
                  name: 'Mika Häkkinen',
                  year: 's. 1968',
                  desc: 'Kaksi kertaa F1-maailmanmestari (1998, 1999) — tunnettu kovasta kilpailutahdostaan ja ikonisesta ajotyylistään.',
                  achievements: ['Maailmanmestari 1998, 1999', 'Monet voitot McLarenilla']
                },
                {
                  img: '/jj.jpeg',
                  name: 'Jukka Järvilehto',
                  year: '',
                  desc: 'Suomalainen tallipäällikkö ja pitkän linjan moottoriurheilutoimija — tunnettu kehittäjä ja tukija suomalaisille kuljettajille.',
                  achievements: []
                },
                {
                  img: '/kimi.jpeg',
                  name: 'Kimi Räikkönen',
                  year: 's. 1979',
                  desc: 'F1-maailmanmestari 2007, pitkä ura useilla talleilla ja yksi kaikkien aikojen suosituimmista kuljettajista.',
                  achievements: ['Maailmanmestari 2007', 'Monet palkintosijat ja voitot']
                },
                {
                  img: '/heikki.jpeg',
                  name: 'Heikki Kovalainen',
                  year: 's. 1981',
                  desc: 'Voittoisen kauden huippu: Grand Prix -voitto Monacossa 2008.',
                  achievements: ['F1-voitto: Magny-Cours / Monacon GP - 2008']
                },
                {
                  img: '/valtteri.jpeg',
                  name: 'Valtteri Bottas',
                  year: 's. 1989',
                  desc: 'Menestynyt kuljettaja useilla F1-talleilla; monia podium-sijoituksia ja useita osakilpailuvoittoja.',
                  achievements: ['Useita osakilpailuvoittoja', 'Monia podium-sijoituksia Mercedes- ja Alfa Romeo -aikoina']
                }
              ].map((driver, index) => (
                <AnimatedSection key={driver.name} delay={index * 0.1}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-dark-gray border border-light-gray rounded-lg p-6 flex items-center space-x-4"
                  >
                    <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src={driver.img} 
                        alt={driver.name} 
                        width={96} 
                        height={96} 
                        className="object-cover w-full h-full" 
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {driver.name} {driver.year}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{driver.desc}</p>
                      {driver.achievements.length > 0 && (
                        <ul className="text-gray-300 text-sm list-disc list-inside">
                          {driver.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          Powered by <a href="https://openf1.org/" target="_blank" rel="noopener noreferrer" className="text-f1-red hover:underline">OpenF1 API</a>
        </motion.div>
      </div>
    </div>
  );
}