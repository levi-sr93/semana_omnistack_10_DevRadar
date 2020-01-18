import React, { useState, useEffect } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

import DevForm from './components/Devform/index';
import DevItem from './components/Devitem/index';

//3 conceitos principais do REACT
//1 - Componente, 2-  Estado, 3 - Propriedade

//1 - Função (bloco isolado) que retorna algum conteúdo HTML/CSS/JS sem interferir no restante da aplicação;
//2 - Informação q o componente vai manter e manipular (lembrar: imutabilidade)
//3 - Propriedade é como se fosse atributo do html ex: <Header title="exemplo" são informações q um componente PAI passa para o FILHO/>



function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data)
    }

    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]); //Fazendo adição em array no react
  }

  return (
    <div id="app">
      <aside>
        <strong>Registration</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>

        <ul>
          {devs.map(dev => (
            < DevItem key={dev._id} dev={dev} />
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;
