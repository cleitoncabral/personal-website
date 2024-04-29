export type Info = {
  title: String,
  description: String,
  date_time: String
}
export type Project = {
  title: String,
  description: TrustedHTML | string,
  image: HTMLImageElement,
  repoURL: string
}

export type PersonalInfo = {
  name: String, 
  description: Array<String>,
  experience: Array<Info>,
  avatar_image: HTMLImageElement,
  hardSkills: Array<String>,
  projects: Array<Project>
}
