import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getInventoryData = async () => {
    const INVENTORY_DATA_QUERY = `
        query {
            products {
                id
                brand
                name
                price
                isActive
                inventory {
                    quantity
                    status
                }
            }
        }
    `;

    return await api.post(`/`, {
        query: INVENTORY_DATA_QUERY,
    });
};
