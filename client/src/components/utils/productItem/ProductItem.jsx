import React from 'react'
import BtnRender from './BtnRender'
import styled from "styled-components"

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 2;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;`

const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
height: 350px;
display: inline-block;
align-items: center;
justify-content: center;
background-color: white;
position: relative;
&:hover ${Info}{
    opacity: 1;
  }
`
const Circle = styled.div`
  width: 200px;
  height: 200px;
  background-color:#55aceeb8;
  border-radius: 50%;
  position: absolute;
  &:hover ${Info}{
    opacity: 1;
  }
  `

  const Image = styled.img`
    height: 85%;
    z-index: 2;
    `

  const Title = styled.h2`
  display:block;
  font-size: 15px;
  text-transform: uppercase
    `
  


function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {


    return (

        <Container>
           {
                    isAdmin && <input type="checkbox" checked={product.checked}
                        onChange={() => handleCheck(product._id)} />
                }
            <Image src={product.images.url} alt="" />
            <Title title={product.title}>{product.title}</Title>
            <Info>
    
                <Circle />
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </Info>
        </Container>
    )
}

export default ProductItem