
const BASE_URL = "https://api.bhcjobs.com/storage";

export const normalizeIndustry = (item) => ({
  id: item?.id,
  name: item?.name || "Industry",
  jobCount: item?.jobs_count || 0,
  image: item?.image ? `${BASE_URL}/industry-image/${item.image}` : null,
});

export const normalizeCompany = (item) => {
  const c = item?.company || {};
  return {
    id: c?.id,
    name: c?.name || "Company",
    jobCount: item?.jobs_count || 0,
    logo: c?.image ? `${BASE_URL}/company-image/${c.image}` : null,
  };
};

export const normalizeJob = (job) => ({
  id: job?.id,
  title: job?.industry_name || "Job Role",
  company_name: job?.company_name,
  salary: job?.currency || "N/A",
  location: job?.country?.name || "Saudi Arabia",
  type: job?.employment_type || "Full Time",
  experience: job?.experience ? `${job.experience} yrs` : "N/A",
  company_logo: job?.company?.image ? `${BASE_URL}/company-image/${job.company.image}` : null,
});
