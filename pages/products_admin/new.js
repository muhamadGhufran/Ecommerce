import Layout from "@/components_admin/Layout";
import ProductForm from "@/components_admin/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function newProduct() {
  return(
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  )
}
