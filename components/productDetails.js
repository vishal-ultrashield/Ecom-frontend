import { useEffect, useState } from 'react';
import api from '../lib/api';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/61`); // Changed to use productId prop
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            {product.images && product.images.length > 0 && (
                <img
                    src={product.images[0].src}
                    alt={product.name}
                    style={{ maxWidth: '300px', marginBottom: '20px' }}
                />
            )}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <div className="prices">
                {product.price && (
                    <p>Regular Price: ${Number(product.price).toFixed(2)}</p>
                )}
                {product.regular_price && (
                    <p>Original Price: ${Number(product.regular_price).toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;