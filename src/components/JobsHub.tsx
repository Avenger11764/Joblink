import React, { useState } from 'react';

interface JobsHubProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onApplyForJob: () => void;
}

interface JobItem {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  tags: string[];
  description: string;
  requirements: string[];
  postedTime: string;
  equity?: string;
}

const JOBS_DATA: JobItem[] = [
  {
    id: 'job-1',
    title: 'Senior Product Designer',
    company: 'Lumina Systems',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpYCqr0wHtuQsXWTWTRjBHdt1nFHH2WFgWe7bNwqKGojdct56iWJh8Pfa0fhPb2nY-_rGFZ3_BcSuOl0tL1IBfIKWHjIwB9r8Cn4lW6oPbSFyaYV2DVeyTthdhFd_Fq4uTUf-9uN3u7hU62hf9sIqaIoJt6UhiE5w6zSyk6oHItG4OvCSQr3P77RNJ-bIa2eLsdRuArXuaSbykiWoQXFJFaRk-ztgnNeNCupiuqZ0yynzt8JIsRalgcd36EiliFAnbI72FaQg3YIwQ',
    location: 'Bengaluru (Hybrid)',
    type: 'Hybrid',
    salary: '₹18,00,000 - ₹24,00,000 / year',
    category: 'Design',
    tags: ['Design', 'Figma', 'SaaS'],
    description: 'We are looking for a passionate individual to join our growing team. You will lead the design vision for our core product, collaborating closely with engineering and product management to deliver world-class experiences.',
    requirements: [
      '5+ years of experience in product design roles.',
      'Strong portfolio demonstrating high-quality craft and UX thinking.',
      'Proficiency in Figma and interactive prototyping tools.',
      'Experience working in agile, fast-paced environments.'
    ],
    postedTime: '2 days ago',
    equity: '0.1 - 0.5%'
  },
  {
    id: 'job-2',
    title: 'Frontend Engineer (React)',
    company: 'AetherCloud',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOnue6Ro161w9sgrK-cWShoGL2F2se_M86lx-Ril1PJGwwlBE4jtwcvxr7VKFZtwXJZg_Ed95jGFE6UwOWJA5pYGki8AkfE5FHGdWdvg7W49eeiLmG68rIYsu8MzcJktRr0Ff198TG2z4Dqx_lj8MW8fmCk3dVy0mygwjo_5-ELeKlUDJxsPGhEv2nv1xh09EQ6qbHbD1Pji6J-NesQ3rdMUE3bbT4WwcNVCkt4EhVx8yCjg1GfjpBuI82JLbKniNs0UU_dorRWkzS',
    location: 'Remote',
    type: 'Remote',
    salary: '₹14,00,000 - ₹20,00,000 / year',
    category: 'Engineering',
    tags: ['Engineering', 'TypeScript', 'Tailwind'],
    description: 'Join our frontend operations to build robust cloud dashboards using React and TypeScript. Optimize web vitals and define core theme architectures.',
    requirements: [
      '3+ years building responsive SPAs.',
      'Proficient in React, modern hooks, and state management.',
      'Excellent styling skills using Tailwind CSS and native variables.'
    ],
    postedTime: '5 hours ago',
    equity: '0.2 - 0.6%'
  },
  {
    id: 'job-3',
    title: 'Growth Marketing Manager',
    company: 'Vortex Digital',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdMqmphGtstwUbD79pCVp7Tk8HNDehl7JZJqljD4YqePyo_mD9xEGrsyqUK_d8rlGxmKXxSRaZh2Nd7C4VQIluPF2B9Q-ycKOptWUpq_XSuxd5cb8VPyMftK6Y2pZWb2vAA5PiB8pv9IaiWl6xFbOfwQkjVCaeuOQT7nIAVXKfxSLD7EcEj8k_b0KR1sdua9VAGANAyhH7XlNI4_t3A-nsSwAe7vJX-q5-Oz8gW9KU8hX-GwPAlphP5hK3dAhf-JOp1KJ2rb0svCdX',
    location: 'Mumbai (On-site)',
    type: 'Full-time',
    salary: '₹10,00,000 - ₹15,00,000 / year',
    category: 'Marketing',
    tags: ['Marketing', 'Ads', 'Data'],
    description: 'Grow Vortex digital acquisition channels. Drive conversion loops, run continuous landing page experiments, and structure paid marketing pipelines.',
    requirements: [
      'Prior expertise running high-spend ad campaigns.',
      'Familiarity with Google Analytics, web instrumentation tools, and SEO setups.'
    ],
    postedTime: 'Just now',
    equity: '0.0 - 0.2%'
  },
  {
    id: 'job-4',
    title: 'Full Stack Developer',
    company: 'SkyNetics',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBca8omQRoN_feztsuKzsHY7qwrl8ZApM7r_a4yJF7-QJMqlt30qoHTEuIDclsATBxui_DoYabuqIE6qJ-eQZsda_MkIErLFvxLoPU1cBYK7d_ehcSpRCV1VOoqibwHW7-QXWe7FUYc2WbKrQqFcDG14lJRxEo9g8wHKR07wdNFqIyV7ZHpoS1nXjogMXqizc9ePIhOOVDPBSl1bb-LFri8OEs-H3LjrLS4sFa8xyNPV8pvwXEdlULE3OP4r3KQwNoFjpinTUnl3rg7',
    location: 'Delhi NCR (Remote Friendly)',
    type: 'Full-time',
    salary: '₹16,00,000 - ₹22,00,000 / year',
    category: 'Engineering',
    tags: ['Engineering', 'Node.js', 'Postgres'],
    description: 'Establish end-to-end applications, construct secure relational databases, and setup containerized CI/CD loops on AWS.',
    requirements: [
      '4+ years working across both node ecosystems and modern UI layouts.',
      'Solid schema designs with Postgres, Redis caching patterns, and serverless builds.'
    ],
    postedTime: '1 day ago',
    equity: '0.1 - 0.4%'
  }
];

export default function JobsHub({ searchQuery, setSearchQuery, onApplyForJob }: JobsHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  const categories = ['Engineering', 'Design', 'Marketing'];

  const getCategoryCount = (cat: string) => {
    return JOBS_DATA.filter(j => j.category === cat).length;
  };

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredJobs = JOBS_DATA.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in-up text-left">
      {}
      <header className="mb-6">
        <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full space-y-2">
            <label className="font-bold text-xs text-secondary ml-1 uppercase tracking-wider">Search for your future</label>
            <div className="flex items-center bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-[var(--glass-border)] shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-primary mr-3">work_outline</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-semibold text-[var(--text-primary)] focus:outline-none"
                placeholder="Job title, company, or tech keywords (React, Marketing, Design...)"
              />
            </div>
          </div>
          <button className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
      </header>

      {}
      <div className="flex flex-col lg:flex-row gap-6">
        {}
        <aside className="w-full lg:w-72 space-y-6 flex-shrink-0">
          {}
          <section className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Categories</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-xs font-bold text-left cursor-pointer border ${
                  selectedCategory === 'All' 
                    ? 'bg-primary-container/20 border-primary text-primary' 
                    : 'bg-white/30 dark:bg-white/5 border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-white/50 dark:hover:bg-white/10'
                }`}
              >
                <span>All Categories</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                }`}>{JOBS_DATA.length}</span>
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-xs font-bold text-left cursor-pointer border ${
                    selectedCategory === cat 
                      ? 'bg-primary-container/20 border-primary text-primary' 
                      : 'bg-white/30 dark:bg-white/5 border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-white/50 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategory === cat ? 'bg-primary text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                  }`}>{getCategoryCount(cat)}</span>
                </button>
              ))}
            </div>
          </section>

          {}
          <section className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Work Type</h3>
            <div className="space-y-3">
              {['Full-time', 'Remote', 'Hybrid', 'Contractor'].map(type => {
                const checked = selectedTypes.includes(type);
                return (
                  <label 
                    key={type} 
                    onClick={() => handleTypeToggle(type)}
                    className="flex items-center gap-3 cursor-pointer group text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                      checked 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-[var(--glass-border)] bg-white/20'
                    }`}>
                      {checked && <span className="material-symbols-outlined text-[14px]">check</span>}
                    </div>
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden shadow-xl shadow-primary/10">
            <div className="relative z-10 space-y-3">
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Premium Upgrade</p>
              <h4 className="font-extrabold text-sm leading-relaxed">Get noticed 3x faster by elite recruiters.</h4>
              <button 
                onClick={() => alert('Upgrade system active. Complete verification next.')}
                className="bg-white text-primary px-4 py-2 rounded-full font-bold text-[10px] hover:shadow-lg transition-all cursor-pointer"
              >
                Upgrade Now
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12 select-none">rocket_launch</span>
          </div>
        </aside>

        {}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <article 
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="glass-panel p-6 rounded-2xl cursor-pointer group flex flex-col justify-between h-full relative border border-[var(--glass-border)] hover:scale-[1.02] transition-transform duration-200"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white p-2 shadow-sm border border-white/20 overflow-hidden flex items-center justify-center">
                      <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`${job.title} added to saved listings!`);
                      }}
                      className="p-1.5 text-[var(--text-muted)] hover:text-primary rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg block">bookmark</span>
                    </button>
                  </div>
                  <h2 className="text-md font-bold tracking-tight text-[var(--text-primary)] mb-1 group-hover:text-primary transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-xs text-secondary font-semibold mb-4">{job.company} • {job.location}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)] text-xs font-bold">
                  <div className="text-[var(--text-primary)]">{job.salary}</div>
                  <div className="text-[var(--text-muted)] text-[10px]">{job.postedTime}</div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 glass-panel rounded-2xl">
              <p className="text-[var(--text-muted)] font-bold text-sm">No jobs match your active filters.</p>
            </div>
          )}
        </div>
      </div>

      {}
      {selectedJob && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-2xl overflow-hidden glass-panel border border-white/40 max-h-[90vh] flex flex-col">
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-white p-2 border border-white/20">
                    <img src={selectedJob.logoUrl} alt={`${selectedJob.company} logo`} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">{selectedJob.title}</h2>
                    <p className="text-xs text-secondary font-semibold">{selectedJob.company}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[var(--text-secondary)] border border-[var(--glass-border)] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg block">close</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-3 rounded-xl text-center">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Location</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{selectedJob.location}</p>
                </div>
                <div className="bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-3 rounded-xl text-center">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Type</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{selectedJob.type}</p>
                </div>
                <div className="bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-3 rounded-xl text-center">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Salary</p>
                  <p className="text-xs font-bold text-primary mt-0.5">{selectedJob.salary.split(' ')[0]}</p>
                </div>
                <div className="bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-3 rounded-xl text-center">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Equity</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{selectedJob.equity || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">About the Role</h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {selectedJob.description}
                </p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] pt-2">Requirements</h3>
                <ul className="list-disc pl-5 text-xs md:text-sm text-[var(--text-secondary)] space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[var(--glass-border)]">
                <button 
                  onClick={() => {
                    setSelectedJob(null);
                    onApplyForJob();
                  }}
                  className="flex-grow bg-primary text-white py-4 rounded-xl font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer text-center"
                >
                  Apply for Position
                </button>
                <button 
                  onClick={() => alert(`${selectedJob.title} bookmarked.`)}
                  className="w-14 h-14 border border-[var(--glass-border)] rounded-xl flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-xl">bookmark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
