/**
 * Renders the app's real decay model as an SVG chart: retention decays
 * exponentially with elapsed days, and the half-life grows each time a word
 * is answered correctly in a row (7 -> 14 -> 30 -> 90 days).
 *
 * retention(days, halfLife) = e^(-days / halfLife)
 *
 * Note: at days == halfLife this evaluates to e^-1 (~36.8%), not 50% — the
 * product term "half-life" here names the decay-rate parameter of an
 * exponential curve, not a statistical median survival point.
 */

const VIEW_W = 640;
const VIEW_H = 300;
const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };
const PLOT_W = VIEW_W - MARGIN.left - MARGIN.right;
const PLOT_H = VIEW_H - MARGIN.top - MARGIN.bottom;
const MAX_DAYS = 90;
const HALF_LIVES = [7, 14, 30, 90] as const;
const CURVE_COLORS = ["#a78bfa", "#8038ff", "#6418e6", "#370d82"];

function retention(days: number, halfLife: number): number {
  return Math.exp(-days / halfLife);
}

function toSvgX(days: number): number {
  return MARGIN.left + (days / MAX_DAYS) * PLOT_W;
}

function toSvgY(ratio: number): number {
  return MARGIN.top + (1 - ratio) * PLOT_H;
}

function buildCurvePath(halfLife: number): string {
  const points: string[] = [];
  for (let day = 0; day <= MAX_DAYS; day += 1) {
    const x = toSvgX(day);
    const y = toSvgY(retention(day, halfLife));
    points.push(`${day === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

export default function ForgettingCurve({
  xAxisLabel,
  yAxisLabel,
  legend,
}: {
  xAxisLabel: string;
  yAxisLabel: string;
  /** One label per half-life curve, in order [7, 14, 30, 90] days. */
  legend: string[];
}) {
  const yTicks = [0, 0.5, 1];
  const xTicks = [0, 30, 60, 90];

  return (
    <div>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`${yAxisLabel} / ${xAxisLabel}`}
        className="w-full"
      >
        {/* Gridlines */}
        {yTicks.map((t) => (
          <line
            key={`y-grid-${t}`}
            x1={MARGIN.left}
            x2={VIEW_W - MARGIN.right}
            y1={toSvgY(t)}
            y2={toSvgY(t)}
            stroke="#eee5ff"
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line
          x1={MARGIN.left}
          x2={MARGIN.left}
          y1={MARGIN.top}
          y2={VIEW_H - MARGIN.bottom}
          stroke="#d4b8ff"
          strokeWidth={1}
        />
        <line
          x1={MARGIN.left}
          x2={VIEW_W - MARGIN.right}
          y1={VIEW_H - MARGIN.bottom}
          y2={VIEW_H - MARGIN.bottom}
          stroke="#d4b8ff"
          strokeWidth={1}
        />

        {/* Y-axis tick labels */}
        {yTicks.map((t) => (
          <text
            key={`y-label-${t}`}
            x={MARGIN.left - 8}
            y={toSvgY(t) + 4}
            textAnchor="end"
            className="fill-gray-400"
            fontSize={11}
          >
            {Math.round(t * 100)}%
          </text>
        ))}

        {/* X-axis tick labels */}
        {xTicks.map((t) => (
          <text
            key={`x-label-${t}`}
            x={toSvgX(t)}
            y={VIEW_H - MARGIN.bottom + 18}
            textAnchor="middle"
            className="fill-gray-400"
            fontSize={11}
          >
            {t}
          </text>
        ))}
        <text
          x={VIEW_W - MARGIN.right}
          y={VIEW_H - 4}
          textAnchor="end"
          className="fill-gray-400"
          fontSize={11}
        >
          {xAxisLabel}
        </text>

        {/* Curves */}
        {HALF_LIVES.map((halfLife, idx) => (
          <path
            key={halfLife}
            d={buildCurvePath(halfLife)}
            fill="none"
            stroke={CURVE_COLORS[idx]}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ))}
      </svg>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {legend.map((label, idx) => (
          <li
            key={label}
            className="flex items-center gap-1.5 text-xs text-gray-500"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CURVE_COLORS[idx] }}
              aria-hidden="true"
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
