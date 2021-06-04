import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Login({ history }){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        
        const response = await api.post('/sessions', { name, email, password, passwordConfirm });

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
                <label htmlFor="name">NOME *</label>
                <input 
                id="name" 
                placeholder="Nome da sua empresa"
                value={name}
                onChange={event => setName(event.target.value)}
                />

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

                <label htmlFor="passwordConfirm">CONFIRMAR SENHA *</label>
                <input 
                id="passwordConfirm" 
                type="password" 
                placeholder="Confirme sua senha"
                value={passwordConfirm}
                onChange={event => setPasswordConfirm(event.target.value)}
                />
                
                <button className="btn" type="submit">Cadastrar-se</button>
                <br/>
                <Link to="/">
                    <button className="btn" type="submit">Voltar</button>
                </Link>
            </form>
        </>
    )
}