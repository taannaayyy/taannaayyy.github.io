export const contactEmail = "taalpkonur@gmail.com";

const resumeSubject = "Resume Request";
const resumeBody = `Hi Tanay,

I came across your website and would love to take a look at your resume. Would you be able to share it with me?

Name:
Company:
Role:

Thank you!
`;

/** Opens a Gmail compose window with the resume request filled in. */
export const resumeGmailUrl =
  `https://mail.google.com/mail/?view=cm&to=${contactEmail}` +
  `&su=${encodeURIComponent(resumeSubject)}&body=${encodeURIComponent(resumeBody)}`;

/** Same request for visitors who don't use Gmail in the browser. */
export const resumeMailtoUrl =
  `mailto:${contactEmail}` +
  `?subject=${encodeURIComponent(resumeSubject)}&body=${encodeURIComponent(resumeBody)}`;
