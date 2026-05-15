import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ZonesPage from "./pages/ZonesPage";
import OptimizePage from "./pages/OptimizePage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <div className="w-64 bg-green-800 text-white p-6">
          <h1 className="text-2xl font-bold mb-8">🌱 GreenLedger</h1>

          <nav className="flex flex-col gap-4">
            <Link to="/" className="hover:text-green-300">📊 Zones</Link>
            <Link to="/optimize" className="hover:text-green-300">⚙️ Optimize</Link>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-green-50 p-8">
          <Routes>
            <Route path="/" element={<ZonesPage />} />
            <Route path="/optimize" element={<OptimizePage />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;