import React, { useState } from 'react';
import { ApplicationProfile } from '../types';
import { UploadCloud, CheckCircle, FileText, Sparkles, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResumeUploadStepProps {
  profile: ApplicationProfile;
  onChange: (updated: Partial<ApplicationProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ResumeUploadStep({
  profile,
  onChange,
  onNext,
  onBack
}: ResumeUploadStepProps) {

  const [isDragOver, setIsDragOver] = useState(false);

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
        resumeFile: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      });
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange({
        resumeFile: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      });
    }
  };

  const resetUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ resumeFile: null });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {}
      <div className="glass-panel p-6 rounded-2xl">
        <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">Final Step: Resume Upload</h1>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          Please upload your most recent resume to complete the application process. We support PDF and DOCX formats up to 10MB.
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {}
        <div className="md:col-span-2">
          <div 
            className={`border rounded-2xl p-8 bg-[var(--bg-tertiary)]/40 min-h-[300px] flex flex-col items-center justify-center transition-all relative group shadow-sm ${
              isDragOver ? 'border-[var(--primary-accent)] bg-amber-500/5' : 'border-[var(--glass-border)]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              accept=".pdf,.docx" 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              id="resumeFileInput" 
              type="file"
              onChange={handleManualUpload}
            />

            {!profile.resumeFile ? (
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-amber-500/10 text-[var(--primary-accent)] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-500/20">
                  <UploadCloud size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Drag &amp; Drop Resume</h3>
                  <p className="text-[var(--text-muted)] text-[10px] font-bold">or click to browse from your computer</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--glass-border)] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">PDF</span>
                  <span className="bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--glass-border)] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">DOCX</span>
                </div>
              </div>
            ) : (
              
              <div className="flex flex-col items-center w-full space-y-5 z-20">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/25">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Resume Uploaded</h3>
                
                <div className="w-full bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-4 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="text-[var(--text-muted)] animate-pulse" size={24} />
                    <div className="text-left">
                      <p className="font-bold text-[var(--text-primary)] text-xs">{profile.resumeFile.name}</p>
                      <p className="text-[var(--text-muted)] text-[10px] font-bold">{profile.resumeFile.size} • Uploaded Ready</p>
                    </div>
                  </div>
                  <button 
                    className="text-[var(--primary-accent)] hover:underline font-bold text-xs cursor-pointer" 
                    onClick={resetUpload}
                    type="button"
                  >
                    Replace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-2xl space-y-2">
            <span className="text-[var(--primary-accent)] bg-amber-500/10 border border-amber-500/20 p-1.5 rounded-lg inline-block">
              <Sparkles size={16} />
            </span>
            <h4 className="font-bold text-[var(--text-primary)] text-xs uppercase tracking-wide">Quick Tip</h4>
            <p className="text-[var(--text-secondary)] text-[10px] leading-relaxed font-semibold">
              Ensure your contact information is up to date and consistent across your cover letter + portfolio links.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2">
            <span className="text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--glass-border)] p-1.5 rounded-lg inline-block">
              <Lock size={16} />
            </span>
            <h4 className="font-bold text-[var(--text-primary)] text-xs uppercase tracking-wide">Privacy</h4>
            <p className="text-[var(--text-secondary)] text-[10px] leading-relaxed font-semibold">
              Your resume files are encrypted and only accessible to certified recruiters or hiring managers for positions you apply to.
            </p>
          </div>
        </div>

      </div>

      {}
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
          Next: Review <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
