import Router from './routes';
import {theme} from './styles/theme';
import GlobalStyle from './styles/globalStyles';
import {ThemeProvider} from 'styled-components'
import { AuthProvider } from './context/AuthContext';

function App(){

    return(
        <ThemeProvider theme={theme}>
            <AuthProvider>
            <GlobalStyle />
            <Router />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;