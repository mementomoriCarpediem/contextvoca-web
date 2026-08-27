/**
 * Small SVG timeline contrasting two review schedules over the same span:
 * cramming (all review sessions clustered close together) versus spaced
 * review (sessions spread out over time). Purely illustrative — the dot
 * positions are fixed, hand-picked coordinates, not derived from product data.
 */

const VIEW_W = 480;
const VIEW_H = 120;
const TRACK_LEFT = 16;
const TRACK_RIGHT = VIEW_W - 16;

// Fixed x-positions (0..1 fraction of the track) for each row's review dots.
const CRAMMING_POSITIONS = [0.08, 0.13, 0.18, 0.23, 0.28];
const SPACED_POSITIONS = [0.05, 0.18, 0.38, 0.64, 0.95];

function trackX(fraction: number): number {
  return TRACK_LEFT + fraction * (TRACK_RIGHT - TRACK_LEFT);
}

function TimelineRow({
  y,
  positions,
  color,
  label,
}: {
  y: number;
  positions: number[];
  color: string;
  label: string;
}) {
  return (
    <g>
      <line
        x1={TRACK_LEFT}
        x2={TRACK_RIGHT}
        y1={y}
        y2={y}
        stroke="#eee5ff"
        strokeWidth={2}
      />
      {positions.map((p, idx) => (
        <circle
          key={idx}
          cx={trackX(p)}
          cy={y}
          r={6}
          fill={color}
        />
      ))}
      <text
        x={TRACK_LEFT}
        y={y - 14}
        className="fill-gray-500"
        fontSize={12}
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  );
}

export default function SpacedReviewTimeline({
  crammingLabel,
  spacedLabel,
}: {
  crammingLabel: string;
  spacedLabel: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={`${crammingLabel} vs ${spacedLabel}`}
      className="w-full"
    >
      <TimelineRow
        y={44}
        positions={CRAMMING_POSITIONS}
        color="#d4b8ff"
        label={crammingLabel}
      />
      <TimelineRow
        y={104}
        positions={SPACED_POSITIONS}
        color="#6418e6"
        label={spacedLabel}
      />
    </svg>
  );
}
