import { initRouter, navigateTo } from '../router.js';

export const renderBlog = (container) => {
    container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Health & Wellness Blog</h1>
        <p style="color: #cbd5e1;">Medical insights, healthy lifestyle tips, and news from our experts.</p>
      </div>
    </div>
    
    <section class="section bg-light">
      <div class="container">
        
        <!-- Featured Post -->
        <div class="glass-card" style="padding: 0; overflow: hidden; margin-bottom: 3rem; display: flex; flex-direction: column;">
          <div class="grid-2" style="gap: 0;">
             <div style="background: linear-gradient(135deg, #fca5a5, #ef4444); display: flex; align-items: center; justify-content: center; min-height: 300px; color: white;">
                <i class='bx bx-heart' style="font-size: 8rem;"></i>
             </div>
             <div style="padding: 3rem; display: flex; flex-direction: column; justify-content: center;">
                <span style="background: rgba(34, 197, 94, 0.1); color: var(--accent-dark); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600; align-self: flex-start; margin-bottom: 1rem;">Featured • Heart Health</span>
                <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">5 Daily Habits for a Stronger Heart</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">Cardiovascular diseases remain a leading health concern. Learn how simple, incremental changes to your daily routine can significantly improve your heart health and longevity, straight from our top cardiologists.</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                   <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <i class='bx bx-user-circle' style="font-size: 2rem; color: var(--primary);"></i>
                      <div>
                         <h4 style="font-size: 0.9rem; margin: 0; color: var(--text-primary);">Dr. Sarah Jenkins</h4>
                         <span style="font-size: 0.75rem; color: var(--text-light);">Oct 24, 2023</span>
                      </div>
                   </div>
                   <button class="btn btn-outline">Read Article</button>
                </div>
             </div>
          </div>
        </div>

        <!-- Recent Posts Grid -->
        <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem; font-size: 1.5rem;">Recent Articles</h3>
        <div class="grid-3">
          
          <div class="blog-preview-card glass-card p-0">
             <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #93c5fd, #60a5fa);">
               <i class='bx bx-test-tube'></i>
             </div>
             <div class="blog-content p-2">
               <span class="blog-category">Prevention</span>
               <h4>Preventing Type 2 Diabetes</h4>
               <p style="font-size: 0.95rem;">Early detection and manageable diet changes are key to stopping diabetes before it starts. Understanding the warning signs is your first defense.</p>
               <a href="#" class="read-more" style="margin-top: auto;">Read More <i class='bx bx-right-arrow-alt'></i></a>
             </div>
          </div>
          
          <div class="blog-preview-card glass-card p-0">
             <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #86efac, #4ade80);">
               <i class='bx bx-run'></i>
             </div>
             <div class="blog-content p-2">
               <span class="blog-category">Lifestyle</span>
               <h4>Maintaining a Healthy Lifestyle</h4>
               <p style="font-size: 0.95rem;">Balancing work, diet, and physical activity is essential for long-term health and wellness. Tips on how to squeeze exercise into a busy schedule.</p>
               <a href="#" class="read-more" style="margin-top: auto;">Read More <i class='bx bx-right-arrow-alt'></i></a>
             </div>
          </div>

          <div class="blog-preview-card glass-card p-0">
             <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #c4b5fd, #8b5cf6);">
               <i class='bx bx-brain'></i>
             </div>
             <div class="blog-content p-2">
               <span class="blog-category">Mental Health</span>
               <h4>Managing Stress in Modern Life</h4>
               <p style="font-size: 0.95rem;">Chronic stress can lead to severe physical ailments. Discover cognitive strategies and relaxation techniques recommended by our neurology department.</p>
               <a href="#" class="read-more" style="margin-top: auto;">Read More <i class='bx bx-right-arrow-alt'></i></a>
             </div>
          </div>

          <div class="blog-preview-card glass-card p-0">
             <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #fcd34d, #fbbf24);">
               <i class='bx bx-child'></i>
             </div>
             <div class="blog-content p-2">
               <span class="blog-category">Pediatrics</span>
               <h4>Nutrition Guide for Toddlers</h4>
               <p style="font-size: 0.95rem;">Ensuring your child gets the right vitamins and minerals during their crucial growth phases. A comprehensive guide for new parents.</p>
               <a href="#" class="read-more" style="margin-top: auto;">Read More <i class='bx bx-right-arrow-alt'></i></a>
             </div>
          </div>

          <div class="blog-preview-card glass-card p-0">
             <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #cbd5e1, #94a3b8);">
               <i class='bx bx-bone'></i>
             </div>
             <div class="blog-content p-2">
               <span class="blog-category">Orthopedics</span>
               <h4>Ergonomics While Working From Home</h4>
               <p style="font-size: 0.95rem;">Preventing back pain and RSI through proper desk setup and posture. Small adjustments that make a massive difference to your spine.</p>
               <a href="#" class="read-more" style="margin-top: auto;">Read More <i class='bx bx-right-arrow-alt'></i></a>
             </div>
          </div>

        </div>

        <div style="text-align: center; margin-top: 3rem;">
           <button class="btn btn-primary"><i class='bx bx-loader-circle'></i> Load More Articles</button>
        </div>

      </div>
    </section>
  `;
};
