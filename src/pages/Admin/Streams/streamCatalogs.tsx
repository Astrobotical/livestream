import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import streamModel from "../../../components/Models/Streams/streamModel";
import Alert from "../../../components/reuseables/alerts";

// Helper function for formatting the date with the day of the week
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full weekday name (e.g., "Monday")
    year: "numeric", // Full year (e.g., "2024")
    month: "long",   // Full month name (e.g., "January")
    day: "numeric",  // Numeric day (e.g., "1")
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const StreamCatalog = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [streams, setStreams] = useState<streamModel[]>([]);
  const [currentlyStreaming, setCurrentlyStreaming] = useState<number | null>(
      null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [streamDetails, setStreamDetails] = useState<streamModel | null>(null);
  const [filter, setFilter] = useState("Filter");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getStreamsByFilter = async (filter: string | null) => {
    const url = filter
        ? `https://livestreamdemo.romarioburke.me/api/admin/getStreams?filter=${filter}`
        : "https://livestreamdemo.romarioburke.me/api/admin/getStreams";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenSaved}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setStreams(data);
    }
  };

  const handleFilterOptions = (when: string) => {
    switch (when) {
      case "Future":
        setFilter("Future Streams");
        getStreamsByFilter("Future");
        toggleDropdown();
        break;
      case "Past":
        setFilter("Past Streams");
        getStreamsByFilter("Past");
        toggleDropdown();
        break;
      case "All":
        setFilter("All Streams");
        getStreamsByFilter("");
        toggleDropdown();
        break;
    }
  };

  const startStream = async (streamId: number) => {
    if (currentlyStreaming) {
      Alert({
        type: "Error",
        title: "Stream In Progress",
        message:
            "A stream is already in progress. Please end the current stream before starting another.",
        userID: "someUserID",
        token: tokenSaved,
      });
      return;
    }

    const response = await fetch(
        `https://livestreamdemo.romarioburke.me/api/admin/startStream/${streamId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenSaved}`,
          },
        }
    );

    if (response.ok) {
      const updatedStream = await response.json();
      setStreams((prevStreams) =>
          prevStreams.map((stream) =>
              stream.id === updatedStream.id ? updatedStream : stream
          )
      );
      setCurrentlyStreaming(streamId);
      Alert({
        type: "Updated",
        title: "Stream Started",
        message: "Stream has been started successfully",
        userID: "someUserID",
        token: tokenSaved,
      });
    } else {
      console.error("Error starting stream");
    }
  };

  const viewStreamDetails = (stream: streamModel) => {
    setStreamDetails(stream);
    setIsDetailsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
    setStreamDetails(null);
  };

  useEffect(() => {
    const getStreams = async () => {
      const response = await fetch(
          `https://livestreamdemo.romarioburke.me/api/admin/getStreams`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenSaved}`,
            },
          }
      );
      if (response.ok) {
        const data = await response.json();
        setStreams(data);
      }
    };
    getStreams();
  }, [tokenSaved]);

  return (
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white mb-6">Streams</h2>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
                onClick={toggleDropdown}
                className="bg-gray-700 text-white mb-6 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              <span className="text-2xl">{filter}</span>
              <svg
                  className="fill-current w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548l4.006 4.906 4.005-4.906H5.516z" />
              </svg>
            </button>

            {/* Dropdown content */}
            {isOpen && (
                <ul className="absolute right-0 bg-white text-gray-700 shadow-lg rounded-lg w-48">
                  <li
                      className="hover:bg-gray-400 py-2 px-4 block cursor-pointer"
                      onClick={() => handleFilterOptions("Future")}
                  >
                    Upcoming Streams
                  </li>
                  <li
                      className="hover:bg-gray-400 py-2 px-4 block cursor-pointer"
                      onClick={() => handleFilterOptions("Past")}
                  >
                    Past Streams
                  </li>
                  <li
                      className="hover:bg-gray-400 py-2 px-4 block cursor-pointer"
                      onClick={() => handleFilterOptions("All")}
                  >
                    All Streams
                  </li>
                </ul>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {streams.length !== 0 ? (
              streams.map((stream) => {
                const isPast = new Date(stream.stream_time) < new Date();
                const status = isPast
                    ? "Ended"
                    : new Date(stream.stream_time) > new Date()
                        ? "Pending Stream"
                        : "In Progress";

                return (
                    <div
                        key={stream.id}
                        className={`bg-gray-800 rounded-lg shadow-md p-4 text-white ${
                            currentlyStreaming === stream.id
                                ? "border-4 border-green-500"
                                : ""
                        }`}
                    >
                      {/* Title and Buttons Row */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{stream.title}</h3>
                        <div className="flex space-x-4">
                          <button
                              onClick={() => viewStreamDetails(stream)}
                              className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600"
                          >
                            View Details
                          </button>
                          <button
                              onClick={() => !isPast && startStream(stream.id)}
                              disabled={isPast}
                              className={`py-2 px-4 rounded ${
                                  isPast
                                      ? "bg-gray-600 cursor-not-allowed"
                                      : currentlyStreaming === stream.id
                                          ? "bg-green-700"
                                          : "bg-green-500 hover:bg-green-600"
                              }`}
                          >
                            {isPast
                                ? "Stream Ended"
                                : currentlyStreaming === stream.id
                                    ? "Currently Streaming"
                                    : "Start Stream"}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Date: {formatDate(stream.stream_time)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Status: {status}
                      </p>
                    </div>
                );
              })
          ) : (
              <h2 className="text-3xl text-white text-center mt-16">
                No Stream Records Found
              </h2>
          )}
        </div>

        {/* Modal for Viewing Stream Details */}
        {isDetailsModalOpen && streamDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-8 rounded-lg w-96">
                <h3 className="text-2xl font-bold text-white mb-4">Stream Details</h3>
                <p className="text-white mb-2">
                  <strong>Title:</strong> {streamDetails.title}
                </p>
                <p className="text-white mb-2">
                  <strong>Description:</strong> {streamDetails.description}
                </p>
                <p className="text-white mb-2">
                  <strong>Stream Date:</strong>{" "}
                  {formatDate(streamDetails.stream_time)}
                </p>
                <p className="text-white mb-2">
                  <strong>Stream Time:</strong>{" "}
                  {new Date(streamDetails.stream_time).toLocaleTimeString()}
                </p>
                <p className="text-white mb-2">
                  <strong>Status:</strong> {streamDetails.status}
                </p>
                <p className="text-white mb-4">
                  <strong>Donations:</strong> ${streamDetails.donations || 0}
                </p>
                <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default StreamCatalog;