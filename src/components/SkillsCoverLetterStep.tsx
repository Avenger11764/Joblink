import React, { useState } from 'react';
import { ApplicationProfile } from '../types';
import { Bolt, Search, X, FileText, Sparkles, UploadCloud, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface SkillsCoverLetterStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRESET_SUGGESTIONS = ["Agile", "React", "Data Analysis", "Leadership", "Product Strategy", "TypeScript", "Python", "A/B Testing", "User Interviewing", "Wireframing", "TailwindCSS"];

export default function SkillsCoverLetterStep({
  profile,
  onChange,
  onNext,
  onBack
}: SkillsCoverLetterStepProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      onChange({ skills: [...profile.skills, trimmed] });
    }
    setSearchQuery('');
  };

  const removeSkill = (skill: string) => {
    onChange({ skills: profile.skills.filter(s => s !== skill) });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(searchQuery);
    }
  };

  
  const improveWithAI = async () => {
    setLoadingAI(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/improve-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: profile.fullName,
          aboutMe: profile.aboutMe,
          skills: profile.skills,
          coverLetterText: profile.coverLetterText,
          experiences: profile.experiences,
          education: profile.education
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "An error occurred with Gemini processing.");
      }

      onChange({ coverLetterText: result.improvedText });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Could not polish draft. Please verify the server is running and GEMINI_API_KEY is configured.");
    } finally {
      setLoadingAI(false);
    }
  };

  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onChange({
        coverLetterFile: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      });
    }
  };

  const handleManualFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange({
        coverLetterFile: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {}
      <div className="glass-panel p-6 rounded-2xl">
        <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Skills &amp; Cover Letter</h1>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          Highlight your core competencies and tell us why you're the perfect fit for this role.
        </p>
      </div>

      {/* Core Skills section */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Bolt className="text-[var(--primary-accent)] animate-pulse" size={18} />
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Core Skills</h3>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              className="w-full pl-11 pr-4 py-3 glass-input text-xs font-semibold rounded-xl" 
              placeholder="Search skills or write new ones and press Enter (e.g. Python, UI Design)" 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Active Tags */}
            {profile.skills.map((skill) => (
              <div 
                key={skill} 
                className="px-3 py-1.5 bg-amber-500/10 text-[var(--primary-accent)] rounded-xl flex items-center gap-2 font-bold text-xs border border-amber-500/20"
              >
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-amber-500/25 p-0.5 rounded-full flex items-center transition-all cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {/* Suggested Tags */}
            {PRESET_SUGGESTIONS.filter(item => !profile.skills.includes(item)).slice(0, 5).map((suggestion) => (
              <button 
                key={suggestion}
                type="button"
                onClick={() => addSkill(suggestion)}
                className="px-3 py-1.5 glass-button rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cover Letter Panel */}
      <section className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[var(--glass-border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="text-[var(--primary-accent)]" size={18} />
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Cover Letter</h3>
            </div>
            
            <div className="inline-flex p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)]">
              <button 
                type="button"
                className={`px-4 py-1.5 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  profile.coverLetterMode === 'write' 
                    ? 'bg-[var(--primary-accent)] text-[#1C1917]' 
                    : 'text-[var(--text-secondary)]'
                }`}
                onClick={() => onChange({ coverLetterMode: 'write' })}
              >
                Write Statement
              </button>
              <button 
                type="button"
                className={`px-4 py-1.5 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  profile.coverLetterMode === 'upload' 
                    ? 'bg-[var(--primary-accent)] text-[#1C1917]' 
                    : 'text-[var(--text-secondary)]'
                }`}
                onClick={() => onChange({ coverLetterMode: 'upload' })}
              >
                Upload PDF
              </button>
            </div>
          </div>

          {/* Edit/Write Container */}
          {profile.coverLetterMode === 'write' ? (
            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Personal Statement
              </label>
              
              <div className="relative">
                <textarea 
                  className="w-full p-4 glass-input rounded-xl text-xs font-medium leading-relaxed h-[240px] resize-none"
                  placeholder="Write your cover letter here, or use 'Improve with AI' to draft customized text based on your info!"
                  value={profile.coverLetterText}
                  onChange={(e) => onChange({ coverLetterText: e.target.value })}
                />
              </div>

              {errorMessage && (
                <div className="text-xs font-bold text-red-400 bg-red-950/20 p-3 rounded-xl border border-red-500/20 leading-normal">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)]">
                <span className="text-[10px] font-bold text-[var(--text-muted)]">
                  Character count: {profile.coverLetterText.length}
                </span>
                
                <button
                  type="button"
                  disabled={loadingAI}
                  onClick={improveWithAI}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-500/20 bg-amber-500/10 text-[var(--primary-accent)] hover:bg-amber-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  {loadingAI ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                  {loadingAI ? "Polishing..." : "Gemini AI Assist"}
                </button>
              </div>
            </div>
          ) : (
            /* Upload PDF Mock Box */
            <div className="space-y-4">
              {profile.coverLetterFile ? (
                <div className="border border-[var(--glass-border)] rounded-xl p-5 bg-[var(--bg-tertiary)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 font-bold text-xs font-mono">
                      PDF
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-xs leading-snug">{profile.coverLetterFile.name}</p>
                      <p className="text-[var(--text-muted)] text-[10px] font-bold mt-0.5">{profile.coverLetterFile.size} • Vetted</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => onChange({ coverLetterFile: null })}
                    className="text-xs text-red-400 hover:text-red-500 font-bold cursor-pointer"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div 
                  className={`border-2 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 cursor-pointer group transition-colors ${
                    isDragOver 
                      ? 'border-[var(--primary-accent)] bg-amber-500/5' 
                      : 'border-[var(--glass-border)] bg-[var(--bg-tertiary)]/40 hover:bg-[var(--bg-tertiary)]/75'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file"
                    id="coverFile"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleManualFile}
                  />
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)] flex items-center justify-center group-hover:scale-105 transition-transform text-[var(--text-muted)]">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)] text-xs">Drag and drop cover letter PDF</p>
                    <p className="text-[var(--text-muted)] text-[10px] mt-1 font-bold">PDF documents only (Up to 10MB)</p>
                  </div>
                  <label 
                    htmlFor="coverFile"
                    className="glass-button-primary px-5 py-2.5 rounded-xl text-xs cursor-pointer inline-block mt-2"
                  >
                    Browse Files
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer Nav */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--glass-border)]">
        <button 
          onClick={onBack}
          type="button"
          className="flex items-center gap-1 px-5 py-2.5 glass-button font-bold text-xs rounded-xl cursor-pointer"
        >
          <ChevronLeft size={14} /> Back
        </button>
        <div className="flex gap-3">
          <button 
            onClick={onNext}
            type="button"
            className="px-5 py-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-xs rounded-xl cursor-pointer"
          >
            Skip
          </button>
          <button 
            onClick={onNext}
            type="button"
            className="px-8 py-2.5 glass-button-primary text-xs rounded-xl flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
