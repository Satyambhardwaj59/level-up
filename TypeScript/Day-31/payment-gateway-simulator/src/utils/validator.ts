import {
  CreditCardPayment,
  DebitCardPayment,
  NetBankingPayment,
  UpiPayment,
  WalletPayment,
} from "../models/Payment";

import { PaymentMethod } from "../types/PaymentMethod";

/* ==========================================
   Type Guards
========================================== */

export function isCreditCard(
  payment: PaymentMethod
): payment is CreditCardPayment {
  return payment.method === "Credit Card";
}

export function isDebitCard(
  payment: PaymentMethod
): payment is DebitCardPayment {
  return payment.method === "Debit Card";
}

export function isUPI(
  payment: PaymentMethod
): payment is UpiPayment {
  return payment.method === "UPI";
}

export function isWallet(
  payment: PaymentMethod
): payment is WalletPayment {
  return payment.method === "Wallet";
}

export function isNetBanking(
  payment: PaymentMethod
): payment is NetBankingPayment {
  return payment.method === "Net Banking";
}

/* ==========================================
   Validators
========================================== */

export function validateCreditCard(
  payment: CreditCardPayment
): boolean {
  return (
    payment.cardNumber.length === 16 &&
    payment.cvv.length === 3 &&
    payment.expiry.length >= 5
  );
}

export function validateDebitCard(
  payment: DebitCardPayment
): boolean {
  return (
    payment.cardNumber.length === 16 &&
    payment.pin.length === 4
  );
}

export function validateUPI(
  payment: UpiPayment
): boolean {
  return payment.upiId.includes("@");
}

export function validateWallet(
  payment: WalletPayment
): boolean {
  return payment.mobileNumber.length === 10;
}

export function validateNetBanking(
  payment: NetBankingPayment
): boolean {
  return (
    payment.bankName.trim().length > 0 &&
    payment.accountNumber.length >= 8 &&
    payment.ifsc.length === 11
  );
}