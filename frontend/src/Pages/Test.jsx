import React, { useState } from "react";
import Carousel from "react-elastic-carousel";

const Test = () => {
  const [items] = useState([
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ]);

  return (
    <Carousel>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </Carousel>
  );
};

export default Test;
