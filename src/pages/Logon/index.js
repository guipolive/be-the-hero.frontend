import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom';

import './styles.css';

// importando os ícones que iremos usar nessa página. Os ícones foram adcionados com o comando npm install react-icons
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'; // importando a nossa url padrão (meusite.com)

// para importar uma imagem com react, devemos importar ela como se fosse uma variável, usando javascript
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault(); ///...prevenir o recarregamento automático (default) da página ao ser submetida (clicar no botão submit)

        const data = {
            id
        };

        try{
            // aqui enviamos por meio da rota configurada no backend os dados do formulário. Os dados enviados têm que ser os mesmos dados esperados pelo backend. 
            const response = await api.post('sessions', data); // como nosso backend nos retorna o nome da ong nessa rota, guardamos ele aqui em uma variável para podermos utilizar.
            console.log(response.data.name);

            // guardando o id e nome da ong na sessão
            /// disponível para olhar no chrome: application, local storage, meusite.com
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            console.log(`Erro no login. Erro: ${err}`);
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className ="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
    
}

