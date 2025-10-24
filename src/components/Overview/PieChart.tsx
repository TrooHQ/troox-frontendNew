import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const GRAY_COLORS = ["#9CA3AF", "#9CA3AF", "#9CA3AF", "#9CA3AF"];
const emptyStateData = Array.from({ length: 4 }, (_, index) => ({
  name: `Item ${index + 1}`,
  value: 1,
}));

export default function PieChartComp({ data, colorCode, title }: any) {
  // Format the incoming data
  const formattedData = Array.isArray(data)
    ? data
      .filter((item: any) => item?.menuItemId) // Optional condition if needed
      .slice(0, 4)
      .map((item: any) => ({
        name: item.menuItemName,
        value: item.totalRevenue || 0,
      }))
      .sort((a: any, b: any) => b.value - a.value)
    : [];

  const total = formattedData.reduce((sum: number, item: any) => sum + item.value, 0);


  return (
    <div className="relative w-full bg-white shadow-md rounded-xl">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600">
          {title}
        </h3>
      </div>

      {formattedData.length === 0 ? (
        <div className="relative w-full p-4 h-60">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={emptyStateData}
                cx="50%"
                cy="50%"
                // innerRadius={45}
                // outerRadius={70}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
              >
                {emptyStateData.map((_entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GRAY_COLORS[index % GRAY_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center total */}
          <div
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="text-xs text-gray-500">No Data Available</p>
          </div>
        </div>
      )
        :
        <div className="relative flex flex-wrap items-center justify-between p-4">
          {/* Chart */}
          <div className="relative w-1/2 h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={formattedData}
                  cx="50%"
                  cy="50%"
                  // innerRadius={45}
                  // outerRadius={70}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {formattedData.map((_entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorCode[index % colorCode.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center total */}
            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-semibold">₦{total.toLocaleString()}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col w-1/2 pl-4 space-y-2">
            {formattedData.map((item: any, index: number) => {
              const percent = ((item.value / total) * 100).toFixed(0);
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colorCode[index % colorCode.length] }}
                    />
                    <span className="text-gray-700 overflow-ellipsis">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {percent}% (₦{item.value.toLocaleString()})
                  </span>
                </div>
              );
            })}
          </div>
        </div>}


    </div >
  );
}

