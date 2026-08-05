import {
  CreditCardPayment,
  DebitCardPayment,
  UpiPayment,
  WalletPayment,
  NetBankingPayment
} from "../models/Payment";

export type PaymentMethod =
  | CreditCardPayment
  | DebitCardPayment
  | UpiPayment
  | WalletPayment
  | NetBankingPayment;