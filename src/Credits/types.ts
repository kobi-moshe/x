export type CreditsProps = {
  credits: number | undefined;
  isSmallScreen?: boolean;
};

export type CreditsPackage = {
  credits: number;
  price: number;
  generations: number;
  isBestOffer?: boolean;
};
