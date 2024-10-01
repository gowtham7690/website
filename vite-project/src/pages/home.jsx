import ProductCard from '../components/ProductCard.jsx';
import {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
export default function Home() {
    const [card, setCard] = useState([]);
       const [searchParams , setSearchPaarams] = useSearchParams(); 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products?` +searchParams)
        .then(res => res.json())
        .then(data => {
            setCard(data.products); 
        })
        .catch(err => console.log("Error fetching data:", err));
    }, [searchParams ]);
    return (
        <>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {card.map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            </section>
        </>
    );
}
