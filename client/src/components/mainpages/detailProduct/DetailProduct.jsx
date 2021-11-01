import React, { useContext, useState, useEffect } from 'react'
import styled from "styled-components";
import { useParams} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../../utils/productItem/ProductItem'
import {mobile} from '../../../responsive'


const Container = styled.div`
margin-top:15rem`;


const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
max-width: 400px;
width: 100%;
margin: 20px;
height: 350px;
object-fit: cover;
display: block;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 35px;
  text-transform: uppercase
`;

const Id = styled.h5`
  font-weight: 200;
  color: darkblue;
  letter-spacing: 2px;
}
`;

const Desc = styled.p`
  margin: 30px;
  
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  margin-left:5rem
  
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;

`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-top: 3rem

`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  margin-top: 3rem

`;

const FilterSizeOption = styled.option`
`;



const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;




function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const [size, setSize] = useState("");


    useEffect(() => {
        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return null;


    return (
        <Container>
            <Wrapper>
                <ImgContainer>
                    <Image src={detailProduct.images.url} alt="" />
                </ImgContainer>

                <InfoContainer>
                    <div className="row">
                        <Title>{detailProduct.title}</Title>
                        <Id>#id: {detailProduct.product_id}</Id>
                    </div>
                    <Desc>{detailProduct.description}</Desc>
                    <FilterContainer>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e) => setSize(e.target.value)}>
                            {detailProduct.size?.map((s) => (
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                    </FilterContainer>
                <Button 
                        onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Button>
                    </InfoContainer>
                    <Price>$ {detailProduct.price}</Price>

            </Wrapper>

            <Wrapper>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </Wrapper>
        </Container>
    )
}

export default DetailProduct