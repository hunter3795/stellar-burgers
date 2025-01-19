describe('тестируем конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('добавляем булку', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('.constructor-element_pos_top').contains('Булка 1');
    cy.get('.constructor-element_pos_bottom')
      .contains('Булка 1')
      .should('exist');
  });

  it('добавляем ингредиент', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauses-ingredients]').contains('Добавить').click();
    cy.get('.constructor-element').contains('Ингредиент 1').should('exist');
    cy.get('.constructor-element').contains('Ингредиент 3').should('exist');
  });

  it('проверяем открытие модального окна ингредиента', () => {
    cy.contains('Булка 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Булка 1').should('exist');
  });
  it('проверяем закрытие модального окна на крестик', () => {
    cy.contains('Булка 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Булка 1').should('exist');
    cy.get('#modals').find('button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('проверяем закрытие модального окна на оверлей', () => {
    cy.contains('Булка 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Булка 1').should('exist');
    cy.get('#overlay').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тестируем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('проверяем работу создания заказа бургера', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauses-ingredients]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.get('#modals').contains('123456').should('exist');
    // cy.get('#overlay').click('left', { force: true });
    // cy.contains('Выберите булки').should('exist');
    // cy.contains('Выберите начинку').should('exist');
  });
});
