export type EmailType = {
  id: string;
  subject: string;
  sender: string;
  htmlContent: string;
  cleanContent: string;
};

export type EmailViewerProps = EmailType & {
  isPremiumUser: boolean;
  onClick: (content: string) => void;
};