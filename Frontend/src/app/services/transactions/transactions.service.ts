import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionsByDay } from './transaction.model';
import { environment } from '../../../environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly http = inject(HttpClient);

  private readonly transactionByDay$ = this.http
    .get<{ days: TransactionsByDay[] }>(`${environment.apiUrl}/transactions`)
    .pipe(
      map(res => res.days),
      map(transactions => transactions.sort((a, b) => b.id.localeCompare(a.id))),
      catchError(err => throwError(() => new Error('Unable to load transactions', { cause: err }))),
    );

  getTransactionsByDay(): Observable<TransactionsByDay[]> {
    return this.transactionByDay$;
  }
}
