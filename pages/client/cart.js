import Header from "@/components_client/Header";
import styled from "styled-components";
import Center from "@/components_client/Center";
import Button from "@/components_client/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components_client/CartContext";
import axios from "axios";
import Table from "@/components_client/Table";
import Input from "@/components_client/Input";
import toast from "react-hot-toast";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const H2 = styled.h2`
  width: full;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 20px;
`

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;




export default function CartPage() {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  useEffect(() => {
    // Update the cart count whenever cartProducts change
    console.log("Cart products cart_Client:", cartProducts.length);
  }, [cartProducts]);
  const [products,setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  console.log("cartProducts--->>>>",cartProducts)
  console.log("addProducts--->>>>",addProduct)
  console.log("removeProducts--->>>>",removeProduct)
  console.log("clearCart--->>>>",clearCart);

  console.log('products: ', products);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart_client', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    if(name.length < 3){
      toast.error("Full name should be atleast 3 characters long");
    }else{
    const response = await axios.post('/api/checkout_client', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <H2>
            Cart
            </H2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}
                          >
                          -
                          </Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total :</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                     placeholder="Name"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} />
              <Input type="text"
                     placeholder="Email"
                     value={email}
                     name="email"
                     onChange={ev => setEmail(ev.target.value)}/>
              <CityHolder>
                <Input type="text"
                       placeholder="City"
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}/>
                <Input type="text"
                       placeholder="Postal Code"
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type="text"
                     placeholder="Street Address"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input type="text"
                     placeholder="Country"
                     value={country}
                     name="country"
                     onChange={ev => setCountry(ev.target.value)}/>
              <Button black block
                      onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}