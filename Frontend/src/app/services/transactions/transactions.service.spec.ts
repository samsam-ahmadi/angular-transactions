import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TransactionsService } from './transactions.service';
import { Transaction, TransactionsByDay } from './transaction.model';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

interface TransactionsResponse {
  days: TransactionsByDay[];
}

describe('TransactionsService (stand-alone providers)', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  const mockApiResponse: TransactionsResponse = {
    days: [
      { id: '2025-05-21', transactions: [{ id: 2, amount: 15 } as Transaction] },
      { id: '2025-05-22', transactions: [{ id: 1, amount: 10 } as Transaction] },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TransactionsService],
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should sort days in descending order', () => {
    service.getTransactionsByDay().subscribe(days => {
      expect(days[0].id).toBe('2025-05-22');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);
    req.flush(mockApiResponse);
  });

  it('should return details of an existing transaction', () => {
    service.getTransaction('2025-05-22', "1").subscribe(tx => {
      expect(tx?.amount).toBe(10);
    });

    httpMock.expectOne(`${environment.apiUrl}/transactions`).flush(mockApiResponse);
  });

  it('should return undefined when the transaction is not found', () => {
    service.getTransaction('2025-05-22', "999").subscribe(tx => {
      expect(tx).toBeUndefined();
    });

    httpMock.expectOne(`${environment.apiUrl}/transactions`).flush(mockApiResponse);
  });
});
