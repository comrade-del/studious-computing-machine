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

  // Create a bar chart for gender using D3.js
  const genderSvg = d3.select('#gender-chart-container')
    .append('svg')
    .attr('width', 400)
    .attr('height', 300);

  // Set up chart dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = +genderSvg.attr('width') - margin.left - margin.right;
  const height = +genderSvg.attr('height') - margin.top - margin.bottom;

  // Create scales
  const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(genderCountsArray.map(d => d.gender));

  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(genderCountsArray, d => d.count)]);

  // Create chart container
  const g = genderSvg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add x-axis
  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add y-axis
  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(10, 's'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Count');

  // Add bars
  g.selectAll('.bar')
    .data(genderCountsArray)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.gender))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count));


  // Extract the income data from the form data
  const incomeData = formData.map(entry => entry.income_range);

  // Count the occurrences of each income range
  const incomeCounts = d3.rollup(
    incomeData,
    v => v.length,
    d => d
  );

  // Convert the income counts to an array of objects
  const incomeCountsArray = Array.from(incomeCounts, ([income, count]) => ({
    income,
    count
  }));

  // Create a bar chart for income using D3.js
  const incomeSvg = d3.select('#income-chart-container')
    .append('svg')
    .attr('width', 400)
    .attr('height', 300);

  // Set up chart dimensions
  // const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  // const width = +incomeSvg.attr('width') - margin.left - margin.right;
  // const height = +incomeSvg.attr('height') - margin.top - margin.bottom;

  // Create scales
  const xIncome = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(incomeCountsArray.map(d => d.income));

  const yIncome = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(incomeCountsArray, d => d.count)]);

  // Create chart container
  const gIncome = incomeSvg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add x-axis
  gIncome.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xIncome));

  // Add y-axis
  gIncome.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(yIncome).ticks(10, 's'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Count');

  // Add bars
  gIncome.selectAll('.bar')
    .data(incomeCountsArray)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xIncome(d.income))
    .attr('y', d => yIncome(d.count))
    .attr('width', xIncome.bandwidth())
    .attr('height', d => height - yIncome(d.count));
}

document.addEventListener('turbo:load', () => {
  // Remove the previous charts
  d3.select('#gender-chart-container').selectAll('*').remove();
  d3.select('#income-chart-container').selectAll('*').remove();

  fetch('/visualization')
    .then(response => response.json())
    .then(data => {
      visualizeFormData(data);
    })
    .catch(error => {
      console.error('Error fetching form data:', error);
    });
});
