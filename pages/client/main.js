import Header from "@/components_client/Header";
import Featured from "@/components_client/Featured";
import { Product } from "@/models_client/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components_client/NewProducts";

export default function Main({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "64f70ae6dad983986af49537";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
