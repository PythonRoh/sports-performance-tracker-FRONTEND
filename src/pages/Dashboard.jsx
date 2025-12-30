import { useEffect, useState } from "react";
import { getWorkouts } from "../api/workoutApi";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutChart from "../components/WorkoutChart";
import SummaryCards from "../components/SummaryCards";
// import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error("Backend not reachable");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 text-sm">
            Track your workouts and performance
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards workouts={workouts} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Add Workout
            </h3>
            <WorkoutForm refresh={fetchWorkouts} />
          </div>

          {/* Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Workout Duration Overview
            </h3>
            <WorkoutChart workouts={workouts} />
          </div>
        </div>
      </main>
    </div>
  );
}
