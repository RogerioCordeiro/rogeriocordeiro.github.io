import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <a className="logo page" href="https://rogeriocordeiro.github.io/my-page/">
          <h1>Minha Página</h1>
        </a>
        <a className="logo repo" href="https://github.com/RogerioCordeiro?tab=repositories" target='blank'>
          <h1>Meu repositório</h1>
        </a>

      <h1>Bem vindo(a) a homepage!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Contador é {count}
        </button>
        <p>
          Click em meu repositório para conhecer um pouco mais!
        </p>
      </div>
      <p className="read-the-docs">
        Estou trabalhando para trazer muitas novidades!
      </p>
    </>
  )
}

export default App
