import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";
type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  NameOfCompany: string;
  howDidYouFindUs: string;
  NoOfEstablishment: string;
};

const DemoPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const payload = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Phone: data.phone,
        Email: data.email,
        NameOfCompany: data.NameOfCompany,
        City: data.city,
        HowDidYouFindUs: data.howDidYouFindUs,
        NumberOfEstablishments: data.NoOfEstablishment,
      };
      const response = await axios.post(
        "https://sheet.best/api/sheets/d539e015-10e3-4403-b38f-590a8d055aec",
        payload
      );

      console.log("Form submitted successfully:", response.data);
      toast.success("Form Submitted Succesfully");

      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" relative">
      <Navbar />
      <div className="">
        <img
          src={Circle}
          alt=""
          className="hidden md:block absolute top-0 left-0 w-[1132px] -z-50"
        />
      </div>

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] py-[62px] mb-[100px]">
        <div className=" grid gap-[10px] md:flex items-center justify-between  ">
          <div className=" max-w-[491px] text-start grid gap-[32px]">
            <p className=" text-[44px] font-[500] leading-[66px]">
              A single smart platform that supports all your technoloy needs
            </p>
            <div className="">
              <p className=" text-[16px] font-[500]">
                Benefits of the demo include:
              </p>
              <div className=" text-[16px] font-[400] text-[#000000] leading-[24px]">
                <ul className=" list-disc px-[20px] ">
                  <li> A call to fully understand your business.</li>
                  <li>A personalized demonstration of our product.</li>
                  <li>
                    Information on how to help you earn more and work better.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className=" max-w-[652px]">
            <div className="">
              {" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" grid gap-[24px] items-center">
                  <div className=" flex items-center gap-[24px] justify-between">
                    <div className="">
                      {" "}
                      <input
                        type="text"
                        placeholder=" First name"
                        {...register("firstName", { required: true })}
                        className=" border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text[16px] font-[400]"
                      />
                    </div>
                    <div className="">
                      {" "}
                      <input
                        type="text"
                        placeholder=" Last name"
                        {...register("lastName", { required: true })}
                        className=" border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text[16px] font-[400]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-[24px]">
                    <div className="w-[150px]">
                      <input
                        type="text"
                        placeholder="Nigeria"
                        readOnly
                        className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="+234"
                        {...register("phone", { required: true })}
                        className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
                      />
                    </div>
                  </div>

                  <div className="">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                      className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
                    />
                  </div>

                  <div className="">
                    <input
                      type="text"
                      placeholder="Name of Company"
                      {...register("NameOfCompany", { required: true })}
                      className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
                    />
                  </div>
                  <div className=" flex items-center gap-[24px] justify-between">
                    <div className="">
                      {" "}
                      <input
                        type="text"
                        placeholder=" City"
                        {...register("city", { required: true })}
                        className=" border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text[16px] font-[400]"
                      />
                    </div>
                    <div className="">
                      {" "}
                      <input
                        type="text"
                        placeholder=" How did you find us?"
                        {...register("howDidYouFindUs", { required: true })}
                        className=" border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text[16px] font-[400]"
                      />
                    </div>
                  </div>
                  <div className="">
                    <input
                      type="text"
                      placeholder="Number of establishments (How many hospitality businesses do you manage?)"
                      {...register("NoOfEstablishment", { required: true })}
                      className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[13px] font-[400] w-full"
                    />
                  </div>

                  <div className="">
                    <button
                      disabled={loading}
                      type="submit"
                      className=" text-[16px] font-[500] py-[10px] rounded-[5px] bg-[#5955B3] text-white w-full"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <LandingPageFAQ />
      <Blog />
      <Footer />
    </div>
  );
};

export default DemoPage;
