import React, { useState, useEffect } from 'react';

const articlesData = [
  {
    id: 'minimally-invasive-surgery',
    title: 'The Future of Minimally Invasive Surgery',
    category: 'Surgical Innovations',
    readTime: '6 min read',
    date: 'Apr 01, 2026',
    author: 'Surgical Department',
    excerpt: 'How modern laparoscopic techniques are reducing recovery times, minimizing scarring, and improving patient outcomes in complex procedures.',
    content: `
      <h2>The Evolution of Laparoscopic Techniques</h2>
      <p>Gone are the days when major abdominal surgery required large incisions and weeks of hospital recovery. Since the introduction of laparoscopic surgery in the late 1980s, the medical field has seen exponential advancements in surgical precision and patient care.</p>
      
      <p>Today, utilizing high-definition cameras and precision instruments operated through sub-centimeter incisions, surgeons can perform complex procedures including hernia repairs, gallbladder removals, and bariatric surgeries with unprecedented accuracy.</p>

      <h3>Key Benefits to Patients</h3>
      <ul>
        <li><strong>Reduced Pain:</strong> Smaller incisions mean significantly less tissue trauma and post-operative pain.</li>
        <li><strong>Shorter Hospital Stays:</strong> Many procedures that once required week-long stays are now performed on an outpatient basis.</li>
        <li><strong>Minimal Scarring:</strong> Incisions are often so small they heal with practically invisible scars.</li>
        <li><strong>Lower Infection Risk:</strong> With less internal tissue exposed to the operating room environment, the risk of surgical site infections drops drastically.</li>
      </ul>

      <blockquote>"Minimally invasive surgery isn't just a technological advancement; it is a fundamental shift in how we approach patient recovery and comfort."</blockquote>

      <h2>What's Next: Robotic-Assisted Surgery</h2>
      <p>The integration of robotic arms controlled by the surgeon offers a 3D, high-definition visualization of the surgical field. The robotic instruments bend and rotate far beyond the capabilities of the human hand, translating the surgeon's hand movements into smaller, more precise movements of tiny instruments inside the patient's body.</p>
      
      <p>As these technologies become more accessible, we anticipate even faster recovery times and broader applications in specialties such as thoracic and neurosurgery.</p>
    `
  },
  {
    id: 'understanding-cardiovascular-health',
    title: '5 Crucial Metrics for Cardiovascular Health',
    category: 'Preventive Care',
    readTime: '5 min read',
    date: 'Mar 28, 2026',
    author: 'Cardiology Center',
    excerpt: 'Beyond just blood pressure, understanding these five crucial metrics can help you take proactive control of your heart health before symptoms arise.',
    content: `
      <h2>Beyond Blood Pressure: A Holistic View of Heart Health</h2>
      <p>While most of us know our blood pressure, the complete picture of cardiovascular health involves an interconnected system of metrics. A proactive approach focuses on managing these elements before they necessitate clinical intervention.</p>
      
      <h3>1. LDL & HDL Cholesterol Ratios</h3>
      <p>It's not just about your total cholesterol number. Low-Density Lipoprotein (LDL) is known as "bad" cholesterol because it contributes to fatty buildups in arteries. High-Density Lipoprotein (HDL) acts as a scavenger, carrying LDL away from the arteries and back to the liver. Maintaining a high HDL and a low LDL is the gold standard for arterial health.</p>

      <h3>2. Resting Heart Rate (RHR)</h3>
      <p>Your RHR is a strong indicator of physical fitness and cardiac efficiency. A lower heart rate at rest implies more efficient heart function and better cardiovascular fitness. For most healthy adults, an ideal RHR falls between 60 to 80 beats per minute, though well-trained athletes may see numbers in the 40s.</p>

      <h3>3. Inflammatory Markers (hs-CRP)</h3>
      <p>High-sensitivity C-reactive protein (hs-CRP) is a protein found in the blood that measures general levels of inflammation in your body. Chronic inflammation is increasingly recognized as a major risk factor for coronary artery disease, independent of cholesterol levels.</p>

      <h3>4. Fasting Blood Glucose & HbA1c</h3>
      <p>Cardiovascular health is intricately tied to metabolic health. Insulin resistance and chronically elevated blood sugar can damage blood vessels over time. The HbA1c test gives a 3-month average of your blood sugar levels, providing a much clearer picture of your metabolic health than a standard fasting glucose test alone.</p>

      <h2>Taking Action</h2>
      <p>Combining regular aerobic exercise, a diet rich in healthy fats and soluble fibers, and effective stress management (which directly impacts inflammation and blood pressure) forms the foundation of robust heart health.</p>
      <p>If you haven't had these metrics checked recently, consider scheduling a comprehensive cardiac screening.</p>
    `
  },
  {
    id: 'importance-of-sleep-hygiene',
    title: 'The Hidden Link Between Sleep & Immune Function',
    category: 'General Wellness',
    readTime: '4 min read',
    date: 'Mar 15, 2026',
    author: 'Pulmonology & Sleep Medicine',
    excerpt: 'How chronic sleep deprivation quietly compromises your immune system, and actionable strategies for repairing your circadian rhythm.',
    content: `
      <h2>The Chemistry of Rest</h2>
      <p>We often think of sleep simply as "downtime." In reality, it is a highly active biological process. During deep sleep, the body undergoes critical repair mechanisms, particularly concerning the immune system.</p>

      <p>Studies have consistently shown that people who don't get quality sleep or enough sleep are more likely to get sick after being exposed to a virus. Furthermore, lack of sleep can affect how fast you recover if you do get sick.</p>

      <h3>Cytokines: The Sleep-Immunity Bridge</h3>
      <p>During sleep, your immune system releases proteins called cytokines, some of which help promote sleep. Certain cytokines need to increase when you have an infection or inflammation, or when you're under stress. Sleep deprivation may decrease production of these protective cytokines.</p>
      <p>In addition, infection-fighting antibodies and cells are reduced during periods when you don't get enough sleep.</p>

      <h2>Rebuilding Your Circadian Rhythm</h2>
      <p>If you've been struggling with sleep, small environmental adjustments can yield profound results:</p>
      <ul>
        <li><strong>Temperature Control:</strong> The optimal temperature for sleep is surprisingly cool—around 65°F (18°C).</li>
        <li><strong>Light Regulation:</strong> Complete darkness promotes melatonin production. Avoid blue light from screens at least one hour before bed.</li>
        <li><strong>Consistent Timing:</strong> Going to bed and waking up at the exact same time every day—even on weekends—anchors your circadian rhythm.</li>
      </ul>

      <p>Chronic sleep issues should not be ignored. If these non-clinical interventions do not improve your sleep quality, it is highly recommended to seek an evaluation for conditions like sleep apnea or chronic insomnia.</p>
    `
  }
];

const Articles = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  // Scroll to top when opening an article
  useEffect(() => {
    if (activeArticle) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeArticle]);

  // Read Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (activeArticle) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeArticle]);


  // Hub View
  if (!activeArticle) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
        <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '5rem 0 4rem', textAlign: 'center' }}>
          <div className="container">
            <h1 className="animate-slide-up" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-1.5px' }}>
              Health & Wellness Insights
            </h1>
            <p className="animate-slide-up" style={{ color: '#cbd5e1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', animationDelay: '0.1s' }}>
              Explore our latest articles covering medical advancements, preventive care, and holistic wellness strategies.
            </p>
          </div>
        </div>

        <section className="section bg-pattern">
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {articlesData.map((article, idx) => (
                <div 
                  key={article.id} 
                  className="glass-card article-card animate-slide-up" 
                  style={{ 
                    padding: '2.5rem', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    borderLeft: '4px solid transparent',
                    animationDelay: (idx * 0.15) + 's'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderLeft = '4px solid var(--primary)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderLeft = '4px solid transparent';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(15, 76, 129, 0.05)';
                  }}
                  onClick={() => setActiveArticle(article)}
                >
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {article.category}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <i className='bx bx-time-five' style={{ marginRight: '0.3rem' }}></i>{article.readTime}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {article.date}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 700 }}>
                    {article.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 600, gap: '0.5rem' }}>
                    Read Full Article <i className='bx bx-right-arrow-alt' style={{ fontSize: '1.2rem' }}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Article Reader View
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'white' }}>
      {/* Reading Progress Bar */}
      <div style={{ position: 'fixed', top: '80px', left: 0, width: '100%', height: '4px', background: '#f1f5f9', zIndex: 100 }}>
        <div style={{ width: scrollProgress + '%', height: '100%', background: 'var(--primary)', transition: 'width 0.1s' }}></div>
      </div>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem 6rem' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => setActiveArticle(null)} 
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-secondary)', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', 
            fontWeight: 500, marginBottom: '3rem', fontSize: '1rem', padding: '0.5rem 0',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <i className='bx bx-left-arrow-alt' style={{ fontSize: '1.5rem' }}></i> Back to Insights
        </button>

        {/* Article Header */}
        <div className="animate-fade-in" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              {activeArticle.category}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {activeArticle.date}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              &middot; {activeArticle.readTime}
            </span>
          </div>
          
          <h1 style={{ fontSize: '3rem', color: '#0f172a', fontWeight: 800, lineHeight: 1.2, marginBottom: '2rem', letterSpacing: '-1px' }}>
            {activeArticle.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
             <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
               <i className='bx bxs-user'></i>
             </div>
             <div>
               <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>{activeArticle.author}</p>
               <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Annai Hospital</p>
             </div>
          </div>
        </div>

        {/* Article Body Content */}
        {/* We use dangerouslySetInnerHTML safely since content is hardcoded above without user input */}
        <div 
          className="article-body animate-slide-up" 
          dangerouslySetInnerHTML={{ __html: activeArticle.content }}
          style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.8, 
            color: '#334155',
            animationDelay: '0.2s'
          }}
        />

        {/* End of article marker */}
        <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', opacity: 0.5 }}>
           <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
           <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
           <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
        </div>

      </div>

      <style>{`
        .article-body h2 {
          font-size: 2rem;
          color: #0f172a;
          margin: 2.5rem 0 1rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .article-body h3 {
          font-size: 1.4rem;
          color: #1e293b;
          margin: 2rem 0 0.8rem;
          font-weight: 600;
        }
        .article-body p {
          margin-bottom: 1.5rem;
        }
        .article-body ul {
          margin-bottom: 1.5rem;
          padding-left: 1.2rem;
        }
        .article-body li {
          margin-bottom: 0.8rem;
        }
        .article-body blockquote {
          font-size: 1.4rem;
          font-style: italic;
          color: var(--primary);
          border-left: 4px solid var(--primary);
          padding: 1.5rem;
          margin: 2.5rem 0;
          background: rgba(14, 165, 233, 0.05);
          border-radius: 0 12px 12px 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default Articles;
