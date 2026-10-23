/*
 * Each content page's own body design, by slug. Every story renders all of the page's sections from
 * its content module (src/content/pages), so the copy search engines read stays the same.
 */
import MockInterviewStory from './MockInterviewStory';
import ResumeMatchStory from './ResumeMatchStory';
import ApplicationEmailStory from './ApplicationEmailStory';
import JobMatchStory from './JobMatchStory';
import NewGradsStory from './NewGradsStory';
import CareerSwitchersStory from './CareerSwitchersStory';
import SoftwareEngineersStory from './SoftwareEngineersStory';
import DesignersAnalystsStory from './DesignersAnalystsStory';
import ReturningToWorkStory from './ReturningToWorkStory';
import InterviewQuestionsStory from './InterviewQuestionsStory';

export const STORIES = {
  'ai-mock-interview': MockInterviewStory,
  'resume-job-match': ResumeMatchStory,
  'job-application-email': ApplicationEmailStory,
  'ai-job-match': JobMatchStory,
  'for-new-grads': NewGradsStory,
  'for-career-switchers': CareerSwitchersStory,
  'for-software-engineers': SoftwareEngineersStory,
  'for-designers-and-analysts': DesignersAnalystsStory,
  'for-people-returning-to-work': ReturningToWorkStory,
  'interview-questions': InterviewQuestionsStory,
};
