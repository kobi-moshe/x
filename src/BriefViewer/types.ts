import { BriefData } from "../common";

export type PromptsViewerType = {
  generatedPrompts: Array<string>;
  setGeneratedPrompts: (prompts: Array<string>) => void;
  elements?: Array<string>;
  selectedStyle?: string;
  isAnimated?: boolean;
};

export type ActionItemsDialogProps = {
  setIsOpen: (isOpen: boolean) => void;
} & Pick<BriefData, "actions" | "subject">;
