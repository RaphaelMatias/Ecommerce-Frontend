import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProducts } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((error) => {
                console.error('Erro ao buscar produtos', error);
                setError('Falha ao carregar produtos. Tente novamente mais tarde.');
            });
    }, []);

    return (
        <div>
            <Header />
            <div className='container my-5'>
                <h2 className='text-center mb-4'>Nossos Produtos</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {products.map((product) => (
                        <div key={product.id} className='col'>
                            <div className='card shadow-sm border-light h-100'>
                                <div className='card-img-wrapper'>
                                    <img
                                        src={product.image}
                                        className='card-img-top product-img'
                                        alt={product.name}
                                    />
                                </div>
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title'>{product.name}</h5>
                                    <p className='card-text flex-grow-1'>
                                        {product.description.length > 50
                                            ? product.description.slice(0, 50) + '...'
                                            : product.description}
                                    </p>
                                    <div className='mt-3'>
                                        <p className='card-text fw-bold fs-4 text-primary'>
                                            R$ {product.final_price.toFixed(2)}
                                        </p>
                                        <a href={`/products/${product.id}`} className='btn btn-primary'>
                                            Ver Detalhes
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
