import React from 'react';
import BuyTicketsPopupDumb from './BuyTicketsPopupDumb';

interface BuyTicketsPopupSmartProps {
  prevStep: () => void;
  open: boolean;
  setOpen: any;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProceedToBuy: (e: any) => void;
}

function BuyTicketsPopupSmart({
  prevStep,
  open,
  setOpen,
  checked,
  handleCheckboxChange,
  handleProceedToBuy,
}: BuyTicketsPopupSmartProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (e: any): void => {
    setOpen(false);
    handleProceedToBuy(e);
  };

  const handleCancel = (): void => {
    setOpen(false);
    prevStep();
  };

  return (
    <BuyTicketsPopupDumb
      open={open}
      checked={checked}
      handleCheckboxChange={handleCheckboxChange}
      handleClose={handleClose}
      handleCancel={handleCancel}
      handleProceed={handleProceed}
    />
  );
}

export default BuyTicketsPopupSmart;
