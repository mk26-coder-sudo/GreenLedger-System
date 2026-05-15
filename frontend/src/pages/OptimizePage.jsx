import { useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .opt-root {
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(160deg, #f0faf0 0%, #e6f4e6 40%, #d4edda 100%);
    min-height: 100vh;
    padding: 40px 32px;
    position: relative;
    overflow-x: hidden;
  }

  .opt-root::before {
    content: '';
    position: fixed;
    top: -120px; right: -120px;
    width: 420px; height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .opt-root::after {
    content: '';
    position: fixed;
    bottom: -80px; left: -80px;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(21,128,61,0.13) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .opt-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }

  /* HEADER */
  .opt-header { margin-bottom: 36px; }
  .opt-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #14532d;
    letter-spacing: -0.5px;
    line-height: 1.15;
    margin: 0 0 8px 0;
  }
  .opt-header p {
    color: #4a7c59;
    font-size: 1.05rem;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.3px;
  }
  .opt-header-line {
    width: 64px; height: 3px;
    background: linear-gradient(90deg, #16a34a, #4ade80);
    border-radius: 2px;
    margin: 14px 0 0 0;
  }

  /* CONTROL PANEL */
  .opt-control {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(134,239,172,0.45);
    border-radius: 20px;
    padding: 24px 28px;
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 40px;
    box-shadow: 0 4px 24px rgba(22,163,74,0.08);
  }
  .opt-control label {
    font-weight: 500;
    color: #166534;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .opt-control input {
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    padding: 10px 14px;
    width: 80px;
    font-size: 1rem;
    color: #14532d;
    background: #f0fdf4;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
  }
  .opt-control input:focus { border-color: #16a34a; }
  .opt-btn {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    color: white;
    border: none;
    padding: 11px 28px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 14px rgba(22,163,74,0.35);
    transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .opt-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(22,163,74,0.45);
    background: linear-gradient(135deg, #15803d 0%, #14532d 100%);
  }

  /* ZONE CARDS */
  .opt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(440px, 1fr)); gap: 22px; }

  .opt-zone-card {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(134,239,172,0.3);
    border-radius: 20px;
    padding: 26px 28px;
    box-shadow: 0 2px 16px rgba(22,163,74,0.07);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .opt-zone-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #16a34a, #4ade80, #86efac);
  }
  .opt-zone-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(22,163,74,0.14);
  }
  .opt-zone-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #14532d;
    margin: 0 0 14px 0;
    display: flex; align-items: center; gap: 10px;
  }
  .opt-zone-num {
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 20px;
  }
  .opt-stats { display: flex; gap: 20px; margin-bottom: 14px; }
  .opt-stat {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
    padding: 10px 16px;
    flex: 1;
  }
  .opt-stat-label { font-size: 0.72rem; color: #4a7c59; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px; }
  .opt-stat-val { font-size: 1.2rem; font-weight: 600; color: #15803d; }

  .opt-impact {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1px solid #bbf7d0;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 12px;
    display: flex; gap: 18px;
  }
  .opt-impact-item { font-size: 0.88rem; color: #166534; }
  .opt-impact-item span { font-weight: 600; }

  .opt-species {
    background: #f7fef7;
    border: 1px solid #d1fae5;
    border-radius: 12px;
    padding: 12px 16px;
  }
  .opt-species-title { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.6px; color: #4a7c59; margin-bottom: 8px; font-weight: 500; }
  .opt-species-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .opt-species-tag {
    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
    color: #15803d;
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid #86efac;
  }

  /* CHARTS */
  .opt-chart-card {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(134,239,172,0.3);
    border-radius: 20px;
    padding: 28px;
    margin-top: 28px;
    box-shadow: 0 2px 16px rgba(22,163,74,0.07);
  }
  .opt-chart-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #14532d;
    margin: 0 0 6px 0;
  }
  .opt-chart-sub { font-size: 0.83rem; color: #4a7c59; margin: 0 0 22px 0; }

  /* MAP */
  .opt-map-card {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(134,239,172,0.3);
    border-radius: 20px;
    padding: 28px;
    margin-top: 28px;
    box-shadow: 0 2px 16px rgba(22,163,74,0.07);
    overflow: hidden;
  }
  .opt-map-card .leaflet-container { border-radius: 14px; }

  /* SECTION LABEL */
  .opt-section-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #4a7c59;
    font-weight: 500;
    margin: 36px 0 14px 0;
    display: flex; align-items: center; gap: 10px;
  }
  .opt-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #bbf7d0, transparent);
  }

  /* EMPTY STATE */
  .opt-empty {
    text-align: center;
    padding: 60px 20px;
    color: #4a7c59;
  }
  .opt-empty-icon { font-size: 3.5rem; margin-bottom: 12px; opacity: 0.5; }
  .opt-empty p { font-size: 1rem; font-weight: 300; }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.97)',
        border: '1px solid #bbf7d0',
        borderRadius: '10px',
        padding: '10px 16px',
        fontSize: '0.85rem',
        color: '#14532d',
        boxShadow: '0 4px 16px rgba(22,163,74,0.12)'
      }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill, margin: '2px 0' }}>
            {p.name}: <b>{p.value}</b>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function OptimizePage() {
  const [k, setK] = useState(5);
  const [result, setResult] = useState([]);

  const handleOptimize = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/optimize?k=${k}`);
      setResult(res.data.zones);
    } catch {
      alert("Backend not running!");
    }
  };

  const chartData = result.map(z => ({
    name: z.name,
    score: z.score,
    saplings: z.saplings
  }));

 const speciesMap = {};
 result.forEach(zone => {
  Object.entries(zone.species).forEach(([tree, count]) => {
    speciesMap[tree] = (speciesMap[tree] || 0) + count;
  });
});
 const speciesData = Object.entries(speciesMap).map(([species, count]) => ({
  species,
  count
}));

  return (
    <>
      <style>{styles}</style>
      <div className="opt-root">
        <div className="opt-content">

          {/* HEADER */}
          <div className="opt-header">
            <h1>🌿 Optimization Dashboard</h1>
            <p>Smart urban forestry planning with environmental analytics</p>
            <div className="opt-header-line" />
          </div>

          {/* CONTROL */}
          <div className="opt-control">
            <label>Zones</label>
            <input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
            />
            <button className="opt-btn" onClick={handleOptimize}>
              ⚙️ Run Optimization
            </button>
          </div>

          {/* ZONE CARDS */}
          {result.length > 0 ? (
            <>
              <div className="opt-section-label">Zone Results</div>
              <div className="opt-grid">
                {result.map((z, i) => (
                  <div key={z.id} className="opt-zone-card">
                    <h2 className="opt-zone-title">
                      <span className="opt-zone-num">#{i + 1}</span>
                      {z.name}
                    </h2>

                    <div className="opt-stats">
                      <div className="opt-stat">
                        <div className="opt-stat-label">Priority Score</div>
                        <div className="opt-stat-val">{z.score}</div>
                      </div>
                      <div className="opt-stat">
                        <div className="opt-stat-label">Saplings</div>
                        <div className="opt-stat-val">{z.saplings}</div>
                      </div>
                    </div>

                    <div className="opt-impact">
                      <div className="opt-impact-item">
                        🌡 Heat Reduction: <span>{(z.saplings * 0.02).toFixed(2)} °C</span>
                      </div>
                      <div className="opt-impact-item">
                        🌱 NDVI Boost: <span>+{(z.saplings * 0.001).toFixed(3)}</span>
                      </div>
                    </div>

                    <div className="opt-species">
                      <div className="opt-species-title">Species Allocation</div>
                      <div className="opt-species-list">
                        {Object.entries(z.species).map(([tree, count]) => (
                          <span key={tree} className="opt-species-tag">
                            🌳 {tree}: {count}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MAIN CHART */}
              <div className="opt-chart-card">
                <h2 className="opt-chart-title">📊 Zone Performance Analysis</h2>
                <p className="opt-chart-sub">Priority score vs saplings allocated per zone</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#4a7c59', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4a7c59', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '0.85rem', color: '#4a7c59' }} />
                    <Bar dataKey="score" fill="#16a34a" name="Priority Score" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="saplings" fill="#4ade80" name="Saplings Allocated" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* SPECIES CHART */}
              <div className="opt-chart-card">
                <h2 className="opt-chart-title">🌳 Species Distribution</h2>
                <p className="opt-chart-sub">Tree count breakdown across all zones</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={speciesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" vertical={false} />
                    <XAxis dataKey="species" tick={{ fill: '#4a7c59', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4a7c59', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '0.85rem', color: '#4a7c59' }} />
                    <Bar dataKey="count" fill="#15803d" name="Tree Count" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* MAP */}
              <div className="opt-map-card">
                <h2 className="opt-chart-title" style={{ marginBottom: 6 }}>🗺 Zone Map</h2>
                <p className="opt-chart-sub">Geographic distribution of optimization zones</p>
                <MapContainer center={[18.52, 73.85]} zoom={12} style={{ height: "420px" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {result.map((z) => (
                    <Marker
                      key={z.id}
                      position={[
                        18.52 + Math.random() * 0.05,
                        73.85 + Math.random() * 0.05
                      ]}
                    >
                      <Popup>
                        <b>{z.name}</b><br />
                        Score: {z.score}<br />
                        Saplings: {z.saplings}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </>
          ) : (
            <div className="opt-empty">
              <div className="opt-empty-icon">🌿</div>
              <p>Set your zone count and run optimization to see results.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default OptimizePage;