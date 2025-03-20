"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
        setProfileImage(data.profile_image);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
      profile_image: profileImage,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Update Profile</h2>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="first_name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="last_name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone_number"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
