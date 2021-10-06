import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Text } from "@chakra-ui/react"

const DynamicText = (props, ref) => {
    const [value, setValue] = useState("Random Text");

    useImperativeHandle(ref, () => ({
        changeValue: (newValue) => {
            setValue(newValue);
      }
    }));

    return <Text w={'xs'} textAlign="center" fontSize={"20px"}>{value}</Text>;
};

export default forwardRef(DynamicText);
