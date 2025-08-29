import React, { createContext, useContext, useReducer, useMemo } from 'react';

const StoreContext = createContext(null);

const initialState = {
    inventory: [], // [{ id, name, price, brand, inventory: { quantity, status }}]
    cart: [],      // [{ id, name, price, brand, quantity }]
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_INVENTORY": {
            return { ...state, inventory: action.payload || [] };
        }

        case "ADD_TO_CART": {
            const item = action.payload;
            const idx = state.inventory.findIndex(p => p.id === item.id);
            if (idx === -1) return state;

            const stock = state.inventory[idx].inventory?.quantity ?? 0;
            if (stock <= 0) return state;

            // update inventory
            const inventory = state.inventory.map((p, i) =>
                i === idx
                    ? { ...p, inventory: { ...p.inventory, quantity: stock - 1 } }
                    : p
            );

            // update cart
            const existing = state.cart.find(c => c.id === item.id);
            let cart;
            if (existing) {
                cart = state.cart.map(c =>
                    c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
                );
            } else {
                cart = [...state.cart, { ...item, quantity: 1 }];
            }
            return { inventory, cart };
        }

        case "INCREASE_QTY": {
            const id = action.payload;
            const invIdx = state.inventory.findIndex(p => p.id === id);
            if (invIdx === -1) return state;

            const stock = state.inventory[invIdx].inventory?.quantity ?? 0;
            if (stock <= 0) return state;

            const cart = state.cart.map(c =>
                c.id === id ? { ...c, quantity: c.quantity + 1 } : c
            );
            const inventory = state.inventory.map((p, i) =>
                i === invIdx
                    ? { ...p, inventory: { ...p.inventory, quantity: stock - 1 } }
                    : p
            );
            return { inventory, cart };
        }

        case "DECREASE_QTY": {
            const id = action.payload;
            const cartItem = state.cart.find(c => c.id === id);
            if (!cartItem) return state;
            if (cartItem.quantity <= 1) return state;

            const invIdx = state.inventory.findIndex(p => p.id === id);
            if (invIdx === -1) return state;

            const cart = state.cart.map(c =>
                c.id === id ? { ...c, quantity: c.quantity - 1 } : c
            );
            const currentStock = state.inventory[invIdx].inventory?.quantity ?? 0;
            const inventory = state.inventory.map((p, i) =>
                i === invIdx
                    ? { ...p, inventory: { ...p.inventory, quantity: currentStock + 1 } }
                    : p
            );
            return { inventory, cart };
        }

        case "REMOVE_FROM_CART": {
            const id = action.payload;
            const cartItem = state.cart.find(c => c.id === id);
            if (!cartItem) return state;

            const invIdx = state.inventory.findIndex(p => p.id === id);
            let inventory = state.inventory;
            if (invIdx !== -1) {
                const currentStock = inventory[invIdx].inventory?.quantity ?? 0;
                inventory = inventory.map((p, i) =>
                    i === invIdx
                        ? { ...p, inventory: { ...p.inventory, quantity: currentStock + cartItem.quantity } }
                        : p
                );
            }
            const cart = state.cart.filter(c => c.id !== id);
            return { inventory, cart };
        }

        case "CLEAR_CART": {
            // Add the cart items quantities to related inventory items
            let inventory = state.inventory;
            state.cart.forEach(ci => {
                const idx = inventory.findIndex(p => p.id === ci.id);
                if (idx !== -1) {
                    const currentStock = inventory[idx].inventory?.quantity ?? 0;
                    inventory = inventory.map((p, i) =>
                        i === idx
                            ? { ...p, inventory: { ...p.inventory, quantity: currentStock + ci.quantity } }
                            : p
                    );
                }
            });
            return { inventory, cart: [] };
        }

        default:
            return state;
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setInventory = (list) => dispatch({ type: "SET_INVENTORY", payload: list });
    const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
    const increaseQuantity = (id) => dispatch({ type: "INCREASE_QTY", payload: id });
    const decreaseQuantity = (id) => dispatch({ type: "DECREASE_QTY", payload: id });
    const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const value = useMemo(() => ({
        inventory: state.inventory,
        cart: state.cart,
        setInventory,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    }), [state]);

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
