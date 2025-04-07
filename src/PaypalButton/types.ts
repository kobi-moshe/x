export type PaypalButtonProps = {
  amount: number;
  onConfirmClick: () => void;
  disabled?: boolean;
  isHighlighted?: boolean;
};
