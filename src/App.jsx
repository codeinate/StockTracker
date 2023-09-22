import './App.css'
import { StockDetailPage } from './pages/StockDetail';
import { StockOverviewPage } from './pages/StockOverview';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:stock" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
