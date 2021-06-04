import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import camera from '../../assets/camera.svg';

import './Styles.css';

export default function New({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [cell, setCell] = useState('');
    const [wage, setWage] = useState('');
    const [email, setEmail] = useState('');
    const [abstract, setAbstract] = useState('');
    const [prerequisites, setPrerequisites] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    ); 

    async function handleSubmit(event){
        
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('cell', cell);
        data.append('wage', wage);
        data.append('email', email);
        data.append('abstract', abstract);
        data.append('prerequisites', prerequisites);
        
        await api.post('/registerJobs', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="company">EMPRESA RESPONSÁVEL *</label>
            <input
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="cell">TELEFONE *</label>
            <input
                id="cell"
                placeholder="Telefone para contato"
                value={cell}
                onChange={event => setCell(event.target.value)}
            />

            <label htmlFor="wage">SALÁRIO * <span>(em branco para À COMBINAR)</span></label>
            <input
                id="wage"
                placeholder="Salário ofertado pela vaga"
                value={wage}
                onChange={event => setWage(event.target.value)}
            />

            <label htmlFor="email">E-mail *</label>
            <input
                id="email"
                placeholder="E-mail para contato"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="abstract">RESUMO DA VAGA *</label>
            <input
                id="abstract"
                placeholder="Breve resumo sobre a vaga"
                value={abstract}
                onChange={event => setAbstract(event.target.value)}
            />

            <label htmlFor="prerequisites">PRÉ-REQUISITOS * <span>(separados por vírgula)</span></label>
            <input
                id="prerequisites"
                placeholder="Pré-requisitos da vaga"
                value={prerequisites}
                onChange={event => setPrerequisites(event.target.value)}
            />

            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <button type="submit" className="btn">Cadastrar vaga</button>
            <br/>
            <Link to="/dashboard">
                <button className="btn" type="submit">Voltar</button>
            </Link>
        </form>
    )
}