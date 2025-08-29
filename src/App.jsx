import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';
import { StoreProvider } from './contexts/StoreContext';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <StoreProvider>
          <Layout>
            <AppRoutes />
          </Layout >
        </StoreProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
