import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/landingPage/LandingPage';
import All from './Components/All/All';
import FastFood from './Components/FastFoods/FastFood';
import Desserts from './Components/Desserts/Desserts';
import Drinks from './Components/Drinks/Drinks';
import Add from './Components/Add/Add';
import AddFood from './Components/Add/AddFood';
import AddDrinks from './Components/AddDrinks/AddDrinks';
import AddDessert from './Components/AddDessert/AddDessert';
import AddFlowers from './Components/AddFlowers/AddFlowers';
import Product from './Components/Products/Product';
import EditDrinks from './Components/EditDrinks/EditDrinks';
import EditDesserts from './Components/EditDesserts/EditDesserts';
import EditFlowers from './Components/EditFlowers/EditFlowers';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/fastfoods" element={<FastFood />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/flowers" element={<All />} />
          <Route path="/add" element={<Add />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="/adddrinks" element={<AddDrinks />} />
          <Route path="/adddesserts" element={<AddDessert />} />
          <Route path="/addflowers" element={<AddFlowers />} />
          <Route path="products" element={<Product />} />
          <Route path="Edrinks" element={<EditDrinks />} />
          <Route path="editdesserts" element={<EditDesserts />} />
          <Route path="editflowers" element={<EditFlowers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
