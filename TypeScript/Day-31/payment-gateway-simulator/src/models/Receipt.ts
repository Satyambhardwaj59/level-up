import { Customer } from "./Customer";
import { PaymentStatus } from "../types/PaymentStatus";

export interface PaymentReceipt {
  transactionId: string;

  customer: Customer;

  amount: number;

  paymentMethod: string;

  status: PaymentStatus;

  paymentTime: string;
}