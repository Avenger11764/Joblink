export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorkHere: boolean;
  roleDescription: string;
}

export interface EducationEntry {
  id: string;
  degreeType: string;
  fieldOfStudy: string;
  institutionName: string;
  startDate: string;
  endDate: string;
}

export interface ApplicationProfile {
  fullName: string;
  email: string;
  phone: string;
  aboutMe: string;
  experiences: WorkExperience[];
  education: EducationEntry[];
  skills: string[];
  coverLetterMode: 'write' | 'upload';
  coverLetterText: string;
  coverLetterFile: {
    name: string;
    size: string;
  } | null;
  resumeFile: {
    name: string;
    size: string;
  } | null;
  portfolioUrl?: string;
}

export type ApplicationStep = 
  | 'personal-info' 
  | 'work-experience' 
  | 'education' 
  | 'skills-cover-letter' 
  | 'resume-upload' 
  | 'final-review';

export type ActivePage = 'home' | 'jobs' | 'apply' | 'corporate';

