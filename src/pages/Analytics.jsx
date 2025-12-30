// import Navbar from "../components/Navbar";
import DurationTrendChart from "../components/analytics/DurationTrendChart";
import CaloriesBarChart from "../components/analytics/CaloriesBarChart";
import WorkoutTypePieChart from "../components/analytics/WorkoutTypePieChart";
import { getWorkouts } from "../api/workoutApi";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts().then(setWorkouts);
  }, []);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-slate-400 text-sm">
            Visualize your workout performance
          </p>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">
              Workout Duration Trend
            </h3>
            <DurationTrendChart workouts={workouts} />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Calories Burned</h3>
            <CaloriesBarChart workouts={workouts} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">
            Workout Type Distribution
          </h3>
          <WorkoutTypePieChart workouts={workouts} />
        </div>
      </main>
    </div>
  );
}
