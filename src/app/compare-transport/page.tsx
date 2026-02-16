export default function CompareTransportPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102216] text-[#0d1b12] dark:text-white">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between border-b border-solid border-[#cfe7d7] dark:border-[#1e3a26] bg-white/80 dark:bg-[#102216]/80 backdrop-blur-md px-6 py-4 lg:px-20 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-[#13ec5b]">
            <span className="material-symbols-outlined text-4xl">directions_bus</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Bussresa.ai</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-semibold hover:text-[#13ec5b] transition-colors" href="/">Hem</a>
          <a className="text-sm font-semibold hover:text-[#13ec5b] transition-colors" href="#">Destinationer</a>
          <a className="text-sm font-semibold hover:text-[#13ec5b] transition-colors" href="#">Hållbarhet</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all">Logga in</button>
          <button className="bg-[#13ec5b] text-[#0d1b12] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
            Mina bokningar
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-8 lg:px-20 max-w-[1280px] mx-auto w-full">
        {/* Breadcrumbs & Route Info */}
        <div className="w-full mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4c9a66] mb-4">
            <a className="hover:underline" href="#">Destinationer</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#0d1b12] dark:text-white font-medium">Skara → St. Anton</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">Jämför transport</h1>
              <p className="text-lg text-[#4c9a66] font-medium">Hitta det smartaste och mest prisvärda sättet att nå alperna.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-[#0d1b12] dark:text-white border border-[#cfe7d7] dark:border-[#1e3a26] px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-[#1e3a26] transition-all">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Visa alternativa destinationer
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          {/* BUSS OPTION (FEATURED) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-[#13ec5b] bg-white dark:bg-[#162d1d] p-8 shadow-xl transform md:scale-[1.02] z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#13ec5b] text-[#0d1b12] text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
              Mest prisvärd
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="bg-[#13ec5b]/10 p-3 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-[#13ec5b]">directions_bus</span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-[#4c9a66] uppercase">Operatör</span>
                <span className="text-lg font-bold">Nortlander</span>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-1">BUSS</h3>
              <p className="text-sm text-[#4c9a66] mb-4">Direktresa från Skara</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#13ec5b]">9,990 kr</span>
                <span className="text-sm font-bold text-[#4c9a66]">TOTALT</span>
              </div>
              <p className="text-sm font-medium mt-1">Endast 4,995 kr / person</p>
            </div>
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13ec5b] text-xl">check_circle</span>
                <span className="text-sm">Liftkort för hela veckan inkluderat</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13ec5b] text-xl">check_circle</span>
                <span className="text-sm">Boende i delat dubbelrum</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13ec5b] text-xl">check_circle</span>
                <span className="text-sm">Bagage &amp; skidfrakt ingår</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13ec5b] text-xl">eco</span>
                <span className="text-sm font-semibold">90% lägre CO2-utsläpp</span>
              </div>
            </div>
            <button className="w-full bg-[#13ec5b] text-[#0d1b12] py-4 rounded-xl font-extrabold text-base hover:opacity-90 transition-all shadow-lg">
              Boka nu
            </button>
          </div>

          {/* CAR OPTION */}
          <div className="flex flex-col rounded-2xl border border-[#cfe7d7] dark:border-[#1e3a26] bg-white/50 dark:bg-[#102216] p-8 transition-all hover:border-[#4c9a66]">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-[#cfe7d7] dark:bg-[#1e3a26] p-3 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-[#0d1b12] dark:text-white">directions_car</span>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-1">EGEN BIL</h3>
              <p className="text-sm text-[#4c9a66] mb-4">Roadtrip (ca 18 timmar)</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">21,500 kr</span>
                <span className="text-sm font-bold text-[#4c9a66]">TOTALT</span>
              </div>
              <p className="text-sm font-medium mt-1">Beräknat på 2 personer</p>
            </div>
            <div className="space-y-4 mb-8 flex-1 text-[#4c9a66]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">gas_meter</span>
                <span className="text-sm">Drivmedel &amp; vägtullar (6,500 kr)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">cottage</span>
                <span className="text-sm">Stuguthyrning (12,000 kr)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">payments</span>
                <span className="text-sm">Liftkort tillkommer (3,000 kr)</span>
              </div>
            </div>
            <button className="w-full border-2 border-[#cfe7d7] dark:border-[#1e3a26] text-[#0d1b12] dark:text-white py-4 rounded-xl font-bold text-base hover:bg-white dark:hover:bg-[#1e3a26] transition-all">
              Välj bilalternativ
            </button>
          </div>

          {/* FLIGHT OPTION */}
          <div className="flex flex-col rounded-2xl border border-[#cfe7d7] dark:border-[#1e3a26] bg-white/50 dark:bg-[#102216] p-8 transition-all hover:border-[#4c9a66]">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-[#cfe7d7] dark:bg-[#1e3a26] p-3 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-[#0d1b12] dark:text-white">flight</span>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-1">FLYG + HOTELL</h3>
              <p className="text-sm text-[#4c9a66] mb-4">Från Landvetter flygplats</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">35,000 kr</span>
                <span className="text-sm font-bold text-[#4c9a66]">TOTALT</span>
              </div>
              <p className="text-sm font-medium mt-1">Beräknat på 2 personer</p>
            </div>
            <div className="space-y-4 mb-8 flex-1 text-[#4c9a66]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">flight_takeoff</span>
                <span className="text-sm">Flygbiljetter t/r (14,000 kr)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">airport_shuttle</span>
                <span className="text-sm">Transfer till resort (2,000 kr)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl">hotel</span>
                <span className="text-sm">Hotellvistelse (19,000 kr)</span>
              </div>
            </div>
            <button className="w-full border-2 border-[#cfe7d7] dark:border-[#1e3a26] text-[#0d1b12] dark:text-white py-4 rounded-xl font-bold text-base hover:bg-white dark:hover:bg-[#1e3a26] transition-all">
              Välj flygpaket
            </button>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#13ec5b]/20 border border-[#13ec5b]/30 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="bg-[#13ec5b] p-3 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#0d1b12]">lightbulb</span>
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#0d1b12] dark:text-white">Bussen sparar dig 11,510 kr jämfört med bil!</p>
                <p className="text-sm font-medium text-[#4c9a66]">Inkluderar allt du behöver för en perfekt vecka i St. Anton.</p>
              </div>
            </div>
            <button className="bg-[#0d1b12] dark:bg-white text-white dark:text-[#0d1b12] px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap hover:opacity-90 transition-all">
              Se detaljerad kalkyl
            </button>
          </div>
        </div>

        {/* Visual Divider / Map Placeholder */}
        <div className="w-full mt-12 mb-8 rounded-3xl overflow-hidden h-[300px] relative bg-slate-200 dark:bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-[#13ec5b]/20 to-transparent flex items-center justify-center">
            <div className="text-center p-8 bg-white/80 dark:bg-[#102216]/80 backdrop-blur rounded-2xl border border-white/50">
              <h4 className="text-xl font-black mb-2">Skara ➔ St. Anton</h4>
              <p className="text-sm text-[#4c9a66] font-semibold">Resväg: 1 450 km genom Danmark och Tyskland</p>
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-[#13ec5b] uppercase">Buss</span>
                  <span className="text-lg font-bold">16h</span>
                </div>
                <div className="h-10 w-px bg-[#cfe7d7]"></div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase">Bil</span>
                  <span className="text-lg font-bold">14h</span>
                </div>
                <div className="h-10 w-px bg-[#cfe7d7]"></div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase">Flyg</span>
                  <span className="text-lg font-bold">6h*</span>
                </div>
              </div>
            </div>
          </div>
          <img 
            alt="Route Map" 
            className="w-full h-full object-cover opacity-40 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrTrjCmUQ6L64uSE8OT1nnpu_YTztypUwM65A3nqi9cjEIwCJhvCEvY6lgTJD-ZXNlAZGr2mNwQkBhQ-Zdah4TPmXcqUGWUR9K7dJRQ1cq-OL1jP1CBGte3l1lxo1PpWgXjSyWTrpGUJqRac5S7caMZ9pzjwH6f447RiFt20msSNUV_2lml7TsfNxBDXp2mkW_YtYa1kEyvTX8xBG4GACnvNmDp8UKh6BHNsi6q9JvdYrK_hEG5-QtSdKG2gag6nu9ZYCOrSEk6iXz"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-6 py-12 lg:px-20 border-t border-[#cfe7d7] dark:border-[#1e3a26] bg-white dark:bg-[#102216]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-2xl text-[#13ec5b]">directions_bus</span>
              <h2 className="text-lg font-extrabold tracking-tight">Bussresa.ai</h2>
            </div>
            <p className="text-xs text-[#4c9a66] leading-relaxed">
              Vi hjälper dig att hitta det mest hållbara och ekonomiska sättet att resa till fjällen. Spara pengar och miljö samtidigt.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Tjänster</h4>
            <ul className="text-xs space-y-2 text-[#4c9a66]">
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Sök resa</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Gruppbokning</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Prisgaranti</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Om oss</h4>
            <ul className="text-xs space-y-2 text-[#4c9a66]">
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Vår vision</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Samarbeten</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Support</h4>
            <ul className="text-xs space-y-2 text-[#4c9a66]">
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">FAQ</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Kontakt</a></li>
              <li><a className="hover:text-[#13ec5b] transition-all" href="#">Resevillkor</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-[#cfe7d7] dark:border-[#1e3a26] flex justify-between items-center text-[10px] text-[#4c9a66] uppercase font-bold tracking-widest">
          <span>© 2024 BUSSRESA.AI AB</span>
          <div className="flex gap-6">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
