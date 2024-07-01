import React, { useEffect, useState } from 'react';
import Style from './Home.module.css';
import ReacntProduct from '../ReacntProduct/ReacntProduct';
import CtegoriesSlider from '../CtegoriesSlider/CtegoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            // Optionally, you can perform any other actions here that you want to happen only on the first load
        }
    }, [firstLoad]);

    return (
        <>
            <MainSlider></MainSlider>
            <CtegoriesSlider></CtegoriesSlider>
            <ReacntProduct></ReacntProduct>
        </>
    );
}
