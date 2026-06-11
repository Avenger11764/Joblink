import React from 'react';
import { ApplicationProfile } from '../types';
import { User, Mail, Phone, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

interface PersonalInfoStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onNext: () => void;
  prefillDemo: () => void;
}

export default function PersonalInfoStep({
  profile,
  onChange,
  onNext,
  prefillDemo
}: PersonalInfoStepProps) {
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  const isFormValid = profile.fullName.trim() !== "" && profile.email.trim() !== "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Personal Details</h1>
          <p className="text-[var(--text-secondary)] text-xs">
            We need a few basic details to get your profile ready for top corporate employers.
          </p>
        </div>
        <button
          onClick={prefillDemo}
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 border border-amber-500/20 bg-amber-500/10 text-[var(--primary-accent)] hover:bg-amber-500/20 rounded-xl text-xs font-bold uppercase transition-all self-start md:self-center cursor-pointer"
        >
          <Sparkles size={14} className="animate-pulse" />
          Load Demo Profile
        </button>
      </div>

      <form className="glass-panel rounded-2xl p-6 md:p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-secondary)] uppercase" htmlFor="fullName">
            Full Name <span className="text-[var(--primary-accent)]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <User size={18} />
            </span>
            <input
              className="w-full rounded-xl pl-11 pr-4 py-3 glass-input text-sm font-semibold"
              id="fullName"
              placeholder="Alexander Sterling"
              type="text"
              required
              value={profile.fullName}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase" htmlFor="email">
              Email Address <span className="text-[var(--primary-accent)]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                <Mail size={18} />
              </span>
              <input
                className="w-full rounded-xl pl-11 pr-4 py-3 glass-input text-sm font-semibold"
                id="email"
                placeholder="a.sterling@example.com"
                type="email"
                required
                value={profile.email}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                <Phone size={18} />
              </span>
              <input
                className="w-full rounded-xl pl-11 pr-4 py-3 glass-input text-sm font-semibold"
                id="phone"
                placeholder="+1 (555) 0123-4567"
                type="tel"
                value={profile.phone}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-secondary)] uppercase" htmlFor="aboutMe">
            About Me / Executive Summary
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-4 text-[var(--text-muted)]">
              <BookOpen size={18} />
            </span>
            <textarea
              className="w-full rounded-xl pl-11 pr-4 py-3 glass-input text-sm font-medium resize-none h-32 leading-relaxed"
              id="aboutMe"
              placeholder="Describe your career goals, active stacks and corporate milestones..."
              value={profile.aboutMe}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onNext}
            disabled={!isFormValid}
            type="button"
            className={`font-bold text-xs px-7 py-3 rounded-xl flex items-center gap-1.5 transition-all ${
              isFormValid 
                ? 'glass-button-primary cursor-pointer' 
                : 'glass-button opacity-50 cursor-not-allowed'
            }`}
          >
            Continue <ChevronRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}
