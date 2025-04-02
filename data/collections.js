import api from '../lib/api';

async function fetchAllProducts() {
    let allProducts = [];
    let page = 1;
    const perPage = 100;

    try {
        while (true) {
            console.log(`Fetching products, page ${page}...`);
            const response = await api.get('', {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });

            console.log('Raw API response:', response.data);
            const products = response.data;
            console.log(`Fetched ${products.length} products on page ${page}`);

            if (products.length === 0) {
                break;
            }

            allProducts = [...allProducts, ...products];
            page++;
        }

        return allProducts;
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        return [];
    }
}

export async function getCollections() {
    const products = await fetchAllProducts();
    console.log('Total products fetched:', products.length);

    if (!products.length) {
        return {
            collections1: {
                collection1: { title: 'Trending', products: [] },
                collection2: { title: 'New Release', products: [] },
            },
            collections2: {
                collection3: { title: 'Price Drop', products: [] },
                collection4: { title: 'Best Sellers', products: [] },
            },
        };
    }

    const collections1 = {
        collection1: {
            title: 'Trending',
            products: products.slice(0, 7).map((product) => ({
                id: product.id,
                name: product.name,
                price: `₹${product.sale_price || product.regular_price}`,
                price_old: product.sale_price ? `₹${product.regular_price}` : null,
                image: product.images[0]?.src || '/assets/placeholder.jpg',
            })),
        },
        collection2: {
            title: 'New Release',
            products: products.slice(7, 14).map((product) => ({
                id: product.id,
                name: product.name,
                price: `₹${product.sale_price || product.regular_price}`,
                price_old: product.sale_price ? `₹${product.regular_price}` : null,
                image: product.images[0]?.src || '/assets/placeholder.jpg',
            })),
        },
    };

    const collections2 = {
        collection3: {
            title: 'Price Drop',
            products: products.slice(14, 21).map((product) => ({
                id: product.id,
                name: product.name,
                price: `₹${product.sale_price || product.regular_price}`,
                price_old: product.sale_price ? `₹${product.regular_price}` : null,
                image: product.images[0]?.src || '/assets/placeholder.jpg',
            })),
        },
        collection4: {
            title: 'Best Sellers',
            products: products.slice(21, 28).map((product) => ({
                id: product.id,
                name: product.name,
                price: `₹${product.sale_price || product.regular_price}`,
                price_old: product.sale_price ? `₹${product.regular_price}` : null,
                image: product.images[0]?.src || '/assets/placeholder.jpg',
            })),
        },
    };

    console.log('Transformed collections:', { collections1, collections2 });
    return { collections1, collections2 };
}