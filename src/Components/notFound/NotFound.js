import React from 'react';
import { Link } from "react-router-dom";

import '/src/Components/notFound/notFound.scss';

const NotFound = () => (
    <div className="error-div">
        <h1 className="error">404 - Not Found!</h1>
        <Link to="/">
            Go Home
        </Link>
    </div>
);

export default NotFound;