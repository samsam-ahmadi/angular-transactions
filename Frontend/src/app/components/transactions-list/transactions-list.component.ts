import { Component } from '@angular/core';
import { TransactionsByDay, Transaction } from '../../services/transactions/transaction.model';
import { Observable } from 'rxjs';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../../pipes/eur/eur.pipe';

@Component({
  selector: 'app-transactions-list',
  imports: [NgFor, AsyncPipe, DatePipe, RouterLink, EurPipe, NgClass],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  readonly transactionsByDay!: Observable<TransactionsByDay[]>;

  constructor(private transactionsSrv: TransactionsService) {
    this.transactionsByDay = this.transactionsSrv.getTransactionsByDay();
  }

  getTotal(transactions: TransactionsByDay): number {
    return +transactions.transactions
      .reduce(
        (acc, t) => acc + (t.currencyCode === 'EUR' ? t.amount : t.amount * t.currencyRate),
        0,
      )
      .toFixed(2);
  }

  getAmountClass(total: number): Record<string, boolean> {
    return {
      negative: total < 0,
      positive: total >= 0,
    };
  }

  trackByTransactionsDay = (_: number, transactionDay: TransactionsByDay) => transactionDay.id;
  trackByTransaction = (_: number, transaction: Transaction) => transaction.id;
}
