export type NormalizedJob = {
  id: number;
  title: string;
  company_name: string;
  salary: string;
  location: string;
  type: string;
  experience: string;
  company_logo: string | null;
};

export type NormalizedIndustry = {
  id: number;
  name: string;
  jobCount: number;
  image: string | null;
};

export type NormalizedCompany = {
  id: number | undefined;
  name: string;
  jobCount: number;
  logo: string | null;
};

export type JobDetails = {
  id: number;
  job_title: string;
  company_name: string;
  company: {
    id: number;
    name: string;
    image: string | null;
  };
  industry_name: string;
  currency: string;
  min_salary: number | null;
  max_salary: number | null;
  salary_type: string;
  employment_type: string;
  experience: string;
  country: { name: string };
  working_hours: number;
  working_days: number;
  vacancy: number;
  view_count: number;
  min_age: number;
  max_age: number;
  gender: string;
  accommodation: number;
  transportation: number;
  medical_service: number;
  iqama: number;
  is_overtime_allowed: number;
  food_option: string;
  food_amount: number;
  is_hot: number;
  expiry: string;
  job_desc: string;
  job_requirement: string;
  recruitment_process: string;
  hard_skills: any[];
  languages: any[];
  slug: string;
  type: string;
};