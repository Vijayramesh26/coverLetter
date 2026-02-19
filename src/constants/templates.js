export const OUTREACH_CONTENT = [
  {
    name: "Value-First",
    subject: "Application for {{role}} | {{userName}}",
    body: `Hi {{recruiterName || "Hiring Manager"}},

I’ve been following {{company}}’s recent growth and was excited to see the {{role}} opening. With {{experience}} years of experience, I’ve built scalable solutions that align perfectly with your team's goals.

I’d love to share how my background can add value. You can view my profile here: {{userLinkedinUrl}} 

Best regards,
{{signature}}`
  },
  {
    name: "Short & Direct",
    subject: "Regarding {{role}} at {{company}}",
    body: `Hi {{recruiterName || "Hiring Manager"}},

I'm reaching out regarding the {{role}} position at {{company}}. I have {{experience}} years of relevant experience and am very interested in the role.

Are you the right person to speak with about this?

Thanks,
{{signature}}`
  },
  {
    name: "Referral Request",
    subject: "Referral Request: {{role}} - {{userName}}",
    body: `Hi {{recruiterName || "Hiring Manager"}},

I hope you're having a great week! I'm interested in applying for the {{role}} position at {{company}}. 

Given your role there, I was wondering if you’d be open to providing a referral? 

Best,
{{signature}}`
  },
  {
    name: "The Follow-up",
    subject: "Follow up: {{role}} application",
    body: `Hi {{recruiterName || "Hiring Manager"}},

I'm just checking in on my application for the {{role}} position at {{company}}. I'm still very interested and happy to provide any additional info.

Looking forward to hearing from you!

Best,
{{signature}}`
  }
];