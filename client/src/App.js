import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//layout
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";

import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';

function App() {
  // javascript

  return (
    <BrowserRouter>
      <>
      <CssBaseline />
      <div className="app">
        <SideBar/>
        <main className="content">
          <HeaderBar/>
          <div className="content_body">
            <Box m="20px">

        <Routes>
          <Route path='/admin/viewtable' element={<FormProduct />} />
          <Route path='/edit/:id' element={<FormEditProduct />} />
        </Routes>
        
        </Box>
          </div>
        </main>
      </div>
    </>
    </BrowserRouter>
  );
}

export default App;
