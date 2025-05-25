import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Routes } from '@angular/router';

import { TransactionDetailsComponent } from './transaction-details.component';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'transactions/:dayId/:id', component: TransactionDetailsComponent },
];

const mockTransaction = {
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
  ],
};

const mockParams = { dayId: mockTransaction.id, id: mockTransaction.transactions[0].id };

const mockActivatedRoute = {
  paramMap: of(convertToParamMap(mockParams)),
};

describe('TransactionDetailsComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        TransactionsService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create and has details', fakeAsync(() => {
    const fixture = TestBed.createComponent(TransactionDetailsComponent);
    fixture.detectChanges();

    httpMock.expectOne(`${environment.apiUrl}/transactions`).flush({ days: [mockTransaction] });

    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('h1')?.textContent).toContain(
      mockTransaction.transactions[0].otherParty.name,
    );

    // convert USD to EUR
    expect(host.textContent).toContain(
      (
        mockTransaction.transactions[0].amount * mockTransaction.transactions[0].currencyRate
      ).toFixed(2),
    );

    expect(host.textContent).toContain(mockTransaction.transactions[0].description);

    expect(host.textContent).toContain(mockTransaction.transactions[0].otherParty.iban);
  }));
});
