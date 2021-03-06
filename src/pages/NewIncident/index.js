import React, {useState} from 'react';

import logoImg from '../../assets/logo.svg';

import './styles.css';

import {Link, useHistory} from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault(); ///...prevenir o recarregamento automático (default) da página ao ser submetida (clicar no botão submit)

        const data = {
            title,
            description,
            value
        };
    
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: localStorage.getItem('ongId')
                }
            });

            history.push('/profile');
        }catch(err){
            console.log('Erro ao inserir.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói disposto a resolver isso</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do caso" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em R$" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}