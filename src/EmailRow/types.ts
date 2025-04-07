import { EmailData } from "../common";

export type EmailRowProps = EmailData & {
  selectedEmail: EmailData | null | undefined;
  setSelectedEmail: (email: EmailData) => void;
  hasBrief: boolean;
  onShowBriefClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    emailId: string
  ) => void;
};
