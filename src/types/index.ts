export type PageType = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'team' 
  | 'media' 
  | 'membership' 
  | 'contact';

export type Language = 'en' | 'am' | 'fr';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleAm?: string;
  department: string;
  bio: string;
  highlights: string[];
  email?: string;
  linkedin?: string;
  imageFallbackSeed: string;
}

export interface Program {
  id: string;
  acronym?: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  targetAudience: string;
  howToJoin: string;
  stats?: { label: string; value: string }[];
  status: 'Active' | 'Upcoming' | 'Flagship';
  pillar: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'In-Person' | 'Hybrid' | 'Virtual';
  category: string;
  description: string;
  featuredSpeakers: string[];
  capacity: number;
  registeredCount: number;
  status: 'Open' | 'Past';
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
  author: string;
  location?: string;
  featuredQuote?: string;
  readingTime: string;
}

export interface Chapter {
  id: string;
  city: string;
  country: string;
  region: 'Africa' | 'North America' | 'Europe' | 'Middle East' | 'Asia-Pacific';
  leads: string;
  membersCount: number;
  established: string;
  focus: string;
  coordinates: { x: number; y: number }; // percentage on SVG map
}

export interface MediaItem {
  id: string;
  title: string;
  date: string;
  category: 'Events' | 'Diplomacy' | 'Youth Action' | 'Heritage';
  type: 'photo' | 'video';
  description: string;
  location: string;
  aspectRatio: string;
  duration?: string;
}

export interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  status: 'diaspora' | 'local' | 'student' | 'professional' | 'partner';
  profession: string;
  organizationOrUni: string;
  interestAreas: string[];
  statementOfPurpose: string;
  newsletterOptIn: boolean;
}
