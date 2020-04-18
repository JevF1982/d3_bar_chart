const w = 800;
const h = 800;
const padding = 70;

var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(url, (data) => {
  const allData = data.data;
  const dates = allData.map((dat) => new Date(dat[0]));

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(allData, (d) => d[1])])
    .range([h - padding, padding]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", 2)
    .attr("height", (d) => h - yScale(d[1]) - padding)
    .attr("x", (d, i) => xScale(dates[i]))
    .attr("y", (d) => yScale(d[1]))
    .attr("fill", "navy")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .on("mouseover", function (d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html("GDP: " + d)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY + 20 + "px");
      tooltip.attr("data-date", d[0]);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(400).style("opacity", 0);
    });

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis);
  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .attr("id", "y-axis")
    .call(yAxis);
});
