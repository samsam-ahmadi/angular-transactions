import { Component } from '@angular/core';
import { TransactionsByDay, Transaction } from '../../services/transactions/transaction.model';
import { Observable } from 'rxjs';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../../pipes/eur/eur.pipe';

@Component({
  selector: 'app-transactions-list',
  imports: [NgFor, AsyncPipe, DatePipe, RouterLink, EurPipe],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  readonly transactionsByDay!: Observable<TransactionsByDay[]>;

  constructor(private transactionsSrv: TransactionsService) {
    this.transactionsByDay = this.transactionsSrv.getTransactionsByDay();
  }

  trackByTransactionsByDay = (_: number, transactionByDay: TransactionsByDay) =>
    transactionByDay.id;
  trackByTransaction = (_: number, transaction: Transaction) => transaction.id;
}
