"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EditMenuItemPage = ({ params }) => {
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageFile, seImageFile] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const menuItemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menu-item/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!menuItemResponse.ok) {
        throw new Error("Failed to fetch menu item");
      }

      const menuItemData = await menuItemResponse.json();
      setName(menuItemData.name);
      setDescription(menuItemData.description);
      setPrice(menuItemData.price);
      setCurrentImage(menuItemData.image);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menu-update/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update menu item");
      }

      setSuccess(true);
      setSubmitting(false);

      router.push("/dashboard/menu-items");
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      seImageFile(e.target.files[0]);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/dashboard/menu-items"
          className="flex items-center text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Menu
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Menu Item</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-500 p-4 rounded-md mb-6">
            Menu item updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block mb-2 text-gray-700">
              Image
            </label>
            {currentImage && (
              <div className="mb-3">
                <div className="w-32 h-32 relative bg-gray-100 rounded">
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${currentImage}`}
                    alt={name}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </div>
            )}
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/menu"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Updating..." : "Update Menu Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItemPage;
