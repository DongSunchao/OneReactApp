import { useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import APPRouters from './routers';

function App() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> | <Link to="/weather">Weather</Link>
                <APPRouters />
            </nav>
        </div>
    );
}





export default App;