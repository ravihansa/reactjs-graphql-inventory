import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';
import { CartProvider } from './contexts/CartContext';
import { InventoryProvider } from './contexts/InventoryContext';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <InventoryProvider>
          <CartProvider>
            <Layout>
              <AppRoutes />
            </Layout >
          </CartProvider>
        </InventoryProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
