import { useState } from "react";
import { createWorkout } from "../api/workoutApi";

export default function WorkoutForm({ refresh }) {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    distance: "",
    calories: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting workout:", formData);

    try {
      await createWorkout({
        ...formData,
        duration: Number(formData.duration),
        distance: formData.distance ? Number(formData.distance) : undefined,
        calories: formData.calories ? Number(formData.calories) : undefined,
      });

      console.log("Workout saved");

      if (refresh) refresh();

      setFormData({
        type: "",
        duration: "",
        distance: "",
        calories: "",
        notes: "",
      });
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save workout. Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="type"
          placeholder="Workout Type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <input
          name="duration"
          type="number"
          placeholder="Duration (min)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="distance"
          type="number"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={handleChange}
        />

        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
        />
      </div>

      {/* Notes */}
      <textarea
        name="notes"
        placeholder="Notes"
        rows="3"
        value={formData.notes}
        onChange={handleChange}
      />

      {/* Button */}
      <button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition font-medium">
        Save Workout
      </button>
    </form>
  );
}
