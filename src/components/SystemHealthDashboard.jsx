import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

/* ─── Colour tokens ────────────────────────────────────────────────────── */
const C = {
  bg:       '#0f1117',
  panel:    '#181c27',
  border:   '#252a3a',
  cyan:     '#00d4ff',
  green:    '#00e676',
  amber:    '#ffb300',
  red:      '#ff5252',
  purple:   '#bb86fc',
  textMute: '#8b93a8',
  textMain: '#e0e4f0',
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */
const now = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const randBetween = (lo, hi) => +(lo + Math.random() * (hi - lo)).toFixed(1);

const generateTimePoint = () => ({
  time: now(),
  cpu:  randBetween(12, 72),
  mem:  randBetween(40, 80),
});

const initialSeries = () => Array.from({ length: 30 }, (_, i) => ({
  time: `T-${30 - i}s`,
  cpu:  randBetween(12, 72),
  mem:  randBetween(40, 80),
}));

const THROUGHPUT_DATA = [
  { endpoint: '/api/auth',        rps: 142 },
  { endpoint: '/api/appointments',rps: 98 },
  { endpoint: '/api/patients',    rps: 76 },
  { endpoint: '/api/lab-reports', rps: 54 },
  { endpoint: '/api/doctors',     rps: 38 },
  { endpoint: '/api/telemedicine',rps: 21 },
];

const DEPT_LOAD = [
  { name: 'Cardiology',   load: 87, fill: C.red    },
  { name: 'Paediatrics',  load: 74, fill: C.amber  },
  { name: 'Gynaecology',  load: 68, fill: C.purple },
  { name: 'Orthopaedics', load: 55, fill: C.cyan   },
  { name: 'ENT',          load: 42, fill: C.green  },
];

const ALERTS = [
  { id: 1, severity: 'critical', msg: 'DB connection pool at 92% capacity', time: '09:18:41' },
  { id: 2, severity: 'warning',  msg: 'API response time spike on /auth (1.8 s)', time: '09:17:05' },
  { id: 3, severity: 'info',     msg: 'Scheduled backup completed successfully', time: '09:15:00' },
  { id: 4, severity: 'warning',  msg: 'Memory usage exceeded 75% on Node 2', time: '09:12:30' },
  { id: 5, severity: 'info',     msg: 'SSL certificate renewed — expires 2027-03-16', time: '09:08:12' },
  { id: 6, severity: 'critical', msg: 'Failed login attempt from IP 103.45.88.21 (3×)', time: '09:05:00' },
];

const severityStyle = (s) => ({
  color:   s === 'critical' ? C.red : s === 'warning' ? C.amber : C.cyan,
  border:  `1px solid ${s === 'critical' ? C.red : s === 'warning' ? C.amber : C.cyan}33`,
  background: `${s === 'critical' ? C.red : s === 'warning' ? C.amber : C.cyan}12`,
});

/* ─── Sub-components ───────────────────────────────────────────────────── */

const KpiCard = ({ label, value, unit, icon, color, sub }) => (
  <div style={{
    background: C.panel, border: `1px solid ${color}30`,
    borderRadius: 14, padding: '1.25rem 1.5rem',
    display: 'flex', alignItems: 'flex-start', gap: '1rem',
    boxShadow: `0 0 24px ${color}18`,
    flex: '1 1 180px', minWidth: 160,
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 12,
      background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <i className={`bx ${icon}`} style={{ fontSize: '1.4rem', color }} />
    </div>
    <div>
      <div style={{ color: C.textMute, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ color: C.textMain, fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>
        {value}<span style={{ fontSize: '0.85rem', marginLeft: 3, color: C.textMute }}>{unit}</span>
      </div>
      {sub && <div style={{ color: C.textMute, fontSize: '0.72rem', marginTop: 4 }}>{sub}</div>}
    </div>
  </div>
);

const PanelHeader = ({ title, color, icon, badge }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ width: 3, height: 18, background: color, borderRadius: 4, display: 'inline-block' }} />
      <i className={`bx ${icon}`} style={{ color, fontSize: '1.1rem' }} />
      <span style={{ color: C.textMain, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.03em' }}>{title}</span>
    </div>
    {badge && (
      <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.05em' }}>{badge}</span>
    )}
  </div>
);

const Panel = ({ children, style = {} }) => (
  <div style={{
    background: C.panel, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: '1.25rem 1.5rem',
    ...style,
  }}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e2332', border: `1px solid ${C.border}`, borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
      <p style={{ color: C.textMute, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: '2px 0', fontWeight: 600 }}>{p.name}: {p.value}{p.unit || ''}</p>
      ))}
    </div>
  );
};

/* ─── Main component ───────────────────────────────────────────────────── */

const SystemHealthDashboard = ({ appointments = [], patients = [] }) => {
  const [series, setSeries] = useState(initialSeries);
  const [uptime] = useState(() => randBetween(99.85, 99.99).toFixed(2));
  const [apiMs, setApiMs] = useState(randBetween(120, 240).toFixed(0));
  const [dbMs, setDbMs]   = useState(randBetween(8, 35).toFixed(0));
  const [sessions, setSessions] = useState(Math.floor(randBetween(12, 60)));
  const [tick, setTick] = useState(0);
  const intervalRef = useRef(null);

  // Simulated live metrics update every 2 s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeries(prev => {
        const next = [...prev.slice(1), generateTimePoint()];
        return next;
      });
      setApiMs(randBetween(80, 320).toFixed(0));
      setDbMs(randBetween(6, 40).toFixed(0));
      setSessions(v => Math.max(8, v + Math.floor(randBetween(-3, 3))));
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // ── Derive real data charts ──────────────────────────────────────────

  // Appointments per day (last 14 days)
  const apptByDay = (() => {
    const map = {};
    appointments.forEach(a => {
      const d = new Date(a.appointment_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .slice(-14)
      .map(([date, count]) => ({ date, count }));
  })();

  // Patients per month
  const patientsByMonth = (() => {
    const map = {};
    patients.forEach(p => {
      if (!p.created_at) return;
      const d = new Date(p.created_at).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map)
      .slice(-8)
      .map(([month, count]) => ({ month, count }));
  })();

  const latestCpu = series[series.length - 1]?.cpu ?? 0;
  const latestMem = series[series.length - 1]?.mem ?? 0;

  return (
    <div style={{ color: C.textMain }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.cyan}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className='bx bx-pulse' style={{ color: C.cyan, fontSize: '1.4rem' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: C.textMain }}>System Health Monitoring</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: C.textMute }}>Live telemetry · updates every 2 s</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${C.green}18`, border: `1px solid ${C.green}44`, borderRadius: 8, padding: '4px 12px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          <span style={{ color: C.green, fontSize: '0.8rem', fontWeight: 700 }}>ONLINE</span>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <KpiCard label="System Uptime"    value={uptime}   unit="%"   icon="bx-server"       color={C.green}  sub="Last 30 days" />
        <KpiCard label="Active Sessions"  value={sessions} unit=""    icon="bx-user-check"   color={C.cyan}   sub="Concurrent users" />
        <KpiCard label="API Latency"      value={apiMs}    unit="ms"  icon="bx-cloud-lightning" color={+apiMs > 250 ? C.amber : C.green} sub={+apiMs > 250 ? '⚠ Elevated' : '✓ Normal'} />
        <KpiCard label="DB Query Time"    value={dbMs}     unit="ms"  icon="bx-data"         color={+dbMs > 30 ? C.amber : C.green} sub="Avg per query" />
        <KpiCard label="CPU Load"         value={latestCpu} unit="%"  icon="bx-chip"         color={latestCpu > 60 ? C.amber : C.cyan} sub="All cores" />
        <KpiCard label="Memory Usage"     value={latestMem} unit="%"  icon="bx-memory-card"  color={latestMem > 70 ? C.red : C.purple} sub="Heap utilisation" />
      </div>

      {/* ── Live Time Series ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* CPU */}
        <Panel>
          <PanelHeader title="CPU Usage" icon="bx-chip" color={C.cyan} badge="LIVE" />
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="gradCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.cyan}  stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.cyan}  stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="time" tick={{ fill: C.textMute, fontSize: 9 }} interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fill: C.textMute, fontSize: 9 }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cpu" name="CPU" stroke={C.cyan} fill="url(#gradCpu)" strokeWidth={2} dot={false} unit="%" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        {/* Memory */}
        <Panel>
          <PanelHeader title="Memory Usage" icon="bx-memory-card" color={C.purple} badge="LIVE" />
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="gradMem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.purple} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.purple} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="time" tick={{ fill: C.textMute, fontSize: 9 }} interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fill: C.textMute, fontSize: 9 }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mem" name="Memory" stroke={C.purple} fill="url(#gradMem)" strokeWidth={2} dot={false} unit="%" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* ── Throughput + Department Load ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Request Throughput */}
        <Panel>
          <PanelHeader title="Request Throughput (req/min)" icon="bx-trending-up" color={C.green} />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={THROUGHPUT_DATA} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: C.textMute, fontSize: 9 }} />
              <YAxis dataKey="endpoint" type="category" tick={{ fill: C.textMute, fontSize: 9 }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rps" name="req/min" fill={C.green} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        {/* Department Load */}
        <Panel>
          <PanelHeader title="Department Load" icon="bx-building-house" color={C.amber} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {DEPT_LOAD.map(d => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                  <span style={{ color: C.textMute }}>{d.name}</span>
                  <span style={{ color: d.fill, fontWeight: 700 }}>{d.load}%</span>
                </div>
                <div style={{ height: 6, background: `${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${d.load}%`, background: d.fill, borderRadius: 6, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Real Supabase Data Charts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Appointments Over Time */}
        <Panel>
          <PanelHeader title="Appointment Bookings (14 days)" icon="bx-calendar-check" color={C.cyan} badge="LIVE DATA" />
          {apptByDay.length === 0 ? (
            <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMute, fontSize: '0.85rem' }}>
              No appointment data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={apptByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="date" tick={{ fill: C.textMute, fontSize: 9 }} />
                <YAxis allowDecimals={false} tick={{ fill: C.textMute, fontSize: 9 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" name="Appointments" stroke={C.cyan} strokeWidth={2} dot={{ fill: C.cyan, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Panel>

        {/* Patient Registrations */}
        <Panel>
          <PanelHeader title="Patient Registrations (by month)" icon="bx-group" color={C.green} badge="LIVE DATA" />
          {patientsByMonth.length === 0 ? (
            <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMute, fontSize: '0.85rem' }}>
              No registration data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={patientsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="month" tick={{ fill: C.textMute, fontSize: 9 }} />
                <YAxis allowDecimals={false} tick={{ fill: C.textMute, fontSize: 9 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="New Patients" fill={C.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Panel>
      </div>

      {/* ── Alert Feed ── */}
      <Panel>
        <PanelHeader title="System Alert Feed" icon="bx-bell" color={C.red} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {ALERTS.map(a => (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              padding: '0.6rem 0.85rem', borderRadius: 8,
              ...severityStyle(a.severity),
            }}>
              <i className={`bx ${a.severity === 'critical' ? 'bx-error-circle' : a.severity === 'warning' ? 'bx-error' : 'bx-info-circle'}`}
                style={{ fontSize: '1.1rem', marginTop: 1, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{a.msg}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: C.textMute, whiteSpace: 'nowrap', marginTop: 2 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Styles ── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default SystemHealthDashboard;
