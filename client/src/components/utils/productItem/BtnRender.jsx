import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { SearchOutlined, ShoppingCartOutlined, DeleteOutline, EditOutlined} from '@material-ui/icons';
import styled from "styled-components";


const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;
z-index:555;
&:hover {
  background-color: #e9f5f5;
  transform: scale(1.1);
}`


function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart


    return (
        <>
            {
                isAdmin ?
                    <>
                    <Icon> 
                        <Link to="#!"
                            onClick={() => deleteProduct(product._id, product.images.public_id)}>
                                <DeleteOutline/>
                        </Link>
                        </Icon>

                        <Icon> 
                        <Link to={`/edit_product/${product._id}`}>
                            <EditOutlined/>
                        </Link>
                        </Icon>
                    </>
                    : <>
                        <Icon>
                            <Link to="#!" onClick={() => addCart(product)}>
                                <ShoppingCartOutlined />
                            </Link>
                        </Icon>
                        <Icon>
                            <Link to={`/detail/${product._id}`}>
                                <SearchOutlined />
                            </Link>
                        </Icon>

                    </>
            }

        </>
    )
}

export default BtnRender