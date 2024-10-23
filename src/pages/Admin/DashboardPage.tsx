import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ViewsCount, FollowersCount, MoneyMade } from './Dashboard/segments';
const generateRandomData = (length: number, max: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
};

const DashboardPage = () => {
  const [data, setData] = useState({
    streams: generateRandomData(4, 10),
    pageViews: generateRandomData(5, 100),
    viewers: generateRandomData(5, 100),
  });

  useEffect(() => {
    document.title = "Dashboard | Yardie";
    if (data.streams.length && data.pageViews.length && data.viewers.length) {
      createGraphs();
    }
  }, [data]);

  const createGraphs = () => {
    // Clear previous graphs
    d3.select('#pageViewsGraph').selectAll('*').remove();
    // Create Page Views Graph
    const pageViewsSvg = d3.select('#pageViewsGraph')
      .append('svg')
      .attr('height', 500);

    const pageViewsData = data.pageViews.map(
      (value, index) => (
        { name: `Page ${index + 1}`, value }));

    const xScalePageViews = d3.scaleBand()
      .domain(pageViewsData.map(d => d.name))
      .range([0, 500])
      .padding(0.1);

    const yScalePageViews = d3.scaleLinear()
      .domain([0, d3.max(pageViewsData, d => d.value) as number])
      .range([300, 0]);

    // Append the bars for the bar chart
    pageViewsSvg.selectAll('.bar')
      .data(pageViewsData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScalePageViews(d.name) as number)
      .attr('y', d => yScalePageViews(d.value))
      .attr('width', xScalePageViews.bandwidth())
      .attr('height', d => 300 - yScalePageViews(d.value))
      .attr('fill', 'steelblue');

    // Append and style the x-axis
    pageViewsSvg.append('g')
      .attr('class', 'x-axis') // Add a class to target the x-axis labels later
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(xScalePageViews));

    // Style the x-axis text labels after appending the axis
    pageViewsSvg.selectAll('.x-axis text')
      .style('fill', 'white')          // Change the label color to white// Rotate the labels
      .attr('text-anchor', 'start');   // Align the rotated text to the start

    // Append and styl e the y-axis
    pageViewsSvg.append('g')
      .call(d3.axisLeft(yScalePageViews).ticks(5));
    // Create Viewers Graph
  };
  //<div id="pageViewsGraph" className="mb-8 w-full"></div>
  return (
    <div className=" sm:p-8 ">
      <h2 className="md:text-2xl sm:text-xl font-bold mb-4 text-white">Dashboard Analytics (Not Completed)</h2>
      <div className="flex items-center justify-between rounded-lg p-4 gap-4 ">
        <ViewsCount />
        <FollowersCount />
        <MoneyMade />
      </div>
    </div>
  );
};


export default DashboardPage;