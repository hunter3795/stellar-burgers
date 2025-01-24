const detailsIngeredient = 'Детали ингредиента';
const buttonAdd = 'Добавить';
const testIngredientBun1 = 'Булка 1';
const modals = '#modals';
const overlay = '#overlay';
const dataBun = '[data-cy=bun-ingredients]';
const dataMains = '[data-cy=mains-ingredients]';
const dataSauses = '[data-cy=sauses-ingredients]';

describe('тестируем конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
  });

  it('добавляем булку', () => {
    cy.get(dataBun).contains(buttonAdd).click();
    cy.get('.constructor-element_pos_top').contains(testIngredientBun1);
    cy.get('.constructor-element_pos_bottom')
      .contains(testIngredientBun1)
      .should('exist');
  });

  it('добавляем ингредиент', () => {
    cy.get(dataMains).contains(buttonAdd).click();
    cy.get(dataSauses).contains(buttonAdd).click();
    cy.get('.constructor-element').contains('Ингредиент 1').should('exist');
    cy.get('.constructor-element').contains('Ингредиент 3').should('exist');
  });

  it('проверяем открытие модального окна ингредиента', () => {
    cy.contains(testIngredientBun1).click();
    cy.contains(detailsIngeredient).should('exist');
    cy.get(modals).contains(testIngredientBun1).should('exist');
  });
  it('проверяем закрытие модального окна на крестик', () => {
    cy.contains(testIngredientBun1).click();
    cy.contains(detailsIngeredient).should('exist');
    cy.get(modals).contains(testIngredientBun1).should('exist');
    cy.get(modals).find('button').click();
    cy.contains(detailsIngeredient).should('not.exist');
  });
  it('проверяем закрытие модального окна на оверлей', () => {
    cy.contains(testIngredientBun1).click();
    cy.contains(detailsIngeredient).should('exist');
    cy.get(modals).contains(testIngredientBun1).should('exist');
    cy.get(overlay).click('left', { force: true });
    cy.contains(detailsIngeredient).should('not.exist');
  });
});

describe('тестируем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('проверяем работу создания заказа бургера', () => {
    cy.get(dataBun).contains(buttonAdd).click();
    cy.get(dataMains).contains(buttonAdd).click();
    cy.get(dataSauses).contains(buttonAdd).click();
    cy.contains('Оформить заказ').click();
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.get(modals).contains('123456').should('exist');
    cy.get(overlay).click('left', { force: true });
    cy.get(modals).contains('123456').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
