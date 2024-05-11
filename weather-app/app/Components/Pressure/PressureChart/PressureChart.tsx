import React from "react";
import { useGauge } from "use-gauge";

interface ArcedProps {
  value: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;

export function PressureChart(props: ArcedProps) {
  const { value } = props;
  const gauge = useGauge({
    domain: [960, 1060],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 51,
    diameter: 120
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 2,
    tipRadius: 1
  });

  return (
    <div className="mt-2 relative">
  <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
      </filter>
    </defs>
    <g id="ticks">
      {gauge.ticks.map((angle) => {
        const asValue = gauge.angleToValue(angle);
        const showText = asValue === 970 || asValue === 1010 || asValue === 1050;
        return (
          <React.Fragment key={`tick-group-${angle}`}>
            <line
              className="stroke-gray-700 "
              strokeWidth={2}
              {...gauge.getTickProps({ angle, length: showText ? 16 : 10 })}
            />
            {showText && (
              <text
                className="text-base fill-gray-400 font-medium"
                {...gauge.getLabelProps({ angle, offset: 25 })}
              >
                {asValue}
              </text>
            )}
          </React.Fragment>
        );
      })}
    </g>
    <g id="needle" filter="url(#shadow)">
      <circle className="fill-gray-700" {...needle.base} />
      <circle className="fill-gray-700" {...needle.tip} />
      <circle className="fill-gray-300" {...needle.base} r={5} />
      <polyline className="fill-gray-700" points={needle.points} />
      <circle className="fill-red-500" {...needle.base} r={4} />
    </g>
  </svg>
  <div className="absolute w-full text-center  transform -translate-y-1/2">
    <p className="text-xs font-medium">{value}hPa</p>
  </div>
</div>

  );
}
