// data/collections.js

// import api from '../lib/api';

// async function fetchAllProducts() {
//     let allProducts = [];
//     let page = 1;
//     const perPage = 100;

//     try {
//         while (true) {
//             console.log(`Fetching products, page ${page}...`);
//             const response = await api.get('', {
//                 params: {
//                     per_page: perPage,
//                     page: page,
//                 },
//             });

//             const products = response.data;
//             console.log(`Fetched ${products.length} products on page ${page}`);

//             if (products.length === 0) {
//                 break;
//             }

//             allProducts = [...allProducts, ...products];
//             page++;
//         }

//         return allProducts;
//     } catch (error) {
//         console.error('Error fetching products:', error.response?.data || error.message);
//         return [];
//     }
// }

// export async function getCollections() {
//     const products = await fetchAllProducts();
//     console.log('Total products fetched:', products.length);

//     if (!products.length) {
//         return {
//             collections1: {
//                 collection1: { title: 'Trending', products: [] },
//                 collection2: { title: 'New Release', products: [] },
//             },
//             collections2: {
//                 collection3: { title: 'Price Drop', products: [] },
//                 collection4: { title: 'Best Sellers', products: [] },
//             },
//         };
//     }

//     const collections1 = {
//         collection1: {
//             title: 'Trending',
//             products: products.slice(0, 7).map((product) => ({
//                 id: product.id,
//                 name: product.name,
//                 price: `₹${product.sale_price || product.regular_price}`,
//                 price_old: product.sale_price ? `₹${product.regular_price}` : null,
//                 image: product.images[0]?.src || '/assets/placeholder.jpg',
//             })),
//         },
//         collection2: {
//             title: 'New Release',
//             products: products.slice(7, 14).map((product) => ({
//                 id: product.id,
//                 name: product.name,
//                 price: `₹${product.sale_price || product.regular_price}`,
//                 price_old: product.sale_price ? `₹${product.regular_price}` : null,
//                 image: product.images[0]?.src || '/assets/placeholder.jpg',
//             })),
//         },
//     };

//     const collections2 = {
//         collection3: {
//             title: 'Price Drop',
//             products: products.slice(14, 21).map((product) => ({
//                 id: product.id,
//                 name: product.name,
//                 price: `₹${product.sale_price || product.regular_price}`,
//                 price_old: product.sale_price ? `₹${product.regular_price}` : null,
//                 image: product.images[0]?.src || '/assets/placeholder.jpg',
//             })),
//         },
//         collection4: {
//             title: 'Best Sellers',
//             products: products.slice(21, 28).map((product) => ({
//                 id: product.id,
//                 name: product.name,
//                 price: `₹${product.sale_price || product.regular_price}`,
//                 price_old: product.sale_price ? `₹${product.regular_price}` : null,
//                 image: product.images[0]?.src || '/assets/placeholder.jpg',
//             })),
//         },
//     };

//     return { collections1, collections2 };
// }

export const collections1 = {
    collection1: {
        title: 'Trending',
        products: [
            { id: 1, name: 'GoPro Camera', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/gopro_camera.webp' },
            { id: 2, name: 'Braun Trimmer', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/braun_trimmer.webp' },
            { id: 3, name: 'Apple Airtag', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/apple_airtag.webp' },
            { id: 4, name: 'Marshall Headphone', price: '₹12,500', price_old: '₹16,500', image: '/assets/products/marshall_headphone.webp' },
            { id: 5, name: 'Nothing Phone', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/nothing_phone.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Philips Trimmer', price: '₹950', price_old: '₹1,500', image: '/assets/products/philips_trimmer.webp' },
        ],
    },
    collection2: {
        title: 'New Release',
        products: [
            { id: 1, name: 'Whirlpool Fridge', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/whirlpool_fridge.webp' },
            { id: 2, name: 'Sony Soundbar', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/sony_soundbar.webp' },
            { id: 3, name: 'Prestige Airfryer', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/prestige_airfryer.webp' },
            { id: 5, name: 'Philips Trimmer', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/philips_trimmer.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Nothing Phone', price: '₹950', price_old: '₹1,500', image: '/assets/products/nothing_phone.webp' },
        ],
    },
    collection3: {
        title: 'Price Drop',
        products: [
            { id: 1, name: 'GoPro Camera', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/gopro_camera.webp' },
            { id: 2, name: 'Braun Trimmer', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/braun_trimmer.webp' },
            { id: 3, name: 'Apple Airtag', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/apple_airtag.webp' },
            { id: 4, name: 'Marshall Headphone', price: '₹12,500', price_old: '₹16,500', image: '/assets/products/marshall_headphone.webp' },
            { id: 5, name: 'Nothing Phone', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/nothing_phone.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Philips Trimmer', price: '₹950', price_old: '₹1,500', image: '/assets/products/philips_trimmer.webp' },
        ],
    },
    collection4: {
        title: 'Best Sellers',
        products: [
            { id: 1, name: 'Whirlpool Fridge', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/whirlpool_fridge.webp' },
            { id: 2, name: 'Sony Soundbar', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/sony_soundbar.webp' },
            { id: 3, name: 'Prestige Airfryer', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/prestige_airfryer.webp' },
            { id: 5, name: 'Philips Trimmer', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/philips_trimmer.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Nothing Phone', price: '₹950', price_old: '₹1,500', image: '/assets/products/nothing_phone.webp' },
        ],
    },
};

export const homeEssentials = {
    collection3: {
        title: 'Air Conditioner',

        products: [
            { id: 1, name: 'Whirlpool Fridge', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/whirlpool_fridge.webp' },
            { id: 2, name: 'Sony Soundbar', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/sony_soundbar.webp' },
            { id: 3, name: 'Prestige Airfryer', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/prestige_airfryer.webp' },
            { id: 5, name: 'Philips Trimmer', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/philips_trimmer.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Nothing Phone', price: '₹950', price_old: '₹1,500', image: '/assets/products/nothing_phone.webp' },
        ],
    },
    collection4: {
        title: 'Refrigerator',
        products: [
            { id: 1, name: 'GoPro Camera', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/gopro_camera.webp' },
            { id: 2, name: 'Braun Trimmer', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/braun_trimmer.webp' },
            { id: 3, name: 'Apple Airtag', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/apple_airtag.webp' },
            { id: 4, name: 'Marshall Headphone', price: '₹12,500', price_old: '₹16,500', image: '/assets/products/marshall_headphone.webp' },
            { id: 5, name: 'Nothing Phone', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/nothing_phone.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Philips Trimmer', price: '₹950', price_old: '₹1,500', image: '/assets/products/philips_trimmer.webp' },
        ],
    },
};

export const airFryersTrimmers = {
    collection3: {
        title: 'Trimmers',

        products: [
            { id: 1, name: 'Whirlpool Fridge', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/whirlpool_fridge.webp' },
            { id: 2, name: 'Sony Soundbar', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/sony_soundbar.webp' },
            { id: 3, name: 'Prestige Airfryer', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/prestige_airfryer.webp' },
            { id: 5, name: 'Philips Trimmer', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/philips_trimmer.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Nothing Phone', price: '₹950', price_old: '₹1,500', image: '/assets/products/nothing_phone.webp' },
        ],
    },
    collection4: {
        title: 'Air Fryers',

        products: [
            { id: 1, name: 'GoPro Camera', price: '₹20,000', price_old: '₹40,000', image: '/assets/products/gopro_camera.webp' },
            { id: 2, name: 'Braun Trimmer', price: '₹2,500', price_old: '₹6,000', image: '/assets/products/braun_trimmer.webp' },
            { id: 3, name: 'Apple Airtag', price: '₹20,500', price_old: '₹32,500', image: '/assets/products/apple_airtag.webp' },
            { id: 4, name: 'Marshall Headphone', price: '₹12,500', price_old: '₹16,500', image: '/assets/products/marshall_headphone.webp' },
            { id: 5, name: 'Nothing Phone', price: '₹32,500', price_old: '₹65,500', image: '/assets/products/nothing_phone.webp' },
            { id: 6, name: 'Oneplus Phone', price: '₹12,500', price_old: '₹22,500', image: '/assets/products/oneplus_phone.webp' },
            { id: 7, name: 'Philips Trimmer', price: '₹950', price_old: '₹1,500', image: '/assets/products/philips_trimmer.webp' },
        ],
    },
};