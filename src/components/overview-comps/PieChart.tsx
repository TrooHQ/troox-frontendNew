import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const data = [
  { value: 6150000, color: "#9787FF" },
  { value: 4050000, color: "#FFA5DA" },
  { value: 2352000, color: "#0096FF" },
  { value: 1768000, color: "#5BD222" },
  { value: 2011000, color: "#FDB600" },
];

const size = {
  width: 400,
  height: 300,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

const StyledTotalRevenue = styled(StyledText)({
  fill: "#858497",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "27px",
});

const StyledSum = styled(StyledText)({
  fill: "#201F44",
  fontSize: "40px",
  fontWeight: 600,
  lineHeight: "54px",
});

function formatNumber(num: number) {
  return Math.abs(num) > 999999
    ? (Math.sign(num) * (Math.abs(num) / 1000000)).toFixed(1) + "M"
    : (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "K";
}

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  const sum = data.reduce((sum, { value }) => sum + value, 0);
  const formattedSum = formatNumber(sum);
  console.log(children);

  return (
    <>
      <StyledTotalRevenue x={left + width / 2} y={top + height / 2 - 20}>
        Total Revenue
      </StyledTotalRevenue>
      <StyledSum x={left + width / 2} y={top + height / 2 + 20}>
        ₦{formattedSum}
      </StyledSum>
    </>
  );
}

const PieCharts = () => {
  return (
    <PieChart series={[{ data, innerRadius: 125, color: data[0].color }]} {...size}>
      <PieCenterLabel>
        <div className="text-center text-[#858497] font-inter text-lg leading-[27px]">
          Total Revenue
        </div>
        <div className="text-center text-[#201F44] font-inter text-4xl font-semibold leading-[54px]">
          ₦{data.reduce((sum, { value }) => sum + value, 0)}
        </div>
      </PieCenterLabel>
    </PieChart>
  );
};

export default PieCharts;
