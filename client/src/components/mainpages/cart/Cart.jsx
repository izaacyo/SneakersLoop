import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../../responsive";

import PaypalButton from './PaypalButton'


const Container = styled.div``;

const Wrapper = styled.div`
  margin:10rem;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Bottom = styled.div`
margin-top:5rem;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
text-transform: uppercase`;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;


const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [stripeToken, setStripeToken] = useState(null);


    const onToken = (token) => {
        setStripeToken(token);
      };
    

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

       const tranSuccess = async (payment) => {
           const { paymentID, address } = payment;
   
           await axios.post('/api/payment', { cart, paymentID, address }, {
               headers: { Authorization: token }
           })
   
           setCart([])
           addToCart([])
           alert("You have successfully placed an order.")
       }


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    return (

            <Container>
                <Wrapper>
                    <Top>
                    </Top>
                    <Bottom>
                        <Info>
                        <Title>YOUR BAG</Title>

            {
                cart.map(product => (
                <Product key={product._id}>
                    <ProductDetail>
                        <Image src={product.images.url} alt="" />

                        <Details>
                            <ProductName>
                            <b>Product: </b>{product.title}
                            </ProductName>

                            <ProductId>
                             <b>ID:</b> {product._id}
                             </ProductId>

                             <ProductSize>
                            <b>Size:</b> {product.size}
                            </ProductSize>
                            <p>{product.description}</p>
                        </Details>
                    </ProductDetail>

                    <PriceDetail>
                        <ProductAmountContainer>
                            
                        <button onClick={() => decrement(product._id)}> <Remove/> </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> <Add/> </button>     
                        </ProductAmountContainer>

                        <ProductPrice> 

                        $ {product.price * product.quantity}
                        </ProductPrice>

                    </PriceDetail>


                            <div className="delete"
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                    </Product>
                ))}
            <Hr />


            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </div>

                </Info>
              </Bottom>
            </Wrapper>

        </Container>
    )
}

export default Cart