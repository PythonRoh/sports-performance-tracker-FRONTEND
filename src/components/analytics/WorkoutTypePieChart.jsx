import { VictoryPie } from "victory";


export default function WorkoutTypePieChart({ workouts }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  // Normalize + count workout types
  const counts = safeWorkouts.reduce((acc, w) => {
    if (!w?.type) return acc;

    const type = w.type.trim().toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const total = safeWorkouts.length;

  const data = Object.entries(counts).map(([type, count]) => ({
    label: type,
    value: count,
  }));

  if (!data.length) {
    return <p className="text-slate-400">No workout data available</p>;
  }

  // Dynamic color generator (HSL-based)
  const colors = data.map((_, i) => {
    const hue = Math.round((360 / data.length) * i);
    return `hsl(${hue}, 70%, 55%)`;
  });

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* PIE CHART */}
      <VictoryPie
        data={data}
        x="label"
        y="value"
        innerRadius={70}
        padAngle={3}
        colorScale={colors}
        labels={() => null}
        width={320}
        height={320}
      />

      {/* LEGEND (GRID) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[i] }}
            />
            <span className="capitalize text-slate-200">
              {d.label} ({Math.round((d.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
