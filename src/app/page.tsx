import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Trip images mapping based on destination
const tripImages: Record<string, string> = {
  "Åre": "https://lh3.googleusercontent.com/aida-public/AB6AXuAwsXvPapZyX8pOTuMQJuSDHnVh880Kui3OicqCVIicx3X-XhoXe1nuq5auWL1dEQSEK3hCbnk5ssecUV-rUtBqLrkzHfy5x8QaRUkZT7AfP9BuVtUqTcmE5BMklm_c085I69Trs-7cWWAkuBSQ5Hgny9anzuPUwqLoyseRFkEowzLNMTDvTbK-dPEg3G-0JyV7xgDFQspgvou1sV_MWmu_IFaIZ4imaGbcs-Cpe06hIwOI3fa_pScC3DAaRn3S558AyokMkfFbHX3D",
  "Sälen": "https://lh3.googleusercontent.com/aida-public/AB6AXuBOY7s8PPxcz3qHUGqlxWiMR25BuPpoH8daJtIbu3tlOB8bP_yGMnbVK6ZFoKTTSQwWrOUCVARh8v39OgpiXc7dVm8PvLKfOsgFa6JS3VR53ByAWIkJ04dVpdTKo2TkDn2uopzh-UcO-Pgey0XUgU4-NVEmc-xiS7B3g0lUsDCDDC8siq_3OSX6430Vx_tPFqsydWu8Pr0WBbDzr-VaHTFL9EovpPRKpxKSli4fz4fhFQ3JgqVkg20AVy3h4ZPxunYqjWVfeWyCZktR",
  "Vemdalen": "https://lh3.googleusercontent.com/aida-public/AB6AXuAUf2I7zmD7ljRNkj8XxGmsyb-zg_0mAY6JGzEK92D79HLzR3GNgC3yxsW4Jj0R8t3-wwShdI2EmE5Yiiy2B0fuOBySg0MV8mnFodCh_IXdo1VLByOqsPw5KkJmCSntjYmVkj_N8m5ji9SjPFbFD6o-NEMGXZWDL4HDbsupCxUnfjSLPLThucxoCpAxzM9gBAj13UYHp4QbHCqZVxcNnTTb4ob-iQW6MArMFcRXXOqrOpn4vxJ8cOIrOgPYUiT-Nesz9F5wD_17eCLG",
  "Idre": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKHVTzcB8aDe8X-IgugpfHrMKEJWGP-JRGj_roeGETvcB_vttgVNsIa4FAomFxE0I-rPIv-7gCwF2zmeYkmXSq99Hdbk9wI_awmEU220v2PjEWSOBlSab8n0oXaYt4O-q9BEeCpKjEqA9su3QooZUpPeG53peEjbLCIsi11cdzQU5AKv30_8FNACF0OsirWqaXEszah0ekt3JHkMvwyIj4uCSEJcJ6b6y9HiLe05XDJ_ZwtBT62axDFLaRXClPT-1UhJX-c8mv4WuT",
  "St. Anton": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBcyWxKCEqFAwmjYykRwI6tXtJbs5P6CqmGLAp85Y2y8Fz-q4YBSuQEQp1x3qsoxPdhPNFHP7-d4m1SGBnpG1Tw2XrlMPxcR9h_vNkUqW6rCrf92lWQQ4P3XNVxZJq0zP_zaEpLzMzn23xmsUerp9uYUdWeoNah0rvv0mgxoW6nZzkZWGB-vFINGdYSQOURjEEefgTqwr-kOu8XIof70N4Fj1kzrYoddHLqv5EgcDfi-k86h5cS9dz7SeEG7ADDRIKzbv6k3b4q1ao",
  "Val di Sole": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9P0UV5gWhEkVSLDMhsp7XF_0lP00KU2FZmZk1T5KXJ-hTHLrhDIoYTx3PbGBUGCRjyV-cDUNkARQbNKHiJ0ZzaJRhVJKiLq-a4p9WdRMqIMaUbJKdxekIFsmNkqAGQhttedrf_mFHrcr-1zZ7B6Gp-mjLIw99QQabj7TvZCdTuC1aOknHsQz1PXbfenGiJaIeld81-qEbGa1HRZq8BJnc0Z68NZ9JuISGt_du8w7GhA6vEZQ59pc7VR_SecyGbpr5nZ5G0lqd7fGq",
  "Kirchberg": "https://lh3.googleusercontent.com/aida-public/AB6AXuDK3gwAUi9mgwPPV5HlYH7wFi5VZBzUnvuzcNrZrXe0kNeFN2KRRfJYijhiEJaco76ZldCQCgLpT31E0fyt5PCtCfZd7tZYwiZvvHjSviFhIuHcJ8hYpo_X5pzyGkA1Ebp6-HJ43lnaZzHpI9vx1sbmCgAJ7l3C7vyPtzocVaEbHX0o7kCKjGvbeofAvLL7-k4GfEduoyN7FsTy8PT1Tw5fl0WhLUrRrKF6xVTxue1Ci1Gs9oGAnB4TeddnLASGmRhxGqrlVRhYEDvQ",
  "Zillertal": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9P0UV5gWhEkVSLDMhsp7XF_0lP00KU2FZmZk1T5KXJ-hTHLrhDIoYTx3PbGBUGCRjyV-cDUNkARQbNKHiJ0ZzaJRhVJKiLq-a4p9WdRMqIMaUbJKdxekIFsmNkqAGQhttedrf_mFHrcr-1zZ7B6Gp-mjLIw99QQabj7TvZCdTuC1aOknHsQz1PXbfenGiJaIeld81-qEbGa1HRZq8BJnc0Z68NZ9JuISGt_du8w7GhA6vEZQ59pc7VR_SecyGbpr5nZ5G0lqd7fGq",
  "Trysil": "https://lh3.googleusercontent.com/aida-public/AB6AXuAwsXvPapZyX8pOTuMQJuSDHnVh880Kui3OicqCVIicx3X-XhoXe1nuq5auWL1dEQSEK3hCbnk5ssecUV-rUtBqLrkzHfy5x8QaRUkZT7AfP9BuVtUqTcmE5BMklm_c085I69Trs-7cWWAkuBSQ5Hgny9anzuPUwqLoyseRFkEowzLNMTDvTbK-dPEg3G-0JyV7xgDFQspgvou1sV_MWmu_IFaIZ4imaGbcs-Cpe06hIwOI3fa_pScC3DAaRn3S558AyokMkfFbHX3D",
};

function getImageForTrip(destination: string): string {
  // Find matching image based on destination name
  for (const [key, url] of Object.entries(tripImages)) {
    if (destination.includes(key)) {
      return url;
    }
  }
  // Default fallback image
  return "https://lh3.googleusercontent.com/aida-public/AB6AXuAwsXvPapZyX8pOTuMQJuSDHnVh880Kui3OicqCVIicx3X-XhoXe1nuq5auWL1dEQSEK3hCbnk5ssecUV-rUtBqLrkzHfy5x8QaRUkZT7AfP9BuVtUqTcmE5BMklm_c085I69Trs-7cWWAkuBSQ5Hgny9anzuPUwqLoyseRFkEowzLNMTDvTbK-dPEg3G-0JyV7xgDFQspgvou1sV_MWmu_IFaIZ4imaGbcs-Cpe06hIwOI3fa_pScC3DAaRn3S558AyokMkfFbHX3D";
}

export default async function Home() {
  // Fetch trips from database
  const trips = await prisma.trip.findMany({
    where: {
      isActive: true,
    },
    include: {
      company: true,
    },
    orderBy: {
      price: 'asc',
    },
    take: 6, // Show first 6 trips on homepage
  });

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-icons-outlined text-white">directions_bus</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bussresa<span className="text-primary">.ai</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a className="hover:text-primary transition-colors" href="#">Destinationer</a>
            <a className="hover:text-primary transition-colors" href="#">Bussbolag</a>
            <a className="hover:text-primary transition-colors" href="#">Om oss</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Logga in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-32 overflow-hidden">
        {/* Mountain Silhouette Placeholder via Gradient/Mask */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-background-light dark:to-background-dark opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
            Hitta din nästa <span className="text-primary">skidresa</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Vi samlar Sveriges populäraste skidbussar på ett och samma ställe. Boka tryggt, enkelt och hållbart.
          </p>

          {/* Search Card */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-2xl shadow-primary/10 max-w-5xl mx-auto border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Från stad</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Stockholm" 
                    type="text"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Till destination</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">landscape</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Åre, Sälen..." 
                    type="text"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Vecka</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">calendar_today</span>
                  <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none">
                    <option>Välj vecka</option>
                    <option>Vecka 7</option>
                    <option>Vecka 8</option>
                    <option>Vecka 9</option>
                    <option>Vecka 10</option>
                  </select>
                </div>
              </div>

              <button className="bg-primary text-white h-[52px] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                <span className="material-icons-outlined">search</span>
                Sök resor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-10">
        {/* Filter Chips */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2 whitespace-nowrap">Bussbolag:</span>
          <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap">Alla resor</button>
          <button className="px-5 py-2 bg-white dark:bg-slate-800 border border-primary/10 rounded-full text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Fjällexpressen</button>
          <button className="px-5 py-2 bg-white dark:bg-slate-800 border border-primary/10 rounded-full text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Härjedalingen</button>
          <button className="px-5 py-2 bg-white dark:bg-slate-800 border border-primary/10 rounded-full text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">FlixBus</button>
          <button className="px-5 py-2 bg-white dark:bg-slate-800 border border-primary/10 rounded-full text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">MasExpressen</button>
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => {
            const departureCities = JSON.parse(trip.departureCities);
            const includes = trip.includes ? JSON.parse(trip.includes) : [];
            const firstDepartureCity = departureCities[0] || "Olika avgångsorter";
            
            return (
              <Link 
                key={trip.id} 
                href={`/trip/${trip.id}`}
                className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/5"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={trip.destination}
                    src={getImageForTrip(trip.destination)}
                  />
                  {trip.weekNumber && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold tracking-tighter">
                      VECKA {trip.weekNumber}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow-md">
                    <div className="text-[10px] font-bold text-slate-400 leading-none">BOLAG</div>
                    <div className="text-primary font-black text-sm italic uppercase">
                      {trip.company.name}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {trip.destination}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Från {firstDepartureCity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-success">
                        {Math.round(trip.price).toLocaleString()} kr
                      </span>
                      <p className="text-[10px] text-slate-400 font-bold">PRIS PER PERSON</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800 mb-6">
                    {includes.slice(0, 4).map((_: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1 text-slate-400" title={includes[idx]}>
                        <span className="material-icons-outlined text-sm">
                          {idx === 0 ? 'wifi' : idx === 1 ? 'restaurant' : idx === 2 ? 'directions_bus' : 'wc'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="w-full py-4 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                    Visa resa
                    <span className="material-icons-outlined text-lg">chevron_right</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="bg-white dark:bg-slate-900 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
            Visa fler resor
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-primary/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1 rounded-lg">
                <span className="material-icons-outlined text-white text-sm">directions_bus</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Bussresa<span className="text-primary">.ai</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Sveriges ledande aggregator för skidresor med buss. Vi hjälper dig att hitta de bästa priserna och de mest bekväma resorna till fjällen.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Destinationer</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Resor till Åre</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Resor till Sälen</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Resor till Vemdalen</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Resor till Idre Fjäll</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Företaget</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Om Bussresa.ai</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Hållbarhet</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Jobba hos oss</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Hjälp</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Kundservice</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Vanliga frågor</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Resevillkor</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integritetspolicy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© 2024 Bussresa.ai Scandinavia AB. Alla rättigheter reserverade.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-600" href="#">Facebook</a>
            <a className="hover:text-slate-600" href="#">Instagram</a>
            <a className="hover:text-slate-600" href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
