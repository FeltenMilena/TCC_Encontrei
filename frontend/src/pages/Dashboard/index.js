import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './Styles.css';

export default function Dashboard() {
    const [registerJobs, setRegisterJobs] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);
    
    useEffect(() => {
        socket.on('booking_request', data => {
        setRequests([...requests, data]);
        })
    }, [requests, socket]);

    // eslint-disable-next-line no-lone-blocks
    {/*useEffect(() => {
        const socket = socketio('http://localhost:3000');
    }, []);*/}

    useEffect(() => {
        async function loadRegisterJobs() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setRegisterJobs(response.data);
        }
        
        loadRegisterJobs();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
    
        setRequests(requests.filter(request => request._id !== id));
    }
    
      async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
    
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                <li key={request._id}>
                    <p>
                    <strong>{request.userCandidate.email}</strong> está solicitando uma reserva de vaga <strong>{request.registerJob.company}<br/></strong> Mensagem: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
                ))}
            </ul>
                
            <ul className="registerJob-list">
                {registerJobs.map(registerJob => (
                    <li key={registerJob._id}>
                        <header style={{ backgroundImage: `url(${registerJob.thumbnail_url})`}}/>
                        <strong>{registerJob.company}</strong>
                        <span>{registerJob.wage ? `R$${registerJob.wage}/mês` : 'SALÁRIO À COMBINAR'}</span>
                        <span>Resumo: {registerJob.abstract}</span>
                        <span>Pré-requisitos: {registerJob.prerequisites}</span>
                    </li>
                ))}
            </ul>
            <Link to="/opportunity">
                <button className="btn">Cadastrar nova vaga</button> 
            </Link>
        </>
    )
}