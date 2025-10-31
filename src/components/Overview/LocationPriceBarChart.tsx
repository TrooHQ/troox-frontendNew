
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";


const colors = ["#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB"];

export default function LocationPriceBarChart() {

  const { topMenuItems, revenueByBranch } = useSelector(
    (state: RootState) => state.overview
  );

  console.log("revenueByBranch", revenueByBranch);

  const formattedData = Array.isArray(topMenuItems?.data)
    ? topMenuItems?.data
      .filter((item: any) => item?.menuItemId) // Optional condition if needed
      .slice(0, 5)
      .map((item: any) => ({
        name: item.menuItemName,
        value: item.totalRevenue || 0,
      })).sort((a: any, b: any) => b.value - a.value)
    : [];

  console.log("formatted Data", formattedData)
  return (
    <div className="w-full mx-auto my-10 overflow-hidden shadow-md rounded-xl">

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600">
          {"Revenue By Location"}
        </h3>
      </div>

      <div className="h-64 w-[95%] rounded-xl mx-auto border border-gray-100 my-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 30, bottom: 10 }}
          >
            {/* Y-Axis = Location */}
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              width={80}
            />

            {/* X-Axis = Price */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₦${value.toLocaleString()}`}
            />

            <Tooltip
              formatter={(value: number) => `₦${value.toLocaleString()}`}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 10, 10]}
              barSize={25}
            >
              {formattedData.map((_entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
