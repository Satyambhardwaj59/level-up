import { Customer } from "../models/Customer";
import { PaymentReceipt } from "../models/Receipt";

import { PaymentMethod } from "../types/PaymentMethod";
import { PaymentStatus } from "../types/PaymentStatus";

import {
  isCreditCard,
  isDebitCard,
  isUPI,
  isWallet,
  isNetBanking,

  validateCreditCard,
  validateDebitCard,
  validateUPI,
  validateWallet,
  validateNetBanking,
} from "../utils/validator";

import { generateTransactionId } from "../utils/transaction";

export class PaymentGateway {

  // ====================================
  // Process Payment
  // ====================================

  processPayment(
    customer: Customer,
    payment: PaymentMethod,
    amount: number
  ): PaymentReceipt {

    let isValid = false;

    // ====================================
    // Type Guards
    // ====================================

    if (isCreditCard(payment)) {
      isValid = validateCreditCard(payment);
    }

    else if (isDebitCard(payment)) {
      isValid = validateDebitCard(payment);
    }

    else if (isUPI(payment)) {
      isValid = validateUPI(payment);
    }

    else if (isWallet(payment)) {
      isValid = validateWallet(payment);
    }

    else if (isNetBanking(payment)) {
      isValid = validateNetBanking(payment);
    }

    // ====================================
    // Payment Status
    // ====================================

    const status: PaymentStatus = isValid
      ? "SUCCESS"
      : "FAILED";

    const receipt: PaymentReceipt = {

      transactionId: generateTransactionId(),

      customer,

      amount,

      paymentMethod: payment.method,

      status,

      paymentTime: new Date().toLocaleString(),

    };

    return receipt;
  }

  // ====================================
  // Display Status
  // ====================================

  displayPaymentStatus(
    receipt: PaymentReceipt
  ): void {

    console.log("\n========================");

    console.log(
      `Payment Status : ${receipt.status}`
    );

    console.log("========================");
  }

  // ====================================
  // Print Receipt
  // ====================================

  printReceipt(
    receipt: PaymentReceipt
  ): void {

    console.log("\n");

    console.log("========================================");

    console.log("          PAYMENT RECEIPT");

    console.log("========================================");

    console.log(
      "Transaction ID :",
      receipt.transactionId
    );

    console.log(
      "Customer :",
      receipt.customer.name
    );

    console.log(
      "Email :",
      receipt.customer.email
    );

    console.log(
      "Phone :",
      receipt.customer.phone
    );

    // Optional Chaining

    console.log(
      "City :",
      receipt.customer.address?.city ?? "Not Available"
    );

    console.log(
      "State :",
      receipt.customer.address?.state ?? "Not Available"
    );

    console.log(
      "Amount : ₹",
      receipt.amount
    );

    console.log(
      "Method :",
      receipt.paymentMethod
    );

    console.log(
      "Status :",
      receipt.status
    );

    console.log(
      "Date :",
      receipt.paymentTime
    );

    console.log("========================================");
  }

  // ====================================
  // Discriminated Union Example
  // ====================================

  showPaymentInfo(
    payment: PaymentMethod
  ): void {

    switch (payment.method) {

      case "Credit Card":

        console.log(
          `Card : ${payment.cardNumber}`
        );

        break;

      case "Debit Card":

        console.log(
          `Debit Card : ${payment.cardNumber}`
        );

        break;

      case "UPI":

        console.log(
          `UPI : ${payment.upiId}`
        );

        break;

      case "Wallet":

        console.log(
          `Wallet : ${payment.walletName}`
        );

        break;

      case "Net Banking":

        console.log(
          `Bank : ${payment.bankName}`
        );

        break;

      default:

        const exhaustive: never = payment;

        console.log(exhaustive);

    }

  }

}