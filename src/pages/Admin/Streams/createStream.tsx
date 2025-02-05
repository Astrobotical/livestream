import { useState } from "react";
import { FaLink } from "react-icons/fa6"; // Removed FaClock since we're using the default time icon
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RootState } from "../../../redux/store";
import streamModel from "../../../components/Models/Streams/streamModel";

const CreateStreamPage = () => {
  const [streamDate, setStreamDate] = useState("");
  const [streamTime, setStreamTime] = useState("");
  const [streamLink, setStreamLink] = useState("");
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For the loading overlay

  const tokenSaved = useSelector((state: RootState) => state.auth.token);

  const promptToast = () => {
    const Toast = withReactContent(Swal).mixin({
      toast: true,
      position: "top-right",
      iconColor: "green",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Stream Scheduled Successfully!",
    });
  };

  const clearValues = () => {
    setStreamDate("");
    setStreamLink("");
    setStreamTime("");
    setStreamTitle("");
    setStreamDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation

    const formData: streamModel = {
      donations: "",
      stream_status: "",
      id: 0,
      title: streamTitle,
      description: streamDescription,
      stream_url: streamLink,
      stream_time: `${streamDate} ${streamTime}:00`,
      stream_date: streamDate,
      is_live: 0,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}admin/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenSaved}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        promptToast();
        clearValues();
      }
    } catch (error) {
      console.error("Error scheduling stream:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="mx-auto p-6 rounded-lg bg-gray-800 h-1/2 shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Schedule a Stream
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Field */}
          <div className="flex flex-col">
            <label className="text-white mb-2">Stream Title</label>
            <input
              type="text"
              className="input input-bordered bg-gray-600 text-white w-full"
              placeholder="Enter stream title"
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label className="text-white mb-2">Stream Description</label>
            <textarea
              className="textarea textarea-bordered bg-gray-600 text-white w-full"
              placeholder="Enter stream description"
              value={streamDescription}
              onChange={(e) => setStreamDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          {/* Date Field */}
          <div className="flex flex-col">
            <label className="text-white mb-2">Stream Date</label>
            <input
              type="date"
              className="input input-bordered bg-gray-600 text-white w-full"
              value={streamDate}
              onChange={(e) => setStreamDate(e.target.value)}
              required
            />
          </div>

          {/* Time Field */}
          <div className="flex flex-col">
            <label className="text-white mb-2">Stream Time</label>
            <input
              type="time"
              className="input input-bordered bg-gray-600 text-white w-full"
              style={{ colorScheme: "dark" }} // Ensures the native time picker looks good on dark background
              value={streamTime}
              onChange={(e) => setStreamTime(e.target.value)}
              required
            />
          </div>

          {/* Link Field */}
          <div className="flex flex-col">
            <label className="text-white mb-2">Stream Link</label>
            <div className="relative">
              <input
                type="url"
                className="input input-bordered bg-gray-600 text-white w-full pr-10"
                placeholder="https://www.example.com/stream"
                value={streamLink}
                onChange={(e) => setStreamLink(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaLink className="text-white" />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 py-2"
            >
              Schedule Stream
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStreamPage;