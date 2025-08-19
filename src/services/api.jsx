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

export const getCategoryData = async () => {
    const CATEGORY_DATA_QUERY = `
        query {
            categories {
                id
                name
                categoryKey
            }
        }
    `;

    return await api.post(`/`, {
        query: CATEGORY_DATA_QUERY,
    });
};

export const searchInventoryData = async (productName) => {
    const INVENTORY_DATA_QUERY = `
        query {
            productsByName(name: "${productName}") {
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
        query: INVENTORY_DATA_QUERY
    });
};
