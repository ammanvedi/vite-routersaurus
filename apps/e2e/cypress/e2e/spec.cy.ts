describe('template spec', () => {
  it('passes', () => {

    cy.visit('http://localhost:8008')
    cy.contains('Root Layout')
  })
})