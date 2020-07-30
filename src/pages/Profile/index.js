// useEffect nos permite disparar uma função em determinado momento do componente
import React, {useState, useEffect} from 'react';

import logoImg from '../../assets/logo.svg';

import './styles.css';

import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    // pegando o nome da ong que está guardado no localStorage para ser usado aqui no frontend
    const ongName = localStorage.getItem('ongName');
    // pegando o id da ong que está guardada no localStorage para ser usado 
    const ongId = localStorage.getItem('ongId');
    
    /* useEffect(() => {corpo da função}, [depenências. quando um valor desse vetor sofrer uma alteração, a função será executada]); */

    useEffect(() => {
        api.get('profile',{ // está nos jogando para a rota profile do backend
            headers: { // enviando o ongId pelo headers, que nossa aplicação backend espera receber
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data); // define o estado dos nossos incidents como sendo a resposta dessa requisição get ao backend
        });
    }, [ongId]);// parâmetros que, quando mudados, farão com que a nossa função useEffect seja executada novamente. Dexar vazio significaria que ela só seria executada uma vez. Mas por garantia, podemos colocar o ongId aqui, mesmo que ele não vá mudar.

    async function handleDeleteIncident(id){ /* função para deletar um incident ao clicar no botão de delete */
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id)); // mantendo apenas os incidents onde o id é diferente do que acabamos de deletar. Isso faz com que a interface recarregue automaticamente ao deletar um incident
        }catch(err){
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear(); // limpando todos os dados que estão no localStorage (no caso os dados são o id da ong e o nome da ong)
        history.push('/'); // redirecionando para '/'
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}> {/* necessário colocar a key sempre que formos percorrer uma lista de elementos, para o react não se perder quando estiver alterando/percorrendo esses elementos. É necessário que essa key seja única por elemento. */}
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p> {/* intl é uma classe global do javascript para internacionalização */}

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button" >
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))} {/* percorrendo os incidents */}
            </ul>

        </div>
    )
}