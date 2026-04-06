export const formatSalary = (job: any) => {
  if (!job.min_salary) return "Negotiable";
  const max = job.max_salary ? ` – ${job.max_salary}` : "";
  return `${job.currency} ${job.min_salary}${max} / ${job.salary_type}`;
};

export const formatEmploymentType = (type: string) =>
  type?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "—";
