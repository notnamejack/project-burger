describe('Детальная информация об ингредиенте', () => {
	beforeEach(() => {
		cy.prepare();
	  });

	it('Проверка открытия деатальной информации об ингредиенте и закрытия по крестику', () => {
		cy.getIngredient().click();
		cy.getModalIngredient().contains('Детали ингредиента');
		cy.get('[data-testid=ingredient_title]').contains('Говяжий метеорит (отбивная)');
		cy.get('[data-testid=modal_close]').click();
		cy.getModalIngredient().should('not.exist');
	})

	it('Проверка закрытия по кнопке esc', () => {
		cy.getIngredient().click();
		cy.get('body').type('{esc}');
		cy.getModalIngredient().should('not.exist');
	})

	it('Проверка закрытия по нажатию ModalOverlay', () => {
		cy.getIngredient().click();
		cy.get('[data-testid=modal_overlay]').click({force: true});
		cy.getModalIngredient().should('not.exist');
	})
})

describe('Сборка бургера', () => {
	beforeEach(() => {
		cy.prepare();
	  });

	it('Добавляем ингредиент в конструктор', () => {
		cy.getIngredient().trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.getIngredient().get('.counter__num').contains(1)
		cy.get('.constructor-element__text').contains('Говяжий метеорит (отбивная)');
		cy.getIngredient().trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.getIngredient().get('.counter__num').contains(2)
	})

	it('Добавляем булку в констуктор', () => {
		cy.getBun().trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.getBun().get('.counter__num').contains(2)
		cy.get('.constructor-element__text').contains('Краторная булка N-200i (верх)');
		cy.get('.constructor-element__text').contains('Краторная булка N-200i (низ)');
	})
})

describe('Офрмление заказа', () => {
	beforeEach(() => {
		cy.prepare();
	  });

	it('Добавляем ингредиентов в конструктор и отправка заказа', () => {
		cy.authorize();

		cy.getIngredient().trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.getBun().trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.get('[data-testid=constructor_create_order] [type=button]').click();
		cy.get('[data-testid=number_order]').contains('59203');
		cy.get('[data-testid=modal_close]').click();
		cy.get('[data-testid=number_order]').should('not.exist');
	})

})