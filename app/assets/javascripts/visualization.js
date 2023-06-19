import * as d3 from 'd3';

function visualizeFormData(formData) {
  // Extract the gender data from the form data
  const genderData = formData.map(entry => entry.gender);

  // Count the occurrences of each gender
  const genderCounts = d3.rollup(
    genderData,
    v => v.length,
    d => d
  );

  // Convert the gender counts to an array of objects
  const genderCountsArray = Array.from(genderCounts, ([gender, count]) => ({
    gender,
    count
  }));

  // Create a bar chart using D3.js
  const svg = d3.select('#chart-container')
    .append('svg')
    .attr('width', 400)
    .attr('height', 300);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(genderCountsArray.map(d => d.gender));

  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(genderCountsArray, d => d.count)]);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(10, 's'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Count');

  g.selectAll('.bar')
    .data(genderCountsArray)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.gender))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count));
}

document.addEventListener('turbo:load', () => {
    fetch('/visualization')
      .then(response => response.json())
      .then(data => {
        visualizeFormData(data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  });
