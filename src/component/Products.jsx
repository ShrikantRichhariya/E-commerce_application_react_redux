import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let response
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  //fetching Api with async await
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      response = await fetch("https://fakestoreapi.com/products/category/women's clothing");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
        console.log(data);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const [checked_lowert_25, setchecked_lowert_25] = useState(true);
  const [checked_greatert_25, setchecked_greatert_25] = useState(true);
  
  //FILTER
  //handle change event for less than 25 check box
  const handleChange_lowert_25 = () => {

    if (checked_lowert_25 === true) {
      const product_to_show = data.filter((currElem) => {
        return parseInt(currElem.price) <= 25
      })
      setFilter(product_to_show)
    }
    if (checked_lowert_25 === false) {
      setFilter(data)
    }
    setchecked_lowert_25(!checked_lowert_25);

  };

  // handle change event for greater than 25 check box  
  const handleChange_greatert_25 = () => {

    if (checked_greatert_25 === true) {
      const product_to_show = data.filter((currElem) => {
        return parseInt(currElem.price) > 25
      })
      setFilter(product_to_show)
    }
    if (checked_greatert_25 === false) {
      setFilter(data)
    }
    setchecked_greatert_25(!checked_greatert_25);

  };

  const disabledgtFunction = () => {
    if (checked_lowert_25 === false) {
      return true;
    }
  }

  const disabledltFunction = () => {
    if (checked_greatert_25 === false) {
      return true;
    }
  }
  //toast message view
  const diffTost=()=>{
    toast.success("SALE is live HURRY UP!!! buy now")
    toast.success("Hurrey!! Get 10% extra off on HDFC debit/credit card")
  }
  //skeleton div for loading in products page
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };



  const ShowProducts = () => {
    return (
      //filter checkboxes
      <>
      <h5 id="top">Sort By:</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled={disabledltFunction()} onChange={handleChange_lowert_25} />
          <label className="form-check-label" for="flexCheckDefault">
            <b>Price Below $25</b>
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" disabled={disabledgtFunction()} onChange={handleChange_greatert_25} />
          <label className="form-check-label" for="flexCheckChecked">
            <b>Price Above $25</b>
          </label>
        </div>

        {filter.map((product) => {
          return (
            <>

              <div id="you" className="card  my-5 py-4" key={product.id} style={{ width: "18rem" }}>
                <img src={product.image} onClick={diffTost} className="card-img-top" alt={product.title} />
                <div id="desc" className="card-body text-center">
                  <h5 className="card-title"><b>{product.title.substring(0, 62)}</b></h5>
                  <p className="lead">$ {product.price}
                  </p>
                  <NavLink to={`/products/${product.id}`} className="btn btn-outline-primary" id="btn1">
                    Buy Now
                  </NavLink>
                </div>
              </div>
              
            </>
          );
        })}
      {/* {/ toast container properties  /} */}
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row">

        </div>
        <div className="container">
          <div className="row justify-content-around">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
