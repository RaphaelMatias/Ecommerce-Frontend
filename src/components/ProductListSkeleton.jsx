import React from "react";

const ProductListSkeleton = () => {
    return (
        <div className="col">
            <div className="card shadow-sm border-light h-100">
                <div className="card-img-wrapper placeholder-glow">
                    <div className="card-img-top product-img placeholder" style={{ height: '200px' }} />
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <span className="placeholder col-8" />
                    </h5>
                    <p className="card-text flex-grow-1">
                        <span className="placeholder col-12" />
                        <span className="placeholder col-10" />
                        <span className="placeholder col-6" />
                    </p>
                    <div className="mt-3">
                        <p className="card-text fw-bold fs-4 text-primary">
                            <span className="placeholder col-4" />
                        </p>
                        <div className="btn btn-primary disabled placeholder col-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListSkeleton;