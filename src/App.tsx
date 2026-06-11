import React, { useState, useEffect } from 'react';
import { ApplicationProfile, ApplicationStep, ActivePage } from './types';
import Home from './components/Home';
import JobsHub from './components/JobsHub';
import Corporate from './components/Corporate';
import PersonalInfoStep from './components/PersonalInfoStep';
import WorkExperienceStep from './components/WorkExperienceStep';
import EducationStep from './components/EducationStep';
import SkillsCoverLetterStep from './components/SkillsCoverLetterStep';
import ResumeUploadStep from './components/ResumeUploadStep';
import FinalReviewStep from './components/FinalReviewStep';
import ParticleBackground from './components/ParticleBackground';

import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Bolt, 
  FileText, 
  CheckSquare, 
  Save, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Menu, 
  X, 
  Check, 
  ChevronRight,
  Sun,
  Moon,
  ArrowUp,
  MapPin,
  Mail,
  Send,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'careerlaunch_application_draft';

const INITIAL_PROFILE: ApplicationProfile = {
  fullName: '',
  email: '',
  phone: '',
  aboutMe: '',
  experiences: [],
  education: [],
  skills: [],
  coverLetterMode: 'write',
  coverLetterText: '',
  coverLetterFile: null,
  resumeFile: null,
  portfolioUrl: ''
};

const DEMO_PROFILE: ApplicationProfile = {
  fullName: 'Alexander Sterling',
  email: 'a.sterling@example.com',
  phone: '+1 (555) 0123-4567',
  aboutMe: 'Lead UX designer and researcher specialized in building enterprise-grade design systems & complex interactive software. Focused on clean layouts and dynamic digital workflows.',
  experiences: [
    {
      id: 'demo-exp-1',
      jobTitle: 'Senior UX Designer',
      company: 'Vanguard Tech Solutions',
      startDate: '2020-09',
      endDate: 'Present',
      currentlyWorkHere: true,
      roleDescription: 'Led the UI/UX language Overhaul for our primary SaaS dashboard, boosting workflow completion efficiency by 40%. Collaborated with engineering managers to construct a scalable React design token system serving 25+ frontend developers.'
    },
    {
      id: 'demo-exp-2',
      jobTitle: 'Interaction Designer',
      company: 'Global Nexus Systems',
      startDate: '2017-06',
      endDate: '2020-08',
      currentlyWorkHere: false,
      roleDescription: 'Designed wireframes, journey maps, and high-fidelity prototypes for B2B dashboards. Conducted over 50 recursive user interviews and moderated comprehensive usability testing matrices.'
    }
  ],
  education: [
    {
      id: 'demo-edu-1',
      degreeType: "Master's Degree",
      fieldOfStudy: 'Human-Computer Interaction',
      institutionName: 'Stanford University',
      startDate: '2015-09',
      endDate: '2017-06'
    },
    {
      id: 'demo-edu-2',
      degreeType: "Bachelor's Degree",
      fieldOfStudy: 'Visual Communication Design',
      institutionName: 'University of Washington',
      startDate: '2011-09',
      endDate: '2015-06'
    }
  ],
  skills: ['Figma', 'React', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility', 'TailwindCSS'],
  coverLetterMode: 'write',
  coverLetterText: `Dear Hiring Team,

I am incredibly excited to apply for the Lead UX position on your team. With over 6 years of experience establishing robust web technologies and spearheading intuitive interfaces, I am confident that my design approach will perfectly match your product's focus on elegant workflows.

During my tenure at Vanguard Tech Solutions, I championed the overhaul of our flagship enterprise web platform, working closely with engineering partners to roll out a shared design library that reduced interface feedback cycles. My specialized MS training in HCI from Stanford University solidified my research-first methodology, equipping me with the skills to turn rich customer feedback into sleek, visual realities.

Thank you so much for your time and consideration. I would welcome the opportunity to discuss my B2B visual background and show how my system strategy can help your portal scale.

Sincerely,
Alexander Sterling`,
  coverLetterFile: null,
  resumeFile: {
    name: 'Alexander_Sterling_CV_UX2026.pdf',
    size: '1.8 MB'
  },
  portfolioUrl: 'www.alexsterling.design'
};

export default function App() {
  
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [searchQuery, setSearchQuery] = useState('');

  
  const [profile, setProfile] = useState<ApplicationProfile>(INITIAL_PROFILE);
  const [activeStep, setActiveStep] = useState<ApplicationStep>('personal-info');
  
  
  const isDarkMode = false;
  const [loading, setLoading] = useState(true);
  
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode-override');
    } else {
      root.classList.remove('dark-mode-override');
    }
  }, [isDarkMode]);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fullName || parsed.experiences?.length || parsed.education?.length) {
          setProfile(parsed);
          showToast("Draft loaded from auto-save.");
        }
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
      showToast("Draft application saved securely!");
    } catch (e) {
      showToast("Could not save draft. Local storage may be full.");
    }
  };

  
  const handleResetApplication = () => {
    if (window.confirm("Are you sure you want to clear your application? All typed sections will be removed.")) {
      setProfile(INITIAL_PROFILE);
      setActiveStep('personal-info');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      showToast("Application reset successfully.");
    }
  };

  
  const handlePrefillDemo = () => {
    setProfile(DEMO_PROFILE);
    setActiveStep('final-review');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEMO_PROFILE));
    showToast("Loaded Alexander Sterling's demo profile!");
  };

  
  const handleProfileChange = (updated: Partial<ApplicationProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        
      }
      return next;
    });
  };

  
  const navigateToPage = (page: ActivePage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const steps: { key: ApplicationStep; label: string; index: number; icon: React.ReactNode }[] = [
    { key: 'personal-info', label: 'Personal Info', index: 1, icon: <User size={14} /> },
    { key: 'work-experience', label: 'Work Experience', index: 2, icon: <Briefcase size={14} /> },
    { key: 'education', label: 'Education', index: 3, icon: <GraduationCap size={14} /> },
    { key: 'skills-cover-letter', label: 'Skills & Letter', index: 4, icon: <Bolt size={14} /> },
    { key: 'resume-upload', label: 'Resume Upload', index: 5, icon: <FileText size={14} /> },
    { key: 'final-review', label: 'Final Review', index: 6, icon: <CheckSquare size={14} /> }
  ];

  const currentStepObject = steps.find(s => s.key === activeStep) || steps[0];

  const navigateToStep = (indexOffset: number) => {
    const currentIndex = currentStepObject.index;
    const targetIndex = currentIndex + indexOffset;
    const targetStep = steps.find(s => s.index === targetIndex);
    if (targetStep) {
      setActiveStep(targetStep.key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToStep = (step: ApplicationStep) => {
    setActiveStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdf8ff]" id="preloader">
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#9b8ec4]/20 border-t-[#635789] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#635789] text-4xl pulse-animation">school</span>
          </div>
          <p className="mt-6 text-2xl font-bold text-[#635789] tracking-tight font-display">JobLink</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-on-background relative">
      <div className="fixed inset-0 bg-background z-[-2] pointer-events-none" />
      <ParticleBackground />
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-white border border-[#9b8ec4]/30 text-on-background font-bold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          <Check size={14} className="text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white/40 backdrop-blur-xl border-b border-white/40 shadow-[0_8px_32px_0_rgba(155,142,196,0.1)]">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateToPage('home')}>
          <span className="material-symbols-outlined text-primary text-3xl">hub</span>
          <span className="text-xl font-bold text-primary font-display">JobLink</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          <span 
            onClick={() => navigateToPage('home')} 
            className={`hover:text-primary transition-colors cursor-pointer border-b-2 py-1 ${currentPage === 'home' ? 'border-primary text-primary' : 'border-transparent'}`}
          >
            Home
          </span>
          <span 
            onClick={() => navigateToPage('jobs')} 
            className={`hover:text-primary transition-colors cursor-pointer border-b-2 py-1 ${currentPage === 'jobs' ? 'border-primary text-primary' : 'border-transparent'}`}
          >
            Find Jobs
          </span>
          <span 
            onClick={() => navigateToPage('apply')} 
            className={`hover:text-primary transition-colors cursor-pointer border-b-2 py-1 ${currentPage === 'apply' ? 'border-primary text-primary' : 'border-transparent'}`}
          >
            Application Wizard
          </span>
          <span 
            onClick={() => navigateToPage('corporate')} 
            className={`hover:text-primary transition-colors cursor-pointer border-b-2 py-1 ${currentPage === 'corporate' ? 'border-primary text-primary' : 'border-transparent'}`}
          >
            Recruiter Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateToPage('apply')} 
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer"
          >
            Apply Now
          </button>

          <button 
            className="md:hidden p-2 text-on-surface-variant hover:bg-white/20 rounded-full transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined block">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full border-t border-outline-variant bg-surface px-4 py-4 space-y-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant animate-fade-in-up shadow-lg z-50">
            <div onClick={() => navigateToPage('home')} className={`py-2 px-2.5 rounded-lg cursor-pointer ${currentPage === 'home' ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container'}`}>Home</div>
            <div onClick={() => navigateToPage('jobs')} className={`py-2 px-2.5 rounded-lg cursor-pointer ${currentPage === 'jobs' ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container'}`}>Find Jobs</div>
            <div onClick={() => navigateToPage('apply')} className={`py-2 px-2.5 rounded-lg cursor-pointer ${currentPage === 'apply' ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container'}`}>Application Wizard</div>
            <div onClick={() => navigateToPage('corporate')} className={`py-2 px-2.5 rounded-lg cursor-pointer ${currentPage === 'corporate' ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container'}`}>Recruiter Portal</div>
            <div className="pt-3 border-t border-outline-variant flex gap-2">
              <button 
                onClick={() => { navigateToPage('apply'); handlePrefillDemo(); }}
                className="flex-1 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded-lg text-center cursor-pointer"
              >
                Load Demo Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 mt-16">
        
        {currentPage === 'home' && (
          <Home onNavigate={navigateToPage} setSearchQuery={setSearchQuery} />
        )}

        {currentPage === 'jobs' && (
          <div className="max-w-7xl w-full mx-auto px-4 py-8">
            <JobsHub searchQuery={searchQuery} setSearchQuery={setSearchQuery} onApplyForJob={() => navigateToPage('apply')} />
          </div>
        )}

        {currentPage === 'corporate' && (
          <div className="max-w-7xl w-full mx-auto px-4 py-8">
            <Corporate />
          </div>
        )}

        {currentPage === 'apply' && (
          <div className="max-w-7xl w-full mx-auto px-4 py-8">
            <section className="mb-8 text-left">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary font-display">Senior UX Architect</h1>
                  <p className="text-[var(--text-secondary)] text-sm font-semibold">Application Portal • Draft saved recently</p>
                </div>
                <button 
                  onClick={handlePrefillDemo}
                  className="hidden md:flex items-center gap-2 bg-secondary-container/20 text-primary px-4 py-2.5 rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-[var(--glass-border)]"
                >
                  <span className="material-symbols-outlined text-[18px]">magic_button</span>
                  Prefill Profile
                </button>
              </div>
              <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden border border-[var(--glass-border)]">
                <div 
                  className="bg-primary h-full transition-all duration-500 ease-out" 
                  style={{ width: `${(currentStepObject.index / 6) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-bold text-primary">
                <span>Step {currentStepObject.index} of 6</span>
                <span>{Math.round((currentStepObject.index / 6) * 100)}% Completed</span>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <aside className="lg:col-span-3">
                <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-hide glass-panel p-3 lg:p-4 rounded-2xl sticky top-20 lg:top-24 max-w-full whitespace-nowrap lg:whitespace-normal">
                  {steps.map((s) => {
                    const isActive = s.key === activeStep;
                    const isCompleted = currentStepObject.index > s.index;
                    
                    let iconName = 'person';
                    let desc = 'Contact Details';
                    if (s.key === 'personal-info') { iconName = 'person'; desc = 'Contact Details'; }
                    else if (s.key === 'work-experience') { iconName = 'work'; desc = 'Professional History'; }
                    else if (s.key === 'education') { iconName = 'school'; desc = 'Academic Record'; }
                    else if (s.key === 'skills-cover-letter') { iconName = 'bolt'; desc = 'Core Competencies'; }
                    else if (s.key === 'resume-upload') { iconName = 'upload_file'; desc = 'CV & Portfolio'; }
                    else if (s.key === 'final-review') { iconName = 'rule'; desc = 'Final Verification'; }

                    return (
                      <button
                        key={s.key}
                        onClick={() => jumpToStep(s.key)}
                        className={`flex-shrink-0 w-auto lg:w-full text-left p-3 lg:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                          isActive 
                            ? 'border-primary bg-primary/5 step-active font-bold' 
                            : 'border-transparent text-[var(--text-secondary)] hover:bg-white/30 dark:hover:bg-white/10'
                        }`}
                      >
                        <span className={`material-symbols-outlined ${isActive ? 'text-primary' : isCompleted ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`}>
                          {isCompleted ? 'check_circle' : iconName}
                        </span>
                        <div>
                          <p className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-[var(--text-primary)]'}`}>{s.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-semibold">{desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              <div className="lg:col-span-9 space-y-6">
                
                {activeStep === 'personal-info' && (
                  <PersonalInfoStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onNext={() => navigateToStep(1)}
                    prefillDemo={handlePrefillDemo}
                  />
                )}

                {activeStep === 'work-experience' && (
                  <WorkExperienceStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onNext={() => navigateToStep(1)}
                    onBack={() => navigateToStep(-1)}
                  />
                )}

                {activeStep === 'education' && (
                  <EducationStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onNext={() => navigateToStep(1)}
                    onBack={() => navigateToStep(-1)}
                  />
                )}

                {activeStep === 'skills-cover-letter' && (
                  <SkillsCoverLetterStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onNext={() => navigateToStep(1)}
                    onBack={() => navigateToStep(-1)}
                  />
                )}

                {activeStep === 'resume-upload' && (
                  <ResumeUploadStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onNext={() => navigateToStep(1)}
                    onBack={() => navigateToStep(-1)}
                  />
                )}

                {activeStep === 'final-review' && (
                  <FinalReviewStep 
                    profile={profile}
                    onChange={handleProfileChange}
                    onJumpToStep={jumpToStep}
                    onBack={() => navigateToStep(-1)}
                    onReset={() => {
                      setProfile(INITIAL_PROFILE);
                      setActiveStep('personal-info');
                      localStorage.removeItem(LOCAL_STORAGE_KEY);
                    }}
                  />
                )}

              </div>
            </div>
          </div>
        )}

      </main>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-[linear-gradient(135deg,_var(--primary-accent)_0%,_var(--primary-accent-hover)_100%)] text-[#1C1917] p-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
          title="Back to Top"
        >
          <ArrowUp size={16} className="stroke-[3]" />
        </button>
      )}

      <footer className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8 bg-surface-container-low border-t border-outline-variant mt-16 text-left">
        <div className="max-w-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">hub</span>
            <span className="font-bold text-xl text-primary font-display">JobLink</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
            The elite hub for career advancement and corporate matches, bringing talent and industry together.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full md:w-auto">
          <div className="space-y-4">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Platform</p>
            <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
              <li><span onClick={() => navigateToPage('jobs')} className="hover:text-primary transition-colors cursor-pointer">Find Jobs</span></li>
              <li><span onClick={() => navigateToPage('apply')} className="hover:text-primary transition-colors cursor-pointer">Application Wizard</span></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Company</p>
            <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
              <li><span onClick={() => navigateToPage('home')} className="hover:text-primary transition-colors cursor-pointer">About Us</span></li>
              <li><span onClick={() => navigateToPage('corporate')} className="hover:text-primary transition-colors cursor-pointer">Recruiter Portal</span></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Legal</p>
            <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#privacy">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Social</p>
            <div className="flex gap-4">
              <a className="w-8 h-8 rounded-full glass flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#social">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a className="w-8 h-8 rounded-full glass flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#social">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full py-6 px-6 md:px-12 bg-surface-container-low text-center border-t border-outline-variant text-xs font-semibold text-on-surface-variant">
        <p>© 2026 JobLink Portal. All rights reserved.</p>
      </div>

    </div>
  );
}
