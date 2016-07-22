const html = require('choo/html')

module.exports = (state, prev, send) => html`
  <header class="site-header card color-white">
    <div class="container">
      <a href="/" class="brand">
        <div class="logo">🚋</div>
        <h1><%= projectName %></h1>
      </a>
      <nav class="site-navigation">
        <a href="/">Home</a>
        <a href="/todos">Todos</a>
        <a href="/about">About</a>
      </nav>
    </div>
  </header>
`
