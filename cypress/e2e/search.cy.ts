describe('search products', () => {
  it('should be able to search for products ', () => {
    cy.searchByQuery('Sweatshirt')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=Sweatshirt')

    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to visit search page without a search query ', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
