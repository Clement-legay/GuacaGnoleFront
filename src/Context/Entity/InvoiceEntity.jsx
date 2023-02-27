import {deleteAPI, fetchAPI, fetchAPIPdf, postAPI, putAPI} from "../../Utils/axios";
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
                    res.data = res.data.length > 0 ? res.data.map(
                        (invoices) => {
                            invoices.id = invoices.invoiceFurnisherId;
                            delete invoices.InvoiceFurnisherId;
                            return invoices
                        }
                    ) : [];
                    if (store) {
                        setInvoices(res.data);
                    }
                    return res.data;
                })
        ),
        fetchInvoiceProduct: (store= false) => (
            fetchAPIPdf(`Invoice/invoiceProduct`)
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
            fetchAPIPdf(`Invoice/pdf?id=${id}`)
                .then(res => {
                    console.log(res)
                    const blob = new Blob([res.data], {type: 'application/pdf'});
                    const link = document.createElement("a");
                    console.log("hey", blob)
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "facture"
                    link.click();
                })
        ),
        postInvoice: (data) => (
            postAPI("Invoice", data, {token: token})
                .then(res => {
                    console.log("resss data: ", res.data)
                    return res.data
                })
        ),
        postInvoiceProduct: (data) => (
            postAPI("Invoice/invoiceProduct", data, {token: token})
                .then(res => res.data)
        ),
        putInvoice: (id, data) => (
            putAPI(`Invoice/${id}`, data, {token: token})
                .then(res => {
                    console.log("data du put tsé: ", data)
                    return res.data})
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