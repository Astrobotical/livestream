import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateRandomData = (length: number, max: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * max) + 1);

const DashboardPage = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);

  const [streams, setStreams] = useState(0);
  const [viewers, setViewers] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Monthly"); // Tabs: Monthly, Yearly, All Time, Custom
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = customDateRange;

  // Dummy data for graphs
  const monthlyData = generateRandomData(31, 50);
  const yearlyData = generateRandomData(12, 500); // Data for all months
  const allTimeData = generateRandomData(new Date().getFullYear() - 2015 + 1, 1000);
  const customData = generateRandomData(10, 300); // Example custom range data

  const fetchDashboardData = async () => {
    const response = await fetch("https://livestreamdemo.romarioburke.me/api/admin/getStreams", {
      headers: { Authorization: `Bearer ${tokenSaved}` },
    });
    if (response.ok) {
      const streamsData = await response.json();
      setStreams(streamsData.length);
    }
  };

  const fetchViewers = async () => {
    const response = await fetch("https://livestreamdemo.romarioburke.me/api/admin/getUsers", {
      headers: { Authorization: `Bearer ${tokenSaved}` },
    });
    if (response.ok) {
      const data = await response.json();
      setViewers(data.length || 0);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchViewers();
  }, [tokenSaved]);

  // Configure Bar Chart Data
  const barChartData = {
    labels:
      selectedTab === "Monthly"
        ? Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => (i + 1).toString()) // Days of the month
        : selectedTab === "Yearly"
          ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          : selectedTab === "All Time"
            ? Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => (2015 + i).toString())
            : startDate && endDate
              ? [`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`]
              : [],
    datasets: [
      {
        label: `${selectedTab} Streams`,
        data:
          selectedTab === "Monthly"
            ? monthlyData
            : selectedTab === "Yearly"
              ? yearlyData
              : selectedTab === "All Time"
                ? allTimeData
                : customData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setCustomDateRange(dates);
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Total Streams Card */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white">Total Streams</h2>
        <p className="text-3xl text-green-400">{streams}</p>
      </div>

      {/* Total Viewer Count Card */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white">Total Viewer Count</h2>
        <p className="text-3xl text-blue-400">{viewers}</p>
      </div>

      {/* Total Earned Card */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white">Total Earned</h2>
        <p className="text-3xl text-red-400">$2540</p>
      </div>

      {/* Total Streams Section with Graph */}
      <div id="streamsGraph" className="bg-gray-800 p-4 rounded-lg shadow-md col-span-3">
        <h2 className="text-xl font-semibold text-white">Total Streams</h2>

        {/* Tab Selection */}
        <div className="mt-4 flex space-x-2">
          {["Monthly", "Yearly", "All Time", "Custom"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded ${selectedTab === tab ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters for Tabs */}
        <div className="mt-4">
          {selectedTab === "Yearly" && (
            <div className="flex space-x-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedTab === "Custom" && (
            <div>
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Select Date Range
              </button>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 relative">

              {/* Modal Header with Close Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-white">Select Custom Date Range</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white text-xl"
                >
                  &times;
                </button>
              </div>

              {/* DatePicker */}
              <div className="w-full mb-4">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate ?? undefined}
                  endDate={endDate ?? undefined}
                  selectsRange
                  inline
                  className="w-full" // Ensures DatePicker fills container's width
                />
              </div>

              {/* Year and Month Filters */}
              <div className="flex space-x-2 mb-4">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="bg-gray-700 text-white px-2 py-1 rounded w-1/2"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="bg-gray-700 text-white px-2 py-1 rounded w-1/2"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bar Chart */}
        <div className="mt-6">
          <Bar data={barChartData} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;