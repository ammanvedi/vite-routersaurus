import React from 'react'
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <ul>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/items/myitem">Item Page</Link>
            </li>
        </ul>
    );
};

export default Index;
