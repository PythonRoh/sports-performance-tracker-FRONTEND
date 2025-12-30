import { useState } from "react";
import { uploadWorkoutFile } from "../api/uploadApi";
// import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await uploadWorkoutFile(file);
      setMessage(`${res.workoutsAdded} workouts imported successfully`);
    } catch (err) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white p-8">
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-blue-400">
            Upload Workout File
          </h2>

          <p className="text-slate-400 mb-6">
            Upload your workout data in CSV or GPX format
          </p>

          <input
            type="file"
            accept=".csv,.gpx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mb-4 text-sm text-slate-300
              file:bg-slate-800 file:border file:border-slate-700
              file:rounded-lg file:px-4 file:py-2 file:text-white"
          />

          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload File"}
          </Button>

          {message && (
            <p className="mt-4 text-center text-sm text-slate-300">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
