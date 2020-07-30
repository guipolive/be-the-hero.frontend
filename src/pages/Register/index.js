import React, {useState} from 'react';

import logoImg from '../../assets/logo.svg';

import './styles.css';

import {Link, useHistory} from 'react-router-dom'; //useHistory está servindo para nos jogar para outra rota sem o uso de Link. Para usar dentro da função

import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api'; // importando a nossa url padrão (meusite.com)

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    // função responsável por conversar com o backend e registrar a ONG
    async function handleRegister(e) { // recebemos como parâmetro o evento e, afim de...
        e.preventDefault(); ///...prevenir o recarregamento automático (default) da página ao ser submetida (clicar no botão submit)

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try{
            // aqui enviamos por meio da rota configurada no backend os dados do formulário. Os dados enviados têm que ser os mesmos dados esperados pelo backend. 
            const response = await api.post('ongs', data); // como nosso backend nos retorna o id da ong nessa rota, guardamos ele aqui em uma variável para podermos utilizar.
        
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            console.log(`Erro no cadastro, tente novamente. ${err}`);
        }

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}> {/* quando for dado um submit nesse formulário, chamará a função handleRegister */}
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type ="email" placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        maxlength="11"
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)}
                    />
                    

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" style={{width: 80}} 
                            maxlength="2"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}