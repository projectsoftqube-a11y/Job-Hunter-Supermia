import aiMockInterview from './ai-mock-interview';
import resumeJobMatch from './resume-job-match';
import jobApplicationEmail from './job-application-email';
import aiJobMatch from './ai-job-match';
import forNewGrads from './for-new-grads';
import forCareerSwitchers from './for-career-switchers';
import forSoftwareEngineers from './for-software-engineers';
import forDesignersAndAnalysts from './for-designers-and-analysts';
import forPeopleReturningToWork from './for-people-returning-to-work';
import interviewQuestions from './interview-questions';

/*
 * Registry of the content pages served by app/[slug]. A page is live once it is listed here; the menu,
 * footer, sitemap and llms.txt only point to live pages.
 */
export const PAGES = [aiMockInterview, resumeJobMatch, jobApplicationEmail, aiJobMatch, forNewGrads, forCareerSwitchers, forSoftwareEngineers, forDesignersAndAnalysts, forPeopleReturningToWork, interviewQuestions];

export const PAGE_BY_SLUG = Object.fromEntries(PAGES.map((p) => [p.slug, p]));

// Breadcrumb trail per page (Navigation spec, section 7: Home › Page)
export const trailFor = (page) => [{ name: page.label, path: page.path }];
