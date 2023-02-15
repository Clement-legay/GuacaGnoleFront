import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";
const API_URL = process.env.REACT_APP_DEV_API_LINK;

export const OfferEntity = () => {
    const [offers, setOffers] = useState([]);
    const [availableOffers, setAvailableOffers] = useState([]);
    const [unavailableOffers, setUnavailableOffers] = useState([]);


    return {
        offers: offers,
        unavailableOffers: unavailableOffers,
        availableOffers: availableOffers,

        fetchOffers: (store = false) => (
            fetchAPI("/Offer")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (offer) => {
                            offer.id = offer.offerId;
                            delete offer.offerId;
                            return offer
                        }
                    ) : [];
                    if (store) {
                        setOffers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchAvailableOffers: (store = false) => (
            fetchAPI("/Offer/available")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (offer) => {
                            offer.id = offer.offerId;
                            delete offer.offerId;
                            return offer
                        }
                    ) : [];
                    if (store) {
                        setAvailableOffers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchUnavailableOffers: (store = false) => (
            fetchAPI("/Offer/unavailable")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (offer) => {
                            offer.id = offer.offerId;
                            delete offer.offerId;
                            return offer
                        }
                    ) : [];
                    if (store) {
                        setUnavailableOffers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchOfferById: (id) => (
            fetchAPI(`Offer/${id}`)
                .then(res => res.data)
        ),
        postOffer: (data) => (
            postAPI("Offer", data)
                .then(res => res.data)
        ),
        postOfferImage: (data) => (
            postAPI("Offer/UploadFile", data, {file:true})
                .then(res => `${API_URL}/${res.data}`)
        ),
        putOffer: (id, data) => (
            putAPI(`Offer/${id}`, data)
                .then(res => res.data)
        ),
        deleteOffer: (id) => (
            Array.isArray(id) ? id.forEach(
                (id) => deleteAPI(`Offer/${id}`)
                    .then(res => res.data)
            ) : deleteAPI(`Offer/${id}`)
                .then(res => res.data)
        ),
        fetchAvailability: (id) => (
            fetchAPI(`Offer/CheckOfferIsAvailable/${id}`)
                .then(res => res.data)
        ),
    };
};