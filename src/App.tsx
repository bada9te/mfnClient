import ApplicationRouter from './utils/router/app-routes';

// rainbowkit
import RainbowkitAppProvider from './utils/rainbowkit/rainbowkitProvider';

// apollo
import { ApolloProvider } from '@apollo/client/index.js';
import APClient from './utils/apollo/client';

// localization
import { I18nextProvider } from "react-i18next";
import i18next from "@/utils/translations/i18next";


export default function App() {
    return (
        <ApolloProvider client={APClient}>
            <RainbowkitAppProvider>
                <I18nextProvider i18n={i18next}>
                    <ApplicationRouter/>
                </I18nextProvider>
            </RainbowkitAppProvider>
        </ApolloProvider>
    );
}
