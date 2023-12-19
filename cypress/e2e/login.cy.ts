describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
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
})
