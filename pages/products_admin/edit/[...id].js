import Layout from "@/components_admin/Layout";
import ProductForm from "@/components_admin/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";  
import { useEffect, useState } from "react";

export default function editProduct(){
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter();
    const {id} = router.query;
    console.log("Id-->>", id)
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products_admin?id='+id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}   
        </Layout>
    )
}