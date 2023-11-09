describe('Layout', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8008')
  })

  it('Should render the root layout at the root of the site', () => {
    cy.contains('h1', 'Root Layout')
  })

  describe('When moving to a child page', () => {

    beforeEach(() => {
      cy.contains('a', 'Posts').click()
    })

    it('Should maintain the parent layout', () => {
      cy.contains('h1', 'Root Layout')
    })

    it('Should render the child layout', () => {
      cy.contains('h2', 'Nested Layout')
    })
  })
})