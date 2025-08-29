import React from 'react';
import { useStore } from '../contexts/StoreContext';
import styles from "./styles/CartPage.module.css";

const CartPage = () => {
    const { cart, inventory, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useStore();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!cart.length) {
        return <div className={styles.empty}>Your cart is empty 🛒</div>;
    }

    return (
        <div className={styles.cartContainer}>
            <h2>Shopping Cart</h2>

            <div className={styles.cartTable}>
                <div className={`${styles.cartRow} ${styles.header}`}>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div>Action</div>
                </div>

                {cart.map((item) => {
                    const invItm = inventory.find(itm => itm.id === item.id);
                    const remainingStock = invItm?.inventory?.quantity ?? 0;
                    return (<div key={item.id} className={styles.cartRow}>
                        <div className={styles.product}>
                            <span className={styles.name}>{item.name}</span>
                            <span className={styles.brand}>{item.brand ?? '---'}</span>
                        </div>
                        <div>${item.price.toFixed(2)}</div>
                        <div className={styles.quantityControls}>
                            <button onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 1}
                            >-
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)}
                                disabled={remainingStock <= 0}
                            >+
                            </button>
                        </div>
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                        <div>
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeFromCart(item.id)}
                            >
                                ❌ Remove
                            </button>
                        </div>
                    </div>);
                })}
            </div>

            <div className={styles.footer}>
                <div className={styles.total}>Total: ${total.toFixed(2)}</div>
                <button className={styles.clearBtn} onClick={() => clearCart()}>
                    Clear Cart
                </button>
                <button className={styles.checkoutBtn}>Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;
