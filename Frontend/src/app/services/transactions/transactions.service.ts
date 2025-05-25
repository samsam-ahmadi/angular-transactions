import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionsByDay } from './transaction.model';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly http = inject(HttpClient);

  private readonly transactionByDay$ = this.http
    .get<{ days: TransactionsByDay[] }>(`${environment.apiUrl}/transactions`, {
      headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }),
    })
    .pipe(
      map(res => res.days),
      map(transactions => transactions.sort((a, b) => b.id.localeCompare(a.id))),
      catchError(err => throwError(() => new Error('Unable to load transactions', { cause: err }))),
    );

  getTransactionsByDay(): Observable<TransactionsByDay[]> {
    return this.transactionByDay$;
  }

  getTransaction(dayId: string | null, id: string | null): Observable<Transaction | undefined> {
    if (!dayId || !id) {
      return throwError(() => new Error('Unable to find dayId or id'));
    }

    return this.transactionByDay$.pipe(
      map(transactions =>
        transactions
          .find(transactionDay => transactionDay.id === dayId)
          ?.transactions.find(transaction => transaction.id === +id),
      ),
      catchError(err =>
        throwError(() => new Error('Unable to find transaction details', { cause: err })),
      ),
    );
  }
}
