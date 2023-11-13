describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.get('input[name=q]').type('Sweatshirt').parent('form').submit()

    // first *a* element with *href* prop /product
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Add to Cart').click()

    cy.contains('Cart (1)').should('exist')
  })
})
