/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.visit()
    cy.clearCookies()
  })
  it("Shoudl login", () => {
    cy.visit('/login')
  })
})