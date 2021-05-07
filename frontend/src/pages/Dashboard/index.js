import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './Styles.css';

export default function Dashboard() {
    const [registerJobs, setRegisterJobs] = useState([]);

    useEffect(() => {
        async function loadRegisterJobs() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            //TODO: exemplo de comentário.
            setRegisterJobs(response.data);
        }
        
        loadRegisterJobs();
    }, []);

    return (
        <>
            <ul className="registerJob-list">
                {registerJobs.map(registerJob => (
                    <li key={registerJob._id}>
                        <header style={{ backgroundImage: `url(${registerJob.thumbnail_url})`}}/>
                        <strong>{registerJob.company}</strong>
                        <span>{registerJob.wage ? `R$${registerJob.wage}/mês` : 'SALÁRIO À COMBINAR'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/opportunity">
                <button className="btn">Cadastrar nova vaga</button> 
            </Link>
        </>
    )
}