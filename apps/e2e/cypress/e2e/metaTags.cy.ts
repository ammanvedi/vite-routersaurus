

describe.only('Meta Tags', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8008/posts/post-one-tsx-file')
    })


    it('should have the correct title', () => {
        cy.title().should('eq', 'PostOneTsxFile')
    })

    it('should have the correct og:image', () => {
        cy.get('head meta[property="og:image"]').should(
            'have.attr',
            'content',
            'myImage',
        )
    })

    it('should have the correct og:description', () => {
        cy.get('head meta[property="og:description"]').should(
            'have.attr',
            'content',
            'mydescription',
        )
    })


})