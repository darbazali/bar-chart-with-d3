
// import d3 package
import * as d3 from 'd3'

// create container
const container = d3.select('#container')

  // Create the titel
container.append('h2')
  .attr('id', 'title')
  .text('Gross Domestic Product')

// define margins
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
}

// define dimensions
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// create the svg canvas
const canvas = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);


// create a group for svg elements
const svgGroups = canvas
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)


// define scales
  // X Scale
const xScale = d3.scaleTime()
  .range([0, width]);

  // Y Scale
const yScale = d3.scaleLinear()
  .range([height, 0]);


// define helper functions
const parseTime = d3.timeParse("%Y-%m-%d");
const formatTime = d3.timeFormat("%Y-%m-%d");



// Grab data with Fetch API
const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch( api_url )
.then( res => res.json() )
.then( json => {
  const data = json["data"]
  drawBarChart(data)
})


const drawBarChart = data => {
  // format time
  data.forEach(d => {
    d[0] = parseTime(d[0]);
    d[1] = +d[1]
  });

  const barWidth = width / data.length;


  // define domains for the scales
  xScale.domain(d3.extent(data, d => d[0]))
  yScale.domain(d3.extent(data, d => d[1] )).nice()

  // Define Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // draw X Axis
  svgGroups
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  svgGroups
    .append('g')
    .attr('id', 'y-axis')
    .call(yAxis)

  // create tooltip
  const tooltip = container
    .append('div')
    .attr('id', 'tooltip')


  // plot the chart
  svgGroups
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')

    // set data points
    .attr('data-date', d => formatTime(d[0]))
    .attr('data-gdp', d => d[1])

    // set coordinates
    .attr('x', (d, i) => ( width / data.length ) * i )
    .attr('y', d => yScale(d[1]))

    // set size
    .attr('width', barWidth)
    .attr('height', d => height - yScale(d[1]))

    .attr('class', 'bar')
}