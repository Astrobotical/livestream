import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

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
    d3.select('#streamsGraph').selectAll('*').remove();
    d3.select('#pageViewsGraph').selectAll('*').remove();
    d3.select('#viewersGraph').selectAll('*').remove();

    // Create Streams Graph
    const streamsSvg = d3.select('#streamsGraph')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);

    const streamsData = data.streams.map((value, index) => ({ name: `Stream ${index + 1}`, value }));

    const xScale = d3.scaleBand()
      .domain(streamsData.map(d => d.name))
      .range([0, 500])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(streamsData, d => d.value) as number])
      .range([300, 0]);

    streamsSvg.selectAll('.bar')
      .data(streamsData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name) as number)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 300 - yScale(d.value))
      .attr('fill', 'steelblue');

    streamsSvg.append('g')
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(xScale));

    streamsSvg.append('g')
      .call(d3.axisLeft(yScale));

    // Create Page Views Graph
    const pageViewsSvg = d3.select('#pageViewsGraph')
      .append('svg')
      .attr('height', 500);

    const pageViewsData = data.pageViews.map((value, index) => ({ name: `Page ${index + 1}`, value }));

    const xScalePageViews = d3.scaleBand()
      .domain(pageViewsData.map(d => d.name))
      .range([0, 500])
      .padding(0.1);

    const yScalePageViews = d3.scaleLinear()
      .domain([0, d3.max(pageViewsData, d => d.value) as number])
      .range([300, 0]);

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

    // Add labels to the bars
    pageViewsSvg.selectAll('.label')
      .data(pageViewsData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => (xScalePageViews(d.name) as number) + xScalePageViews.bandwidth() / 2)
      .attr('y', d => yScalePageViews(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text(d => d.value);

    pageViewsSvg.append('g')
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(xScalePageViews));

    pageViewsSvg.append('g')
      .call(d3.axisLeft(yScalePageViews));

    // Create Viewers Graph
    const viewersSvg = d3.select('#viewersGraph')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);

    const viewersData = data.viewers.map((value, index) => ({ name: `Viewer ${index + 1}`, value }));

    const xScaleViewers = d3.scaleBand()
      .domain(viewersData.map(d => d.name))
      .range([0, 500])
      .padding(0.1);

    const yScaleViewers = d3.scaleLinear()
      .domain([0, d3.max(viewersData, d => d.value) as number])
      .range([300, 0]);

    viewersSvg.selectAll('.bar')
      .data(viewersData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScaleViewers(d.name) as number)
      .attr('y', d => yScaleViewers(d.value))
      .attr('width', xScaleViewers.bandwidth())
      .attr('height', d => 300 - yScaleViewers(d.value))
      .attr('fill', 'steelblue');

    // Add labels to the bars
    viewersSvg.selectAll('.label')
      .data(viewersData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => (xScaleViewers(d.name) as number) + xScaleViewers.bandwidth() / 2)
      .attr('y', d => yScaleViewers(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text(d => d.value);

    viewersSvg.append('g')
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(xScaleViewers));

    viewersSvg.append('g')
      .call(d3.axisLeft(yScaleViewers));

    pageViewsSvg.append('g')
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(xScalePageViews));

    pageViewsSvg.append('g')
      .call(d3.axisLeft(yScalePageViews));
  };

  return (
    <div className=" sm:p-8 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="md:text-2xl sm:text-xl font-bold mb-4 text-white">Dashboard Analytics (Not Completed)</h2>
        <div id="pageViewsGraph" className="mb-8 w-full"></div>
      </div>
    </div>
  );
};


export default DashboardPage;