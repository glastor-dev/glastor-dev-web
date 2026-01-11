
export interface Repository {
  name: string;
  description: string;
  url: string;
  stats: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Experience {
  company: string;
  logo: string;
  role: string;
  period: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
