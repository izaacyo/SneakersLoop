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

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Delete = styled.div`
position: absolute;
margin:15px;
color: crimson;
font-weight: 900;
cursor: pointer;
`

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)



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
           console.log(token)
   
           await axios.post('/api/payment', { cart, paymentID, address }, {
               headers: { Authorization: token }
           })
   
           setCart([...cart])
           addToCart(cart)
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

                                <ProductAmount>{product.quantity}</ProductAmount>

                                <button onClick={() => increment(product._id)}> <Add/> </button>     
                        </ProductAmountContainer>

                        <ProductPrice> 

                        $ {product.price * product.quantity}
                        </ProductPrice>
                    </PriceDetail>
                    <Delete onClick={() => removeProduct(product._id)}>
                                X
                                </Delete>
                    </Product>
                    
                ))}
            <Hr />
            </Info>

            <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>

            <Button>CHECKOUT NOW</Button>
            </Summary>


               
              </Bottom>
            </Wrapper>

        </Container>
    )
}

export default Cart