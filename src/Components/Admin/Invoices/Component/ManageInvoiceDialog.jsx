import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { AsynchronousAutocompleteInvoice } from "./AsynchronousAutocompleteInvoice";
import { AsynchronousAutocomplete } from "../../PagePart/AsynchronousAutocomplete";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../Context/MainContext";

const validationSchema = Yup.object().shape({});

const ManageInvoiceDialog = ({
  setRefresh,
  addRequest,
  setAddRequest,
  setEditRequest,
  item,
}) => {
  const { postInvoice, putInvoice } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    invoiceNumber: "",
    furnisherId: "",
    supplier: null,
    date: "",
    invoicesFurnisherProduct: [],
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const newItem = {
      invoiceNumber: values.invoiceNumber,
      furnisherId: values.supplier.id,
      date: values.date,
      invoicesFurnisherProductRegister: values.invoicesFurnisherProduct.map(
        (item) => {
          return {
            productId: item.productId,
            quantityProduct: item.quantityProduct,
          };
        }
      ),
    };

    try {
      if (type === "create") {
        await postInvoice(newItem);
      } else {
        await putInvoice(item.id, newItem);
      }

      setRefresh(true);
      setLoading(false);
      handleClose();
    } catch (e) {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditRequest(null);
    setAddRequest(false);
    setOpen(false);
  };

  useEffect(() => {
    if (addRequest) {
      setType("create");
      setOpen(true);
    } else if (item) {
      setType("edit");
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [addRequest, item]);

  useEffect(() => {
    if (item) {
      setInitialValues({
        invoiceNumber: item.invoiceNumber || "",
        supplier: {
            id: item.furnisherId,
        },
        date: item.date || "",
        invoicesFurnisherProduct: [
          ...item.invoicesFurnisherProduct.map((item) => ({
            product: item.product,
            productId: item.productId,
            quantityProduct: item.quantityProduct,
          })),
        ],
      });
    } else {
      setInitialValues({
        invoiceNumber: "",
        furnisherId: null,
        supplier: null,
        date: "",
        invoicesFurnisherProduct: [],
      });
    }
  }, [item]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {type === "create" ? "Create Invoice" : "Edit Invoice"}
      </DialogTitle>

      <DialogContent>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                p={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="invoiceNumber"
                    name="invoiceNumber"
                    label="invoiceNumber"
                    value={values.invoiceNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="date"
                    name="date"
                    label="Date"
                    type="date"
                    value={values.deadline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.deadline && Boolean(errors.deadline)}
                    helperText={touched.deadline && errors.deadline}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <AsynchronousAutocomplete
                    value={values.supplier}
                    setValue={setFieldValue}
                    name="supplier"
                    fetchString={"fetchSuppliers"}
                    fetchStringById={"fetchSupplierById"}
                    inputLabel={"Supplier"}
                    optionLabel={"name"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AsynchronousAutocompleteInvoice
                    props={{
                      multiple: true,
                      label: "invoicesFurnisherProduct",
                      name: "invoicesFurnisherProduct",
                      value: values.invoicesFurnisherProduct,

                      onChange: (e, value) => {
                        if (e === "delete") {
                          setFieldValue("invoicesFurnisherProduct", value);
                        } else {
                          const newValue = value.pop();
                          setFieldValue("invoicesFurnisherProduct", [
                            ...values.invoicesFurnisherProduct,
                            {
                              product: newValue,
                              productId: newValue.id,
                              quantityProduct: 1,
                            },
                          ]);
                        }
                      },
                    }}
                    fetchString={"fetchProducts"}
                    onChangeQuantity={(e, item) => {
                      if (e === "add") {
                        item.quantityProduct++;
                      } else {
                        item.quantityProduct--;
                      }

                      setFieldValue(
                        "invoicesFurnisherProduct",
                        values.invoicesFurnisherProduct
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    Validate
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInvoiceDialog;
