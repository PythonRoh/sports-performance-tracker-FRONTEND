import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

export default function CaloriesBarChart({ workouts }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  const data = safeWorkouts.map((w, index) => ({
    x: `W${index + 1}`,
    y: Number(w.calories || 0),
    label: `${w.calories || 0} cal`,
  }));

  if (!data.length) {
    return <p className="text-slate-400">No data available</p>;
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 30 }}
    >
      <VictoryAxis
        label="Workout Sessions"
        style={{
          axisLabel: { padding: 30, fill: "#cbd5f5", fontSize: 12 },
          tickLabels: { fill: "#cbd5f5", fontSize: 10 },
        }}
      />

      <VictoryAxis
        dependentAxis
        label="Calories Burned"
        style={{
          axisLabel: { padding: 40, fill: "#cbd5f5", fontSize: 12 },
          tickLabels: { fill: "#cbd5f5", fontSize: 10 },
        }}
      />

      <VictoryBar
        data={data}
        barWidth={22}
        labels={({ datum }) => datum.label}
        labelComponent={<VictoryTooltip />}
        style={{
          data: { fill: "#22c55e" },
        }}
      />
    </VictoryChart>
  );
}
