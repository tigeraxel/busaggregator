export default function MultimodalComparePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8f8] dark:bg-[#10221f] text-[#0d1b19]">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-solid border-[#cfe7e3] bg-white/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[#13ecc8]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Bussresa.ai</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold hover:text-[#13ecc8] transition-colors" href="/">Sök Resa</a>
            <a className="text-sm font-semibold hover:text-[#13ecc8] transition-colors" href="#">Mina Bokningar</a>
            <a className="text-sm font-semibold hover:text-[#13ecc8] transition-colors" href="#">Erbjudanden</a>
            <button className="bg-[#13ecc8] hover:bg-[#0fd9b7] text-[#0d1b19] px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm">
              Logga in
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-12">
        {/* Hero Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Multimodala Reseförslag</h1>
          <p className="text-lg text-[#4c9a8d] max-w-2xl">
            Vi har hittat tre unika resealternativ för din skidresa. Jämför bekvämlighet, klimatavtryck och pris mellan buss, bil och flyg.
          </p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 bg-[#13ecc8] px-5 py-2 rounded-full font-bold text-sm">
              <span className="material-symbols-outlined text-lg">calendar_today</span> Vecka 9
            </button>
            <button className="flex items-center gap-2 bg-[#13ecc8]/10 border border-[#13ecc8]/20 px-5 py-2 rounded-full font-bold text-sm text-[#4c9a8d] hover:bg-[#13ecc8]/20 transition-all">
              Vecka 10
            </button>
            <button className="flex items-center gap-2 bg-[#13ecc8]/10 border border-[#13ecc8]/20 px-5 py-2 rounded-full font-bold text-sm text-[#4c9a8d] hover:bg-[#13ecc8]/20 transition-all">
              Vecka 11
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Package 1: BUSS */}
          <div className="flex flex-col bg-white rounded-xl shadow-xl shadow-[#cfe7e3]/50 border border-[#cfe7e3] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div 
              className="relative h-56 w-full bg-center bg-cover" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaSoiGolRAniDNxUNXUAyDYqQcvWGZX52UXKUBMAs8UPSuujRNzSRIyoSi6uGKVdg3S0UC6gIgCB59VWPCuanPF5404Y-fpSapXsOpUd_ZnpzecDOa2DgYHI_9FsnBohWwA-5bEhk00BC9WqJ9aaJ4WhfseftQ_bSIfBKOavLUZwDls_M7FmL_xxgAtYcwIp1MmeCwXZR95O3-q_ZCOdq3yu-1ILzdhCSURHXUGk1jju4wgXcApXvM0reQYJQFB0CdzQPNzSRtp9KD')"}}
            >
              <div className="absolute top-4 left-4 bg-[#13ecc8] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-sm">directions_bus</span> Buss
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-extrabold mb-1">Åre, Sverige</h3>
                <p className="text-[#4c9a8d] text-sm font-medium">Arrangör: Nortlander</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">airport_shuttle</span>
                  <div>
                    <p className="text-sm font-bold">Lyxbuss tur &amp; retur</p>
                    <p className="text-xs text-[#4c9a8d]">Ergonomiska säten &amp; WiFi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">confirmation_number</span>
                  <div>
                    <p className="text-sm font-bold">Liftkort Ingår</p>
                    <p className="text-xs text-[#4c9a8d]">Gäller hela Vecka 9</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">eco</span>
                  <div>
                    <p className="text-sm font-bold">Lågt CO2 avtryck</p>
                    <p className="text-xs text-[#4c9a8d]">Klimatsmartaste valet</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-[#cfe7e3]">
                <p className="text-xs text-[#4c9a8d] uppercase font-bold tracking-widest mb-1">Pris per person</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">4 200</span>
                  <span className="text-lg font-bold">kr</span>
                </div>
                <button className="w-full mt-6 bg-[#13ecc8] hover:bg-[#0fd9b7] py-3 rounded-lg font-bold text-sm transition-all shadow-md">
                  Välj Bussresa
                </button>
              </div>
            </div>
          </div>

          {/* Package 2: BIL */}
          <div className="flex flex-col bg-white rounded-xl shadow-xl shadow-[#cfe7e3]/50 border border-[#cfe7e3] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div 
              className="relative h-56 w-full bg-center bg-cover" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSbAoGoEB9fzw506nS1zvF2o0aSO12FYsAVeFIdcFjrMSZqtaO-qRdT2-cCxVlrzfr8eCcx09HId3PZgH-vnaJvuxNoCBVPLS-ON5jk3nKkj4CDZXuC4NNrYxBiQYMstL-intnGW0SFpNNipNpAtPq5mteGWvgDnNqdnZi2vPzewoXiY6Sgv5BPG0CrIoN7kvnoNxbK3ZmPiZRpIjZB_mUPsLaKWX7c187437OXx_-o2zjmTIjny9NY11XQHyOKtgzvsacAMrSzJrO')"}}
            >
              <div className="absolute top-4 left-4 bg-[#13ecc8] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-sm">directions_car</span> Bil
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-extrabold mb-1">Hemsedal, Norge</h3>
                <p className="text-[#4c9a8d] text-sm font-medium">Boende: Mysig timmerstuga</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">local_gas_station</span>
                  <div>
                    <p className="text-sm font-bold">Bränslekostnad (Skara)</p>
                    <p className="text-xs text-[#4c9a8d]">Beräknat t/r inkl. tullar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">cleaning_services</span>
                  <div>
                    <p className="text-sm font-bold">Slutstädning Ingår</p>
                    <p className="text-xs text-[#4c9a8d]">Bekymmersfritt avresa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">group</span>
                  <div>
                    <p className="text-sm font-bold">Flexibilitet</p>
                    <p className="text-xs text-[#4c9a8d]">Eget schema &amp; packning</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-[#cfe7e3]">
                <p className="text-xs text-[#4c9a8d] uppercase font-bold tracking-widest mb-1">Pris per person</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">8 500</span>
                  <span className="text-lg font-bold">kr</span>
                </div>
                <button className="w-full mt-6 bg-[#13ecc8] hover:bg-[#0fd9b7] py-3 rounded-lg font-bold text-sm transition-all shadow-md">
                  Välj Bilresa
                </button>
              </div>
            </div>
          </div>

          {/* Package 3: FLYG */}
          <div className="flex flex-col bg-white rounded-xl shadow-xl shadow-[#cfe7e3]/50 border border-[#cfe7e3] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div 
              className="relative h-56 w-full bg-center bg-cover" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvyb0JTtFqTgfgwsVl-bafZnzfULe2Tvl5g-v7dFSBPLqvesWAjT0Bgn0uAszOcZu2OB075neTIipYvsmml1AokElPV0b1qSxWLxjKkGRlB9UJL8caG_fXBhQTrDwgZQedvA_kzqDS7iAa0SgLfu_Xzu7fb05MRUnDXSCh-6gfWLlL_DXJoCYkIgLZwwMG3EoVr-WrTLzdB2s6te6iZLu7YpZTBRq94bCVzSabo26Khf8zQdttgKq6DRH0Kg03TGEY3xGeiCPhH4cM')"}}
            >
              <div className="absolute top-4 left-4 bg-[#13ecc8] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-sm">flight</span> Flyg
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-extrabold mb-1">Val Thorens, Frankrike</h3>
                <p className="text-[#4c9a8d] text-sm font-medium">Hotell: Ski-in Ski-out</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">flight_takeoff</span>
                  <div>
                    <p className="text-sm font-bold">Flyg från Landvetter</p>
                    <p className="text-xs text-[#4c9a8d]">Direktflyg till Lyon/Grenoble</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">restaurant</span>
                  <div>
                    <p className="text-sm font-bold">Frukostbuffé Ingår</p>
                    <p className="text-xs text-[#4c9a8d]">Varje morgon på hotellet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#13ecc8]">transfer_within_a_station</span>
                  <div>
                    <p className="text-sm font-bold">Privat Transfer</p>
                    <p className="text-xs text-[#4c9a8d]">Från flygplats till dörr</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-[#cfe7e3]">
                <p className="text-xs text-[#4c9a8d] uppercase font-bold tracking-widest mb-1">Pris per person</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">12 900</span>
                  <span className="text-lg font-bold">kr</span>
                </div>
                <button className="w-full mt-6 bg-[#13ecc8] hover:bg-[#0fd9b7] py-3 rounded-lg font-bold text-sm transition-all shadow-md">
                  Välj Flygresa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table (Simplified for Scandi feel) */}
        <div className="mt-20">
          <h2 className="text-2xl font-black mb-8">Snabbjämförelse</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#13ecc8]/20">
                  <th className="py-4 px-6 text-sm font-bold text-[#4c9a8d] uppercase tracking-wider">Egenskap</th>
                  <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider">🚌 Buss</th>
                  <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider">🚗 Bil</th>
                  <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider">✈️ Flyg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cfe7e3]">
                <tr>
                  <td className="py-4 px-6 font-bold text-sm">Restid</td>
                  <td className="py-4 px-6 text-sm">~10 timmar</td>
                  <td className="py-4 px-6 text-sm">~8 timmar</td>
                  <td className="py-4 px-6 text-sm">~5 timmar (totalt)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-sm">Flexibilitet</td>
                  <td className="py-4 px-6 text-sm">Låg (Fasta tider)</td>
                  <td className="py-4 px-6 text-sm">Hög (Valfria stopp)</td>
                  <td className="py-4 px-6 text-sm">Medium (Transfertider)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-sm">Bagage</td>
                  <td className="py-4 px-6 text-sm">Ingår (Skidutrustning)</td>
                  <td className="py-4 px-6 text-sm">Obegränsat (Takbox)</td>
                  <td className="py-4 px-6 text-sm">Avgift för skidor</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-sm">Hållbarhet</td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex gap-1 text-[#13ecc8]">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex gap-1 text-[#13ecc8]">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex gap-1 text-[#13ecc8]">
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#cfe7e3] py-12 px-6 md:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-6 text-[#13ecc8]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">Bussresa.ai</h2>
            </div>
            <p className="text-sm text-[#4c9a8d] max-w-sm">Din smarta guide till fjällresan. Vi jämför alla resesätt så du kan fokusera på åkningen.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Länkar</h4>
            <ul className="space-y-2 text-sm text-[#4c9a8d]">
              <li><a className="hover:text-[#13ecc8]" href="#">Om oss</a></li>
              <li><a className="hover:text-[#13ecc8]" href="#">Press</a></li>
              <li><a className="hover:text-[#13ecc8]" href="#">Partnerprogram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#4c9a8d]">
              <li><a className="hover:text-[#13ecc8]" href="#">Kundservice</a></li>
              <li><a className="hover:text-[#13ecc8]" href="#">Avbokningsvillkor</a></li>
              <li><a className="hover:text-[#13ecc8]" href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#cfe7e3] flex flex-col md:flex-row justify-between gap-4 text-xs text-[#4c9a8d]">
          <p>© 2024 Bussresa.ai - Alla rättigheter reserverade.</p>
          <div className="flex gap-6">
            <a className="hover:text-[#13ecc8]" href="#">Integritetspolicy</a>
            <a className="hover:text-[#13ecc8]" href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
