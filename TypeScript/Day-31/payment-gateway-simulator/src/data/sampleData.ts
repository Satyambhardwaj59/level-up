import { Customer } from "../models/Customer";
import {
  CreditCardPayment,
  DebitCardPayment,
  NetBankingPayment,
  UpiPayment,
  WalletPayment,
} from "../models/Payment";

export const customer: Customer = {
  id: 1,
  name: "Satyam",
  email: "satyam@gmail.com",
  phone: "9876543210",

  address: {
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
  },
};

// ----------------------------
// Credit Card
// ----------------------------

export const creditCard: CreditCardPayment = {
  method: "Credit Card",
  cardHolderName: "Satyam",
  cardNumber: "1234567812345678",
  cvv: "123",
  expiry: "12/30",
};

// ----------------------------
// Debit Card
// ----------------------------

export const debitCard: DebitCardPayment = {
  method: "Debit Card",
  cardHolderName: "Satyam",
  cardNumber: "8765432187654321",
  pin: "1234",
};

// ----------------------------
// UPI
// ----------------------------

export const upi: UpiPayment = {
  method: "UPI",
  upiId: "satyam@ybl",
};

// ----------------------------
// Net Banking
// ----------------------------

export const netBanking: NetBankingPayment = {
  method: "Net Banking",
  bankName: "State Bank of India",
  accountNumber: "123456789012",
  ifsc: "SBIN0001234",
};

// ----------------------------
// Wallet
// ----------------------------

export const wallet: WalletPayment = {
  method: "Wallet",
  walletName: "Paytm",
  mobileNumber: "9876543210",
};