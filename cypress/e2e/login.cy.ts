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

  it('should present error state if form is valid', () => {
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
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: {
          response: {
            status: 401,
            data: 'Email or password is invalid',
          },
        },
      },
    })

    cy.get('@email').type('mock_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('123456')
    cy.get('@passwordError').should('not.exist')

    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('[data-testid="loader"]').should('not.exist')
    cy.get('[data-testid="error-message"]').should(
      'contain.text',
      'Credenciais inválidas',
    )
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken:
          'oowus8u2y2nwnd.ajhdoianklokdsoidophwq92878293jkkl23klj09d.askd90as0d9u',
      },
    })

    cy.get('@email').type('valid_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('888888')
    cy.get('@passwordError').should('not.exist')
    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('[data-testid="error-message"]').should('not.exist')
    cy.get('[data-testid="loader"]').should('not.exist')

    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken')),
    )
  })

  it('should present Unexpected id invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidProperty:
          'oowus8u2y2nwnd.ajhdoianklokdsoidophwq92878293jkkl23klj09d.askd90as0d9u',
      },
    })

    cy.get('@email').type('valid_email@gmail.com')
    cy.get('@emailError').should('not.exist')

    cy.get('@password').type('888888')
    cy.get('@passwordError').should('not.exist')
    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('[data-testid="loader"]').should('not.exist')
    cy.get('[data-testid="error-message"]').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.',
    )
  })

  it('should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken:
          'oowus8u2y2nwnd.ajhdoianklokdsoidophwq92878293jkkl23klj09d.askd90as0d9u',
      },
      delay: 2000,
    }).as('loginService')

    cy.get('@email').type('valid_email@gmail.com')
    cy.get('@password').type('888888')

    cy.get('@buttonSubmit').should('contain.text', 'Logar').click()

    cy.get('@buttonSubmit').should('not.have.attr', 'disabled')
  })
})
