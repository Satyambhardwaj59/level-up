// import { PaymentGateway } from "./services/PaymentGateway";

// import {
//   customer,
//   creditCard,
//   debitCard,
//   upi,
//   netBanking,
//   wallet,
// } from "./data/sampleData";
import {
     customer,
      creditCard,
  debitCard,
  upi,
  netBanking,
  wallet,
    } from "./data/sampleData.js";
import { PaymentGateway } from "./services/PaymentGateway.js";

const gateway = new PaymentGateway();

// =============================
// Credit Card
// =============================

console.log("\n========== CREDIT CARD ==========");

const receipt1 = gateway.processPayment(
  customer,
  creditCard,
  2500
);

gateway.displayPaymentStatus(receipt1);
gateway.printReceipt(receipt1);

// =============================
// Debit Card
// =============================

console.log("\n========== DEBIT CARD ==========");

const receipt2 = gateway.processPayment(
  customer,
  debitCard,
  4200
);

gateway.displayPaymentStatus(receipt2);
gateway.printReceipt(receipt2);

// =============================
// UPI
// =============================

console.log("\n========== UPI ==========");

const receipt3 = gateway.processPayment(
  customer,
  upi,
  799
);

gateway.displayPaymentStatus(receipt3);
gateway.printReceipt(receipt3);

// =============================
// Net Banking
// =============================

console.log("\n========== NET BANKING ==========");

const receipt4 = gateway.processPayment(
  customer,
  netBanking,
  12500
);

gateway.displayPaymentStatus(receipt4);
gateway.printReceipt(receipt4);

// =============================
// Wallet
// =============================

console.log("\n========== WALLET ==========");

const receipt5 = gateway.processPayment(
  customer,
  wallet,
  499
);

gateway.displayPaymentStatus(receipt5);
gateway.printReceipt(receipt5);