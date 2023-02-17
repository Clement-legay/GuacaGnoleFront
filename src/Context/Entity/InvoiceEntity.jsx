import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const InvoiceEntity = (token) => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceProducts, setInvoiceProducts] = useState([]);

    return {
        invoices: invoices,
        invoiceProducts: invoiceProducts,
        fetchInvoices: (store = false) => (
            fetchAPI("/Invoice")
                .then((res) => {
                    // res.data = res.data.length > 0 ? res.data.map(
                    //     (item) => {
                    //         item.id = item.InvoiceId;
                    //         delete item.InvoiceId;
                    //         return item
                    //     }
                    // ) : [];
                    if (store) {
                        setInvoices(res.data);
                    }
                    return res.data;
                })
        ),
        fetchInvoiceProduct: (store= false) => (
            fetchAPI(`Invoice/invoiceProduct`)
                .then((res) => {
                    // res.data = res.data.length > 0 ? res.data.map(
                    //     (item) => {
                    //         item.id = item.InvoiceId;
                    //         delete item.InvoiceId;
                    //         return item
                    //     }
                    // ) : [];
                    if (store) {
                        setInvoiceProducts(res.data);
                    }
                    return res.data;
                })
        ),
        fetchInvoiceById: (id) => (
            fetchAPI(`Invoice/${id}`)
                .then(res => res.data)
        ),
        fetchInvoicePdf: (id) => (
            fetchAPI(`Invoice/pdf?id=${id}`)
                .then(res => res.data)
        ),
        postInvoice: (data) => (
            postAPI("Invoice", data, {token: token})
                .then(res => res.data)
        ),
        postInvoiceProduct: (data) => (
            postAPI("Invoice/invoiceProduct", data, {token: token})
                .then(res => res.data)
        ),
        putInvoice: (id, data) => (
            putAPI(`Invoice/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        putInvoiceProduct: (id, data) => (
            putAPI(`Invoice/invoiceProduct/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteInvoice: (invoiceFurnisherId, productId) => (
            deleteAPI(`Invoice/${invoiceFurnisherId}/${productId}`, {token: token})
                .then(res => res.data)
        ),
    };
};