import React, { UseState, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiBook } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo-cafe.png';

import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert("Erro ao cadastrar caso, tente novamente");
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar nova movimentação</h1>
                    <p>Descreva detalhadamente sobre a movimentação realizada.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#0e6000" ></FiArrowLeft>
                        Voltar para home
                    </Link>
                    <Link className="back-link" to="/register">
                        <FiBook size={16} color="#0e6000" ></FiBook>
                         Cadastrar novo cliente
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Nome do Cliente"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <select id="opcao" name="opcao">
                        <option value="venda" style={{ color: "red" }}>Venda</option>
                        <option value="compra" style={{ color: "green" }}>Compra</option>
                    </select>
                    <textarea
                        placeholder="Observação"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="input-group">
                        <h1 style={{ width: 80, marginTop: "20px" }}>R$</h1>
                        <input
                            placeholder="Valor. ex: 12.5"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}