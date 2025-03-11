type OptionItem = {
  id: number;
  created_at: string;
  title: string;
};

export type OptionsPickerType = {
  items: Array<OptionItem>;
  onClick: (label: string) => void;
  selected?: string;
};
