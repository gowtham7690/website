
import Home from './pages/home.jsx'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/footer.jsx'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail.jsx'
import { useState } from 'react'
import Cart from './pages/Cart.jsx'
function App() {

  const [cartItems , setCartItems] = useState([]);
  return (
    <>
    <div className = 'App'>
    <Router>
      <div>
      <Header cartItems ={cartItems} /> 
      <Routes>
        <Route path ='/' element ={<Home />} />
        <Route path ='/search' element ={<Home />} />
        <Route path ='/Product/:id' element ={<ProductDetail cartItems = {cartItems} setCartItems = {setCartItems}/>} />
        <Route path ='/cart' element ={<Cart cartItems = {cartItems} setCartItems = {setCartItems}/>} />
      </Routes>
        <Footer />
      </div>
    </Router>
    </div>
    </>
  )
}

export default App
