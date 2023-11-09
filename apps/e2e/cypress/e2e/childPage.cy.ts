describe.only('Child Pages', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8008')
        cy.contains('a', 'Posts').click()
    })

    describe('Child pages from index page', () => {

        it('Should render child pages in index route', () => {
            cy.contains('h1', 'PostOneTsxFile');
            /**
             * yes i know this is not good semantics.... TODO
             */
            cy.contains('h1', 'PostTwoMdxFile');
        });

    })

    describe('Individual child pages', () => {
        it('should render individual child page', () => {
            /**
             * Click on posts page
             */
            cy.contains('h1', 'PostOneTsxFile').click()
            /**
             * Check title on post page
             */
            cy.contains('h1', 'Title: PostOneTsxFile')
        })
    })

})