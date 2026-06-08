export interface Account {
  id:          number;
  accountNo:   string;
  holderName:  string;
  balance:     number;
  accountType: 'savings' | 'current' | 'fixed';
  isActive:    boolean;
  createdAt:   string;
}