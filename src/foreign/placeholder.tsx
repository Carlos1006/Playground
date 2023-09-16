import { FC, useId } from 'react';
import { Box, CircularProgress } from '@mui/material';
import DonutGraphStyle from './styles';
import { HALF_VIEW, TRIANGLE_HALF_SIDE, VIEW } from './constants';
import { IDonutGraphPlaceholder } from './types';

const DonutGraphPlaceholder: FC<IDonutGraphPlaceholder> = ({
  size
}: IDonutGraphPlaceholder) => {
  const id = useId();
  const maskId = `mask-${id}`;
  return (
    <>
      <Box className="donut" sx={DonutGraphStyle} width={size} height={size}>
        <div className="center">
          <CircularProgress size={80} />
        </div>
        <Box className="container" sx={{ width: size, height: size }}>
          <div
            className="graph"
            style={{
              width: size,
              height: size
            }}
          >
            <svg viewBox={`0 0 ${VIEW} ${VIEW}`}>
              <mask id={maskId}>
                <g>
                  <rect width="100%" height="100%" fill="white" />
                  <polygon
                    points={`${VIEW - (50 + 2)},${
                      HALF_VIEW - TRIANGLE_HALF_SIDE
                    } ${VIEW - (50 + 2)},${HALF_VIEW + TRIANGLE_HALF_SIDE} ${
                      VIEW - 50 + TRIANGLE_HALF_SIDE
                    },${HALF_VIEW}`}
                    fill="black"
                  />
                  <circle
                    r={HALF_VIEW - 50}
                    cx={HALF_VIEW}
                    cy={HALF_VIEW}
                    fill="black"
                  />
                </g>
              </mask>
              <circle
                mask={`url(#${maskId})`}
                r={HALF_VIEW - 1}
                cx={HALF_VIEW}
                cy={HALF_VIEW}
                fill="rgb(120,120,120)"
              />
            </svg>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default DonutGraphPlaceholder;
