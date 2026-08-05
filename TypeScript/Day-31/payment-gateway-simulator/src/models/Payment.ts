// Credit Card

export interface CreditCardPayment {
  method: "Credit Card";

  cardNumber: string;

  cardHolderName: string;

  cvv: string;

  expiry: string;
}

// Debit Card

export interface DebitCardPayment {
  method: "Debit Card";

  cardNumber: string;

  cardHolderName: string;

  pin: string;
}

// UPI

export interface UpiPayment {
  method: "UPI";

  upiId: string;
}

// Net Banking

export interface NetBankingPayment {
  method: "Net Banking";

  bankName: string;

  accountNumber: string;

  ifsc: string;
}

// Wallet

export interface WalletPayment {
  method: "Wallet";

  walletName: string;

  mobileNumber: string;
}