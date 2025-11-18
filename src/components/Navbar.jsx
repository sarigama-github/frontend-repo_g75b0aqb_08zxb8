import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'text-white bg-blue-600' : 'text-slate-200 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold">MV</span>
            <span className="font-semibold text-slate-800 dark:text-white">MultiVendor</span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/products" label="Products" />
            <NavLink to="/vendors" label="Vendors" />
          </nav>
        </div>
      </div>
    </header>
  )
}
