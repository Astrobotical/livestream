import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const ResponsiveChart: React.FC = () => {
  // Track window size
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update window size state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw the SVG using D3 inside useEffect
  useEffect(() => {
    const svgWidth = windowSize.width;
    const svgHeight = windowSize.height;

    // Create the SVG element
    const svg = d3.select('#chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Example scales (change as per your data)
    const xScale = d3.scaleBand()
      .domain(['A', 'B', 'C', 'D', 'E'])
      .range([0, svgWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([svgHeight - 50, 0]);

    // Clear previous content
    svg.selectAll('*').remove();

    // Draw bars (this is just an example, you can adjust it)
    svg.selectAll('.bar')
      .data([80, 55, 70, 90, 40])
      .enter()
      .append('rect')
      .attr('class', 'bar')
     // .attr('x', (d, i) => xScale(String.fromCharCode(65 + i)))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => svgHeight - yScale(d) - 50)
      .attr('fill', 'steelblue');

    // Add X-axis
    svg.append('g')
      .attr('transform', `translate(0,${svgHeight - 50})`)
      .call(d3.axisBottom(xScale));

    // Add Y-axis
    svg.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft(yScale));

  }, [windowSize]);  // Redraw the chart whenever the window size changes

  return (
    <div className="w-full h-full">
      <svg id="chart"></svg>
    </div>
  );
};

export default ResponsiveChart;