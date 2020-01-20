/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.viewport(1600, 900)
    cy.visit("http://localhost:3000/")
    cy.clearCookies()
    cy.get('[data-cy="login"]').click()
    cy.wait(500)
    cy.get('[data-cy="username"]').type("test")
    cy.get('[data-cy="password"]').type("test")
    cy.get('[data-cy="login-button"]').click()
  })
  // it("Should register", () => {
  //   cy.get('[data-cy="register"]').click()
  //   cy.wait(1000)
  //   cy.get('[data-cy="username"]').type("test")
  //   cy.get('[data-cy="password1"]').type("test")
  //   cy.get('[data-cy="password2"]').type("test")
  //   cy.get('[data-cy="register-button"]').click()
  //   // cy.wait(5000)
  // })
  it("Should create a activity", () => {
    cy.url().should('eq', 'http://localhost:3000/activities')
    cy.get('[data-cy="create-activity"]').click()
    cy.wait(500)
    let timestamp = new Date();
    cy.get('[data-cy="new-activity-details"]').type(`This is a new activity created at ${timestamp}`)
    cy.get('[data-cy="new-activity-date"]').type('2020-10-20')
    cy.get('[data-cy="new-activity-done"]').click()
  })
  it("Should filter the activities", () => {
    cy.url().should('eq', 'http://localhost:3000/activities')
    cy.get('[data-cy=activity-date-button]').click().wait(100)
    cy.get('[data-cy=activity-date-from]').type('2010-10-20')
    cy.get('[data-cy=activity-date-to]').type('2020-10-20')
  })
})