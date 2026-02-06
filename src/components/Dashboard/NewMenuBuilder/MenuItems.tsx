import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import LayoutComponent from "../../Overview/Layout/LayoutComponent";
import DataTable from "./components/DataTable";
import PaginationComponent from "../PaginationComponent";
import { statsData } from "./components/mockData";
import FilterBar from "./components/FilterBar";

import { fetchMenuItems } from "../../../slices/newMenuSlice";
import { AppDispatch } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";


export default function MenuItems() {

  const dispatch = useDispatch<AppDispatch>();

  const {
    items: menuItems,
    loading,
    // error,
  } = useSelector((state: any) => state.menuItem);

  const { totalItems, totalPages } = useSelector((state: any) => state.menu);

  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [branchFilter, setBranchFilter] = useState("All branches");
  const [itemFilter, setItemFilter] = useState("All items");

  const stats = statsData;

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ totalOrders: number; totalPages: number; currentPage: number; pageSize: number }>({
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchMenuItems(selectedBranch?.id));
  }, [dispatch, selectedBranch?.id]);


  // Update pagination when filters/page change
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setPagination({
      totalOrders: totalItems,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pagination.pageSize,
    });
  }, [totalItems, totalPages, page, pagination.pageSize]);

  // Map new MenuItem structure to MenuItemProp expected by DataTable
  const mappedItems = menuItems.map((item: any) => ({
    ...item,
    _id: item.id,
    menu_item_name: item.name,
    menu_item_price: 0, // Price is currently not in the base MenuItem but in variations/default_variation
    // Mapping other fields if necessary
  }));


  return (
    <LayoutComponent title="Menu Item" description="Create a new item for your menu." HeaderAction={
      <Link to="/menu-list/add" className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg min-w-fit no-wrap">
        <span className="text-lg">+</span>
        <span>New item</span>
      </Link>
    }>
      {loading && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full min-h-screen bg-gray-100/75 z-50">
          <Loader2 className="w-20 h-20 text-[#DC6803] animate-spin" />
        </div>
      )}

      <FilterBar
        categoryFilter={categoryFilter}
        branchFilter={branchFilter}
        itemFilter={itemFilter}
        search={search}
        setCategoryFilter={setCategoryFilter}
        setBranchFilter={setBranchFilter}
        setItemFilter={setItemFilter}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-4 gap-4 mt-6">
        {stats.map(s => (
          <div key={s.label} className="p-4 bg-white border rounded-lg">
            <p className="text-xs text-gray-600">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden bg-white border rounded-lg">
        <div className="overflow-x-auto">
          <DataTable items={mappedItems} />
        </div>
        <PaginationComponent
          setPage={setPage} pagination={pagination}
        />
      </div>

    </LayoutComponent >
  );
}
