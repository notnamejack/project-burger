Cypress.Commands.add('prepare', () => {
	cy.visit('/');
	cy.intercept("GET", "ingredients", { fixture: "ingredients" }).as("getIngredients");
	cy.intercept("POST", "login").as("login");
	cy.intercept("POST", "orders", { fixture: "order" });

	cy.wait("@getIngredients");
});

Cypress.Commands.add('authorize', () => {
	cy.get('[name=email]').type('jack@test.ru');
	cy.get('[name=password]').type('12@qwasZX');
	cy.get('[type=submit]').contains('Войти').click();
	cy.wait('@login');
});

Cypress.Commands.add('getIngredient', () => {
	cy.get('[data-testid=ingredient_60666c42cc7b410027a1a9b5]');
});

Cypress.Commands.add('getBun', () => {
	cy.get('[data-testid=ingredient_60666c42cc7b410027a1a9b1]');
});

Cypress.Commands.add('getModalIngredient', () => {
	cy.get('[data-testid=modal_title]');
});

Cypress.Commands.add('getConstructor', () => {
	cy.get('[data-testid=constructor]');
  });