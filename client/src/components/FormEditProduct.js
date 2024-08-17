import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { read, update } from "../functions/product";
import { Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./css/product.scss";

const FormEditProduct = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
  });
  const [fileole, setfileold] = useState();

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data[0]);
      setfileold(res.data[0].file);
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(fileole);
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("fileold", fileole);
    update(param.id, formWithImageData)
      .then((res) => {
        console.log(res);
        navigate("/admin/viewtable");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="fromProduct"
      >
        <Typography component="h1" variant="h5" className="header">
          FormEditProduct
        </Typography>
        <br />
        <TextField
          variant="outlined"
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          label="name"
          value={data.name}
        />{" "}
        <br />
        <TextField
          variant="outlined"
          type="text"
          name="detail"
          label="detail"
          onChange={(e) => handleChange(e)}
          value={data.detail}
        />
        <br />
        <TextField
          variant="outlined"
          type="text"
          name="price"
          label="price"
          onChange={(e) => handleChange(e)}
          value={data.price}
        />
        <br />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          UPLOAD FILE
        <input type="file" name="file" onChange={(e) => handleChange(e)} hidden/>
        </Button>
        <br />
        <Button
          variant="contained"
          color="success"
          startIcon={<SendIcon />}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormEditProduct;
