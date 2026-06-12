/**
 * Mock session: the app behaves as if the demo creator is logged in.
 * Replaced by Supabase Auth in weeks 1-2 of the action plan.
 */

export interface PaymentDetails {
  upiId: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  paypalEmail: string | null;
}

export interface SessionCreator {
  handle: string;
  displayName: string;
  email: string;
  vertical: string;
  country: string;
  followerBand: string;
  gstin: string | null;
  payment: PaymentDetails;
}

export function getCurrentCreator(): SessionCreator {
  return {
    handle: "aanya",
    displayName: "Aanya Sharma",
    email: "hello@aanya.in",
    vertical: "Beauty",
    country: "India",
    followerBand: "10K to 100K",
    gstin: "27ABCDE1234F1Z5",
    payment: {
      upiId: "aanya@okhdfcbank",
      accountHolder: "Aanya Sharma",
      bankName: "HDFC Bank",
      accountNumber: "50100123456789",
      ifsc: "HDFC0001234",
      paypalEmail: "hello@aanya.in",
    },
  };
}
