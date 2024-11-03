import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/ProductSlice";
import useAxios from "../../utils/useAxios";

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const api = useAxios();

  // State for the product fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  // Function to handle product creation
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    setLoading(true);
    await dispatch(addProduct({ api, formData }));
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <div className="flex flex-col gap-4">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </label>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Shirts">Shirts</option>
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </label>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="w-1/5" />
          )}
          <label>
            Image:
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          {loading ? (
            <button
              disabled
              onClick={handleAddProduct}
              className="bg-green-300 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Product
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
