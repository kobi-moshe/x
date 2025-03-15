export type EmailType = {
  id: string;
  subject: string;
  sender: string;
  htmlContent: string;
  cleanContent: string;
};

export type GenerateBriefServerData = {
  subject: string;
  content: string;
};

export type EmailViewerProps = EmailType & {
  isPremiumUser: boolean;
  onClick: (data: GenerateBriefServerData) => void;
};
