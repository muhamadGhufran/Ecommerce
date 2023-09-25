import Layout from "@/components_admin/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [category, setCategory] = useState(''); //name, setname
  const [parentCategory, setParentCategory] = useState("");
  const [getCategories, setGetCategories] = useState([]); // categories, setcategories
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories_admin").then((result) => {
      setGetCategories(result.data);
    }); 
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      category,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories_admin", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories_admin", data);
    }
    setParentCategory("");
    setCategory("");
    setProperties([]);
    fetchCategories();
  }

  function editCategory(getCategories) {
    setEditedCategory(getCategories);
    setCategory(getCategories.category);
    setParentCategory(getCategories.parent?._id);
    setProperties(
      getCategories.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function deleCategory(getCategories) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${getCategories.category}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = getCategories;
          await axios.delete("/api/categories_admin?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index,property,newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  
  function removeProperty(indezToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indezToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit categories ${editedCategory.category}`
          : "New category name"}
      </label>
      <form onSubmit={saveCategory} className="">
        <div className="flex gap-1">
          <input
            className="mb-0"
            type="text"
            placeholder="Category name"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <select
            className="mb-0"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option>No parent category</option>
            {getCategories.length > 0 &&
              getCategories.map((getCategories) => (
                <option key={getCategories._id} value={getCategories._id}>
                  {getCategories.category}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.name} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                  placeholder="values, comma seprated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategory("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default mb-2"
            >
              Cancel
            </button>
          )}
        </div>
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {getCategories.length > 0 &&
            getCategories.map((getCategories) => (
              <tr key={getCategories._id}>
                <td>{getCategories.category}</td>
                <td>{getCategories?.parent?.category}</td>
                <td>
                  <button
                    onClick={() => editCategory(getCategories)}
                    className="btn-default mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleCategory(getCategories)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}


// export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
export default withSwal(({swal}, ref) => (
  <Categories swal={swal} />
));
