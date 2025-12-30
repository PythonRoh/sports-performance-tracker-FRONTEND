import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

export default function WorkoutChart({ workouts }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  // Transform data safely
  const data = safeWorkouts.map((w, index) => ({
    x: w.type || `Workout ${index + 1}`,
    y: Number(w.duration || 0),
    label: `${w.duration || 0} min`,
  }));

  // Optional UX improvement
  if (safeWorkouts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
        No workout data available yet
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-200 mb-4">Workout Duration (minutes)</h3>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 60 }} // more horizontal space
        padding={{ top: 40, bottom: 90, left: 70, right: 40 }} // 🔥 room for labels
        style={{
          background: { fill: "transparent" },
        }}
      >
        {/* X Axis */}
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel
              angle={-30} // rotate labels
              textAnchor="end"
              verticalAnchor="middle"
            />
          }
          style={{
            axis: { stroke: "#334155" },
            tickLabels: {
              fill: "#cbd5f5",
              fontSize: 11,
              padding: 12,
            },
          }}
        />

        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          label="Duration (min)"
          style={{
            axisLabel: {
              padding: 50,
              fontSize: 12,
              fill: "#cbd5f5",
            },
            tickLabels: {
              fontSize: 11,
              fill: "#cbd5f5",
            },
            axis: { stroke: "#334155" },
            grid: { stroke: "#334155", strokeDasharray: "4,4" },
          }}
        />

        <VictoryBar
          data={data}
          barWidth={28}
          style={{
            data: { fill: "#2563eb" },
          }}
          labels={({ datum }) => datum.label}
          labelComponent={
            <VictoryTooltip
              style={{
                fontSize: 11,
                fill: "#ffffff",
                fontWeight: 500,
              }}
              flyoutStyle={{
                fill: "#020617",
                stroke: "#2563eb",
                strokeWidth: 1.5,
              }}
              cornerRadius={6}
              pointerLength={6}
            />
          }
        />
      </VictoryChart>
    </div>
  );
}
