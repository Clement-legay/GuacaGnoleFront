import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const ProductEntity = (token) => {
    const [products, setProducts] = useState([]);

    return {
        products: products,
        fetchProducts: (store = false) => (
            fetchAPI("/Product")
                .then((res) => {
                    res.data = res.data.map(
                        (product) => {
                            product.id = product.productId;
                            delete product.productId;
                            return product;
                        }
                    );
                    if (store) {
                        setProducts(res.data);
                    }
                    return res.data;
                })
        ),
        fetchProductById: (id) => (
            fetchAPI(`Product/${id}`)
                .then(res => res.data)
        ),
        fetchProductStock: (id) => (
            fetchAPI(`Product/Stock/${id}`)
                .then(res => res.data)
        ),
        postProduct: (data) => (
            postAPI("Product", data, {token: token})
                .then(res => res.data)
        ),
        putProduct: (id, data) => (
            putAPI(`Product/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteProduct: (id) => (
            deleteAPI(`Product/${id}`, {token: token})
                .then(res => res.data)
        )
    };
};