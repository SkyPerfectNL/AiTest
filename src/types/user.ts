import { Project } from "./project"

export interface ProfileData {
  status: "active" | "blocked" | "deleted"
  username: string
  firstName: string
  lastName: string
  fatherName: string | null
  email: string
  phone: string
  phoneConfirmed: boolean
  emailConfirmed: boolean
  country: string
  city: string
  company: string | null
  employeeCount: "<10" | "11-30" | "30-100" | ">100" | null
  jobPosition: string | null
  usePurpose: "personal" | "testPersonal" | "testCompany" | "testJob"
  teams: {name: string, role: string}[]
}
export interface FinanceData {
  balance: number
  subscription: 1 | 2 | 3 | 0
}
export interface SettingsData {
  flag: boolean
}
export interface ProjectData {
  projects: Project[]
}

export interface User {
  id: string
  isAdmin: boolean
  profileData: ProfileData
  financeData: FinanceData
  settingsData: SettingsData
  projectData: ProjectData

}
