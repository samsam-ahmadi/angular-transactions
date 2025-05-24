import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Transaction } from '../../services/transactions/transaction.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { EurPipe } from '../../pipes/eur/eur.pipe';

@Component({
  selector: 'app-transaction-details',
  imports: [NgIf, AsyncPipe, RouterLink, EurPipe, DatePipe],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  readonly transaction$: Observable<Transaction | undefined>;

  constructor(
    private transactionSrv: TransactionsService,
    private route: ActivatedRoute,
  ) {
    this.transaction$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.transactionSrv.getTransaction(params.get('dayId'), params.get('id')),
      ),
    );
  }
}
