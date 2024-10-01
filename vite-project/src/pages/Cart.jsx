import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
const [complete , setComplete] = useState(false);
function inc(items)
{
  if(items.qty == items.product.stock){
    return;
  }
  else{
  const updated = cartItems.map((i) => {
    if(i.product._id == items.product._id)
      i.qty++;
    return i;
  })
  setCartItems(updated);
}

}
function dec(items)
{
    if(items.qty > 1){
      
        const updated = cartItems.map((i) => {
          if(i.product._id == items.product._id)
            i.qty--;
          return i;
        })
        setCartItems(updated);
      
    }
    else
      return;
  
}
function deleteItem(items)
{
  const updated = cartItems.filter((i) => {
    if(i.product._id !== items.product._id)
        return true;
  })
  setCartItems(updated);
}
function placeOrder() {
  fetch(`${import.meta.env.VITE_API_URL}/order`, {
    method: 'POST',
    headers: {  // Fix: change 'header' to 'headers'
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  })
  .then((response) => {
    if (response.ok) {
      setCartItems([]);
      setComplete(true);
    } else {
      console.error('Failed to place order');
    }
  })
  .catch((error) => {
    console.error('Error placing order:', error);
  });
}

   return ( cartItems.length > 0 ?
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((items) => (
              <div key={items.product._id}>
                <hr />
                <div className="cart-item"> 
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img src={items.product.images[0].image} alt={items.product.name} height="90" width="115" />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"/product/" + items.product._id}>{items.product.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">{items.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        {/* Properly wrapping the onClick handlers */}
                        <span className="btn btn-danger minus" onClick = {() => dec(items)}>-</span>
                        <input type="number" className="form-control count d-inline" value={items.qty} readOnly />
                        <span className="btn btn-primary plus" onClick = {() => inc(items)}>+</span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick = {() => deleteItem(items)}></i>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc , item) => (acc+item.qty) ,0)}(Units)</span></p>
              <p>Est. total: <span className="order-summary-values">{cartItems.reduce((acc , item) => (acc+item.product.price*item.qty) , 0)}</span></p>

              <hr />
              <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div> 
    </> : 
   (!complete ? <h2> Your cart is empty</h2>:
  <><h2> Your order Complete</h2>
<p>your order has been placed succesfully</p></>)
);
}
