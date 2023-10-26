import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const addProductsValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name boş bırakılamaz"),
  unitPrice: Yup.number()
    .required("Unit Price boş bırakılamaz")
    .min(0, "0'dan büyük sayı olmalı"),
  unitsInStock: Yup.number()
    .required("Unit In Stock boş bırakılamaz")
    .min(0, "0'dan büyük sayı olmalı"),
  quantityPerUnit: Yup.string().required("Quantity Per Unit boş bırakılamaz"),
});

function AddProduct() {
  const formik = useFormik({
    initialValues: {
      name: "",
      unitPrice: "",
      unitsInStock: "",
      quantityPerUnit: "",
    },
    validationSchema: addProductsValidationSchema,
    onSubmit: (values) => {
      axios
        .post("https://northwind.vercel.app/api/products", values)
        .then((res) => {
          console.log(res.data, "Success");
        });
    },
  });
  return (
    <>
      <form>
        <div>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <p style={{ color: "red" }}>{formik.errors.name}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="">Unit Price:</label>
          <input
            type="text"
            name="unitPrice"
            onChange={formik.handleChange}
            value={formik.values.unitPrice}
          />
          {formik.errors.unitPrice ? (
            <p style={{ color: "red" }}>{formik.errors.unitPrice}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="">Stock:</label>
          <input
            type="text"
            name="unitsInStock"
            onChange={formik.handleChange}
            value={formik.values.unitsInStock}
          />
          {formik.errors.unitsInStock ? (
            <p style={{ color: "red" }}>{formik.errors.unitsInStock}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="">Quantity Per Unit:</label>
          <input
            type="text"
            name="quantityPerUnit"
            onChange={formik.handleChange}
            value={formik.values.quantityPerUnit}
          />
          {formik.errors.quantityPerUnit ? (
            <p style={{ color: "red" }}>{formik.errors.quantityPerUnit}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
