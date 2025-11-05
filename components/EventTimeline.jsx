"use client";
import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { CalendarClock, CalendarPlus} from "lucide-react";
import { useState, useEffect } from "react";
import { Card1 } from "./Card";

const border="rgb(99 ,55, 44)";
const arrow = "rgb(rgb(47 ,79, 47)";


const dataExamples = [
  {
    props: {
      date: '2011 - present',
      className: 'vertical-timeline-element--work',
      contentStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
      iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
      icon: <CalendarClock />,
    },
    title: 'Creative Director',
    subtitle: 'Miami, FL',
    content:
      'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
  },
  {
    props: {
      date: '2010 - 2011',
      className: 'vertical-timeline-element--education',
      contentStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  rgb(233, 30, 99)' },
      iconStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
      icon: <CalendarClock />,
    },
    title: 'Content Marketing for Web, Mobile and Social Media',
    subtitle: 'Online Course',
    content: 'Strategy, Social Media',
  },
];


const EventTimeline = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    setElements([...elements, ...dataExamples]);
  };

  const addButton = () => (
    <CalendarPlus color="#2F4F2F" fill="#f0e6da"/>
  );

  const getTimelineElements = () =>
    elements.map(element => (
      <VerticalTimelineElement
      key={Math.random().toString(36).substr(2, 9)}
          className="vertical-timeline-element--work "
          contentStyle={{ background:"#2F4F2F", color: "#f0e6da" }}
          contentArrowStyle={{ borderRight: `7px solid ${arrow}`}}
          date="2011 - present"
          dateClassName="text-brown-100 font-bold"
          iconStyle={{ background: "#f0e6da", color: "#2F4F2F" }}
          icon={<CalendarClock/>}
        >
          {/* <h3 className="vertical-timeline-element-title">{element.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{element.subtitle}</h4>
          <p>
            {element.content}
          </p> */}
          <Card1 image="/chakra.png" text={element.title} description={element.content} />
        </VerticalTimelineElement>
    ));


  return (
    <div>
      <VerticalTimeline lineColor={border} className="cursor-default select-none">
        {getTimelineElements()}
        <VerticalTimelineElement
          iconStyle={{ background: "#f0e6da", color: "#2F4F2F" }}
          iconOnClick={loadMore}
          icon={addButton()}
          shadowSize="small" // small, medium or large
        />
      </VerticalTimeline>
    </div>
  )
}

export default EventTimeline
