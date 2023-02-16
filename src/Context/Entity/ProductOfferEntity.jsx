import {fetchAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const ProductOfferEntity = () => {
    const [productOffers, setProductOffers] = useState([]);
    const { token } = useContext(MainContext);


    return {
        productOffers: productOffers,
        fetchProductOffers: (store = false) => (
            fetchAPI("/ProductOffer")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (ProductOffer) => {
                            ProductOffer.id = ProductOffer.ProductOfferId;
                            delete ProductOffer.ProductOfferId;
                            return ProductOffer
                        }
                    ) : [];
                    if (store) {
                        setProductOffers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchProductOfferById: (id) => (
            fetchAPI(`ProductOffer/${id}`)
                .then(res => res.data)
        ),
        putProductOffer: (offerId, productId) => (
            putAPI(`ProductOffer/productOffer/${offerId}/${productId}`, {token: token})
                .then(res => res.data)
        ),
    };
};