export default {
  SIGN_IN: "/users/login/",
  SIGN_UP: "/users/register/",
  BULK_SCRAP: "/candidates/bulk-scrape/",
  LEAD_CREATE: "/lead_management/create/",
  LEAD_LIST: "/lead_management/list/",
  COMPANY_PROFILE: (leadId) => `/lead_management/details/${leadId}/`,
  JOB_DESCRIPTIONS: "/jobs/job-descriptions/",
};
