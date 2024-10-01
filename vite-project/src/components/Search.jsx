import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function  Search(){
    const [value , setValue] = useState("");
    const navigate = useNavigate();
    const searchHandler = () =>
    {
        navigate('/search?keyword='+value);
    }
    return (<>
        <div className="input-group">
        <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..." 
        onChange ={e => setValue(e.target.value)}
        onBlur={searchHandler}
        />
        <div className="input-group-append">
        <button onClick = {searchHandler} id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        </div>
    </div>
    </>);
}