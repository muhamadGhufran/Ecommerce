import Link from "next/link";
import styled from "styled-components";
import Center from "@/components_client/Center";
import {useContext, useEffect, useState} from "react";
import BarsIcon from "@/components_client/icons/Bars";
import { CartContext } from "@/components_client/CartContext";
import {signOut} from 'next-auth/react'
import { useRouter } from "next/router";
import Button from "./Button";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed; 
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const router = useRouter();
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const logout = async () => {
    try {
      await signOut();
      window.location.replace('/client/signin');  // Redirect to the login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    // Update the cart count whenever cartProducts change
    console.log("Cart products Header:", cartProducts.length);
  }, [cartProducts]);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/client/main'}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/client/main'}>Home</NavLink>
            <NavLink href={'/client/products'}>All products</NavLink>
            {/* <NavLink href={'/categories'}>Categories</NavLink> */}
            {/* <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink href={'/client/cart'}>Cart ({cartProducts.length})</NavLink>
            <button onClick={logout} className="logoutButton">Logout</button>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}