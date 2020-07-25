
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
  .range([0, width]);


// define helper functions