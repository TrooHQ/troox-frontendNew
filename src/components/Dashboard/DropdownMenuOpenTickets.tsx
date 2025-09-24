// handleVoidOrderMenu
// handleVoidOrderMenu
// setVoidOrderItem
export const DropdownMenu = ({ handleVoidOrderMenu, handleViewTicket, isRefundable }: { handleVoidOrderMenu: () => void, handleViewTicket: () => void, isRefundable: boolean }) => {
  const handleItemClick = (action: string) => {
    if (action === "Void Order") {
      handleVoidOrderMenu();
    } else {
      console.log("nothing");
    }
  };

  return (
    <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-[40px] z-10">
      <li
        onClick={handleViewTicket}
        className="font-[400] text-gray-500 cursor-block"
      >
        View Order
      </li>
      <li
        onClick={() => { !isRefundable && handleItemClick("Void Order") }}
        className={`font-[400]  ${!isRefundable ? "text-red-500 cursor-pointer" : "cursor-not-allowed text-gray-300"} `}
      >
        Refund Order
      </li>
    </ul>
  );
};
