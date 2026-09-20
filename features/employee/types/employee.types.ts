export const EMPLOYEE_VIEWS = {
  GRID: "grid",
  LIST: "list",
  CREATE: "create",
  EDIT: "edit",
} as const;

export type EmployeeView = (typeof EMPLOYEE_VIEWS)[keyof typeof EMPLOYEE_VIEWS];

export const EMPLOYEE_TABS = {
  WORK: "work",
  PERSONAL: "personal",
  RESUME: "resume",
  PAYROLL: "payroll",
  SETTINGS: "settings",
} as const;

export type EmployeeTab = (typeof EMPLOYEE_TABS)[keyof typeof EMPLOYEE_TABS];

export const EMPLOYEE_CATEGORIES = {
  ALL: "all",
  ADMIN: "administrator",
  BANANI: "banani",
  MIRPUR: "mirpur",
  GULSHAN: "gulshan",
} as const;

export type EmployeeCategory =
  (typeof EMPLOYEE_CATEGORIES)[keyof typeof EMPLOYEE_CATEGORIES];

export const WORKING_DAY_STATUS = {
  WORKED_DAY: "worked_day",
  WEEKEND: "weekend",
} as const;

export type WorkingDayStatus =
  (typeof WORKING_DAY_STATUS)[keyof typeof WORKING_DAY_STATUS];

export const WAGE_TYPES = {
  FIXED_WAGE: "Fixed Wage",
  DAY_WAGE: "Day Wage",
  HOURLY_WAGE: "Hourly Wage",
} as const;

export type WageType = (typeof WAGE_TYPES)[keyof typeof WAGE_TYPES];

export const WAGE_PERIODS = {
  MONTHLY: "Month",
  WEEKLY: "Week",
  DAILY: "Day",
} as const;

export type WagePeriod = (typeof WAGE_PERIODS)[keyof typeof WAGE_PERIODS];

export const CONTRACT_TYPES = {
  PERMANENT: "Permanent",
  INTERN: "Intern",
  SESSIONAL: "Sessional",
  FULL_TIME: "Full-Time",
  PART_TIME: "Per-Time",
} as const;

export type ContractType = (typeof CONTRACT_TYPES)[keyof typeof CONTRACT_TYPES];

export interface EmployeeSocials {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  location: string;
  salesCount: string;
  branch: string;
  avatarUrl: string;
  email: string;
  phone: string;
  countryCode: string;
  tag: string[];
  category: EmployeeCategory;
  socials: EmployeeSocials;
}

export interface WorkingDaysSchedule {
  friday: WorkingDayStatus;
  saturday: WorkingDayStatus;
  sunday: WorkingDayStatus;
  monday: WorkingDayStatus;
  tuesday: WorkingDayStatus;
  wednesday: WorkingDayStatus;
  thursday: WorkingDayStatus;
}

export interface WorkFormData {
  department: string;
  jobPosition: string;
  jobTitle: string;
  workLocation: string;
  workingDays: WorkingDaysSchedule;
  note: string;
}

export interface PersonalFormData {
  emergencyRelation: string;
  emergencyPhone: string;
  emergencyCountryCode: string;
  emergencyAddress: string;
  idCardCopy: string;
  idCardCopyUrl: string;
  drivingLicense: string;
  drivingLicenseUrl: string;
  passport: string;
  passportUrl: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  note: string;
}

export interface ResumeFormData {
  fileName: string;
  fileSize: string;
  uploadDate: string;
  fileUrl?: string;
}

export interface PayrollFormData {
  contractDate: string;
  wageType: WageType;
  wageAmount: string;
  wagePeriod: WagePeriod;
  contractType: ContractType;
  note: string;
}

export interface SettingsFormData {
  isActive: boolean;
  allowPortalAccess: boolean;
  notificationEmail: boolean;
  notificationSms: boolean;
  note: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  tag: string[];
  avatarUrl?: string;
  work: WorkFormData;
  personal: PersonalFormData;
  resume: ResumeFormData;
  payroll: PayrollFormData;
  settings: SettingsFormData;
}
