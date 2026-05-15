import { useEffect, useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .zones-root {
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(160deg, #f0faf0 0%, #e6f4e6 40%, #d4edda 100%);
    min-height: 100vh;
    padding: 40px 32px;
    position: relative;
    overflow-x: hidden;
  }

  .zones-root::before {
    content: '';
    position: fixed;
    top: -120px; right: -120px;
    width: 420px; height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .zones-root::after {
    content: '';
    position: fixed;
    bottom: -80px; left: -80px;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(21,128,61,0.13) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .zones-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }

  /* HEADER */
  .zones-header { margin-bottom: 36px; }
  .zones-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #14532d;
    letter-spacing: -0.5px;
    line-height: 1.15;
    margin: 0 0 8px 0;
  }
  .zones-header p {
    color: #4a7c59;
    font-size: 1.05rem;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.3px;
  }
  .zones-header-line {
    width: 64px; height: 3px;
    background: linear-gradient(90deg, #16a34a, #4ade80);
    border-radius: 2px;
    margin: 14px 0 0 0;
  }

  /* SUMMARY BAR */
  .zones-summary {
    display: flex;
    gap: 14px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  .zones-summary-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(134,239,172,0.4);
    border-radius: 50px;
    padding: 8px 18px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #14532d;
    box-shadow: 0 2px 10px rgba(22,163,74,0.08);
  }
  .zones-summary-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* SECTION LABEL */
  .zones-section-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #4a7c59;
    font-weight: 500;
    margin: 0 0 16px 0;
    display: flex; align-items: center; gap: 10px;
  }
  .zones-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #bbf7d0, transparent);
  }

  /* GRID */
  .zones-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
  }

  /* CARD */
  .zone-card {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(134,239,172,0.3);
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(22,163,74,0.07);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    animation: cardIn 0.4s ease both;
  }
  .zone-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(22,163,74,0.15);
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* TOP ACCENT */
  .zone-card-accent {
    height: 4px;
    width: 100%;
  }
  .accent-critical { background: linear-gradient(90deg, #ef4444, #fca5a5); }
  .accent-moderate { background: linear-gradient(90deg, #f59e0b, #fde68a); }
  .accent-stable   { background: linear-gradient(90deg, #16a34a, #4ade80); }

  /* CARD BODY */
  .zone-card-body { padding: 22px 24px; }

  .zone-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .zone-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: #14532d;
    margin: 0 0 4px 0;
  }
  .zone-card-id {
    font-size: 0.75rem;
    color: #4a7c59;
    font-weight: 400;
    letter-spacing: 0.4px;
  }
  .zone-status-badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .badge-critical { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
  .badge-moderate { background: #fef9c3; color: #b45309; border: 1px solid #fde68a; }
  .badge-stable   { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }

  /* NDVI BAR */
  .ndvi-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .ndvi-label { font-size: 0.75rem; color: #4a7c59; text-transform: uppercase; letter-spacing: 0.5px; width: 36px; flex-shrink: 0; }
  .ndvi-track {
    flex: 1;
    height: 7px;
    background: #dcfce7;
    border-radius: 10px;
    overflow: hidden;
  }
  .ndvi-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.6s ease;
  }
  .ndvi-val { font-size: 0.82rem; font-weight: 600; color: #14532d; width: 36px; text-align: right; }

  /* STATS GRID */
  .zone-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 14px;
  }
  .zone-stat {
    background: #f0fdf4;
    border: 1px solid #d1fae5;
    border-radius: 10px;
    padding: 9px 12px;
  }
  .zone-stat-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #4a7c59; margin-bottom: 3px; }
  .zone-stat-val   { font-size: 1rem; font-weight: 600; color: #15803d; }

  /* TAGS */
  .zone-tags-section { margin-top: 12px; }
  .zone-tags-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #4a7c59; margin-bottom: 6px; font-weight: 500; }
  .zone-tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .zone-tag {
    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
    border: 1px solid #86efac;
    color: #15803d;
    font-size: 0.75rem;
    padding: 3px 9px;
    border-radius: 20px;
  }
  .zone-tag-drain {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 1px solid #93c5fd;
    color: #1d4ed8;
  }

  /* LOADING */
  .zones-loading {
    text-align: center;
    padding: 80px 20px;
    color: #4a7c59;
    font-size: 1rem;
    font-weight: 300;
  }
  .zones-loading-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.5; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
`;

function getStatus(ndvi) {
  if (ndvi < 0.15) return "critical";
  if (ndvi < 0.25) return "moderate";
  return "stable";
}

function getNdviColor(ndvi) {
  if (ndvi < 0.15) return "#ef4444";
  if (ndvi < 0.25) return "#f59e0b";
  return "#16a34a";
}

function ZonesPage() {
  const [zones, setZones] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/zones")
      .then(res => { setZones(res.data); setLoaded(true); })
      .catch(err => { console.error(err); setLoaded(true); });
  }, []);

  const allZones = Object.entries(zones);
  const critical = allZones.filter(([, z]) => z.ndvi < 0.15).length;
  const moderate = allZones.filter(([, z]) => z.ndvi >= 0.15 && z.ndvi < 0.25).length;
  const stable   = allZones.filter(([, z]) => z.ndvi >= 0.25).length;

  return (
    <>
      <style>{styles}</style>
      <div className="zones-root">
        <div className="zones-content">

          {/* HEADER */}
          <div className="zones-header">
            <h1>🌿 Zone Explorer</h1>
            <p>Overview of urban zones with environmental indicators</p>
            <div className="zones-header-line" />
          </div>

          {/* SUMMARY PILLS */}
          {allZones.length > 0 && (
            <div className="zones-summary">
              <div className="zones-summary-pill">
                <span className="zones-summary-dot" style={{ background: '#16a34a' }} />
                {allZones.length} Total Zones
              </div>
              <div className="zones-summary-pill">
                <span className="zones-summary-dot" style={{ background: '#ef4444' }} />
                {critical} Critical
              </div>
              <div className="zones-summary-pill">
                <span className="zones-summary-dot" style={{ background: '#f59e0b' }} />
                {moderate} Moderate
              </div>
              <div className="zones-summary-pill">
                <span className="zones-summary-dot" style={{ background: '#16a34a' }} />
                {stable} Stable
              </div>
            </div>
          )}

          {/* GRID */}
          {!loaded ? (
            <div className="zones-loading">
              <div className="zones-loading-icon">🌱</div>
              <p>Loading zone data...</p>
            </div>
          ) : (
            <>
              <div className="zones-section-label">All Zones</div>
              <div className="zones-grid">
                {allZones.map(([id, z], i) => {
                  const status = getStatus(z.ndvi);
                  const ndviPct = Math.min((z.ndvi / 0.6) * 100, 100).toFixed(1);
                  return (
                    <div
                      key={id}
                      className="zone-card"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {/* TOP ACCENT */}
                      <div className={`zone-card-accent accent-${status}`} />

                      <div className="zone-card-body">

                        {/* HEADER ROW */}
                        <div className="zone-card-header">
                          <div>
                            <h2 className="zone-card-title">{z.name}</h2>
                            <span className="zone-card-id">Zone ID: {id}</span>
                          </div>
                          <span className={`zone-status-badge badge-${status}`}>
                            {status === 'critical' ? '🔴' : status === 'moderate' ? '🟡' : '🟢'} {status}
                          </span>
                        </div>

                        {/* NDVI BAR */}
                        <div className="ndvi-row">
                          <span className="ndvi-label">NDVI</span>
                          <div className="ndvi-track">
                            <div
                              className="ndvi-fill"
                              style={{
                                width: `${ndviPct}%`,
                                background: `linear-gradient(90deg, ${getNdviColor(z.ndvi)}, ${getNdviColor(z.ndvi)}99)`
                              }}
                            />
                          </div>
                          <span className="ndvi-val">{z.ndvi}</span>
                        </div>

                        {/* STATS */}
                        <div className="zone-stats">
                          <div className="zone-stat">
                            <div className="zone-stat-label">👥 Population</div>
                            <div className="zone-stat-val">{z.population?.toLocaleString()}</div>
                          </div>
                          <div className="zone-stat">
                            <div className="zone-stat-label">🌡 Heat Index</div>
                            <div className="zone-stat-val">{z.heat}</div>
                          </div>
                          <div className="zone-stat" style={{ gridColumn: '1 / -1' }}>
                            <div className="zone-stat-label">🌊 Flood Risk</div>
                            <div className="zone-stat-val">{z.flood_risk}</div>
                          </div>
                        </div>

                        {/* NEIGHBORS */}
                        {z.neighbors?.length > 0 && (
                          <div className="zone-tags-section">
                            <div className="zone-tags-title">🔗 Neighbors</div>
                            <div className="zone-tags">
                              {z.neighbors.map(n => (
                                <span key={n} className="zone-tag">{n}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* DRAIN */}
                        {z.drain_to?.length > 0 && (
                          <div className="zone-tags-section" style={{ marginTop: 8 }}>
                            <div className="zone-tags-title">💧 Drains To</div>
                            <div className="zone-tags">
                              {z.drain_to.map(d => (
                                <span key={d} className="zone-tag zone-tag-drain">{d}</span>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default ZonesPage;