// collection.js
import api from '../lib/api';

async function fetchAllProducts() {
    let allProducts = [];
    let page = 1;
    const perPage = 100;

    try {
        while (true) {
            const response = await api.get('/products', {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });

            const products = response.data;

            if (products.length === 0) {
                break;
            }

            allProducts = [...allProducts, ...products];
            page++;
        }

        return allProducts;
    } catch (error) {
        return [];
    }
}

export async function getCollections() {
    const products = await fetchAllProducts();

    if (!products.length) {
        return {
            collections: {}
        };
    }

    const collections = {};
    products.forEach(product => {
        const category = product.categories[0];
        if (!category) {
            return;
        }

        const categoryKey = `category_${category.id}`;
        if (!collections[categoryKey]) {
            collections[categoryKey] = {
                title: category.name,
                products: []
            };
        }

        collections[categoryKey].products.push({
            id: product.id,
            name: product.name,
            price: `₹${product.price}`,
            price_old: product.sale_price ? `₹${product.regular_price}` : null,
            image: product.images[0]?.src || '/assets/placeholder.jpg',
        });
    });

    return { collections };
}