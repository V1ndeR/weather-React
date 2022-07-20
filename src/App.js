import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { WeatherDay } from './Pages/WeatherDay/WeatherDay';
import { WeatherWeek } from './Pages/WeatherWeek/WeatherWeek';
import NotFound from './Components/NotFound/NotFound';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={WeatherDay} />
                <Route path="/week" component={WeatherWeek} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
