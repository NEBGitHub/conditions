import React from 'react';
import PropTypes from 'prop-types';
import ProjectDot from '../../ProjectDot';

const CompanyFlag = ({
  flagLayout,
  dotWidth,
  dotSpacing,
  x,
  y,
  svgHeight,
  rotation,
  relevantProjectLookup,
  filteredProjectLookup,
}) => {
  if (!flagLayout) { return null; }

  const baseY = y + svgHeight - (flagLayout[0].length * dotSpacing);

  const columnOffset = {
    x: dotSpacing * Math.sin(Math.PI / 3),
    y: dotSpacing / 2,
  };
  const circles = flagLayout.reduce((out, columnDots, columnIndex) => {
    const columnX = -(columnIndex * columnOffset.x);
    const columnY = baseY + (columnIndex * columnOffset.y);

    columnDots.forEach((dot, dotIndex) => {
      const dotY = columnY + (dotIndex * dotSpacing);

      if (dot) {
        out.push({
          cx: x + columnX,
          cy: y + dotY,
          r: dotWidth / 2,
          filtered: filteredProjectLookup[flagLayout[columnIndex][dotIndex]],
          relevant: relevantProjectLookup[flagLayout[columnIndex][dotIndex]],
        });
      }
    });

    return out;
  }, []);

  return (
    <g className="CompanyFlag" transform={`rotate(${rotation})`}>
      {circles.map(circle => (<ProjectDot key={`${circle.cx},${circle.cy}`} {...circle} />))}
    </g>
  );
};

CompanyFlag.propTypes = {
  flagLayout: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ),
  ).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  svgHeight: PropTypes.number.isRequired,
  dotWidth: PropTypes.number,
  dotSpacing: PropTypes.number,
  rotation: PropTypes.number,
  relevantProjectLookup: PropTypes.arrayOf(PropTypes.bool),
  filteredProjectLookup: PropTypes.arrayOf(PropTypes.bool),
};

CompanyFlag.defaultProps = {
  x: 0,
  y: 0,
  dotWidth: 16,
  dotSpacing: 24,
  rotation: 0,
  relevantProjectLookup: [],
  filteredProjectLookup: [],
};

export default CompanyFlag;
