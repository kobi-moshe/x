type PossibleResponses = {
  positive: string;
  neutral: string;
  negative: string;
};

export type BriefData = {
  id: string;
  subject: string;
  summary: string;
  responses: PossibleResponses;
  actions: Array<string>;
};

export type EmailData = {
  id: string;
  subject: string;
  sender: string;
  sentDate: string;
  domain: string;
  snippet: string;
  htmlContent: string;
  cleanContent: string;
};

export type UserMetadata = {
  email: string;
  name: string;
  isPremium: boolean;
  credits: number;
};
