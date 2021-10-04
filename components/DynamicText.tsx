import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Text } from "@chakra-ui/react"

const DynamicText = (props, ref) => {
    const [value, setValue] = useState("Random Text 2");

    useImperativeHandle(ref, () => ({
        changeValue: (newValue) => {
            setValue(newValue);
      }
    }));

    return <Text w={'40'} fontSize={"20px"}>{value}</Text>;
};

export default forwardRef(DynamicText);
