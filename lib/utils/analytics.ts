import { track } from '@vercel/analytics';

export const trackWaitlistSubmission = (email: string) => {
  track('waitlist_submission', {
    email: email,
    timestamp: new Date().toISOString(),
    source: 'modal' // or 'form' depending on where it was submitted
  });
};

export const trackPageView = (page: string) => {
  track('page_view', {
    page: page,
    timestamp: new Date().toISOString()
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  track('button_click', {
    button: buttonName,
    location: location,
    timestamp: new Date().toISOString()
  });
};

export const trackScrollToSection = (sectionName: string) => {
  track('scroll_to_section', {
    section: sectionName,
    timestamp: new Date().toISOString()
  });
}; 