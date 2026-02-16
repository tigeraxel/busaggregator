export default function Home() {
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e8edf3] dark:border-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight dark:text-white">Bussresa.ai</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-semibold hover:text-primary transition-colors dark:text-gray-300" href="#">Destinationer</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors dark:text-gray-300" href="#">Gruppresor</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors dark:text-gray-300" href="#">Om oss</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-xl transition-all">Logga in</button>
            <button className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">Skapa konto</button>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
          <div className="max-w-5xl mx-auto px-6 text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-[#0e141b] dark:text-white mb-6 leading-[1.1] tracking-tight">
              Hitta den perfekta <span className="text-primary">gruppresan</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Upplev smidiga bussresor till fjällen och alperna med hela gänget. Vi samlar marknadens bästa priser och rutter på ett ställe.
            </p>
          </div>

          {/* Advanced Search Card */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white dark:bg-[#1a232e] rounded-xl shadow-[0_20px_25px_-5px_rgba(72,145,229,0.1),0_10px_10px_-5px_rgba(72,145,229,0.04)] p-4 md:p-8 border border-gray-100 dark:border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Passengers Counter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Hur många är ni?</label>
                  <div className="flex items-center justify-between h-14 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-primary/20 rounded-xl px-4">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-[#252f3d] border border-gray-200 dark:border-primary/30 text-primary hover:bg-gray-50">
                      <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <span className="text-lg font-bold dark:text-white">12</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-[#252f3d] border border-gray-200 dark:border-primary/30 text-primary hover:bg-gray-50">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                </div>

                {/* Origin Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Vart utgår ni ifrån?</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                    <input 
                      className="w-full h-14 pl-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder:text-gray-400" 
                      placeholder="t.ex. Skara" 
                      type="text"
                    />
                  </div>
                </div>

                {/* Destination Dropdown */}
                <div className="flex flex-col gap-2 md:col-span-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Vart vill ni åka?</label>
                  <div className="relative group">
                    <button className="w-full h-14 px-4 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-primary/20 rounded-xl flex items-center justify-between text-gray-400">
                      <span>Välj destination...</span>
                      <span className="material-symbols-outlined">expand_more</span>
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <button className="w-full h-14 bg-primary text-white font-extrabold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-transform active:scale-95">
                  <span className="material-symbols-outlined">search</span>
                  Sök resor
                </button>
              </div>
            </div>

            {/* Secondary Exploration Action */}
            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1a232e] border border-primary/20 text-primary font-semibold text-sm hover:bg-primary/5 transition-all">
                <span className="material-symbols-outlined text-lg">travel_explore</span>
                Visa alternativa destinationer med olika transportalternativ för mig
              </button>
            </div>
          </div>
        </section>

        {/* Discovery Sections */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0e141b] dark:text-white mb-2">Utforska Destinationer</h2>
              <p className="text-gray-500 dark:text-gray-400">Handplockade resor för stora grupper</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-1 hover:underline">
              Se alla
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section: Svenska Fjällen */}
            <div className="flex flex-col gap-6">
              <div className="relative h-64 rounded-xl overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEHthHsrkIYnB4T_ijiOsPNMhTOZg2H3efvvq66AtmkQpzDXwd-IQsNr3Rlki9rGV7UH3RYWywAmXM9PZulcOd0vDtLosSRBfQ-Q2iERUoukF5DS1OxLn5FNJA4QvX4cMh4gIgkN8-uJzJTV-JizVreU3NwNwuD5iGzY4MqeFFumbCg3kPwsqqhvRaNyfVrxdR0y2Ne_DSmsmscaWphkR5qcfnhvTw8l1HqYEyefUrOObH8AUjHBh4EmvOJWyZSLE7MeDnoiXsYtlb')"}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-black text-white">Svenska Fjällen</h3>
                  <p className="text-white/80 text-sm font-medium">Upptäck Norra &amp; Mellersta Sverige</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Provider Card */}
                <div className="bg-white dark:bg-[#1a232e] p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-background-dark rounded-lg flex items-center justify-center font-black text-primary italic">VY</div>
                    <div>
                      <h4 className="font-bold dark:text-white">Vy Bus4You</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="font-bold">4.8</span>
                        <span className="text-gray-400 font-normal ml-1">(2.1k omdömen)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Från</p>
                    <p className="text-lg font-black text-primary">499 kr</p>
                  </div>
                </div>

                {/* Provider Card */}
                <div className="bg-white dark:bg-[#1a232e] p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-background-dark rounded-lg flex items-center justify-center font-black text-green-500 italic">FB</div>
                    <div>
                      <h4 className="font-bold dark:text-white">FlixBus</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="font-bold">4.2</span>
                        <span className="text-gray-400 font-normal ml-1">(5.4k omdömen)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Från</p>
                    <p className="text-lg font-black text-primary">349 kr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Alperna */}
            <div className="flex flex-col gap-6">
              <div className="relative h-64 rounded-xl overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAo-W2vVnQarSSBeEhBlyj6G4VkuWHNUi7ZKudrX5Mt-bYFHcTyVxlNxUfJwxnKlKknEv9h3p7gVCoKL5yjRP-RHKS4HATO0es_Q2oRaeFuIFTXtp5bABqLdZN-xJd2FwKWos8dwPABFWIW4OuZTDWQkESKigDN-ZCVPhDU5H6gwYNoeEoIQ18YdAUH6BDiU5fehHvtnmZGy9RljN2sRl8FPIxU_vLPPAry-8Pubt4DmfwBSttrqZsUxHy5Eh3qxXmMiLTeYRPJ9_Me')"}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-black text-white">Alperna</h3>
                  <p className="text-white/80 text-sm font-medium">Italien, Österrike &amp; Frankrike</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Provider Card */}
                <div className="bg-white dark:bg-[#1a232e] p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-background-dark rounded-lg flex items-center justify-center font-black text-blue-800 italic">EB</div>
                    <div>
                      <h4 className="font-bold dark:text-white">EuroBus Express</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="font-bold">4.9</span>
                        <span className="text-gray-400 font-normal ml-1">(850 omdömen)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Från</p>
                    <p className="text-lg font-black text-primary">1 290 kr</p>
                  </div>
                </div>

                {/* Provider Card */}
                <div className="bg-white dark:bg-[#1a232e] p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-background-dark rounded-lg flex items-center justify-center font-black text-red-600 italic">AT</div>
                    <div>
                      <h4 className="font-bold dark:text-white">Alpine Travel Co.</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="font-bold">4.5</span>
                        <span className="text-gray-400 font-normal ml-1">(1.2k omdömen)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Från</p>
                    <p className="text-lg font-black text-primary">1 450 kr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24 bg-primary/10 dark:bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-6 dark:text-white">Redo att planera nästa äventyr?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">Få exklusiva erbjudanden för gruppresor direkt i din inkorg. Ingen spam, bara reseglädje.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                className="flex-1 h-14 px-6 bg-white dark:bg-background-dark border border-gray-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" 
                placeholder="Din e-postadress" 
                type="email"
              />
              <button className="h-14 px-8 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Prenumerera
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-lg font-extrabold tracking-tight dark:text-white">Bussresa.ai</h2>
              </div>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed dark:text-gray-400">
                Vi gör det enklare för föreningar, skolor och kompisgäng att boka och njuta av smidiga bussresor över hela Europa.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 dark:text-white">Länkar</h4>
              <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <li><a className="hover:text-primary transition-colors" href="#">Hem</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Sök resa</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Hållbarhet</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 dark:text-white">Följ oss</h4>
              <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Facebook</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Twitter (X)</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 dark:border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">© 2024 Bussresa.ai - Alla rättigheter reserverade.</p>
            <div className="flex items-center gap-6">
              <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Användarvillkor</a>
              <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Integritetspolicy</a>
              <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
