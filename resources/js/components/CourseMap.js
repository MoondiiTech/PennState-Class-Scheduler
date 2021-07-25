import React, { useEffect } from 'react';
import * as d3 from "d3";

function CourseMap(props) {
    let width = 568;
    let height = 380;

    let completedColor = d3.rgb(35, 56, 118);
    let incompleteColor = d3.rgb(150, 150, 150);
    let plotColor = d3.rgb(240, 240, 240);
    let plotLabelColor = d3.rgb(80, 80, 80);

    let completedTextColor = d3.rgb(240, 240, 240)
    let incompleteTextColor = d3.rgb(50, 50, 50)

    let textYOffset = 5;
    let circleRadius = 35;


    const initMap = () => {
        console.log("init map", props)

        let mapSvg = d3.select("#course-map")
            .attr("height", height)
            .attr("width", width)

        mapSvg
            .append("text")
            .classed("map-label", 1)
            .attr("y", 10)
            .attr("x", width / 6)
            .attr("text-anchor", "middle")
            .style("fill", plotLabelColor)
            .style("font-size", "11px")
            .text("Prerequisites");

        mapSvg
            .append("text")
            .classed("map-label", 1)
            .attr("y", 10)
            .attr("x", 3 * width / 6)
            .attr("text-anchor", "middle")
            .style("fill", plotLabelColor)
            .style("font-size", "11px")
            .text("Concurrent");

        mapSvg
            .append("text")
            .classed("map-label", 1)
            .attr("y", 10)
            .attr("x", 5 * width / 6)
            .attr("text-anchor", "middle")
            .style("fill", plotLabelColor)
            .style("font-size", "11px")
            .text("Open Courses");

        mapSvg
            .append("text")
            .attr("id", "map-selected-course-label")
            .classed("map-label", 1)
            .classed("map-course", 1)
            .attr("y", height / 2 + textYOffset)
            .attr("x", 3 * width / 6)
            .attr("text-anchor", "middle")
            .style("fill", plotLabelColor)
            .style("font-size", "11px")
            .text("Select A Course");

    }

    const updateMap = () => {

        let centerX = width / 2
        let centerY = height / 2

        let mapSvg = d3.select("#course-map")

        mapSvg.selectAll(".map-course").remove();

        

        if (!props.selectedCourse) {
            mapSvg
                .append("text")
                .attr("id", "map-selected-course-label")
                .classed("map-label", 1)
                .classed("map-course", 1)
                .attr("y", centerY + textYOffset)
                .attr("x", centerX)
                .attr("text-anchor", "middle")
                .style("fill", plotLabelColor)
                .style("font-size", "11px")
                .text("Select A Course");

            return;
        }
       

        let selectedCourse = props.selectedCourse;

        

        if (selectedCourse.prerequisites.length > 0) {

            let count = selectedCourse.prerequisites.length;

            let prereqs = mapSvg.selectAll(".map-prereq")
                .data(selectedCourse.prerequisites, (d) => {
                    return d.id;
                })
                .enter();

            prereqs
                .append("line")
                .attr("id", "map-selected-course-label")
                .classed("map-line", 1)
                .classed("map-course", 1)
                .classed("map-prereq", 1)
                .attr("x1", width / 6)
                .attr("y1",(d, i) => {
                    return ((i + 1) * height) / (count + 1)
                })
                .attr("x2", centerX)
                .attr("y2", centerY)
                .style("stroke", plotLabelColor)
                .style("stroke-width", 1);

            prereqs
                .append("circle")
                .attr("id", "map-selected-course-label")
                .classed("map-circle", 1)
                .classed("map-course", 1)
                .classed("map-prereq", 1)
                .attr("cy", (d, i) => {
                    return ((i + 1) * height) / (count + 1)
                })
                .attr("cx",  width / 6)
                .attr("r", circleRadius)
                .style("fill", (d) => {
                    return (d.isCompleted) ? completedColor : incompleteColor
                })
                // .on('click', (d) => {
                //     props.selectCourse(d.id);
                // })

            prereqs
                .append("text")
                .attr("id", "map-selected-course-label")
                .classed("map-label", 1)
                .classed("map-course", 1)
                .classed("map-prereq", 1)
                .attr("y", (d, i) => {
                    return ((i + 1) * height) / (count + 1) + textYOffset;
                })
                .attr("x", width / 6)
                .attr("text-anchor", "middle")
                .style("fill", (d) => {
                    return (d.isCompleted) ? completedTextColor : incompleteTextColor
                })
                .style("font-size", "11px")
                .text((d) => {
                    return d.abbreviation;
                })
                // .on('click', (d) => {
                //     props.selectCourse(d.id);
                // })

        }


        if (selectedCourse.childCourses.length > 0) {

            let count = selectedCourse.childCourses.length;

            let children = mapSvg.selectAll(".map-children")
                .data(selectedCourse.childCourses, (d) => {
                    return d.id;
                })
                .enter();

            children
                .append("line")
                .attr("id", "map-selected-course-label")
                .classed("map-line", 1)
                .classed("map-course", 1)
                .classed("map-children", 1)
                .attr("x1", 5 *  width / 6)
                .attr("y1",(d, i) => {
                    return ((i + 1) * height) / (count + 1)
                })
                .attr("x2", centerX)
                .attr("y2", centerY)
                .style("stroke", plotLabelColor)
                .style("stroke-width", 1);

            children
                .append("circle")
                .attr("id", "map-selected-course-label")
                .classed("map-circle", 1)
                .classed("map-course", 1)
                .classed("map-children", 1)
                .attr("cy", (d, i) => {
                    return ((i + 1) * height) / (count + 1)
                })
                .attr("cx", 5 *  width / 6)
                .attr("r", circleRadius)
                .style("fill", (d) => {
                    return (d.isCompleted) ? completedColor : incompleteColor
                })
                // .on('click', (d) => {
                //     props.selectCourse(d.id);
                // })

            children
                .append("text")
                .attr("id", "map-selected-course-label")
                .classed("map-label", 1)
                .classed("map-course", 1)
                .classed("map-children", 1)
                .attr("y", (d, i) => {
                    return ((i + 1) * height) / (count + 1) + textYOffset;
                })
                .attr("x", 5 * width / 6)
                .attr("text-anchor", "middle")
                .style("fill", (d) => {
                    return (d.isCompleted) ? completedTextColor : incompleteTextColor
                })
                .style("font-size", "11px")
                .text((d) => {
                    return d.abbreviation;
                })
                // .on('click', (d) => {
                //     props.selectCourse(d.id);
                // })

        }

        mapSvg
            .append("circle")
            .attr("id", "map-selected-course-label")
            .classed("map-circle", 1)
            .classed("map-course", 1)
            .attr("cy", centerY)
            .attr("cx", centerX)
            .attr("r", circleRadius)
            .style("fill", (selectedCourse.isCompleted) ? completedColor : incompleteColor)


        mapSvg
            .append("text")
            .attr("id", "map-selected-course-label")
            .classed("map-label", 1)
            .classed("map-course", 1)
            .attr("y", centerY + textYOffset)
            .attr("x", centerX)
            .attr("text-anchor", "middle")
            .style("fill", (selectedCourse.isCompleted) ? completedTextColor : incompleteTextColor)
            .style("font-size", "11px")
            .text(selectedCourse.abbreviation);

    }




    useEffect(() => {
        updateMap();
    }, [props.selectedCourse])


    // loads only after initial render
    useEffect(() => {
        initMap();
    }, [])

    return (
        <div className="map-top">
            <svg id="course-map"></svg>
        </div>
    )

}

export default CourseMap;
