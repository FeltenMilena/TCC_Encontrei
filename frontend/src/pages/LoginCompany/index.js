import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function LoginCompany({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        
        const response = await api.post('/registers', { email, password });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }
    return (
        <>       
            <p>
                Ofereça <strong>vagas</strong> e encontre <strong>talentos</strong> para sua empresa.
            </p>

            < form onSubmit={handleSubmit}>

                <label htmlFor="email">E-MAIL *</label>
                <input 
                id="email" 
                type="email" 
                placeholder="Seu e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="password">SENHA *</label>
                <input 
                id="password" 
                type="password" 
                placeholder="Sua senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
                />

                <button className="btn" type="submit">Entrar</button>
                <br/>
                <Link to="/loginCompany">
                    <button className="btn" type="submit">Cadastrar-se</button>
                </Link>
            </form>
        </>
    )
}