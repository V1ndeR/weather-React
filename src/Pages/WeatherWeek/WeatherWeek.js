import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePosition } from 'use-position';
import { Link } from 'react-router-dom';
import { Loader } from '../../Components/Loader/Loader';
import daysOfTheWeek from '../../daysOfTheWeek';

import bg from '../../img/bg.jpg';

export function WeatherWeek() {
    const [timezone, setTimezoneState] = useState('');
    const [daily, setDaily] = useState([]);
    const [loader, setLoader] = useState(true);
    const [showDay, setDayState] = useState(true);
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
                    const { timezone, daily } = response.data;
                    setDaily(daily);
                    setTimezoneState(timezone);
                    setLoader(false);
                }
            } catch (e) {
                setError(true);
                setErrorDescription(e.toString());
                setLoader(false);
            }
        }

    }, [latitude, longitude])

    return (
        <>
            <img className="img" src={bg} alt=""/>
        {   !loader ?
            <div className="main">
                <Link to="/">
                    <button className="btn"
                            onClick={() => {setDayState(!showDay)}}>Day
                    </button>
                </Link>
                <div className="info-area">
                    <h2 className="country-name">{ timezone.split('/')[1] }</h2>
                    <p className="date">Forecast for the week</p>
                </div>
                <div className="info-area">
                    <hr className="line" align="center" width="500" size="1" color="#01578a" />
                    {
                        error ?
                            <div>
                                <h1 className="error">{errorDescription}</h1>
                            </div>
                            :
                            <table>
                                <tbody>
                                    <tr>
                                        <td/>
                                        <td/>
                                        <td>Day</td>
                                        <td>Night</td>
                                    </tr>
                                    {
                                        daily.map((day, index) => {
                                            if (index !== 0) {
                                                const dayIndex = new Date(day.dt * 1000).getDay();
                                                const dayName = daysOfTheWeek[dayIndex];
                                                return (
                                                    <tr key={day.dt}>
                                                        <td className="days">{dayName}</td>
                                                        <td>{day.weather[0].description}</td>
                                                        <td>{Math.floor(day.temp.day)}</td>
                                                        <td>{Math.floor(day.temp.night)}</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                    }
                    <hr className="line" align="center" width="500" size="1" color="#01578a" />
                </div>
            </div>
            : <Loader/>
        }
        </>
    )
}
