import { useRef } from "react";
import TopMenuNav from "./OnlineOrderingTopMenuNav";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const OnlineOrderingReceipt = () => {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    const element = receiptRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "receipt.png";
      link.click();
    }
  };

  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("receipt.pdf");
    }
  };

  return (
    <div className="  ">
      <TopMenuNav exploreMenuText="Receipt" />

      <div className=" py-[28px] mx-[16px]" ref={receiptRef}>
        <div className=" mb-[20px]">
          <p className=" text-[18px] font-[500] text-[#121212] text-center">
            Order - CR201
          </p>

          <p className=" text-[#121212] text-[14px] font-[400] text-center">
            08:02:27 Wednesday, 30 Apr 2020
          </p>
        </div>

        <div className=" border-b border-[#929292]">
          <div className="">
            <div className=" space-y-[8px] pb-[24px]">
              <div className="font-[400] text-[16px] text-[#121212] flex items-center justify-between">
                <p className=" ">1x Refuel Max - Jollof Rice</p>
                <p>₦1,500</p>
              </div>

              <div className="">
                <div className=" ">
                  <p className=" font-[500] text-[10px] text-[#606060]">
                    MODIFIERS
                  </p>
                  <div className=" space-y-[8px]">
                    <div className="flex items-center justify-between text-[16px] font-[400] text-[#606060]">
                      <p className=" ">Extra Sauce</p>

                      <p>₦500</p>
                    </div>
                    <div className="flex items-center justify-between text-[16px] font-[400] text-[#606060]">
                      <p className=" ">Shrimps</p>

                      <p>₦500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" w-[64px] text-[#929292]" />
          </div>

          <div className="">
            <div className=" space-y-[8px] pb-[24px]">
              <div className="font-[400] text-[16px] text-[#121212] flex items-center justify-between">
                <p className=" ">1x Refuel Max - Jollof Rice</p>
                <p>₦1,500</p>
              </div>

              <div className="">
                <div className=" ">
                  <p className=" font-[500] text-[10px] text-[#606060]">
                    MODIFIERS
                  </p>
                  <div className=" space-y-[8px]">
                    <div className="flex items-center justify-between text-[16px] font-[400] text-[#606060]">
                      <p className=" ">Extra Sauce</p>

                      <p>₦500</p>
                    </div>
                    <div className="flex items-center justify-between text-[16px] font-[400] text-[#606060]">
                      <p className=" ">Shrimps</p>

                      <p>₦500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" w-[64px] text-[#929292]" />
          </div>
        </div>

        <div className=" mt-[8px] space-y-[8px]">
          <div className="font-[400] text-[16px] text-[#121212] flex items-center justify-between">
            <p className=" ">Sub-Total</p>
            <p>₦6,000</p>
          </div>

          <div className="font-[400] text-[16px] text-[#121212] flex items-center justify-between">
            <p className=" ">VAT</p>
            <p>₦0</p>
          </div>

          <div className="font-[500] text-[18px] text-[#121212] flex items-center justify-between">
            <p className=" ">Balance Due</p>
            <p>₦6,000</p>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center mt-[50px] hidden">
        <div className=" flex items-center justify-center mt-[50px] space-x-4">
          <p
            className="bg-[#606060] rounded-[5px] py-[10px] px-[64px] text-center cursor-pointer inline text-[16px] font-[500] text-[#ffffff]"
            onClick={handleDownloadImage}
          >
            Download Image
          </p>
          <p
            className="bg-[#606060] rounded-[5px] py-[10px] px-[64px] text-center cursor-pointer inline text-[16px] font-[500] text-[#ffffff]"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </p>
        </div>
      </div>
    </div>
  );
};
