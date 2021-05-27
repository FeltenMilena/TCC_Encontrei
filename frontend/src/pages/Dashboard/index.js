import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import api from '../../services/api';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import './Styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  }));

export default function Dashboard() {
    const [registerJobs, setRegisterJobs] = useState([]);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </li>
                ))}
            </ul>
            <Link to="/opportunity">
                <button className="btn">Cadastrar nova vaga</button> 
            </Link>
        </>
    )
}