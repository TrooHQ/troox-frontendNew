import { SetupHeaderProps } from "./common.types";
import React from "react";

const SetupHeader: React.FC<SetupHeaderProps> = ({ header, description }) => {
  return (
    <div className="mt-[15px] mb-[25px] flex flex-col gap-2 items-center">
      <div>
        <h3 className="text-[28px] font-medium leading-9">{header}</h3>
      </div>
      <div className="">
        <div className="text-center text-[#858497] text-xl font-light leading-[29px]">
          {description}
        </div>{" "}
      </div>
    </div>
  );
};

export default SetupHeader;
