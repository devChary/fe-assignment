import React, { useEffect, useRef } from 'react';

/* Packages */
import * as d3 from 'd3';
import './styles.scss';

const LineChart = ({ marketRates, range }) => {
    const svgRef = useRef(null);
    
    /* Generates Line chart */
    const generateGraph = async () => {
        const parseTime = d3.timeParse("%Y-%m-%d");
        const data = marketRates.map((d) => {
          return {
            date: parseTime(d.day),
            ...d
            }
        });
    
        /* set the dimensions and margins of the graph */
        var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 960 - margin.left - margin.right,
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
    
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d?.[range]; })]);
        
        svg.append("g")
          .attr("class", "axisGray")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x)
                 .ticks(data.length / 5));

        /* Convert value two decimal dollar format */
        const dollarFormat = (d) => d3.format("($.2f")(d);

        svg.append("g")
          .attr("class", "axisGray")
          .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(dollarFormat)
          );
          
        /* add line */ 
        const valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y( d?.[range]); });

        svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "#82B1FF")
          .attr("stroke-width", 1.5)
          .attr("d", valueLine);
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