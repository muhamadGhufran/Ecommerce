import Layout from "@/components_admin/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinners";

export default function ProductForm({
  _id,
  title: exsistingTitle,
  description: exsistingDescription,
  price: exsistingPrice,
  images: exsistingImages,
  category: assignedCategory,
  properties:assignedProperties,
}) {
  const [title, setTitle] = useState(exsistingTitle || "");
  const [images, setImages] = useState(exsistingImages || []);
  const [category, setCategory] = useState(assignedCategory || "");
  const [description, setDescription] = useState(exsistingDescription || "");
  const [price, setPrice] = useState(exsistingPrice || "");
  const [isLoading, setIsLoading] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [producutProperties, setProductProperties] = useState(assignedProperties || {})
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories_admin").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category, properties:producutProperties };
    try {
      if (_id) {
        //update
        await axios.put("/api/products_admin", { ...data, _id });
      } else {
        //create
        await axios.post("/api/products_admin", data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  if (goToProducts) {
    router.push("/products_admin");
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsLoading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload_admin", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsLoading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value){
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    })
    console.log("newProoductProps---->>>>", producutProperties)
  }

  const propertiesToFill = []
  if(categories.length > 0 && category){
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat
      console.log("catInfo ---->>>> ", catInfo)
    }
  }
  console.log(propertiesToFill)
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => 
          <option value={c._id}>{c.category}</option>
        )}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div key={p.name} className="">
          <label className="">{p.name[0].toUpperCase()+p.name.substring(1)}</label>
          <div>
            <select value={producutProperties[p.name]}
              onChange={ev =>
                setProductProp(p.name, ev.target.value)
              }
            >
              {p.values.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((Link) => (
              <div key={Link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={Link} className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isLoading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
          Add image
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
      <label>Description</label>
      <textarea
        type="text"
        placeholder="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price in USD</label>
      <input
        type="number"
        placeholder="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        save
      </button>
    </form>
  );
}
