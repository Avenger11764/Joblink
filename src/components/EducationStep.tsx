import React, { useState } from 'react';
import { ApplicationProfile, EducationEntry } from '../types';
import { GraduationCap, Trash2, Edit2, Plus, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface EducationStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function EducationStep({
  profile,
  onChange,
  onNext,
  onBack
}: EducationStepProps) {

  
  const [degreeType, setDegreeType] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degreeType.trim() || !institutionName.trim()) return;

    if (editingId) {
      
      const updated = profile.education.map(item => 
        item.id === editingId
          ? { id: item.id, degreeType, fieldOfStudy, institutionName, startDate, endDate }
          : item
      );
      onChange({ education: updated });
      setEditingId(null);
    } else {
      
      const newItem: EducationEntry = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        degreeType,
        fieldOfStudy,
        institutionName,
        startDate,
        endDate
      };
      onChange({ education: [...profile.education, newItem] });
    }

    resetForm();
  };

  const resetForm = () => {
    setDegreeType('');
    setFieldOfStudy('');
    setInstitutionName('');
    setStartDate('');
    setEndDate('');
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updated = profile.education.filter(item => item.id !== id);
    onChange({ education: updated });
    if (editingId === id) {
      resetForm();
    }
  };

  const handleEdit = (item: EducationEntry) => {
    setEditingId(item.id);
    setDegreeType(item.degreeType);
    setFieldOfStudy(item.fieldOfStudy);
    setInstitutionName(item.institutionName);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
  };

  const isFormValid = degreeType.trim() !== '' && institutionName.trim() !== '' && startDate.trim() !== '';

  return (
    <div className="space-y-6">
      {}
      <section className="glass-panel p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Academic Background</h1>
            <p className="text-[var(--text-secondary)] text-xs">
              Tell us about your educational journey. Add your highest degree first.
            </p>
          </div>
          <div className="hidden md:flex text-[var(--primary-accent)] bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
            <GraduationCap size={24} />
          </div>
        </div>
      </section>

      {}
      <section className="glass-panel p-6 rounded-2xl">
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Degree Type</label>
              <select 
                className="rounded-xl p-3 glass-input text-xs font-semibold h-[42px]"
                value={degreeType}
                onChange={(e) => setDegreeType(e.target.value)}
              >
                <option value="" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Select your degree</option>
                <option value="Associate Degree" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Associate Degree</option>
                <option value="Bachelor's Degree" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Bachelor's Degree</option>
                <option value="Master's Degree" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Master's Degree</option>
                <option value="PhD or Doctorate" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">PhD or Doctorate</option>
                <option value="High School Diploma" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">High School Diploma</option>
                <option value="Other Certificate" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Other Certificate</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Field of Study</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold"
                placeholder="e.g. Computer Science" 
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Institution Name</label>
            <input 
              className="rounded-xl p-3 glass-input text-xs font-semibold"
              placeholder="e.g. Stanford University" 
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Start Date</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold"
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Graduation Date (or Expected)</label>
              <input 
                className="rounded-xl p-3 glass-input text-xs font-semibold"
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
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
              {editingId ? "Update Entry" : "Save Entry"}
            </button>
          </div>
        </form>
      </section>

      {/* Added Entries */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
          Added Education ({profile.education.length})
        </h3>

        {profile.education.length === 0 ? (
          <div className="glass-panel border-dashed rounded-2xl p-8 text-center text-[var(--text-secondary)] text-xs">
            No education credentials logged yet. Add your certificates or degrees above.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {profile.education.map((item) => (
              <div 
                key={item.id}
                className="glass-panel rounded-2xl p-5 flex gap-4 items-start group hover:border-[var(--primary-accent)]/30"
              >
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-450 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] text-sm">
                        {item.degreeType} {item.fieldOfStudy ? `in ${item.fieldOfStudy}` : ''}
                      </h4>
                      <p className="text-[10px] text-[var(--text-muted)] font-bold mt-0.5">
                        {item.institutionName} • {item.startDate} to {item.endDate || 'Ongoing'}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1.5 glass-button rounded-lg transition-all"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 glass-button text-red-400 hover:text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Expert Tip alert card */}
      <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start text-xs border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.05)]">
        <span className="text-[var(--primary-accent)] mt-0.5">
          <Sparkles size={18} className="fill-[rgba(245,158,11,0.1)]" />
        </span>
        <div className="space-y-1">
          <p className="font-bold text-[var(--text-primary)] text-xs">Expert Matching Strategy</p>
          <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed font-semibold">
            Corporate algorithms prioritises certificates and specific degree tags. Be sure to list degrees clearly to align with matching thresholds.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--glass-border)]">
        <button 
          onClick={onBack}
          type="button"
          className="flex items-center gap-1 px-5 py-2.5 glass-button font-bold text-xs rounded-xl cursor-pointer"
        >
          <ChevronLeft size={14} /> Back
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
  );
}
