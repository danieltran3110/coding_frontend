import React, { useState } from "react";
import { Text } from "@chakra-ui/react"

const DynamicText = () => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return <Text fontSize={"20px"}>{value}</Text>;
};

export default DynamicText;
