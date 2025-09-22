import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

interface HomeProp{
    userName: string;
    userId: number;
    userState: string; 
}

function Home() {
    const [homeState, setHomeState] = useState<HomeProp[]>();

    useEffect(() => {
        LoadHomeData();
    }, []);

    const contents = homeState === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>UserName</th>
                    <th>UserId</th>
                    <th>UserState</th>
                </tr>
            </thead>
            <tbody>
                {homeState.map(homeprop =>
                    <tr key={homeprop.userId}>
                        <td>{homeprop.userName}</td>
                        <td>{homeprop.userId}</td>
                        <td>{homeprop.userState}</td>
                    </tr>
                )}
            </tbody>
        </table>;


    return (
        <div>
            <h1 id="tableLabel">Home Page</h1>
            {contents}
        </div>
    );

    async function LoadHomeData() {
        const response = await fetch('https://localhost:7170/homeprop');
        if (response.ok) {
            const data = await response.json();
            setHomeState(data);
        }
    }
}

export default Home;