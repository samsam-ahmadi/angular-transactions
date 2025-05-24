import { Routes } from '@angular/router';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

export const routes: Routes = [
  { path: '', component: TransactionsListComponent },
  { path: 'transactions/:dayId/:id', component: TransactionDetailsComponent },
];
