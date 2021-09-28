import React from "react";
import styled from "styled-components";

export interface IHighlight2D {
  color: string;
  start: number;
  end: number;
}

interface IHighlightsProps {
  highlights: IHighlight2D[];
}

const HighlightSection = styled.div`
  display: block;
`;

const HighlightBox = styled.div`
  width: ${({ width }) => width}%;
  height: 30px;
  background-color: ${(p) => p.color};
  margin-left: ${(p) => p.offset}%;
  position: absolute;
`;

const Line = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
`;

const Highlights: React.FC<IHighlightsProps> = React.memo(({ highlights }) => {
  const [sortedHightlights, setSortHightlights] = React.useState<
    Array<Array<IHighlight2D>>
  >([]);
  const sortLines = () => {
    const lines: Array<Array<IHighlight2D>> = [];
    let alreadyAdded = false;
    let canAdd = false;
    let addToIndex = 0;

    //loop through highlights
    // for each hightlight, we'll check where it should go
    highlights.forEach((highlight, i) => {
      let innerLineLengthSum = 0;
      const highlightLength = +(highlight.end - highlight.start).toFixed(2);

      // we want to see if the highlights can be added to a line
      // or if we need to create a new line
      lines.forEach((innerLine, j) => {
        if (alreadyAdded) return;
        // we want to get the total length of the items in each line
        innerLineLengthSum = innerLine.reduce(
          (a, b) => a + (b.end - b.start),
          0
        );

        // add the sum length of the inner line and the length of current highlight
        // we want to see if the total length can fit in a line and exit this line
        innerLineLengthSum = +(innerLineLengthSum + highlightLength).toFixed(2);
        if (innerLineLengthSum > 1) {
          canAdd = false;
          return;
        }
        // we want to check if the current highlight's start overlaps with any
        const overlap = innerLine.find((prev) => highlight.start < prev.end);
        if (!overlap) {
          canAdd = true;
          addToIndex = j;
          alreadyAdded = true;
          return;
        }
      });

      if (canAdd) {
        lines[addToIndex] = [...lines[addToIndex], highlight];
      } else {
        lines.push([highlight]);
      }
      alreadyAdded = false;
    });
    setSortHightlights(lines);
  };

  React.useEffect(() => {
    sortLines();
  }, []);

  if (sortedHightlights.length === 0) return null;

  const setHighlights = () => {
    return sortedHightlights.map((line, idx) => {
      return (
        <Line key={idx}>
          {line.map(({ color, start, end }) => (
            <HighlightBox
              key={color}
              width={(end - start) * 100}
              color={color}
              offset={start * 100}
            />
          ))}
        </Line>
      );
    });
  };

  return <HighlightSection>{setHighlights()}</HighlightSection>;
});

export default React.memo(Highlights);
