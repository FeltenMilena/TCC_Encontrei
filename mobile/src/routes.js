import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';
import Register from './pages/Register';
import LoginCandidate from './pages/LoginCandidate';

const Routes = createAppContainer(
    createSwitchNavigator({
        LoginCandidate,
        Register,
        Login,
        List,
        Book
    })
);

export default Routes;