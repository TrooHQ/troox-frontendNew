import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function TopSellingItems() {

  const { topMenuItems } = useSelector(
    (state: RootState) => state.overview
  );


  return (
    <div className="w-full mx-auto rounded-xl shadow-md overflow-hidden my-10 ">

      <div className="border-b border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-600">
          {"Top Selling Items"}
        </h3>
      </div>

      <div className=" h-64 m-4 rounded-t-xl overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-300 ">
            <tr >
              <th className="p-2">Item</th>
              <th className="p-2">Quantity Sold</th>
              <th className="p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {
              topMenuItems?.data?.length === 0 ? (
                <tr className="h-40">
                  <td className="p-2 text-center" colSpan={3}>No data</td>
                </tr>
              )
                : (
                  topMenuItems?.data?.map((item: any, index: number) => (
                    item?._id?.menuItemId && <tr key={index} className={`text-sm ${index % 2 === 0 ? "bg-gray-100" : ""}`}>
                      <td className="px-2 py-3 text-center">{item.menuItemName}</td>
                      <td className="px-2 py-3 text-center">{item.totalQuantity}</td>
                      <td className="px-2 py-3 text-center">{item.totalRevenue}</td>
                    </tr>
                  ))
                )
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}