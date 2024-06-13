import './App.css'

function App() {

  return (
    <>
      <h1>Bem vindo(a)!</h1>
      <a className="page" href="https://rogeriocordeiro.github.io/my-page/">
        <p>Minha Página</p>
      </a>
      <div className="card">
        <p>
          Click em meu repositório para conhecer um pouco mais!
        </p>
        <a className="repo" href="https://github.com/RogerioCordeiro?tab=repositories" target='blank'>
          <p>Meu repositório</p>
        </a>
      </div>
      <p className="read-the-docs">
        Estou trabalhando para trazer muitas novidades!
      </p>
    </>
  )
}

export default App
