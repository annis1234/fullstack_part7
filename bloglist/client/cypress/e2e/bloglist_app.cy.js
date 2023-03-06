describe('Bloglist app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'testUser',
      password: 'salainen'
    }

    const anotherUser = {
      name: 'test user2',
      username: 'testUser2',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.request('POST', 'http://localhost:3003/api/users',anotherUser)

    cy.visit('')
  })

  it('Loginform is shown',function() {
    cy.contains('Log in to application')
    cy.get('#username').type('testUser')
    cy.get('#password').type('salainen')
  })

  describe('when logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'testUser', password: 'salainen' })

      cy.createBlog({
        title: 'testBlog',
        author: 'testAuthor',
        url: 'testUrl'
      })
    })

    it('new blog can be created', function(){
      cy.contains('create a new blog')
      cy.createBlog({
        title: 'testBlog2',
        author: 'testAuthor2',
        url: 'testUrl2'
      })
      cy.contains('testBlog2')
    })

    it('blog can be liked', function(){
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('blog can be removed', function(){
      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it('only blog adder sees remove button', function(){
      cy.login({ username: 'testUser2', password: 'salainen' })
      cy.contains('view').click()
      cy.get('#remove').should('not.exist')
    })

  })

  describe('Login', function() {

    it('Login with valid credentials', function() {
      cy.get('#username').type('testUser')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
    })

    it('Login with invalid credentials', function(){
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.get('.notification').should('contain','wrong username or password')
    })
  })
})