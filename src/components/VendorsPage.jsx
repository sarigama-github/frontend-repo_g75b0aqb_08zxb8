import { useEffect, useState } from 'react'

export default function VendorsPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 18

  const fetchVendors = async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), verified: 'true' })
    const res = await fetch(`${baseUrl}/api/vendors?${params.toString()}`)
    const data = await res.json()
    setItems(data.items || [])
    setPages(data.pages || 1)
    setTotal(data.total || 0)
  }

  useEffect(() => { fetchVendors() }, [page])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Verified vendors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map(v => (
          <div key={v.id} className="rounded-xl border border-slate-200/60 p-5 bg-white/70 dark:bg-slate-800/70">
            <div className="flex items-center gap-3">
              <img src={v.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(v.name)}`} alt={v.name} className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 dark:text-white">{v.name}</h4>
                <p className="text-xs text-slate-500">{v.location || 'Worldwide'}</p>
              </div>
              {v.verified && <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Verified</span>}
            </div>
            {v.bio && <p className="text-sm text-slate-600 mt-3 line-clamp-2">{v.bio}</p>}
            {v.categories && (
              <div className="mt-3 flex flex-wrap gap-2">
                {v.categories.map(c => <span key={c} className="text-xs px-2 py-1 rounded bg-slate-100">{c}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500">Showing page {page} of {pages} • {total} vendors</p>
        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-2 rounded border disabled:opacity-50">Prev</button>
          <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)} className="px-3 py-2 rounded border disabled:opacity-50">Next</button>
        </div>
      </div>
    </main>
  )
}
