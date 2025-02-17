import React from "react";

const ProductDetailSkeleton = () => (
    <div className="container my-5">
        <div className="row g-4">
            <div className="col-md-6">
                <div
                    className="placeholder-glow rounded-3 shadow"
                    style={{ height: "500px", backgroundColor: "#e9ecef" }}
                />
            </div>

            <div className="col-md-6">
                <div className="placeholder-glow">
                    <div className="placeholder col-8 mb-4" style={{ height: "45px" }} />

                    <div className="d-flex gap-3 mb-4">
                        <div className="placeholder col-3" style={{ height: "30px" }} />
                        <div className="placeholder col-3" style={{ height: "30px" }} />
                    </div>

                    <div className="placeholder col-4 mb-4" style={{ height: "40px" }} />

                    <div className="placeholder col-12 mb-2" />
                    <div className="placeholder col-10 mb-2" />
                    <div className="placeholder col-8 mb-2" />
                    <div className="placeholder col-6 mb-4" />

                    <div className="placeholder col-12 mb-3" style={{ height: "60px" }} />
                    <div className="placeholder col-6" style={{ height: "45px" }} />
                </div>
            </div>
        </div>

        <div className="mt-5">
            <div className="placeholder col-4 mb-4" style={{ height: "35px" }} />
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {[...Array(4)].map((_, index) => (
                    <div className="col" key={index}>
                        <div className="card placeholder-glow">
                            <div
                                className="card-img-top placeholder"
                                style={{ height: "200px" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ProductDetailSkeleton;