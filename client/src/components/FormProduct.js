// rafce
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from "react-router-dom";
import { remove, create, getdata } from "../functions/product";
import { Button, Typography } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './css/product.scss'

const FormProduct = () => {
  // javascript

  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }

    // console.log(formWithImageData)
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* HTML */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="fromProduct">
      <Typography component="h1" variant="h5" className="header">
          FormProduct
        </Typography><br />
        <TextField
          variant="outlined"
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          label="name"
        />{" "}
        <br />
        <TextField
          type="text"
          variant="outlined"
          name="detail"
          label="detail"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <TextField
          variant="outlined"
          type="text"
          name="price"
          label="price"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
          <input
            type="file"
            name="file"
            onChange={(e) => handleChange(e)}
            hidden
          />
        </Button>
        <br />
        <Button variant="contained" color="success" startIcon={<SendIcon />} type="submit">Submit</Button>
      </form>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">file</th>
            <th scope="col">action</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/` + item.file}
                      alt="NoImage"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td onClick={() => handleRemove(item._id)}>delete</td>
                  <td>
                    <Link to={"/edit/" + item._id}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table> */}
      <TableContainer component={Paper} sx={{ my:3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ON</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Detail</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">IMG</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.map((item, index) => (
                <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                  <TableCell align="center">{index + 1}</TableCell>
                   <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.detail}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:5000/` + item.file}
                      alt="NoImage"
                      width="50"
                      height="50"
                    />
                  </TableCell>
                  <TableCell align="center" onClick={() => handleRemove(item._id)}><DeleteIcon color="error"/></TableCell>
                  <TableCell align="center">
                    <Link to={"/edit/" + item._id}><EditIcon color="success"/></Link>
                  </TableCell>
                  </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default FormProduct;
