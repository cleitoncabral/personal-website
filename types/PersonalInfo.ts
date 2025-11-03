export type Info = {
  title: string;
  description: string;
  date_time: string;
}

export type Project = {
  id: string;
  title: string;
  slug?: string; // Slug gerado automaticamente pelo backend
  description: string;
  image: string[];
  repoURL: string;
}

export type PersonalInfo = {
  name: string;
  description: string[];
  experience: Info[];
  avatar_image: string;
  hard_skills: string[];
  projects: Project[];
}

export type NewProject = {
  title: string;
  description: string;
  image: string;
  repoURL: string;
}