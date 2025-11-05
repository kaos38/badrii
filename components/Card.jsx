"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Image from "next/image";

export function Card(props) {
  return (
    <CardContainer className="inter-var flex justify-center items-center md:mx-auto">
      <CardBody
        className="section-card border-spiritual-gold/20 border-2 relative group/card  
         sm:w-[30rem] h-auto rounded-3xl p-6 bg-white/90"
      >
        <CardItem translateZ="50" className="text-xl font-bold text-spiritual-gold font-quicksand">
          {props.text}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-spiritual-green font-medium text-sm max-w-sm mt-2 leading-relaxed"
        >
          {props.description}
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <Image
            src={props.image}
            alt="thumbnail"
            width={500}
            height={500}
            className="h-65 w-full object-cover saturate-100 rounded-2xl image-hover-glow"
            loading="lazy"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export const Card1 = (props) => {
  return (
    <CardContainer className="inter-var flex  mx-0 md:mx-auto hover:text-shadow-lg ">
      <CardBody
        className="border-amber-100 relative group/card  
          h-auto rounded-xl"
      >
        <CardItem
          translateZ="50"
          className="md:text-xl text-wrap font-bold text-primary"
        >
          {props.text}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-primary font-semibold text-sm  mt-2 "
        >
          {props.description}
        </CardItem>
        <CardItem translateZ="100" rotateX={20} rotateZ={-10}>
          <Image
            src={props.image}
            alt="thumbnail"
            width={500}
            height={500}
            className="saturate-100  w-full rounded-lg"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {/* Try now → */}
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary  text-white text-xs font-bold"
          >
            {/* Sign up */}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
