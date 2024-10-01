export type Info = {
  title: String,
  description: String,
  date_time: String
}
export type Project = {
  title: String,
  description: TrustedHTML | string,
  image: Array<HTMLImageElement>,
  repoURL: string,
  id: string
}

export type PersonalInfo = {
  name: String, 
  description: Array<String>,
  experience: Array<Info>,
  avatar_image: HTMLImageElement,
  hard_skills: Array<String>,
  projects: Array<Project>
}
