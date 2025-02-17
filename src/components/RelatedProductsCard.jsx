import React from "react";
import { Link } from 'react-router-dom';
import './RelatedProductsCard.css';

const RelatedProductsCard = ({ product, className }) => {
    return (
        <div className={`card shadow-sm h-100 ${className || ''}`}>
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    className="card-img-top product-card-image"
                    alt={product.name}
                />
            </Link>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted flex-grow-1">
                    {product.description?.slice(0, 80)}...
                </p>
                <div className="mt-3">
                    <div className="h5 text-primary">
                        R$ {product.final_price.toFixed(2)}
                    </div>
                    <Link 
                        to={`/products/${product.id}`}
                        className="btn btn-primary w-100 mt-2"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RelatedProductsCard;