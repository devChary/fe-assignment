import React, { useEffect, useRef } from 'react';

/* Packages */
import * as d3 from 'd3';

/* Styles */
import './styles.scss';

const LineChart = ({ marketRates, range }) => {
    const svgRef = useRef(null);
    
    /* Generates Line chart */
    const generateGraph = async () => {
        const parseTime = d3.timeParse("%Y-%m-%d");
        const data = marketRates.map((d) => {
          return {
            date: parseTime(d.day),
            high: +d.high,
            low: +d.low,
            mean: +d.mean
          }
        });
    
        /* set the dimensions and margins of the graph */
        const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 1160 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
        /* append the svg object to the defined ref */
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        /* add X axis and Y axis */
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // define the 1st line
        const valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.high); });

        // define the 2nd line
        const valueline2 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.low); });

         // define the 3nd line
         const valueline3 = d3.line()
         .x(function(d) { return x(d.date); })
         .y(function(d) { return y(d.mean); });
    
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, function(d) {
          return Math.max(d.high, d.low); })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", "#F7CE74")
            .attr("stroke-width", 1.5)
            .attr("d", valueline);

        // Add the valueline2 path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", "#82B1FF")
            .attr("stroke-width", 1.5)
            .attr("d", valueline2);

        // Add the valueline3 path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "red")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("d", valueline3);
        
        svg.append("g")
          .attr("class", "axisGray")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x)
                 .ticks(data.length / 12));

        /* Convert value to two decimal dollar format */
        const dollarFormat = (d) => d3.format("($.2f")(d);

        svg.append("g")
          .attr("class", "axisGray")
          .call(d3.axisLeft(y)
            .ticks(3)
            .tickFormat(dollarFormat)
          );
          
        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
            .ticks(3));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
        }
      
        useEffect(() => {
          if (marketRates?.length > 0 && range) {
              generateGraph();
          }
        }, [marketRates, range]);
      
    return (<div>
        <svg ref={svgRef}></svg>
    </div>)
}

export default LineChart;