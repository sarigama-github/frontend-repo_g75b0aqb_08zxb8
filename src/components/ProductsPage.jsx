import { useEffect, useMemo, useState } from 'react'

export default function ProductsPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ category: '', q: '', in_stock: '', min_price: '', max_price: '' })
  const limit = 12

  const fetchProducts = async () => {
    const params = new URLSearchParams()
    params.set('page', page)
    params.set('limit', limit)
    if (filters.category) params.set('category', filters.category)
    if (filters.q) params.set('q', filters.q)
    if (filters.in_stock !== '') params.set('in_stock', filters.in_stock)
    if (filters.min_price) params.set('min_price', filters.min_price)
    if (filters.max_price) params.set('max_price', filters.max_price)

    const res = await fetch(`${baseUrl}/api/products?${params.toString()}`)
    const data = await res.json()
    setItems(data.items || [])
    setPages(data.pages || 1)
    setTotal(data.total || 0)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/products/categories`).then(r=>r.json()).then(setCategories)
  }, [])

  useEffect(() => { fetchProducts() }, [page, JSON.stringify(filters)])

  const resetFilters = () => {
    setFilters({ category: '', q: '', in_stock: '', min_price: '', max_price: '' })
    setPage(1)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Browse products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1 space-y-5">
          <div className="rounded-xl border border-slate-200/60 p-4 bg-white/70 dark:bg-slate-800/70">
            <h3 className="font-semibold mb-3">Search</h3>
            <input value={filters.q} onChange={e=>{setFilters(s=>({...s,q:e.target.value})); setPage(1)}} placeholder="Search products..." className="w-full px-3 py-2 rounded border border-slate-200" />
          </div>

          <div className="rounded-xl border border-slate-200/60 p-4 bg-white/70 dark:bg-slate-800/70">
            <h3 className="font-semibold mb-3">Category</h3>
            <select value={filters.category} onChange={e=>{setFilters(s=>({...s,category:e.target.value})); setPage(1)}} className="w-full px-3 py-2 rounded border border-slate-200">
              <option value="">All</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200/60 p-4 bg-white/70 dark:bg-slate-800/70">
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="stock" checked={filters.in_stock===''} onChange={()=>{setFilters(s=>({...s,in_stock:''})); setPage(1)}} /> Any</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="stock" checked={filters.in_stock==='true'} onChange={()=>{setFilters(s=>({...s,in_stock:'true'})); setPage(1)}} /> In stock</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="stock" checked={filters.in_stock==='false'} onChange={()=>{setFilters(s=>({...s,in_stock:'false'})); setPage(1)}} /> Out of stock</label>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/60 p-4 bg-white/70 dark:bg-slate-800/70">
            <h3 className="font-semibold mb-3">Price</h3>
            <div className="flex items-center gap-2">
              <input type="number" min={0} placeholder="Min" value={filters.min_price} onChange={e=>{setFilters(s=>({...s,min_price:e.target.value})); setPage(1)}} className="w-full px-3 py-2 rounded border border-slate-200" />
              <input type="number" min={0} placeholder="Max" value={filters.max_price} onChange={e=>{setFilters(s=>({...s,max_price:e.target.value})); setPage(1)}} className="w-full px-3 py-2 rounded border border-slate-200" />
            </div>
            <button onClick={resetFilters} className="mt-3 text-sm text-blue-600">Reset filters</button>
          </div>
        </aside>

        {/* Products grid */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {items.map(p => (
              <div key={p.id} className="group rounded-xl border border-slate-200/50 bg-white/70 dark:bg-slate-800/70 p-4 shadow-sm hover:shadow-md transition-all">
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
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing page {page} of {pages} • {total} items</p>
            <div className="flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-2 rounded border disabled:opacity-50">Prev</button>
              <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)} className="px-3 py-2 rounded border disabled:opacity-50">Next</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
