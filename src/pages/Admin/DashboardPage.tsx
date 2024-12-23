import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ViewsCount, FollowersCount, MoneyMade } from './Dashboard/segments';
import { Line } from 'react-chartjs-2'; // Importing Chart.js for line charts
import { Bar } from 'react-chartjs-2'; // Importing Chart.js for bar charts
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, ArcElement, LineElement } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, ArcElement, LineElement);

const generateRandomData = (length: number, max: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
};

const DashboardPage = () => {
  const [data, setData] = useState({
    streams: generateRandomData(4, 10),
    pageViews: generateRandomData(5, 100),
    viewers: generateRandomData(5, 100),
  });
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Dummy data for charts
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Engagement',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
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
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Card 1 */}
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Total Streams</h2>
      <p className="text-3xl text-green-400">150</p>
    </div>
    {/* Card 2 */}
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Total Users</h2>
      <p className="text-3xl text-blue-400">75</p>
    </div>
    {/* Card 3 */}
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Total Earned</h2>
      <p className="text-3xl text-red-400">5</p>
    </div>
    {/* Line Chart */}
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">User Engagement Over Time</h2>
      <Line data={lineChartData} />
    </div>
    {/* Bar Chart */}
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Votes Distribution</h2>
      <Bar data={barChartData} />
    </div>
  </main>
  );
};


export default DashboardPage;