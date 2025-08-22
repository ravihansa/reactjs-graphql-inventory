import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <CartProvider>
          <Layout>
            <AppRoutes />
          </Layout >
        </CartProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
