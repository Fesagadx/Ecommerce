import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { setIsLoading } from '../store/slices/isLoading.slice';

import Table from 'react-bootstrap/Table';

const Purchases = () => {

  const dispatch = useDispatch();
  let total =0;
  let numero =0;
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) =>{
        setPurchases(resp.data.data.purchases)})
      .catch((resp) => console.log(resp))
      .finally(() => dispatch(setIsLoading(false)))
  }, [])

  return (
    <div className="section-name-purchase">
      <section className='product-details mb-5'>
        <Link  to={"/"}> 
            <div>Home</div>
          </Link>
          <div className="product-datails-point"></div>
          <div>purchases</div>
      </section>

      <div>
        <h3 className='purchase'>My purchases</h3>
      </div>

      <Table>
        <tbody className='body'>
        {
          purchases?.map((element, index)=> {
            return(
              <tr key={index}>

                <td>
                {
                  element?.cart?.products?.map((product, i) => {
                    total += parseInt(product?.price)
                    return (
                  <div key={i} className='details-product'>
                      <div>{`${product?.title}`}</div>
                  </div> )     
                  })
                }
                </td>

                <td>
                  {element?.updatedAt.slice(0,10)}
                </td>

                <td>
                {
                  element?.cart?.products?.map((product, i) => {
                    numero = product?.productsInCart.quantity
                    return (
                  <div key={i} className='details-product'>
                      <div>{`${numero}`}</div>
                  </div> )     
                  })
                }
                </td>
              
                <td className='total-purchases'>
                  {`$ ${(total*numero).toFixed(2)}`}
                </td>
              </tr>  
            )
          })
        }
        </tbody>
      </Table>        
    </div>
  );
};
export default Purchases;