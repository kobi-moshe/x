import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import coin from "/coin.png";
import { useStyles } from "./styles";
import { CreditsPackage, CreditsProps } from "./types";
import { forwardRef, useState } from "react";
import { creditPackages } from "./utils";
import { Star as StarIcon, Close as CloseIcon } from "@mui/icons-material";
import clsx from "clsx";
import { PaypalButton } from "../PaypalButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide ref={ref} direction="up" {...props} timeout={1000} />;
});

export const Credits: React.FC<CreditsProps> = ({
  credits,
  isSmallScreen = false,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onPurchaseClick = (pkg: CreditsPackage) => {
    const { price, credits } = pkg;
    localStorage.setItem("price", price.toString());
    localStorage.setItem("creditsPurchased", credits.toString());
    toggleDialog();
  };

  return (
    <>
      <Button
        startIcon={<img src={coin} width={15} height={15} />}
        disabled={credits === undefined}
        onClick={toggleDialog}
        className={
          isSmallScreen
            ? classes.tokensIndicatorWrapperSmallScreen
            : classes.tokensIndicatorWrapper
        }
      >
        <Typography variant="body2" fontWeight="bold">
          {credits}
        </Typography>
      </Button>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
        onClose={toggleDialog}
      >
        <IconButton onClick={toggleDialog} className={classes.closeIcon}>
          <CloseIcon />
        </IconButton>
        <DialogTitle variant="h5" fontWeight="bold">
          Choose your package
        </DialogTitle>
        <DialogContent>
          <div className={classes.cardContainer}>
            {creditPackages.map((pkg) => (
              <Card
                key={pkg.credits}
                className={clsx(
                  classes.card,
                  pkg.isBestOffer && classes.bestOffer
                )}
              >
                {pkg.isBestOffer && (
                  <div className={classes.bestOfferBadge}>
                    <StarIcon fontSize="small" />
                    Best Offer
                  </div>
                )}
                <CardContent className={classes.packageContentWrapper}>
                  <Typography variant="h4" className={classes.creditAmount}>
                    {pkg.credits} Credits
                  </Typography>
                  <Typography variant="h5" className={classes.price}>
                    ${pkg.price}
                  </Typography>
                  <Typography>{pkg.generations} generations</Typography>
                  <PaypalButton
                    amount={pkg.price}
                    isHighlighted={pkg.isBestOffer}
                    onConfirmClick={() => onPurchaseClick(pkg)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
