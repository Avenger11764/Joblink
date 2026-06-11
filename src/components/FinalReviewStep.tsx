import React, { useState } from 'react';
import { ApplicationProfile, ApplicationStep } from '../types';
import { User, Briefcase, GraduationCap, Sparkles, FileText, Globe, ChevronLeft, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';

interface FinalReviewStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onJumpToStep: (step: ApplicationStep) => void;
  onBack: () => void;
  onReset: () => void;
}

export default function FinalReviewStep({
  profile,
  onChange,
  onJumpToStep,
  onBack,
  onReset
}: FinalReviewStepProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState(profile.portfolioUrl || '');

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioUrl(e.target.value);
    onChange({ portfolioUrl: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 pt-8 animate-fade-in-up">
        <div className="glass-panel p-8 md:p-12 rounded-3xl space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/25 animate-bounce">
            <CheckCircle2 size={32} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">Application Submitted!</h1>
            <p className="text-[var(--text-secondary)] text-xs max-w-md mx-auto leading-relaxed font-semibold">
              Congratulations, <span className="font-bold text-[var(--text-primary)]">{profile.fullName || "Candidate"}</span>! Your application has been successfully recorded and securely forwarded to our hiring teams under tagline <span className="text-[var(--primary-accent)]">'job, coperate'</span>.
            </p>
          </div>

          <div className="bg-[var(--bg-tertiary)] border border-[var(--glass-border)] rounded-2xl p-6 text-left space-y-3 max-w-sm mx-auto">
            <h4 className="font-bold text-[var(--text-primary)] text-[10px] tracking-widest uppercase">Submission Receipt</h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold text-[var(--text-secondary)]">
              <span className="text-[var(--text-muted)]">Target Email:</span>
              <span className="text-[var(--text-primary)] truncate">{profile.email || "a.sterling@example.com"}</span>
              
              <span className="text-[var(--text-muted)]">Attached Resume:</span>
              <span className="text-[var(--text-primary)] truncate">{profile.resumeFile ? profile.resumeFile.name : "None Uploaded"}</span>
              
              <span className="text-[var(--text-muted)]">Skills Logged:</span>
              <span className="text-[var(--text-primary)]">{profile.skills.length} skills ready</span>
              
              <span className="text-[var(--text-muted)]">Experiences:</span>
              <span className="text-[var(--text-primary)]">{profile.experiences.length} records</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              type="button"
              className="flex items-center justify-center gap-1.5 px-6 py-3 glass-button rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              Apply Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-1.5 px-6 py-3 glass-button-primary rounded-xl text-xs cursor-pointer active:scale-95 transition-all shadow-md"
            >
              Return to Landing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {}
      <section className="glass-panel p-6 rounded-2xl">
        <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Final Review</h1>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          Please review your professional summary before transmitting details to our staffing pool. You can jump back to any section instantly.
        </p>
      </section>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {}
        <div className="space-y-6">
          
          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
                <User size={14} className="text-[var(--primary-accent)]" /> Personal Details
              </span>
              <button 
                onClick={() => onJumpToStep('personal-info')}
                className="text-xs text-[var(--primary-accent)] hover:underline font-bold cursor-pointer"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              <p className="text-base font-extrabold text-[var(--text-primary)] leading-none">{profile.fullName || "Alexander Sterling"}</p>
              <p className="font-semibold">{profile.email || "a.sterling@example.com"}</p>
              <span className="text-[var(--text-muted)] font-bold">{profile.phone || "No phone added"}</span>
              {profile.aboutMe && (
                <p className="text-[var(--text-secondary)] text-xs mt-3 leading-relaxed border-t border-[var(--glass-border)] pt-3 italic">
                  "{profile.aboutMe}"
                </p>
              )}
            </div>
          </div>

          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
                <GraduationCap size={15} className="text-[var(--primary-accent)]" /> Academic Background
              </span>
              <button 
                onClick={() => onJumpToStep('education')}
                className="text-xs text-[var(--primary-accent)] hover:underline font-bold cursor-pointer"
              >
                Edit
              </button>
            </div>

            {profile.education.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No academic history records added yet.</p>
            ) : (
              <div className="space-y-3 divide-y divide-[var(--glass-border)]">
                {profile.education.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 text-xs space-y-0.5 text-[var(--text-secondary)]">
                    <p className="font-bold text-[var(--text-primary)]">{item.degreeType} {item.fieldOfStudy ? `in ${item.fieldOfStudy}` : ''}</p>
                    <p className="font-semibold text-xs">{item.institutionName}</p>
                    <span className="text-[var(--text-muted)] text-[10px] font-bold">{item.startDate} to {item.endDate}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
              <Globe size={14} className="text-[var(--primary-accent)]" /> Portfolio Website
            </span>
            <div className="space-y-3">
              <p className="text-[var(--text-secondary)] text-[11px] font-semibold leading-relaxed">
                Add an optional link to your digital portfolio or GitHub address:
              </p>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                <input 
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl glass-input font-bold"
                  placeholder="e.g. www.alexsterling.design"
                  type="text"
                  value={portfolioUrl}
                  onChange={handlePortfolioChange}
                />
              </div>
            </div>
          </div>

        </div>

        {}
        <div className="space-y-6">
          
          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
                <Briefcase size={14} className="text-[var(--primary-accent)]" /> Career Experience
              </span>
              <button 
                onClick={() => onJumpToStep('work-experience')}
                className="text-xs text-[var(--primary-accent)] hover:underline font-bold cursor-pointer"
              >
                Edit
              </button>
            </div>

            {profile.experiences.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No work history items added yet.</p>
            ) : (
              <div className="space-y-4 divide-y divide-[var(--glass-border)]">
                {profile.experiences.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 space-y-1 text-[var(--text-secondary)]">
                    <p className="font-bold text-[var(--text-primary)] text-xs leading-tight">{item.jobTitle}</p>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold">{item.company} • {item.startDate} to {item.endDate}</p>
                    {item.roleDescription && (
                      <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed mt-1 line-clamp-2">
                        {item.roleDescription}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
                <FileText size={14} className="text-[var(--primary-accent)]" /> Skills &amp; Statement
              </span>
              <button 
                onClick={() => onJumpToStep('skills-cover-letter')}
                className="text-xs text-[var(--primary-accent)] hover:underline font-bold cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {profile.skills.length === 0 ? (
                  <span className="text-xs text-[var(--text-muted)] italic">No skills selected</span>
                ) : (
                  profile.skills.map(s => (
                    <span key={s} className="bg-amber-500/10 text-[var(--primary-accent)] text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border border-amber-500/20">
                      {s}
                    </span>
                  ))
                )}
              </div>
              
              <div className="border-t border-[var(--glass-border)] pt-3 text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
                {profile.coverLetterMode === 'write' ? (
                  <p className="line-clamp-4 italic">
                    "{profile.coverLetterText || 'No custom statement written.'}"
                  </p>
                ) : (
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileText size={12} /> Cover PDF: {profile.coverLetterFile?.name || 'File details missing'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-[var(--primary-accent)]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-bold text-xs text-[var(--text-muted)] tracking-wider uppercase">
                <FileText size={14} className="text-[var(--primary-accent)]" /> Uploaded Resume
              </span>
              <button 
                onClick={() => onJumpToStep('resume-upload')}
                className="text-xs text-[var(--primary-accent)] hover:underline font-bold cursor-pointer"
              >
                Edit
              </button>
            </div>

            {profile.resumeFile ? (
              <div className="flex items-center gap-3 bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-3 rounded-xl text-xs">
                <div className="w-8 h-8 rounded bg-rose-500/10 border border-rose-500/20 text-rose-450 flex items-center justify-center font-mono font-bold">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[var(--text-primary)] truncate leading-snug">{profile.resumeFile.name}</p>
                  <p className="text-[var(--text-muted)] text-[10px] font-bold">{profile.resumeFile.size}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-400 font-bold bg-rose-950/20 p-3 rounded-xl border border-rose-500/20">
                ⚠️ Warning: No resume PDF file selected. Please go back and attach a resume file list to ensure visibility.
              </p>
            )}
          </div>

        </div>

      </div>

      {}
      <section className="bg-[linear-gradient(135deg,_var(--bg-secondary)_0%,_var(--bg-tertiary)_100%)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[var(--glass-border)] shadow-[0_0_20px_rgba(245,158,11,0.05)] mt-8">
        <div className="space-y-1">
          <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)]">Confirm application parameters</h3>
          <p className="text-[var(--text-secondary)] text-xs font-semibold">
            By clicking Submit, your application data will be permanently logged in our recruiter portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-shrink-0">
          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full flex items-center justify-center gap-2 glass-button-primary text-xs px-8 py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer"
          >
            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {isSubmitting ? "Transmitting..." : "Submit Application"}
          </button>
        </form>
      </section>

      {}
      <div className="pt-2 flex justify-start">
        <button 
          onClick={onBack}
          type="button"
          className="flex items-center gap-1 px-5 py-2.5 glass-button font-bold text-xs rounded-xl cursor-pointer"
        >
          <ChevronLeft size={14} /> Back
        </button>
      </div>

    </div>
  );
}
