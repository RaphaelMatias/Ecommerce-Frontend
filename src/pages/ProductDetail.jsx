import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RelatedProductsCard from "../components/RelatedProductsCard";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, relatedResponse] = await Promise.all([
                    getProductById(id),
                    getRelatedProducts(id),
                ]);

                if (productResponse.data.category && !productResponse.data.category.name) {
                    throw new Error("Estrutura de dados inválida para categoria");
                }

                setProduct(productResponse.data);
                setRelatedProducts(relatedResponse.data);
            } catch (error) {
                console.error("Erro ao buscar produto", error);
                setError(error.message || "Erro ao carregar dados do produto");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const renderCategoryBreadcrumbs = () => {
        if (!product?.category_hierarchy) return null;
        
        return (
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    {product.category_hierarchy.map((category, index) => (
                        <li 
                            key={category.id} 
                            className={`breadcrumb-item ${index === product.category_hierarchy.length - 1 ? 'active' : ''}`}
                        >
                            {index === product.category_hierarchy.length - 1 ? (
                                category.name
                            ) : (
                                <Link to={`/category/${category.id}`}>
                                    {category.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    };

    const renderPriceSection = () => {
        if (!product) return null;
        
        return (
            <div className="bg-light p-4 rounded-3 mb-4">
                <h2 className="text-danger mb-0">
                    R$ {product.final_price.toFixed(2)}
                </h2>
                {product.discount_price > 0 && (
                    <div className="mt-2">
                        <span className="text-muted text-decoration-line-through me-2">
                            De: R$ {product.price}
                        </span>
                        <span className="badge bg-success">
                            {calculateDiscountPercentage()}% OFF
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const calculateDiscountPercentage = () => {
        if (!product?.discount_price) return 0;
        return Math.round(
            ((product.price - product.discount_price) / product.price) * 100
        );
    };

    if (error) {
        return (
            <div>
                <Header />
                <div className="container my-5">
                    <div className="alert alert-danger">{error}</div>
                    <Link to="/" className="btn btn-primary">
                        Voltar para a loja
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />

            {isLoading ? (
                <ProductDetailSkeleton />
            ) : (
                <div className="container my-5">
                    {renderCategoryBreadcrumbs()}
                    
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="position-relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-detail-img img-fluid rounded-3 shadow"
                                />
                                {product.stock <= 10 && (
                                    <div className="position-absolute top-0 start-0 m-2">
                                        <span className="badge bg-warning text-dark">
                                            Últimas {product.stock} unidades!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h1 className="display-5 mb-3 fw-bold">{product.name}</h1>

                            <div className="d-flex gap-3 mb-4 flex-wrap">
                                {product.category && (
                                    <span className="badge bg-primary fs-6 py-2">
                                        <i className="bi bi-tag-fill me-2"></i>
                                        {product.category.name}
                                    </span>
                                )}
                                {product.brand && (
                                    <span className="badge bg-success fs-6 py-2">
                                        <i className="bi bi-building me-2"></i>
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            {renderPriceSection()}

                            <div className="mb-4">
                                <h3 className="h4 fw-bold mb-3">
                                    <i className="bi bi-card-text me-2"></i>
                                    Descrição do Produto
                                </h3>
                                <p className="lead" style={{ textAlign: 'justify' }}>
                                    {product.description}
                                </p>
                            </div>

                            <div className="d-grid gap-2">
                                <button 
                                    className="btn btn-primary btn-lg py-3"
                                    disabled={!product.is_available}
                                >
                                    <i className="bi bi-cart-plus-fill me-2"></i>
                                    {product.is_available 
                                        ? 'Adicionar ao Carrinho' 
                                        : 'Indisponível'}
                                </button>
                                <Link to="/" className="btn btn-outline-secondary">
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Voltar para a Loja
                                </Link>
                            </div>
                        </div>
                    </div>

                    {relatedProducts.length > 0 && (
                        <section className="mt-5 pt-4 border-top">
                            <h3 className="mb-4 fw-bold">
                                <i className="bi bi-hand-thumbs-up-fill me-2 text-primary"></i>
                                Você também pode gostar
                            </h3>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <RelatedProductsCard 
                                        key={relatedProduct.id} 
                                        product={relatedProduct}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ProductDetail;
