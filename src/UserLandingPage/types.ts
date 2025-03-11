export type EmailType = {
  id: string;
  subject: string;
  sender: string;
  htmlContent: string;
  cleanContent: string;
};

export type EmailViewerProps = EmailType & {
  onClick: (content: string) => void;
};

export type PossibleResponses = {
  positive: string;
  neutral: string;
  negative: string;
};
