import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../features/ProductSlice";
import useAxios from "../../utils/useAxios";
import AddProduct from "./AddProduct";

const AllProducts = () => {
  const dispatch = useDispatch();
  const api = useAxios();
  const { products } = useSelector((state) => state.products);

  // State for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(e.target.files[0]);
  };
  const [name, setName] = useState(currentProduct?.name);
  const [description, setDescription] = useState(currentProduct?.description);
  const [price, setPrice] = useState(currentProduct?.price);
  const [image, setImage] = useState(currentProduct?.image);
  const [category, setCategory] = useState("");

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts(api));
  }, [dispatch, api]);

  // Function to open the edit modal with product data
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setCategory(product.category);
    setName(product.name);
    setPrice(product.price);

    setDescription(product.description);
    setPreviewImage(product.image);
    setIsModalOpen(true);
  };

  // Function to handle product update
  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    formData.append("price", price);
    formData.append("category", category);
    formData.append("id", currentProduct._id);
    if (image) {
      formData.append("image", image);
    }

    dispatch(updateProduct({ api, formData }));
    setIsModalOpen(false);
    setPreviewImage(null); // Reset the preview image
  };

  // Function to open the delete confirmation modal
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct({ api, productId: productToDelete._id }));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="pt-20 flex flex-col gap-4">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-purple-500 hover:bg-purple-700 p-5 text-white rounded-md"
      >
        Add Product
      </button>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Product */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="flex flex-col gap-4">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
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
                  <option value={category}>{category}</option>
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
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
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
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPreviewImage(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p>
              Are you sure you want to delete the product "
              {productToDelete.name}"?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProduct onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default AllProducts;
