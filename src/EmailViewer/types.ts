import { BriefData, EmailData } from "../common";

export type EmailViewerProps = EmailData & {
  setSelectedEmail: (email: null) => void;
  hasBrief: boolean;
  onShowBriefClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    emailId: string
  ) => void;
  setBriefs: (briefs: Array<BriefData>) => void;
  isPremiumUser: boolean;
};

export type GenerateBriefServerData = {
  id: string;
  subject: string;
  content: string;
};
