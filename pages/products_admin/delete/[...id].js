import Layout from "@/components_admin/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function deleteProductPage(){
    const [productInfo, setProductInfo ] = useState(null)
    const router = useRouter();
    const {id} = router.query
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products_admin?id='+id).then(response => {
            setProductInfo(response.data);
        })
    },[id])
    function goBack(){
        router.push('/admin/products');
    }

    async function delteProduct(){
        await axios.delete('/api/products_admin?id='+id)
        goBack();
    }
    return(
        <Layout>
        <h1 className="text-center">Do you really want to delete the "{productInfo?.title}" ?</h1>
        <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={delteProduct}>Yes</button>
        <button className="btn-default" onClick={goBack}>No</button>
        </div>
        </Layout>
        )
}