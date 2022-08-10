document.addEventListener("DOMContentLoaded", () => {
  d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
  ).then((data) => {
    drawHeatMap(data.monthlyVariance);
  });
});

const drawHeatMap = (dataset) => {
  console.log(dataset);

  const svg = d3.select("svg");

  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const parseYear = d3.timeParse("%Y");

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, (d) => parseYear(d.year)),
      d3.max(dataset, (d) => parseYear(d.year)),
    ])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleTime()
    .domain([new Date().setMonth(0), new Date().setMonth(11)])
    .range([0, innerHeight]);

  //Define x, y axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  g.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${0}, ${innerHeight})`)
    .call(xAxis);

  g.append("g").attr("id", "y-axis").call(yAxis);
};
