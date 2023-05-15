import './App.css';
import Cpt from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

	const theme = createTheme({
		palette: {
			mode: 'dark'
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<div>
				<a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
					<img src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg" className="logo uhealth" alt="UHealth logo" />
				</a>
			</div>
			<Cpt />
		</ThemeProvider>
	)
}

export default App
