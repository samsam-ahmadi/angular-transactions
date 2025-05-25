import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { TransactionsListComponent } from './transactions-list.component'; // standalone
import { provideHttpClient } from '@angular/common/http';
import { Transaction, TransactionsByDay } from '../../services/transactions/transaction.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { environment } from '../../../environment';

const mockApiResponse: { days: TransactionsByDay[] } = {
  days: [
    {
      id: '2022-11-08',
      transactions: [
        {
          id: 1,
          timestamp: '2022-11-08T14:30:47.123Z',
          amount: 17.95,
          currencyCode: 'USD',
          currencyRate: 1.173628,
          description: 'Some interesting description',
          otherParty: {
            name: 'Mister XX',
            iban: 'NL00RABO0123456789',
          },
        },
        {
          id: 2,
          timestamp: '2022-11-08T12:45:47.123Z',
          amount: -25.95,
          currencyCode: 'EUR',
          description: 'Some other interesting description',
          otherParty: {
            name: 'Miss Y',
            iban: 'NL00RABO9876543210',
          },
        } as Transaction,
      ],
    },
    {
      id: '2022-11-06',
      transactions: [
        {
          id: 3,
          timestamp: '2022-11-08T10:30:47.123Z',
          amount: 3456.67,
          currencyCode: 'EUR',
          description: 'Finally payday',
          otherParty: {
            name: 'Company Z',
            iban: 'NL00RABO3210654789',
          },
        } as Transaction,
      ],
    },
  ],
};

const activatedRouteStub = {
  snapshot: { paramMap: convertToParamMap({}) },
  params: of({}),
};

describe('TransactionsListComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TransactionsService,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    const fixture = TestBed.createComponent(TransactionsListComponent);
    fixture.detectChanges();

    httpMock.expectOne(`${environment.apiUrl}/transactions`).flush(mockApiResponse);

    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three transactions row', () => {
    const fixture = TestBed.createComponent(TransactionsListComponent);
    fixture.detectChanges();

    httpMock.expectOne(`${environment.apiUrl}/transactions`).flush(mockApiResponse);

    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.transaction');
    expect(rows.length).toBe(3);
  });
});
