type PossibleResponses = {
  positive: string;
  neutral: string;
  negative: string;
};

export type BriefData = {
  summary: string;
  responses: PossibleResponses;
  actions: Array<string>;
};
