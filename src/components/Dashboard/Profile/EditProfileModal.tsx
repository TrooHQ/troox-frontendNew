import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../slices/UserSlice";
import { AppDispatch } from "../../../store/store";

interface EditProfileModalProps {
  userDetails: {
    first_name: string;
    last_name: string;
    personal_email: string;
    phone_number: string;
    country: string;
    state: string;
    city: string;
    business_email: string;
    business_address: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ userDetails, isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Local state for form fields
  const [formData, setFormData] = useState({
    first_name: userDetails.first_name || "",
    last_name: userDetails.last_name || "",
    personal_email: userDetails.personal_email || "",
    phone_number: userDetails.phone_number || "",
    country: userDetails.country || "",
    state: userDetails.state || "",
    city: userDetails.city || "",
    business_email: userDetails.business_email || "",
    business_address: userDetails.business_address || "",
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated details
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUserDetails(formData)); // Dispatch Redux action to update user details
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-[80%] md:w-[94%]">
        <h2 className="text-lg font-semibold mb-4">Edit Profile Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                name="personal_email"
                value={formData.personal_email}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Business Email</label>
              <input
                type="email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-sm">Business Address</label>
              <input
                type="text"
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple500 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
