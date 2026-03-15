import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const MedicineChecker = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('initial'); // 'initial', 'loading', 'success', 'error', 'empty'
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) {
      setStatus('initial');
      setResults([]);
      return;
    }

    setStatus('loading');
    
    try {
      const { data, error } = await supabase
        .from('medicine_stock')
        .select('*')
        .or(`name.ilike.%${query}%,search_terms.ilike.%${query}%`);
        
      if (error) {
          // If the table doesn't exist, we will gracefully show empty or mock results.
          // In a real app we'd throw but here we handle it for the user if they didn't create the table.
          if (error.code === '42P01') {
             setStatus('empty'); 
             return;
          }
          throw error;
      }

      if (!data || data.length === 0) {
        setStatus('empty');
      } else {
        setResults(data);
        setStatus('success');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Pharmacy & Medicine Checker</h1>
          <p style={{ color: '#cbd5e1' }}>Check real-time availability of medicines in our hospital pharmacy.</p>
        </div>
      </div>
      
      <section className="section" style={{ minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>Search Inventory</h3>
            
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
               <div style={{ flexGrow: 1, position: 'relative' }}>
                  <i className='bx bx-search' style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '1.25rem' }}></i>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by medicine name or type (e.g., Paracetamol, Antibiotic)..." 
                    style={{ paddingLeft: '3rem' }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
               </div>
               <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}><i className='bx bx-search-alt-2'></i> Check Stock</button>
            </form>
            
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
               <p><i className='bx bx-error-circle'></i> Prescription is required for all antibiotics and specialized care medicines.</p>
            </div>
          </div>

          <div>
             {status === 'initial' && (
               <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <i className='bx bx-capsule' style={{ fontSize: '4rem', opacity: 0.2, marginBottom: '1rem' }}></i>
                  <p>Enter a medicine name above to check its real-time availability in our pharmacy.</p>
               </div>
             )}

             {status === 'loading' && (
               <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '3rem', color: 'var(--primary)' }}></i>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Searching inventory...</p>
               </div>
             )}
             
             {status === 'empty' && (
               <div className="glass-card animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
                  <i className='bx bx-search-alt' style={{ fontSize: '3rem', color: 'var(--warning-color)', marginBottom: '1rem' }}></i>
                  <h4 style={{ color: 'var(--text-primary)' }}>No medicines found</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any matches. Please check the spelling or contact the pharmacy directly. Data might not be populated in the database yet.</p>
               </div>
             )}

             {status === 'error' && (
               <div className="glass-card animate-fade-in" style={{ padding: '2rem', textAlign: 'center', borderLeft: '4px solid var(--danger-color)' }}>
                  <h4 style={{ color: 'var(--danger-color)' }}>Search Failed</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>Unable to connect to the pharmacy database.</p>
               </div>
             )}

             {status === 'success' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {results.map(med => (
                   <div key={med.id} className="glass-card animate-slide-up" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: `4px solid ${med.color_code || 'var(--primary)'}` }}>
                      <div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <h4 style={{ margin: 0, color: '#0f172a' }}>{med.name}</h4>
                            {med.requires_prescription && <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}><i className='bx bx-file'></i> Rx Required</span>}
                         </div>
                         <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 500, color: med.color_code || 'var(--primary)' }}>● {med.status}</span> 
                            {med.stock_quantity > 0 && ` (${med.stock_quantity} units)`} &nbsp;|&nbsp; 
                            {med.format_type}
                         </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{med.price_per_unit}</div>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default MedicineChecker;
