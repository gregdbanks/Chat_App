/* eslint-disable no-undef */
describe('Chat API requirements', () => {
  beforeEach('Logs User In', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#username').type('Thor');
    cy.get('#password').type('test1234');
    cy.get('.MuiButtonBase-root').click();
  });

  it('App has Users', () => {
    cy.get('[tabindex="-1"] > .MuiTab-wrapper').click();
    cy.get('.makeStyles-paper-8 > .MuiList-root')
      .should('contain', 'Bruce Banner')
      .and('contain', 'Black Widow');
  });

  it('App has Conversations', () => {
    cy.get('.Mui-selected').click();
    cy.get('.makeStyles-paper-8 > .MuiList-root')
      .should('not.contain', 'Bruce Banner')
      .and('contain', 'Black Widow');
  });

  it('App has Messages', () => {
    cy.wait(1000);
    cy.get(
      ':nth-child(3) > .MuiListItemText-root > .MuiListItemText-secondary > :nth-child(1)'
    ).should('contain', 'He killed eighty people in two days.');
    cy.get(
      ':nth-child(4) > .MuiListItemText-root > .MuiListItemText-secondary > :nth-child(1)'
    ).should('contain', "He's adopted.");
    cy.get('#message').click().type('tester testing yall');
    cy.get('.MuiGrid-grid-xs-1 > .MuiButtonBase-root').click();
    cy.get('.makeStyles-subheader-20').click();
  });

  it('Messages are associated with a user and a conversation', () => {
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
    cy.get('#simple-menu > .MuiPaper-root > .MuiList-root').click();
    cy.get('.MuiButtonBase-root').should('exist');
    cy.get('#username').type('Black Widow');
    cy.get('#password').type('test1234');
    cy.get('.MuiButtonBase-root').click();
    cy.get('.MuiList-root > .MuiButtonBase-root').should('contain', 'Thor');
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
    cy.get('#simple-menu > .MuiPaper-root > .MuiList-root').click();
    cy.get('.MuiButtonBase-root').should('exist');
    cy.get('#username').type('Thor');
    cy.get('#password').type('test1234');
    cy.get('.MuiButtonBase-root').click();
  });

  it('Messages have a timestamp', () => {
    cy.wait(1000);
    cy.get(
      ':nth-child(3) > .MuiListItemText-root > .MuiListItemText-secondary > [style="font-size: 10px; display: flex; justify-content: end; margin-bottom: 0px;"]'
    ).should('contain', 'Saturday, February 26th 2022, 7:42 am');
  });

  it('Conversations have participant (users) and messages', () => {
    cy.wait(1000);
    cy.get('.makeStyles-paper-8 > .MuiList-root')
      .contains('Black Widow')
      .click();
    cy.get(
      '.makeStyles-listItemRight-36 > .MuiListItemText-root > .MuiListItemText-secondary > :nth-child(1)'
    ).should('contain', 'Hey, How are you?');
    cy.get('.makeStyles-subheader-20').click();
  });

  it('API supports getting a list of conversations that could be consumed by a UI', () => {
    cy.request('http://localhost:3000/api/messages/global').as(
      'conversationRequest'
    );
    cy.get('@conversationRequest').then((conversation) => {
      expect(conversation.status).to.eq(200);
    });
  });

  it('API supports sending/receiving messages', () => {
    cy.wait(1000);
    cy.get('.makeStyles-paper-8 > .MuiList-root')
      .contains('Black Widow')
      .click();
    cy.get(
      '.makeStyles-listItemRight-36 > .MuiListItemText-root > .MuiListItemText-secondary > :nth-child(1)'
    ).should('contain', 'Hey, How are you?');
    cy.get('#message').click().type('Hey, How are you?');
    cy.get('.MuiGrid-grid-xs-1 > .MuiButtonBase-root').click();
    cy.get('.makeStyles-subheader-20').click();
  });

  afterEach('Logs User Out', () => {
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
    cy.get('#simple-menu > .MuiPaper-root > .MuiList-root').click();
    cy.get('.MuiButtonBase-root').should('exist');
  });
});
