describe('add product to cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000/')

    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.visit('http://localhost:3000/')

    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input[name=q]').type('Sweatshirt').parent('form').submit()

    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })
})
