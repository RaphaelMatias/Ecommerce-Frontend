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

                //Simula delay para vizualização do Skeleton
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setProduct(productResponse.data);
                setRelatedProducts(relatedResponse.data);
            } catch (error) {
                console.error("Erro ao buscar produto", error);
                setError("Produto não encontrado ou erro ao carregar dados");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

            {isLoading ? (<ProductDetailSkeleton />) : (
                <div className="container my-5">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-detail-img img-fluid rounded-3 shadow"
                            />
                        </div>

                        <div className="col-md-6">
                            <h1 className="display-4 mb-3">{product.name}</h1>

                            <div className="d-flex gap-3 mb-4">
                                {product.category && (
                                    <span className="badge bg-primary fs-5">
                                        {product.category}
                                    </span>
                                )}
                                {product.brand && (
                                    <span className="badge bg-success fs-5">{product.brand}</span>
                                )}
                            </div>

                            <div className="bg-light p-4 rounded-3 mb-4">
                                <h2 className="text-danger mb-0">
                                    R$ {product.final_price.toFixed(2)}
                                </h2>
                                {product.discount_price && (
                                    <p className="text-muted text-decoration-line-through mb-0">
                                        De: R$ {product.price}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="h4">Descrição do Produto</h3>
                                <p className="lead">{product.description}</p>
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-lg py-3">
                                    Adicionar ao Carrinho
                                </button>
                                <a href="/" className="btn btn-outline-secondary">
                                    Voltar para a Loja
                                </a>
                            </div>
                        </div>
                    </div>

                    {relatedProducts.length > 0 && (
                        <section className="mt-5">
                            <h3 className="mb-4">Você também pode gostar</h3>
                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <RelatedProductsCard key={relatedProduct.id} product={relatedProduct} />
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
