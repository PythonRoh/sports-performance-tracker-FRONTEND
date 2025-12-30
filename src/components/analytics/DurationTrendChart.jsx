import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

export default function WorkoutTrendChart({ workouts }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  if (safeWorkouts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
        No trend data available
      </div>
    );
  }

  const data = safeWorkouts.map((w, index) => ({
    x: index + 1, // Session number
    y: Number(w.duration || 0),
    label: `${w.duration} min`,
  }));

  const maxDuration = Math.max(...data.map((d) => d.y));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-200 mb-4">Workout Duration Trend</h3>

      <VictoryChart
        theme={VictoryTheme.material}
        padding={{ top: 40, bottom: 60, left: 70, right: 40 }}
        domain={{
          y: [0, maxDuration + 10],
        }}
      >
        {/* X Axis */}
        <VictoryAxis
          label="Workout Sessions"
          tickValues={data.map((d) => d.x)}
          tickFormat={(t) => `#${t}`}
          style={{
            axis: { stroke: "#334155" },
            axisLabel: { padding: 35, fill: "#cbd5f5" },
            tickLabels: { fill: "#cbd5f5", fontSize: 10 },
          }}
        />

        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          label="Duration (min)"
          tickFormat={(t) => `${t}`}
          style={{
            axis: { stroke: "#334155" },
            axisLabel: { padding: 50, fill: "#cbd5f5" },
            tickLabels: { fill: "#cbd5f5", fontSize: 10 },
            grid: {
              stroke: "#334155",
              strokeDasharray: "6,6",
            },
          }}
        />

        <VictoryLine
          data={data}
          interpolation="monotoneX"
          style={{
            data: { stroke: "#2563eb", strokeWidth: 3 },
          }}
          labels={({ datum }) => datum.label}
          labelComponent={
            <VictoryTooltip
              style={{ fill: "#ffffff", fontSize: 10 }}
              flyoutStyle={{ fill: "#020617", stroke: "#2563eb" }}
            />
          }
        />
      </VictoryChart>
    </div>
  );
}
