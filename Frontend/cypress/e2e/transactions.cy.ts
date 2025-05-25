import { CurrencyCode, TransactionsByDay } from 'src/app/services/transactions/transaction.model';

describe('Transactions list and details', () => {
  it('Transactions List', () => {
    cy.intercept('GET', '**/api/transactions*').as('getTx');

    cy.visit('/');

    cy.wait('@getTx').then(interception => {
      const transactions: TransactionsByDay[] | undefined = interception.response?.body.days || [];
      if (!transactions) {
        return;
      }

      expect(transactions.length).to.be.greaterThan(0);
      cy.get('.transactions-list').should('have.length', transactions && transactions.length);
      const firstTransaction = transactions[0].transactions && transactions[0].transactions[0];
      if (!firstTransaction) {
        return ' No transactions found';
      }
      // Trancsaction list
      const getamount =
        firstTransaction.currencyCode === CurrencyCode.EUR
          ? firstTransaction.amount
          : (firstTransaction.amount * firstTransaction.currencyRate).toFixed(2);
      cy.get('.transactions-list').first().contains(getamount.toString());
      cy.get('.transactions-list')
        .first()
        .contains(
          firstTransaction.otherParty?.name ? firstTransaction.otherParty?.name : 'Unknown',
        );

      // Click on the first transaction
      cy.get('.transactions-list').first().click();

      // Transaction details
      cy.url().should('include', `/transactions/${transactions[0].id}/${firstTransaction.id}`);

      cy.get('h1').contains(
        firstTransaction.otherParty?.name ? firstTransaction.otherParty?.name : 'Unknown',
      );
      const date = new Date(firstTransaction.timestamp);
      const formatted = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      cy.get('article li').contains(formatted);
      cy.get('article li').contains(getamount);
      cy.get('article li').contains(firstTransaction.description);
      cy.get('article li').contains(firstTransaction.otherParty?.iban || '');
    });
  });
});
