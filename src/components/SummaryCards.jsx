export default function SummaryCards({ workouts }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  const totalWorkouts = safeWorkouts.length;

  const totalDuration = safeWorkouts.reduce(
    (sum, w) => sum + Number(w.duration || 0),
    0
  );

  const totalCalories = safeWorkouts.reduce(
    (sum, w) => sum + Number(w.calories || 0),
    0
  );

  const cards = [
    { label: "Total Workouts", value: totalWorkouts },
    { label: "Total Duration", value: `${totalDuration} min` },
    { label: "Calories Burned", value: totalCalories },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-blue-500 transition"
        >
          <p className="text-slate-400 text-sm">{card.label}</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
