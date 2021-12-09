import Router from './routes';
import {theme} from './styles/theme';
import GlobalStyle from './styles/globalStyles';
import {ThemeProvider} from 'styled-components'

function App(){

    return(
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router />
        </ThemeProvider>
    );
}

export default App;