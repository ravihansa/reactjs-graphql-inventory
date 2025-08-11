import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Layout>
          <AppRoutes />
        </Layout >
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
