import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "contexts/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    </ChakraProvider>
  )
};

export default MyApp;
