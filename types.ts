
export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  linkedIn: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface PortfolioProject {
  id: string;
  projectName: string;
  url: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  portfolio: PortfolioProject[];
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Your Name",
    email: "your.email@example.com",
    phoneNumber: "123-456-7890",
    address: "Your City, State",
    linkedIn: "linkedin.com/in/yourprofile",
    website: "yourportfolio.com",
    summary: "A brief professional summary about yourself. Click the magic wand to generate one with AI based on your profile!",
  },
  experience: [
    {
      id: "exp1",
      jobTitle: "Software Engineer",
      company: "Tech Company",
      location: "San Francisco, CA",
      startDate: "2020-01-01",
      endDate: "Present",
      description: "• Developed and maintained web applications using React and Node.js.\n• Collaborated with cross-functional teams to deliver high-quality software.\n• Use the magic wand to rewrite this description!",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2016-09-01",
      endDate: "2020-05-01",
    },
  ],
  skills: [
    { id: "skill1", name: "React" },
    { id: "skill2", name: "TypeScript" },
    { id: "skill3", name: "Node.js" },
    { id: "skill4", name: "Tailwind CSS" },
  ],
  portfolio: [
    {
      id: "proj1",
      projectName: "AI Resume Builder",
      url: "your-project-link.com",
      description: "• Built a web application using React and TypeScript to help users create and optimize their resumes.\n• Integrated with the Gemini API for AI-powered content generation and enhancement.\n• Click the magic wand to improve this description!",
    },
  ],
};
