import React, { useEffect, useState } from 'react';
import Style from './Allorders.module.css';
import { Link } from 'react-router-dom';

export default function Allorders() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
    }, []);

    return (
        <div className={Style.container}>
            <div className={Style.card}>
                <div className={Style.checkmark}>
                    ✓
                </div>
                <h1 className={Style.title}>Congratulations!</h1>
                <p className={Style.message}>Your payment was successful.</p>
                <p className={Style.details}>Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.</p>
              <Link to={`/`}>
            <button className={Style.button}>See more products</button>
            </Link>
            </div>
        </div>
    );
}

