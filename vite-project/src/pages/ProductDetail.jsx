import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ProductDetail({cartItems , setCartItems})
{
    const [product , setProduct] = useState(null);
    const {id}  = useParams();
    const [qty , setQty] = useState(1);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/product/`+id)
        .then(res => res.json())
        .then(data => {
            setProduct(data.product); 
        })
        .catch(err => console.log("Error fetching data:", err));
    }, [id]);
    function inc(){
        if(product.stock == qty)
            return;
        else
            setQty((qty) => qty+1);
    }
    function dec(){
        if(qty>1)
            setQty((qty) => qty-1);
    }
    if (!product) {
        return <div>Loading...</div>; 
    }
    function addCart(){
        const exist = cartItems.find((item) => item.product._id == product._id)
        if (!exist)
            {
            const newItem = {product , qty};
            setCartItems((state) => [...state , newItem])
            }
    }
    return (<>
    <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="500" width="500" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">{product._id}</p>

                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style ={{width : `${product.ratings/5 * 100}%`}}></div>
                </div>
           

                <hr />

                <p id="product_price">{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick = {dec}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick = {inc}>+</span>
                </div>
                 <button type="button" id="cart_btn" onClick = {addCart} disabled = {product.stock == 0} className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />
                <p>Status: <span id="stock_status">{product.stock ? "In Stock" : "Out Of Stock"}</span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
                <div className="rating w-50"></div>
						
            </div>

        </div>

    </div></>);
}