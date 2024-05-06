describe('Login Visual Test', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should display the login page correctly with Applitools', () => {
      cy.eyesOpen({
        appName: 'MyApp',
        testName: 'Login Page Visual Test',
        browser: { width: 1024, height: 768, name: 'chrome' }
      });
  
      cy.eyesCheckWindow('Login Page View');
  
      cy.eyesClose();
    });
  });
  