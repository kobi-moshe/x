export type EmailType = {
  id: string;
  subject: string;
  sender: string;
  htmlContent: string;
  cleanContent: string;
  snippet: string;
  domain: string;
};

export type GenerateBriefServerData = {
  id: string;
  subject: string;
  content: string;
};

export type EmailViewerProps = EmailType & {
  isPremiumUser?: boolean;
  hasBrief: boolean;
  onShowBriefClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    emailId: string
  ) => void;
  onGenerateBriefSuccess: () => void;
  onClose: () => void;
};
