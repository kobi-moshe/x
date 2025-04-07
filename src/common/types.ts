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
