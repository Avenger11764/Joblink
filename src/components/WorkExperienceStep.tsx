import React, { useState } from 'react';
import { ApplicationProfile, WorkExperience } from '../types';
import { Briefcase, Plus, Trash2, Edit2, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkExperienceStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WorkExperienceStep({
  profile,
  onChange,
  onNext,
  onBack
}: WorkExperienceStepProps) {
  
  
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);
  const [roleDescription, setRoleDescription] = useState('');
  
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !company.trim()) return;

    const formattedEndDate = currentlyWorkHere ? 'Present' : endDate;

    if (editingId) {
      
      const updated = profile.experiences.map(item => 
        item.id === editingId 
          ? { id: item.id, jobTitle, company, startDate, endDate: formattedEndDate, currentlyWorkHere, roleDescription }
          : item
      );
      onChange({ experiences: updated });
      setEditingId(null);
    } else {
      
      const newItem: WorkExperience = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        jobTitle,
        company,
        startDate,
        endDate: formattedEndDate,
        currentlyWorkHere,
        roleDescription
      };
      onChange({ experiences: [...profile.experiences, newItem] });
    }

    
    resetForm();
  };

  const resetForm = () => {
    setJobTitle('');
    setCompany('');
    setStartDate('');
    setEndDate('');
    setCurrentlyWorkHere(false);
    setRoleDescription('');
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updated = profile.experiences.filter(item => item.id !== id);
    onChange({ experiences: updated });
    if (editingId === id) {
      resetForm();
    }
  };

  const handleEdit = (item: WorkExperience) => {
    setEditingId(item.id);
    setJobTitle(item.jobTitle);
    setCompany(item.company);
    setStartDate(item.startDate);
    setCurrentlyWorkHere(item.currentlyWorkHere || item.endDate === 'Present');
    setEndDate(item.endDate === 'Present' ? '' : item.endDate);
    setRoleDescription(item.roleDescription);
  };

  const isFormValid = jobTitle.trim() !== '' && company.trim() !== '' && startDate.trim() !== '';

  return (
    <div className="space-y-6">
      {}
      <div className="glass-panel p-6 rounded-2xl">
        <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Work Experience</h1>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          Tell us about your professional background. Start with your most recent role.
        </p>
      </div>

      {}
      <section className="glass-panel p-6 rounded-2xl">
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] tracking-wide uppercase">Job Title</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold" 
                placeholder="e.g. Senior Software Engineer" 
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] tracking-wide uppercase">Company</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold" 
                placeholder="e.g. Acme Corp" 
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] tracking-wide uppercase">Start Date</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold" 
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] tracking-wide uppercase flex justify-between items-center">
                <span>End Date</span>
                <span className="flex items-center gap-1.5 font-normal normal-case text-[var(--text-muted)] text-xs">
                  <input 
                    type="checkbox" 
                    id="currentlyWork"
                    className="rounded text-[var(--primary-accent)] border-[var(--glass-border)] focus:ring-[var(--primary-accent)]/20"
                    checked={currentlyWorkHere}
                    onChange={(e) => setCurrentlyWorkHere(e.target.checked)}
                  /> 
                  <label htmlFor="currentlyWork" className="cursor-pointer font-bold text-[10px] uppercase">Currently work here</label>
                </span>
              </label>
              <input 
                className={`rounded-xl p-3 glass-input text-xs font-semibold ${
                  currentlyWorkHere 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                type="month"
                disabled={currentlyWorkHere}
                value={currentlyWorkHere ? "" : endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] tracking-wide uppercase">Role Description</label>
            <textarea 
              className="rounded-xl p-3 glass-input text-xs font-medium h-28 resize-none leading-relaxed" 
              placeholder="Briefly describe your key responsibilities and achievements..." 
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 glass-button rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
            <button 
              disabled={!isFormValid}
              type="submit"
              className={`flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl transition-all border ${
                isFormValid
                  ? 'glass-button-primary cursor-pointer'
                  : 'glass-button opacity-50 cursor-not-allowed'
              }`}
            >
              {editingId ? <Check size={14} /> : <Plus size={14} />}
              {editingId ? "Update Experience" : "Add Experience"}
            </button>
          </div>
        </form>
      </section>

      {}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
          Added Experiences ({profile.experiences.length})
        </h3>
        
        {profile.experiences.length === 0 ? (
          <div className="glass-panel border-dashed rounded-2xl p-8 text-center text-[var(--text-secondary)] text-xs">
            No work experience items added yet. Fill out the form above to log your journey, or hit Next.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {profile.experiences.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel rounded-2xl p-5 flex gap-4 items-start group hover:border-[var(--primary-accent)]/30"
              >
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-[var(--primary-accent)] border border-amber-500/20 flex-shrink-0">
                  <Briefcase size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] text-sm">{item.jobTitle}</h4>
                      <p className="text-[10px] text-[var(--text-muted)] font-bold mt-0.5">
                        {item.company} • {item.startDate} to {item.endDate}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1.5 glass-button rounded-lg transition-all" 
                        title="Edit Entry"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 glass-button text-red-400 hover:text-red-500 rounded-lg transition-all" 
                        title="Delete Entry"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  
                  {item.roleDescription && (
                    <p className="text-[var(--text-secondary)] text-xs mt-3 leading-relaxed whitespace-pre-wrap font-medium">
                      {item.roleDescription}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {}
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
