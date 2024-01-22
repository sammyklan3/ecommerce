import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home/Home";
import { Checkout } from "./pages/checkout/Checkout";
import { Cart} from "./pages/cart/Cart";
import { NoPage } from './pages/nopage/NoPage';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/signup';
import { Account } from './pages/account/Account';
import { ProductCreation } from './admin/productCreation/ProductCreation';

import './App.css'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/admin/createproduct" element={< ProductCreation />}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
  );
}

export default App
