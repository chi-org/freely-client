/// <reference types="Cypress" />
let testUserRun = "test" + Date.now();

context("Actions", () => {
  before(() => {
      cy.visit("http://localhost:3000/")
      cy.wait(1000)
      cy.get('[data-cy="register"]').click()
      cy.wait(1000)
      cy.get('[data-cy="username"]').type(testUserRun)
      cy.get('[data-cy="password1"]').type("test")
      cy.get('[data-cy="password2"]').type("test")
      cy.get('[data-cy="register-button"]').click()
      cy.wait(2000)
  })
  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.viewport(1600, 900)
    cy.visit("http://localhost:3000/")
    cy.clearCookies()
    cy.get('[data-cy="login"]').click()
    cy.wait(1000)
    cy.get('[data-cy="username"]').type(testUserRun)
    cy.get('[data-cy="password"]').type("test")
    cy.get('[data-cy="login-button"]').click()
  })
  afterEach(() => {
    cy.get('[data-cy="logout"]').click()
    cy.get('[data-cy="logout-button"]').click()
  })
  // it("should create a student", () => {
  //   cy.get('[data-cy="header-students"]').click()
  //   cy.wait(2000)
  //   cy.url().should('eq', 'http://localhost:3000/students')
  //   cy.get('[data-cy="new-student-name"]').type("Test Students" + Date.now())
  //   cy.get('[data-cy="new-student-color"]')
  //   cy.get('[data-cy="new-student-button"]').click()
  //   cy.wait(2000)
  // })

  // it("Should create an activity", () => {
  //   cy.url().should('eq', 'http://localhost:3000/activities')
  //   cy.get('[data-cy="create-activity"]').click()
  //   cy.wait(500)
  //   let timestamp = new Date();
  //   cy.get('[data-cy="new-activity-details"]').type(`This is a new activity created at ${timestamp}`)
  //   cy.get('[data-cy="new-activity-date"]').type('2020-10-20')
  //   cy.get('[data-cy="new-activity-done"]').click()
  // })
  // it("Should filter the activities", () => {
  //   cy.url().should('eq', 'http://localhost:3000/activities')
  //   cy.get('[data-cy=activity-date-button]').click().wait(100)
  //   cy.get('[data-cy=activity-date-from]').type('2010-10-20')
  //   cy.get('[data-cy=activity-date-to]').type('2020-10-20')
  // })

  it ("Should delete an activity", () => {
    cy.url().should('eq', 'http://localhost:3000/activities');
    cy.get('[data-cy="create-activity"]').click();
    cy.wait(500);
    let timestamp = new Date();
    cy.get('[data-cy="new-activity-details"]').type(`This is a new activity created at ${timestamp}`);
    cy.get('[data-cy="new-activity-date"]').type('1970-01-01');
    cy.get('[data-cy="new-activity-done"]').click();
    cy.url().should('eq', 'http://localhost:3000/activities')
    cy.get('[data-cy=activity-date-button]').click().wait(100)
    cy.get('[data-cy=activity-date-from]').type('1970-01-01')
    cy.get('[data-cy=activity-date-to]').type('1970-01-01')
    cy.get('.cy-activity:first * .cy-delete-activity').click()
    cy.get('.cy-activity').should('not.exist')
    cy.wait(1500)
  })
})
