import React, { useEffect } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import styles from './BarChart.module.css'
const BarChart = ({ data }) => {
  const height = 200;
  const width = 300;
  const margin = { top: 20, right: 30, bottom: 30, left: 100 };
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => Number(d.accuracy))])
    .rangeRound([margin.left, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.model))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);
  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .style("color", "white")
      .call(d3.axisLeft(y).tickSizeOuter(0));

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .style("color", "white")
      .call(d3.axisBottom(x).ticks(null, "s"))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", margin.left - 2)
          .attr("y", 20)
          .attr("fill", "white")
          .attr("text-anchor", "end")
          .text("Accuracy (%)")
      );

  const ref = useD3(
    (svg) => {
      svg.select(".y-axis").call(yAxis);
      svg.select(".x-axis").call(xAxis);

      svg
        .select(".plot-area")
        .attr("fill", "#5a8165")
        .selectAll(".bar")
        .data(data)
        .join((enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => y(d.model))
            .attr("height", y.bandwidth())
            .attr("x", margin.left)
            .attr("width", 0) // Start with width at 0 for animation
            .transition() // Apply the transition
            .delay((d, i) => i * 100) // Delay each bar based on its index
            .duration(800) // Set the duration of the animation (in milliseconds)
            .attr("width", (d) => x(d.accuracy) - x(0))
        );
    },
    [data]
  );
  useEffect(() => {
    /// Trigger the chart animation when the component mounts
    d3.select(ref.current)
      .selectAll(".bar")
      .transition()
      .delay((d, i) => i * 100) // Delay each bar based on its index
      .duration(800) // Set the duration of the animation (in milliseconds)
      .attr("width", (d) => x(d.accuracy) - x(0));
  }, [data]);

  return (
    <div className={styles["chart-container"]}>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          height: '100%',
          width: '100%',
          maxHeight: '100%',
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
