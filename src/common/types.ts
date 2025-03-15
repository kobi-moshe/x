type PossibleResponses = {
  positive: string;
  neutral: string;
  negative: string;
};

export type BriefData = {
  subject: string;
  summary: string;
  responses: PossibleResponses;
  actions: Array<string>;
};
