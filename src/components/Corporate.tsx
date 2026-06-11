import React, { useState } from 'react';

interface Job {
  id: string;
  role: string;
  location: string;
  posted: string;
  applicants: number;
  newApplicants: number;
  salary: string;
  status: 'Active' | 'Draft' | 'Closed';
}

interface Candidate {
  name: string;
  role: string;
  company: string;
  status: string;
  avatar: string;
  matchScore: number;
}

export default function Corporate() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      role: 'Principal Software Architect',
      location: 'Bengaluru (Hybrid) • Posted 3 days ago',
      posted: '3 days ago',
      applicants: 42,
      newApplicants: 5,
      salary: '₹35,00,000 - ₹48,00,000 / year',
      status: 'Active',
    },
    {
      id: '2',
      role: 'UI/UX Design Lead',
      location: 'Gurugram (On-site) • Posted 1 week ago',
      posted: '1 week ago',
      applicants: 156,
      newApplicants: 12,
      salary: '₹18,00,000 - ₹25,00,000 / year',
      status: 'Active',
    },
    {
      id: '3',
      role: 'Growth Marketing Manager',
      location: 'Mumbai (Remote) • Posted 2 days ago',
      posted: '2 days ago',
      applicants: 89,
      newApplicants: 21,
      salary: '₹12,00,000 - ₹18,00,000 / year',
      status: 'Active',
    },
  ]);

  const [candidates] = useState<Candidate[]>([
    {
      name: 'Elena Rodriguez',
      role: 'Senior Product Designer',
      company: 'Adobe',
      status: 'Screening',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcICdO7ZLmQc2KoY7umxVfMd8rbmzEkQqTxgNGuoWP9tc7O1PGrFyF09uNvAYK7LYfzzQ4Ls-6heQnGxyoEzainlt2GhddsGS1ucpqNb8qV-caFin7NTMbogOQDIZDgbuhr01mfPcC-XN9CYbe1au_AN8YVDW8r8W93mjU8-NgN4vYGIzOCSGqBiaM2goI7-0oFd5nQmkhKiQWbcMONQmfT-y80uq_PjvscQU4grOFyP3dzQYZl3P225XdGLSy4w8ujbiL8jUeTauk',
      matchScore: 98,
    },
    {
      name: 'Marcus Chen',
      role: 'Fullstack Engineer',
      company: 'Google',
      status: 'Technical Interview',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI-uoGL9YgFGRWYmrKpEnQpGIzW_L45qFRXhnLED-tAmObLLTAqx8-uaM6HWQfFpKjOZbySILQ8KauITUFnJqyq4qoIoeYlqgJY1Zplp1gH6cyjNnCHsCtddeYBoHYlxzbU_E6xZ2ShHEHBYJtxLpyd7m_1yb5QqmHU5OgMCftiOOK87BazHqPILIjdPvP-QkLlN5BMniPUI1b3ZAAE1nIRzhRNIDXbb9WraFDFSEpVkWOcHD1h7W21cF_J1YU2MO3ANuvpbax5P9F',
      matchScore: 91,
    },
    {
      name: 'Jordan Smith',
      role: 'VP of Marketing',
      company: 'Stripe',
      status: 'Initial Review',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZyg7kpSPoTS_iRBo3PH6K8BcuwviYbc85LGz524dHgw55iLG9CUZznfL38k8jvAeEF8NYdGU98jMmKzSbtjWy8Z2pym46O20_LrYixstlSnfNge4ziA2koWyOxKo86aB9IA5Fn6pQOhZYdU1cuzLTrThoug3cS53n6dnOQgaNGAIGQgailGLh-SuLMMZDhEmgORLbz3DhCq6XI4YyWKfsmxal8c4pUQ13hMX0AYiEkvSontvYQooQY0QkCl5GAfFHoORJmnZHxBlY',
      matchScore: 85,
    },
  ]);

  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    role: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    desc: '',
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.role || !jobForm.location) return;

    const newJob: Job = {
      id: Date.now().toString(),
      role: jobForm.role,
      location: `${jobForm.location} • Posted Just now`,
      posted: 'Just now',
      applicants: 0,
      newApplicants: 0,
      salary: `₹${Number(jobForm.salaryMin).toLocaleString('en-IN')} - ₹${Number(jobForm.salaryMax).toLocaleString('en-IN')} / year`,
      status: 'Active',
    };

    setJobs([newJob, ...jobs]);
    setJobForm({
      role: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      desc: '',
    });
    setShowPostJobModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] font-display">Recruiter Dashboard</h1>
          <p className="text-[var(--text-secondary)] text-sm font-medium">Welcome back, Sarah. Here's what's happening with your pipeline today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Report generated and downloaded successfully!')}
            className="px-6 py-2.5 bg-white/10 border border-[var(--glass-border)] rounded-xl glass-panel font-bold text-xs text-primary hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Generate Report
          </button>
          <button 
            onClick={() => setShowPostJobModal(true)}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            Post New Job
          </button>
        </div>
      </header>

      {}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {}
        <div className="md:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Total Active Candidates</h3>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-extrabold text-primary font-display">1,284</span>
              <span className="text-emerald-500 font-bold text-xs flex items-center">
                <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                +12% this week
              </span>
            </div>
          </div>
          {}
          <div className="h-20 w-full mt-4 flex items-end gap-1.5">
            <div className="bg-primary/20 w-full h-[40%] rounded-t-lg"></div>
            <div className="bg-primary/20 w-full h-[60%] rounded-t-lg"></div>
            <div className="bg-primary/20 w-full h-[55%] rounded-t-lg"></div>
            <div className="bg-primary/20 w-full h-[80%] rounded-t-lg"></div>
            <div className="bg-primary/40 w-full h-[70%] rounded-t-lg"></div>
            <div className="bg-primary/60 w-full h-[95%] rounded-t-lg"></div>
            <div className="bg-primary w-full h-[90%] rounded-t-lg"></div>
          </div>
        </div>

        {}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between glass-card-hover cursor-pointer">
          <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center text-primary mb-4 border border-[var(--glass-border)]">
            <span className="material-symbols-outlined text-2xl">work</span>
          </div>
          <div>
            <p className="text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Active Postings</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)] font-display">{jobs.length}</h3>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between glass-card-hover cursor-pointer">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-4 border border-[var(--glass-border)]">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <div>
            <p className="text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Interviews Today</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)] font-display">8</h3>
          </div>
        </div>
      </section>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <section className="lg:col-span-2 space-y-6">
          
          {}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-display">Recent Submissions</h2>
              <button className="text-primary font-bold text-xs hover:underline cursor-pointer">View Pipeline</button>
            </div>
            
            <div className="space-y-3">
              {candidates.map((cand, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/30 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={cand.avatar} 
                      alt={cand.name} 
                      className="w-12 h-12 rounded-full border border-white/50 object-cover" 
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{cand.name}</h4>
                      <p className="text-[var(--text-secondary)] text-xs font-semibold">{cand.role} • {cand.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0 border-[var(--glass-border)]">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                      cand.status === 'Screening' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      cand.status === 'Technical Interview' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {cand.status}
                    </span>
                    <button 
                      onClick={() => alert(`Reviewing candidate: ${cand.name}`)}
                      className="p-1.5 text-[var(--text-secondary)] hover:text-primary rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg block">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-display">Active Job Listings</h2>
              <button className="p-2 rounded-xl bg-white/10 text-[var(--text-secondary)] hover:bg-white/20 transition-all border border-[var(--glass-border)] cursor-pointer">
                <span className="material-symbols-outlined text-lg block">filter_list</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-[var(--text-secondary)] font-semibold text-xs border-b border-[var(--glass-border)]">
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Applicants</th>
                    <th className="pb-4">Avg. Salary</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-[var(--text-primary)] divide-y divide-[var(--glass-border)]">
                  {jobs.map((job) => (
                    <tr key={job.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{job.role}</span>
                          <span className="text-xs text-[var(--text-secondary)]">{job.location}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        {job.applicants} <span className="text-xs text-primary font-bold">({job.newApplicants > 0 ? `+${job.newApplicants} new` : 'no new'})</span>
                      </td>
                      <td className="py-4 pr-4">{job.salary}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                          <span className="text-xs font-semibold">{job.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {}
        <aside className="space-y-6">
          {}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <h3 className="text-md font-bold tracking-tight text-[var(--text-primary)] font-display">Pipeline Velocity</h3>
            <div className="relative h-44 w-full flex items-end justify-between px-2 rounded-xl bg-gradient-to-t from-primary/10 to-transparent border border-[var(--glass-border)] p-2">
              <div className="w-4 bg-primary/40 rounded-t-full h-[30%]"></div>
              <div className="w-4 bg-primary/50 rounded-t-full h-[45%]"></div>
              <div className="w-4 bg-primary/40 rounded-t-full h-[35%]"></div>
              <div className="w-4 bg-primary/60 rounded-t-full h-[60%]"></div>
              <div className="w-4 bg-primary/80 rounded-t-full h-[80%]"></div>
              <div className="w-4 bg-primary/70 rounded-t-full h-[55%]"></div>
              <div className="w-4 bg-primary/80 rounded-t-full h-[70%]"></div>
              <div className="w-4 bg-primary rounded-t-full h-[95%]"></div>
            </div>
            <p className="text-[var(--text-secondary)] text-xs font-semibold leading-relaxed">
              Candidates are moving 15% faster through the screening stage compared to last month.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[var(--text-secondary)]">Time to Hire</span>
                <span className="text-[var(--text-primary)]">18 Days</span>
              </div>
              <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden border border-[var(--glass-border)]">
                <div className="bg-primary h-full w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>

          {}
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <h3 className="text-md font-bold tracking-tight text-[var(--text-primary)] font-display">Top Sources</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-[var(--glass-border)]">
                  <span className="material-symbols-outlined text-lg">hub</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-xs font-bold">
                    <span className="text-[var(--text-primary)]">LinkedIn</span>
                    <span className="text-[var(--text-secondary)]">45%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--glass-border)]">
                    <div className="bg-indigo-400 h-full w-[45%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-[var(--glass-border)]">
                  <span className="material-symbols-outlined text-lg">diversity_3</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-xs font-bold">
                    <span className="text-[var(--text-primary)]">Referrals</span>
                    <span className="text-[var(--text-secondary)]">30%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--glass-border)]">
                    <div className="bg-purple-400 h-full w-[30%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-[var(--glass-border)]">
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-xs font-bold">
                    <span className="text-[var(--text-primary)]">Direct Ads</span>
                    <span className="text-[var(--text-secondary)]">25%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--glass-border)]">
                    <div className="bg-amber-500 h-full w-[25%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 space-y-6 animate-scale-up border border-white/40">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-display">Post a New Role</h3>
                <p className="text-[var(--text-secondary)] text-xs font-semibold">Publish job details to your active pipeline.</p>
              </div>
              <button 
                onClick={() => setShowPostJobModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-[var(--text-secondary)] hover:bg-white/20 transition-all border border-[var(--glass-border)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg block">close</span>
              </button>
            </div>

            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Job Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Lead DevOps Engineer"
                  value={jobForm.role}
                  onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--glass-border)] bg-white/10 text-sm font-semibold focus:outline-none focus:border-primary text-[var(--text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Bengaluru, India or Remote"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--glass-border)] bg-white/10 text-sm font-semibold focus:outline-none focus:border-primary text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Min Salary (INR / yr)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 1500000"
                    value={jobForm.salaryMin}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--glass-border)] bg-white/10 text-sm font-semibold focus:outline-none focus:border-primary text-[var(--text-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Max Salary (INR / yr)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 2500000"
                    value={jobForm.salaryMax}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--glass-border)] bg-white/10 text-sm font-semibold focus:outline-none focus:border-primary text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Role Description</label>
                <textarea 
                  placeholder="Include core technologies, required experience, and candidate requirements..." 
                  rows={4}
                  value={jobForm.desc}
                  onChange={(e) => setJobForm({ ...jobForm, desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--glass-border)] bg-white/10 text-sm font-semibold focus:outline-none focus:border-primary text-[var(--text-primary)] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="flex-1 py-2.5 bg-white/10 text-[var(--text-primary)] hover:bg-white/20 rounded-xl font-bold text-xs transition-all border border-[var(--glass-border)] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
