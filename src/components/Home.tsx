import React, { useState, useEffect, useRef } from 'react';

interface HomeProps {
  onNavigate: (page: 'home' | 'jobs' | 'apply' | 'corporate') => void;
  setSearchQuery: (query: string) => void;
}

export default function Home({ onNavigate, setSearchQuery }: HomeProps) {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const slides = [
    {
      badge: "Empower your career",
      titleStart: "Your Next Elite Career ",
      titleHighlight: "Starts Here.",
      description: "Access exclusive opportunities from global tech giants and academic institutions focused on your professional growth.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDit15fp_y_m9ODhRKxdvXaqxGGuRqSpkwT_HrhH1oXNJfhtS3FAdCDVdttiuqDIqo0Uz8YeyLu9y65-XZY8LSt9y05oew5EBjyF_sT5kGD4AdxRBrcWLVk4m4txfvivftt-xYfjim77eyDINJ1O2nLhOOevk_n85f-N0QL5tON3OPeuZODiLxrT09kIMww8mHK4ygfVLUqZ_gYH4g_dFw-pTSzFbFh6Sb9GnC4OgcpmYB53KxY0oWV-FoBLfAlcdT2B1KAzlERH2o",
      ctaText1: "Browse Open Roles",
      ctaText2: "Upload CV",
      action: () => onNavigate('jobs')
    },
    {
      badge: "Vetted Candidates",
      titleStart: "Structured Application ",
      titleHighlight: "Funnel.",
      description: "Say goodbye to unformatted CVs. Build your verified professional profile using our step-by-step wizard checks.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh-wqqzTX98prOxiHQoMpag_fZwicAZFNXLGeONUYKlbZpMAodqG4r26tbg-KrA2Hy0V_Yss5aNMn-TIBC02JJn8hLhJUF2bfgBdBseg81rXUOIa-32VNDCVS1ay4-F_RwWuVvdRVzTvuRSoxdlFPnW51W26U933neXnEr5BjdyV5wEO-GnbpQ0MY-xRmtFEXL11Y0LpOEamUOGkTdo3Z-z14eEqvyXFI8aTGBmxRL2of_Wgpfn-Isx9PIekoF0tawWFq_9OcPthY",
      ctaText1: "Apply Now",
      ctaText2: "Verify Profile",
      action: () => onNavigate('apply')
    },
    {
      badge: "Find top talent",
      titleStart: "Hire the World's Best ",
      titleHighlight: "Thinkers.",
      description: "Post jobs and gain access to a curated network of over 85,000 highly qualified candidates from prestigious institutions.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkLj8dYRStFn-Dwy72ru2bvGl9JlifqdzBC4A8bs95xRaJlh7_FwtI_jFalz9SQbADUfJtpVllkTp1oRSQcONNpJZ4HksNwFaJkyxh7pU5d6aqIPm0Eyd02trxiEIhE2t5d5d-yScsdsVje6j5QYq7LV7TIN52Mn4aKjy19lRwXfHxrXkXmSWbOH17ZuxTNLwhReKskNCmpoGdxRTpm9pymlBxg2f6tIpulv8v2RmCJnXsSfBN8OqJiQ2Iddbe0A-FFnCKeGcoLPg",
      ctaText1: "Start Recruiting",
      ctaText2: "Contact Support",
      action: () => onNavigate('corporate')
    }
  ];

  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ jobs: 0, courses: 0, candidates: 0 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        const targets = { jobs: 12450, courses: 320, candidates: 85000 };
        const duration = 1200; 
        const intervalTime = 16;
        const steps = duration / intervalTime;
        
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeProgress = 1 - Math.pow(1 - progress, 3); 
          
          setStats({
            jobs: Math.floor(targets.jobs * easeProgress),
            courses: Math.floor(targets.courses * easeProgress),
            candidates: Math.floor(targets.candidates * easeProgress),
          });

          if (currentStep >= steps) {
            setStats(targets);
            clearInterval(timer);
          }
        }, intervalTime);
      }
    }, { threshold: 0.1 });

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const [pricingType, setPricingType] = useState<'candidates' | 'corporate'>('candidates');

  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  
  const [contactData, setContactData] = useState({ name: '', email: '', subject: 'Career Guidance', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!contactData.name.trim()) newErrors.name = 'Full Name is required';
    if (!contactData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!contactData.message.trim()) newErrors.message = 'Message text is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setContactData({ name: '', email: '', subject: 'Career Guidance', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="space-y-0 pb-16 animate-fade-in-up">
      <section className="relative h-[450px] md:h-[550px] w-full overflow-hidden mt-0">
        <div 
          className="flex h-full transition-transform duration-700 ease-out" 
          style={{ width: `${totalSlides * 100}%`, transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full relative flex items-center" style={{ width: `${100 / totalSlides}%` }}>
              <div className="absolute inset-0 z-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt={slide.badge}
                  src={slide.img} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/65 to-transparent"></div>
              </div>
              
              <div className="relative z-10 px-6 md:px-16 max-w-2xl text-left">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full glass text-primary font-bold text-xs uppercase tracking-wider">
                  {slide.badge}
                </span>
                <h1 className="font-display-lg text-3xl md:text-5xl text-on-surface mb-4 leading-tight font-extrabold tracking-tight">
                  {slide.titleStart}
                  <br />
                  <span className="text-primary">{slide.titleHighlight}</span>
                </h1>
                <p className="text-sm md:text-base text-on-surface-variant mb-6 leading-relaxed font-medium">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={slide.action}
                    className="bg-primary text-on-primary px-6 py-3 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {slide.ctaText1}
                  </button>
                  <button 
                    onClick={() => onNavigate('apply')}
                    className="glass text-primary px-6 py-3 rounded-full text-xs font-bold border border-primary/20 hover:bg-white/40 transition-all cursor-pointer"
                  >
                    {slide.ctaText2}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? 'bg-primary' : 'bg-primary/30'
              }`}
              style={{ width: currentSlide === index ? '20px' : '10px' }}
              onClick={() => setCurrentSlide(index)}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section ref={sectionRef} className="py-16 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass p-8 rounded-3xl flex flex-col items-center text-center ambient-purple-shadow transition-transform hover:-translate-y-2">
            <span className="material-symbols-outlined text-primary text-5xl mb-4" data-icon="work">work</span>
            <div className="text-4xl md:text-5xl font-extrabold text-primary font-display tracking-tight">
              {stats.jobs.toLocaleString()}+
            </div>
            <p className="text-lg font-bold text-on-surface-variant mt-2">Active Jobs</p>
            <p className="text-xs text-outline mt-2 font-semibold">Connecting talent globally</p>
          </div>

          <div className="glass p-8 rounded-3xl flex flex-col items-center text-center ambient-purple-shadow transition-transform hover:-translate-y-2">
            <span className="material-symbols-outlined text-primary text-5xl mb-4" data-icon="domain">domain</span>
            <div className="text-4xl md:text-5xl font-extrabold text-primary font-display tracking-tight">
              {stats.courses.toLocaleString()}+
            </div>
            <p className="text-lg font-bold text-on-surface-variant mt-2">Partner Companies</p>
            <p className="text-xs text-outline mt-2 font-semibold">Trusting our talent pipeline</p>
          </div>

          <div className="glass p-8 rounded-3xl flex flex-col items-center text-center ambient-purple-shadow transition-transform hover:-translate-y-2">
            <span className="material-symbols-outlined text-primary text-5xl mb-4" data-icon="groups">groups</span>
            <div className="text-4xl md:text-5xl font-extrabold text-primary font-display tracking-tight">
              {stats.candidates.toLocaleString()}+
            </div>
            <p className="text-lg font-bold text-on-surface-variant mt-2">Candidates</p>
            <p className="text-xs text-outline mt-2 font-semibold">Ready to contribute</p>
          </div>

        </div>
      </section>

      <section className="relative overflow-hidden mt-12 space-y-12">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center min-h-[600px] gap-12 px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
            <div 
              className="w-full md:w-1/2 transition-transform duration-200"
              style={{ transform: `translateY(${scrollOffset * 0.04}px)` }}
            >
              <img 
                className="rounded-[2.5rem] shadow-2xl ambient-purple-shadow object-cover w-full h-[400px]" 
                alt="Candidate matching" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD17XfCM0TXOrOume5i2wlgG1YW_sCeTJUo52np2rqIt_fxg5g10ggtXJldVs14j7EqNVmM_cAZMUEqCq8g0IIYsfUVVZ517ltAautHBS6COZ8hJ0-g3HuqfaRe4lktyNiSkhWHkr-KZsogjGIF2BGGrJhwFuX478d6It_-XY0djeKyCcH6nWroIFG_-QNNQs8hNsSD9t8dbJoAp0V4ZA0snSaWjnLg-0vmO89XmNAEpjU_S9dNhXbztjRw1a1w8tBWqV1NukDpxPU" 
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-left">
              <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface leading-tight font-extrabold">
                Candidate <br />
                <span className="text-primary">Matching Reinvented.</span>
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed font-medium">
                Our AI-driven matching system analyzes beyond just keywords. It understands project histories, soft skill nuances, and academic rigor to place you in environments where you don't just work, but thrive.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
                  <div>
                    <p className="font-bold text-on-surface">98% Match Rate</p>
                    <p className="text-xs text-outline font-semibold">Precise placement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
                  <div>
                    <p className="font-bold text-on-surface">Instant Alerts</p>
                    <p className="text-xs text-outline font-semibold">Real-time updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container w-full">
          <div className="flex flex-col md:flex-row-reverse items-center min-h-[600px] gap-12 px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
            <div 
              className="w-full md:w-1/2 transition-transform duration-200"
              style={{ transform: `translateY(-${scrollOffset * 0.02}px)` }}
            >
              <img 
                className="rounded-[2.5rem] shadow-2xl ambient-purple-shadow object-cover w-full h-[400px]" 
                alt="Seamless placement" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh-wqqzTX98prOxiHQoMpag_fZwicAZFNXLGeONUYKlbZpMAodqG4r26tbg-KrA2Hy0V_Yss5aNMn-TIBC02JJn8hLhJUF2bfgBdBseg81rXUOIa-32VNDCVS1ay4-F_RwWuVvdRVzTvuRSoxdlFPnW51W26U933neXnEr5BjdyV5wEO-GnbpQ0MY-xRmtFEXL11Y0LpOEamUOGkTdo3Z-z14eEqvyXFI8aTGBmxRL2of_Wgpfn-Isx9PIekoF0tawWFq_9OcPthY" 
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-left">
              <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface leading-tight font-extrabold">
                Seamless <br />
                <span className="text-primary">Direct Placement.</span>
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed font-medium">
                Say goodbye to repetitive forms. Build your candidate profile once and get matched with top recruiters actively hiring for your exact skillset.
              </p>
              <div className="p-6 glass rounded-2xl border-l-4 border-primary bg-white/30">
                <p className="text-sm text-on-primary-container italic font-medium">
                  "JobLink made job application painless. I filled out my profile once, completed the validation checks, and was interviewed by Vanguard the following week."
                </p>
                <p className="mt-4 text-xs font-bold text-primary">— Sarah J., Tech Lead @ Aurora Systems</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="py-24 px-6 md:px-16 bg-surface">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold text-on-surface mb-6">
            Invest in Your <span className="text-primary">Future.</span>
          </h2>
          <div className="inline-flex p-1 bg-surface-container rounded-full glass">
            <button 
              onClick={() => setPricingType('candidates')}
              className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                pricingType === 'candidates' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              For Candidates
            </button>
            <button 
              onClick={() => setPricingType('corporate')}
              className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                pricingType === 'corporate' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {pricingType === 'candidates' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="glass p-8 rounded-[2rem] border border-white/40 ambient-purple-shadow transition-transform hover:-translate-y-2 text-left flex flex-col justify-between">
              <div>
                <p className="text-xl font-bold text-on-surface mb-2">Free Starter</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary font-display">$0</span>
                  <span className="text-xs text-outline font-semibold">/lifetime</span>
                </div>
                <ul className="space-y-4 mb-10 text-xs font-medium text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Basic job browsing</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> 1 active application</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Free course access</li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('apply')}
                className="w-full glass border-primary/20 text-primary py-4 rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>

            <div className="glass p-8 rounded-[2rem] border-2 border-primary ambient-purple-shadow relative transition-transform hover:-translate-y-2 text-left flex flex-col justify-between">
              <span className="absolute -top-4 right-8 bg-primary text-on-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Most Popular</span>
              <div>
                <p className="text-xl font-bold text-on-surface mb-2">Pro Explorer</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary font-display">$19</span>
                  <span className="text-xs text-outline font-semibold">/month</span>
                </div>
                <ul className="space-y-4 mb-10 text-xs font-medium text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Priority applications</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Advanced AI matching</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Certified badges on profile</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Direct recruiter messaging</li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('apply')}
                className="w-full bg-primary text-on-primary py-4 rounded-xl text-xs font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
              >
                Go Pro Now
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="glass p-8 rounded-[2rem] border border-white/40 ambient-purple-shadow transition-transform hover:-translate-y-2 text-left flex flex-col justify-between">
              <div>
                <p className="text-xl font-bold text-on-surface mb-2">Growth</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary font-display">$199</span>
                  <span className="text-xs text-outline font-semibold">/month</span>
                </div>
                <ul className="space-y-4 mb-10 text-xs font-medium text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Post up to 10 jobs</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Basic candidate CRM</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Analytics dashboard</li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('corporate')}
                className="w-full glass border-primary/20 text-primary py-4 rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                Select Growth
              </button>
            </div>

            <div className="glass p-8 rounded-[2rem] border border-white/40 bg-white/60 ambient-purple-shadow transition-transform hover:-translate-y-2 text-left flex flex-col justify-between">
              <div>
                <p className="text-xl font-bold text-on-surface mb-2">Enterprise</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary font-display">$499</span>
                  <span className="text-xs text-outline font-semibold">/month</span>
                </div>
                <ul className="space-y-4 mb-10 text-xs font-medium text-on-surface-variant">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Unlimited job posts</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Priority talent sourcing</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Full API access</li>
                  <li className="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-sm" data-icon="check">check</span> Dedicated account manager</li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('corporate')}
                className="w-full bg-primary text-on-primary py-4 rounded-xl text-xs font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="py-24 px-6 md:px-16 bg-surface-container-low rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold text-on-surface text-center mb-16">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div 
              onClick={() => toggleFaq(0)}
              className={`glass p-6 rounded-2xl cursor-pointer hover:bg-white/60 transition-all duration-300 text-left ${openFaq === 0 ? 'bg-white/80' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-on-surface text-lg">How does AI matching work?</p>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 0 ? 'rotate-180 text-primary' : ''}`} data-icon="expand_more">expand_more</span>
              </div>
              {openFaq === 0 && (
                <div className="mt-4 text-sm text-on-surface-variant font-medium animate-fade-in-up">
                  Our engine uses natural language processing to map candidate skills from diverse backgrounds to specific job requirement clusters, ensuring a qualitative match.
                </div>
              )}
            </div>

            <div 
              onClick={() => toggleFaq(1)}
              className={`glass p-6 rounded-2xl cursor-pointer hover:bg-white/60 transition-all duration-300 text-left ${openFaq === 1 ? 'bg-white/80' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-on-surface text-lg">Is my profile data secure?</p>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 1 ? 'rotate-180 text-primary' : ''}`} data-icon="expand_more">expand_more</span>
              </div>
              {openFaq === 1 && (
                <div className="mt-4 text-sm text-on-surface-variant font-medium animate-fade-in-up">
                  Absolutely. We prioritize candidate security. All profile forms, work experience metrics, and uploaded PDF resumes are encrypted and shared only with verified corporate accounts.
                </div>
              )}
            </div>

            <div 
              onClick={() => toggleFaq(2)}
              className={`glass p-6 rounded-2xl cursor-pointer hover:bg-white/60 transition-all duration-300 text-left ${openFaq === 2 ? 'bg-white/80' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-on-surface text-lg">Can I cancel my Pro subscription?</p>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 2 ? 'rotate-180 text-primary' : ''}`} data-icon="expand_more">expand_more</span>
              </div>
              {openFaq === 2 && (
                <div className="mt-4 text-sm text-on-surface-variant font-medium animate-fade-in-up">
                  Absolutely. You can cancel at any time through your dashboard settings. Your benefits will remain active until the end of the billing cycle.
                </div>
              )}
            </div>

            <div 
              onClick={() => toggleFaq(3)}
              className={`glass p-6 rounded-2xl cursor-pointer hover:bg-white/60 transition-all duration-300 text-left ${openFaq === 3 ? 'bg-white/80' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-on-surface text-lg">Is there a student discount?</p>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 3 ? 'rotate-180 text-primary' : ''}`} data-icon="expand_more">expand_more</span>
              </div>
              {openFaq === 3 && (
                <div className="mt-4 text-sm text-on-surface-variant font-medium animate-fade-in-up">
                  We offer a 50% discount on the Pro plan for users with a valid .edu email address or university ID.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 relative overflow-hidden rounded-3xl bg-white/20 border border-outline-variant shadow-lg mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold text-on-surface mb-6">
              Need Academic <span className="text-primary">Advice?</span>
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed font-medium">
              Our career counselors are available to help you navigate your educational path or hiring strategy. Reach out to our team today.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-icon="mail">mail</span>
                </div>
                <p className="text-sm font-bold text-on-surface">support@joblink.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-icon="location_on">location_on</span>
                </div>
                <p className="text-sm font-bold text-on-surface">12 Academic Plaza, Suite 400, Cambridge, MA</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <form onSubmit={handleContactSubmit} className="glass p-8 md:p-10 rounded-[2.5rem] ambient-purple-shadow space-y-6 text-left relative">
              {success && (
                <div className="absolute inset-0 bg-white/95 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 z-20 animate-fade-in-up">
                  <span className="material-symbols-outlined text-emerald-500 text-5xl mb-4" data-icon="check_circle">check_circle</span>
                  <h3 className="text-xl font-bold text-on-surface">Inquiry Sent Successfully!</h3>
                  <p className="text-xs text-on-surface-variant mt-2 font-semibold max-w-xs">
                    Thank you for contacting JobLink. Our advisers will get back to you within 24 hours.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant px-1">Full Name</label>
                  <input 
                    type="text" 
                    value={contactData.name}
                    onChange={(e) => {
                      setContactData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    placeholder="John Doe" 
                    className={`w-full bg-white/20 border border-white/40 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 text-on-surface transition-all text-sm font-medium ${errors.name ? 'border-red-500/50' : ''}`}
                    required 
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant px-1">Email Address</label>
                  <input 
                    type="email" 
                    value={contactData.email}
                    onChange={(e) => {
                      setContactData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    placeholder="john@example.com" 
                    className={`w-full bg-white/20 border border-white/40 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 text-on-surface transition-all text-sm font-medium ${errors.email ? 'border-red-500/50' : ''}`}
                    required 
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant px-1">Subject</label>
                <select 
                  value={contactData.subject}
                  onChange={(e) => setContactData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-white/20 border border-white/40 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 text-on-surface transition-all text-sm font-medium"
                >
                  <option className="text-on-surface bg-surface">Career Guidance</option>
                  <option className="text-on-surface bg-surface">Candidate Screening</option>
                  <option className="text-on-surface bg-surface">Corporate Partnership</option>
                  <option className="text-on-surface bg-surface">Technical Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant px-1">Message</label>
                <textarea 
                  value={contactData.message}
                  onChange={(e) => {
                    setContactData(prev => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                  }}
                  placeholder="How can we help you today?" 
                  rows={4}
                  className={`w-full bg-white/20 border border-white/40 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 text-on-surface transition-all resize-none text-sm font-medium ${errors.message ? 'border-red-500/50' : ''}`}
                  required 
                />
                {errors.message && <p className="text-red-500 text-[10px] font-bold">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-xl text-xs font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/10 rounded-full blur-[120px] -z-10"></div>
      </section>

    </div>
  );
}
