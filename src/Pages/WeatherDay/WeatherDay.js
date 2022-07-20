import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePosition } from 'use-position';
import { Loader } from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';

import bg from '../../img/bg.jpg';

import '../../css/main.scss';

export function WeatherDay() {
    const [timezone, setTimezone] = useState('');
    const [current, setCurrent] = useState('');
    const [showWeek, setWeekState] = useState(true);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');

    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);

    useEffect(async () => {
        if (latitude && longitude) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly&appid=31fa604cfd64c0ecee33687d54883d8b`)

                if (response && response.status === 200) {
                    const { timezone, current } = response.data;
                    setCurrent(current);
                    setTimezone(timezone);
                    setLoader(false);
                }
            } catch (e) {
                setError(true);
                setErrorDescription(e.toString());
                setLoader(false);
            }
        }

    }, [latitude, longitude])

    const currDate = new Date().toLocaleDateString( 'en-GB');

    return (
        <>
            <img className="img" src={bg} alt=""/>
            {
                !loader ?
                    <div className="main">
                        <Link to="/week">
                            <button className="btn"
                                      onClick={() => {setWeekState(!showWeek)}}>A week
                            </button>
                        </Link>
                        {
                            error ?
                            <div>
                                {errorDescription}
                            </div>
                                :
                                <div>
                                    <div className="info-area">
                                        <h1 className="country-name">{ timezone.split('/')[1] }</h1>
                                        <p className="date">{currDate}</p>
                                    </div>
                                    {

                                        <div className="info-area">
                                            <h1 className="temperature">{Math.floor(current.temp)}°c</h1>
                                            <h2 className="clouds">{current.weather[0].description}</h2>
                                        </div>

                                    }
                                </div>
                        }
                    </div>
                    :
                    <Loader/>
            }
        </>
    )
}
