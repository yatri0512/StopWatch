import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {AccessTimeFilled} from '@mui/icons-material';
import './Stopwatch.css';

const Stopwatch = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const HandleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    }
    const HandlePaused = () => {
        setIsPaused(!isPaused);
    }
    const HandleReset = () => {
        const lapList = document.getElementById('laps');
        lapList.innerHTML = '';
        setIsActive(false);
        setTime(0);
    }
    function sayHello(time) {
        const lapList = document.getElementById('laps');
        const listItem = document.createElement('li');
        listItem.textContent = `${time}`;
        lapList.appendChild(listItem);
    }
    var hour = ("0" + Math.floor((time / 3600000) % 24)).slice(-2);
    var min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    var sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    var ms = ("0" + ((time / 10) % 100)).slice(-2);
    var t = hour + ":" + min + ":" + sec + ":" + ms;
    return (
        <div>
            <div className='Timer'>
                <span className='Timer'>{t}</span>
            </div>
            <div className='button-group'>
                {isActive ? (
                    <div className='btn1'>
                        {isPaused ? (
                            <Button onClick={HandleStart} className="b1" variant="contained" color="primary">Resume</Button>
                        ) : (
                            <div className="btn2">
                                <Button onClick={HandlePaused} className="b1" variant="contained" color="error">Stop</Button>
                                <Button onClick={() => sayHello(t)} variant="contained" className="b2" color="success"><AccessTimeFilled /></Button>
                            </div>
                        )}
                        <div>
                            <Button onClick={HandleReset} className="b3" variant="contained" color="secondary" size="medium">Reset</Button>
                        </div>
                    </div>
                ) : (
                    <Button onClick={HandleStart} variant="contained" color="secondary">Start</Button>
                )}
            </div>
                <ul id="laps"></ul>
        </div>
    )
}

export default Stopwatch
