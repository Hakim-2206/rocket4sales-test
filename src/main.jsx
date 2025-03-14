import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"; // permet de lier le store redux à l'ensemble de l'App
import store from "./store/index.js"; // import du store
import {BrowserRouter} from "react-router"; // gestion du routage

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)
