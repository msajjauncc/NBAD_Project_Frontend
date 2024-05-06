describe('SignUp Component Tests', () => {
    beforeEach(() => {
        // assuming your app runs on localhost:3000
        cy.visit('https://nbad-project-frontend.vercel.app/signup');
    });

    it('should display validation errors if login details are incorrect', () => {
        // Click the login button without filling out the form
        cy.get('button[type="submit"]').click();
        // Expect error notification to appear
        cy.contains('Please fill all the details').should('be.visible');
      });

    it('should display the signup form', () => {
        cy.get('.signUpDiv').should('be.visible');
        cy.get('input[name="name"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
    });

    it('should allow user to type in the form fields', () => {
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('input[type="password"]').type('password123');

        cy.get('input[name="name"]').should('have.value', 'John Doe');
        cy.get('input[name="email"]').should('have.value', 'john@example.com');
        cy.get('input[type="password"]').should('have.value', 'password123');
    });

    it('should show an error message if the form is submitted incomplete', () => {
        // Assuming the button is disabled or validation message appears
        cy.get('button[type="submit"]').click();
        cy.get('.ant-form-item-explain-error').should('contain', 'Please fill all the details');
    });

    it('should navigate to the home page on successful sign up', () => {
        // Fill in the form
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('input[type="password"]').type('password123');

        // Intercept the POST request made by the form submission
        cy.intercept('POST', '/api/signup', { statusCode: 200, body: { message: 'Sign up successful' } }).as('signUpRequest');

        cy.get('button[type="submit"]').click();

        // Wait for the request to complete
        cy.wait('@signUpRequest');

        // Assuming navigation happens on success
        cy.url().should('include', '/');
    });
});
