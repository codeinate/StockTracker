import './App.css'
import { StockDetailPage } from './pages/StockDetail';
import { StockOverviewPage } from './pages/StockOverview';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext, AppProvider } from './context/AppContext';

export default function App() {
  return (
    <main className="container">
      <AppProvider>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:ticker" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </main>
  )
}
