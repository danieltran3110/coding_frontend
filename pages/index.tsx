import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input } from "@chakra-ui/react"
import { useRef } from "react";

const Home = () => {
    const dynamicTextEl = useRef(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        dynamicTextEl.current.changeValue(e.target.value);
    };

    return (
        <div className={styles.container}>
        <Head>
            <title>Coding Tests</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <DynamicText ref={dynamicTextEl} />
            <Input placeholder="Basic usage" onChange={onChange} />
        </main>
        </div>
    );
};

export default Home;
