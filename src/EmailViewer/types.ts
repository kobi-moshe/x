import { EmailData } from "../common";

export type EmailViewerProps = EmailData & {
  setSelectedEmail: (email: null) => void;
  hasBrief: boolean;
  onShowBriefClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    emailId: string
  ) => void;
  onGenerateBriefSuccess: () => void;
  isPremiumUser?: boolean;
};

export type GenerateBriefServerData = {
  id: string;
  subject: string;
  content: string;
};
