import { useState } from "react";
import { Calendar } from "lucide-react";

const tabOptions = [
  { label: "Today", value: "today" },
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
  { label: "12 months", value: "365" },
];

interface DaysTabProps {
  onDateFilterChange?: (
    dateFilter: string,
    startDate?: string,
    endDate?: string,
    number_of_days?: number
  ) => void;
  setDateFilter?: (value: string) => void;
  setStartDate?: (value: string | undefined) => void;
  setEndDate?: (value: string | undefined) => void;
  setNumberOfDays?: (value: number | undefined) => void;
}

export default function DaysTab3 ({
  onDateFilterChange,
  setDateFilter,
  setStartDate,
  setEndDate,
  setNumberOfDays,
}: DaysTabProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [displayDateRange, setDisplayDateRange] = useState("");

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    const selectedTab = tabOptions[index];
    const date_filter = selectedTab.value === "today" ? "today" : "days";
    const number_of_days = selectedTab.value === "today" ? undefined : parseInt(selectedTab.value);
    
    // Clear custom date
    setDisplayDateRange("");
    setTempStartDate("");
    setTempEndDate("");
    
    // Update parent state
    setDateFilter?.(date_filter);
    setStartDate?.(undefined);
    setEndDate?.(undefined);
    setNumberOfDays?.(number_of_days);
    
    // Trigger callback
    if (selectedTab.value === "today") {
      onDateFilterChange?.(date_filter);
    } else {
      onDateFilterChange?.(date_filter, undefined, undefined, number_of_days);
    }
  };

  const handleDateApply = () => {
    if (tempStartDate && tempEndDate) {
      setDisplayDateRange(`${tempStartDate} - ${tempEndDate}`);
      
      // Update parent state
      setDateFilter?.("date_range");
      setStartDate?.(tempStartDate);
      setEndDate?.(tempEndDate);
      setNumberOfDays?.(undefined);
      
      // Trigger callback
      onDateFilterChange?.("date_range", tempStartDate, tempEndDate);
      
      setShowDatePicker(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Tab section */}
      <div className="flex p-1 bg-gray-100 border border-gray-200 rounded-lg">
        {tabOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-1.5 rounded-md text-sm transition-all ${
              activeTab === index
                ? "bg-white text-gray-900 font-semibold shadow-sm"
                : "text-gray-600 font-normal hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Custom date button */}
      <div className="relative">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
        >
          <Calendar size={16} />
          {displayDateRange || "Custom date"}
        </button>

        {showDatePicker && (
          <div className="absolute right-0 z-50 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
            <div className="flex flex-col gap-3">
              <div>
                <label className="block mb-1 text-xs text-gray-600">Start Date</label>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs text-gray-600">End Date</label>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleDateApply}
                disabled={!tempStartDate || !tempEndDate}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Example usage component
// function ExampleUsage() {
//   const [dateFilter, setDateFilter] = useState("today");
//   const [startDate, setStartDate] = useState<string | undefined>();
//   const [endDate, setEndDate] = useState<string | undefined>();
//   const [numberOfDays, setNumberOfDays] = useState<number | undefined>();

//   const handleDateFilterChange = (
//     filter: string,
//     start?: string,
//     end?: string,
//     days?: number
//   ) => {
//     console.log("Date filter changed:", { filter, start, end, days });
//   };

//   return (
//     <div className="p-8">
//       <h2 className="mb-4 text-xl font-bold">DaysTab Component Example</h2>
      
//       <DaysTab
//         setDateFilter={setDateFilter}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         setNumberOfDays={setNumberOfDays}
//         onDateFilterChange={handleDateFilterChange}
//       />

//       <div className="p-4 mt-8 rounded-lg bg-gray-50">
//         <h3 className="mb-2 font-semibold">Current State:</h3>
//         <div className="space-y-1 text-sm">
//           <p><strong>Date Filter:</strong> {dateFilter}</p>
//           <p><strong>Start Date:</strong> {startDate || "N/A"}</p>
//           <p><strong>End Date:</strong> {endDate || "N/A"}</p>
//           <p><strong>Number of Days:</strong> {numberOfDays || "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExampleUsage;