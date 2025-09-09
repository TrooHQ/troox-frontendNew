// import React from 'react'

import { toast } from "react-toastify";

// export default function QRCodeDownload() {
//   return (
//     <div>QRCodeDownload</div>
//   )
// }

export const handleDownloadQRCode = async (qrcodeUrl: string, groupName: string) => {
  if (!qrcodeUrl) {
    toast.error("QR code URL is not available.");
    return;
  }

  try {
    const response = await fetch(qrcodeUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${groupName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // cleanup
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading QR code:", error);
    toast.error("Failed to download QR code.");
  }
};
