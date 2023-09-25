import Header from "@/components_client/Header";
import styled from "styled-components";
import Center from "@/components_client/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models_client/Product";
import ProductsGrid from "@/components_client/ProductsGrid";
import Title from "@/components_client/Title";
import { CartContext } from "@/components_client/CartContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function ProductsPage({products}) {
  const {cartProducts} = useContext(CartContext);
  useEffect(() => {
    // Update the cart count whenever cartProducts change
    console.log("Cart products:", cartProducts.length);
  }, [cartProducts]);
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}