export enum CurrencyCode {
  EUR = 'EUR',
  USD = 'USD',
}
export interface Transaction {
  id: number;
  timestamp: string;
  amount: number;
  currencyCode: CurrencyCode;
  currencyRate: number;
  description: string;
  otherParty?: OtherParty;
}

export interface OtherParty {
  name: string;
  iban: string;
}

export interface TransactionsByDay {
  id: string;
  transactions: Transaction[];
}
