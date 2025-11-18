import { useEffect, useState } from 'react'

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
    {subtitle && <p className="text-slate-600 dark:text-slate-300 mt-2">{subtitle}</p>}
  </div>
)

const ProductCard = ({ p }) => (
  <div className="group rounded-xl border border-slate-200/50 bg-white/70 dark:bg-slate-800/70 p-4 shadow-sm hover:shadow-md transition-all">
    <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
      <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800'} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
    </div>
    <div className="mt-3">
      <h4 className="font-semibold text-slate-800 dark:text-white line-clamp-1">{p.title}</h4>
      <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-slate-900 dark:text-white">${p.price}</span>
        <span className={`text-xs px-2 py-1 rounded ${p.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{p.in_stock ? 'In stock' : 'Out of stock'}</span>
      </div>
    </div>
  </div>
)

const VendorCard = ({ v }) => (
  <div className="rounded-xl border border-slate-200/50 bg-white/70 dark:bg-slate-800/70 p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <img src={v.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(v.name)}`} alt={v.name} className="h-12 w-12 rounded-full" />
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 dark:text-white">{v.name}</h4>
        <p className="text-xs text-slate-500">{v.location || 'Worldwide'}</p>
      </div>
      {v.verified && <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Verified</span>}
    </div>
    {v.bio && <p className="text-sm text-slate-600 mt-3 line-clamp-2">{v.bio}</p>}
  </div>
)

export default function Homepage() {
  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/products?limit=8`).then(r => r.json()).then(d => setProducts(d.items || []))
    fetch(`${baseUrl}/api/vendors?limit=6`).then(r => r.json()).then(d => setVendors(d.items || []))
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_30%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">The marketplace where great products meet great vendors</h1>
            <p className="mt-4 text-blue-100">Discover trending items across categories from verified sellers. Join as a vendor and reach customers worldwide.</p>
            <div className="mt-6 flex gap-3">
              <a href="/products" className="px-5 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50">Shop products</a>
              <a href="#become-vendor" className="px-5 py-3 border border-white/70 rounded-lg font-semibold hover:bg-white/10">Become a vendor</a>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Trending products" subtitle="Handpicked items from our community" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Vendors */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Featured vendors" subtitle="All vendors are verified for quality and reliability" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vendors.map(v => <VendorCard key={v.id} v={v} />)}
          </div>
        </div>
      </section>

      {/* CTA Become vendor */}
      <section id="become-vendor" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Open your storefront in minutes</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Start selling to a global audience with zero upfront costs. We handle the heavy lifting so you can focus on your products.</p>
          <a href="#newsletter" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Get started</a>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Why choose us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[['Verified vendors','Each seller is vetted for quality'],['Buyer protection','Secure checkout and refunds'],['Fast shipping','Reliable logistics partners'],['24/7 support','We’re here whenever you need us']].map(([t,s]) => (
              <div key={t} className="rounded-xl border border-slate-200/60 p-5 bg-white/70 dark:bg-slate-800/70">
                <h4 className="font-semibold text-slate-800 dark:text-white">{t}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Join our newsletter</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Get product drops, vendor stories, and exclusive deals.</p>
          <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks for subscribing!')}} className="mt-6 flex rounded-lg overflow-hidden border border-slate-200">
            <input type="email" required placeholder="you@example.com" className="flex-1 px-4 py-3 outline-none" />
            <button className="px-5 bg-blue-600 text-white font-semibold">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold">MV</span>
              <span className="font-semibold">MultiVendor</span>
            </div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} MultiVendor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
