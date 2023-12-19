describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
    cy.get('[data-testid="email"]').as('email')
    cy.get('[data-testid="password"]').as('password')
    cy.get('[data-testid="email-error"]').as('emailError')
    cy.get('[data-testid="password-error"]').as('passwordError')
    cy.get('[data-testid="submit-button"]').as('buttonSubmit')
    cy.get('[data-testid="goto-signup"]').as('linkTologin')
  })

  it('should load with correct initial state', () => {
    cy.get('@emailError').should('contain.text', 'Campo obrigatório')
    cy.get('@passwordError').should('contain.text', 'Campo obrigatório')
    cy.get('@buttonSubmit').should('contain.text', 'Logar')
    cy.get('@buttonSubmit').should('have.attr', 'disabled')
  })

  it('should present error state if form is invalid', () => {
    cy.get('@email').type('mock_email')
    cy.get('@emailError').should('contain.text', 'Valor inválido')

    cy.get('@password').type('1234')
    cy.get('@passwordError').should('contain.text', 'Valor inválido')

    cy.get('@buttonSubmit').should('contain.text', 'Logar')
    cy.get('@buttonSubmit').should('have.attr', 'disabled')
  })

  it('should present error state if form is invalid', () => {
    cy.get('@email').type('mock_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('123456')
    cy.get('@passwordError').should('not.exist')

    cy.get('@buttonSubmit').should('contain.text', 'Logar')
    cy.get('@buttonSubmit').should('not.have.attr', 'disabled')
  })

  it('should present error if invalid credentials are provided', () => {
    cy.get('@email').type('mock_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('123456')
    cy.get('@passwordError').should('not.exist')
    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('[data-testid="loader"]').should('exist')
    cy.get('[data-testid="error-message"]').should('not.exist')

    cy.get('[data-testid="loader"]').should('not.exist')
    cy.get('[data-testid="error-message"]').should('exist')

    // FALTA O STATUS CODE
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.get('@email').type('valid_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('888888')
    cy.get('@passwordError').should('not.exist')
    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('[data-testid="loader"]').should('exist')
    cy.get('[data-testid="error-message"]').should('not.exist')

    cy.get('[data-testid="loader"]').should('not.exist')
    cy.get('[data-testid="error-message"]').should('exist')

    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken')),
    )
    // FALTA O STATUS CODE
  })
})
