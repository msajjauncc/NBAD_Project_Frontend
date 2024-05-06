describe('Login Tests', () => {
    beforeEach(() => {
      // Visit the page where the Login component is rendered
      cy.visit('https://nbad-project-frontend.vercel.app/login');
    });
  
    it('should display validation errors if login details are incorrect', () => {
      // Click the login button without filling out the form
      cy.get('button[type="submit"]').click();
      // Expect error notification to appear
      cy.contains('Please fill all the details').should('be.visible');
    });
  
    it('should allow a user to sign in', () => {
      // Fill in the form
      cy.get('.login-form[name="email"]').type('mvs@email.com');
      cy.get('.login-form[name="password"]').type('abcd');
      
      // Intercept the POST request made during login
      cy.intercept('POST', '/api/login').as('loginRequest');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Wait for the POST request to complete
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  
      // Check for the redirection to the homepage
      cy.url().should('include', '/');
    });
  });
  