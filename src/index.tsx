import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import Output from './components/Output';
// styles
import 'antd/dist/reset.css';
import "@fontsource/montserrat/latin.css";
import "@fontsource/montserrat/cyrillic.css";
import './scss/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#4e5af2'
                    }
                }}
            >
                <Output />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
