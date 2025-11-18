import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import ProductsPage from './components/ProductsPage'
import VendorsPage from './components/VendorsPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
      </Routes>
    </div>
  )
}

export default App
