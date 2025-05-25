import { Component } from '@angular/core';
import {
  TransactionsByDay,
  Transaction,
  CurrencyCode,
} from '../../services/transactions/transaction.model';
import { Observable } from 'rxjs';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EurPipe } from '../../pipes/eur/eur.pipe';

enum TRANSACTION_SIGN {
  spent = 'spent',
  earned = 'earned',
}

@Component({
  selector: 'app-transactions-list',
  imports: [NgFor, AsyncPipe, DatePipe, RouterLink, EurPipe, NgClass],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
  providers: [DatePipe, EurPipe],
})
export class TransactionsListComponent {
  readonly transactionsByDay!: Observable<TransactionsByDay[]>;

  constructor(
    private transactionsSrv: TransactionsService,
    private datePipe: DatePipe,
    private euroPipe: EurPipe,
  ) {
    this.transactionsByDay = this.transactionsSrv.getTransactionsByDay();
  }

  getTotal(transactions: TransactionsByDay): number {
    return +transactions.transactions
      .reduce(
        (acc, t) =>
          acc + (t.currencyCode === CurrencyCode.EUR ? t.amount : t.amount * t.currencyRate),
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

  buildAriaLabelForTransactionHeader(transactionsDay: TransactionsByDay): string {
    const total = this.getTotal(transactionsDay);
    const verb = total < 0 ? TRANSACTION_SIGN.spent : TRANSACTION_SIGN.earned;
    const date = this.datePipe.transform(transactionsDay.id, 'longDate');

    return `For ${date} you ${verb} € ${Math.abs(total)}`;
  }

  transactionAriaLabel(transaction: Transaction): string {
    const otherParty = transaction.otherParty?.name ?? 'Unknown party';
    const sign = transaction.amount < 0 ? TRANSACTION_SIGN.spent : TRANSACTION_SIGN.earned;
    const amount = this.euroPipe.transform(
      transaction.amount,
      transaction.currencyCode,
      transaction.currencyRate,
    );

    return `Transaction with ${otherParty}. You ${sign} € ${amount}.`;
  }

  trackByTransactionsDay = (_: number, transactionDay: TransactionsByDay) => transactionDay.id;
  trackByTransaction = (_: number, transaction: Transaction) => transaction.id;
}
