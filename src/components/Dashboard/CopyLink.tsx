// src/components/CopyLink.tsx
import React, { useState } from "react";

interface CopyLinkProps {
  linkType: "self-checkout" | "online-ordering"; // Link type, either "self-checkout" or "online-ordering"
  businessId: string; // Business identifier
  outletId: string; // Outlet identifier
}

const CopyLink: React.FC<CopyLinkProps> = ({ linkType, businessId, outletId }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to construct the URL based on the link type
  const attachBusinessIdToHost = (businessId: string, branchId: string, linkType: string) => {
    const currentHost = window.location.origin;
    const path = linkType === "self-checkout" ? "selfcheckout" : "online_ordering";
    return `${currentHost}/demo/${path}/${businessId}/${branchId}`;
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1500); // Reset "Copied!" message after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Handle button click to generate the link and copy to clipboard
  const handleClick = () => {
    const urlToCopy = attachBusinessIdToHost(businessId, outletId, linkType);
    copyToClipboard(urlToCopy);
  };

  return (
    <p
      className={`px-4 py-2 rounded-lg text-white mb-3 cursor-pointer ${
        copySuccess ? "bg-green-500 hover:bg-green-600" : "bg-purple500 hover:bg-purple-900"
      } focus:outline-none transition-colors duration-300`}
      onClick={handleClick}
    >
      {copySuccess
        ? "Copied!"
        : `Get ${linkType === "self-checkout" ? "Self-Checkout" : "Online-Ordering"} link`}
    </p>
  );
};

export default CopyLink;
