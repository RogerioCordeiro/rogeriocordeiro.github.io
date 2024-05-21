import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a className="logo" href="https://rogeriocordeiro.github.io/my-page/" target="_blank">
          <h1>Meu repositório</h1>
        </a>
      </div>
      <h1>Minha Pagina Inicial</h1>
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
