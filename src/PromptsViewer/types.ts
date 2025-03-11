export type PromptsViewerType = {
  generatedPrompts: Array<string>;
  setGeneratedPrompts: (prompts: Array<string>) => void;
  elements?: Array<string>;
  selectedStyle?: string;
  isAnimated?: boolean;
};
