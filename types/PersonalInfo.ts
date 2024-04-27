export type Info = {
  title: String,
  description: String,
  date_time: String
}
export type Project = {
  title: String,
  description: string,
  image: HTMLImageElement
}

export type PersonalInfo = {
  name: String, 
  description: Array<String>,
  experience: Array<Info>,
  avatar_image: HTMLImageElement,
  hardSkills: Array<String>,
  projects: Array<Project>
}
