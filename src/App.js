import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import './App.css';
import Home from './component/Home';
import Products from './component/Products';
import Detail from './component/Detail';
import Cart from './component/Cart';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/products/:id" element={ <Detail/> } />
        <Route path="/cart" element={ <Cart/> } />
      </Routes>
    </Router>  
    </>
  );
}

export default App;
