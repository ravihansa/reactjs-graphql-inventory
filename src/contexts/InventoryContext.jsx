import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    const decreaseStock = (id, qty = 1) => {
        setInventory(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, inventory: { ...item.inventory, quantity: Math.max(0, item.inventory.quantity - qty) } }
                    : item
            )
        );
    };

    const increaseStock = (id, qty = 1) => {
        setInventory(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, inventory: { ...item.inventory, quantity: item.inventory.quantity + qty } }
                    : item
            )
        );
    };

    const checkAvailability = (id) => {
        return inventory.find(item => item.id === id && item.inventory.quantity > 0) ? true : false;
    };

    const restoreInventory = (cartItems) => {
        cartItems.forEach(item => increaseStock(item.id, item.quantity));
    };

    return (
        <InventoryContext.Provider value={{
            inventory,
            setInventory,
            decreaseStock,
            increaseStock,
            checkAvailability,
            restoreInventory
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);
