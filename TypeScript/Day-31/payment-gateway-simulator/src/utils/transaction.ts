export function generateTransactionId(): string {
  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `TXN-${Date.now()}-${random}`;
}