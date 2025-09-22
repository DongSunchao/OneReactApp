import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

interface HomeProp{
    username: string;
    userId: number;
    UserState: string; // Assuming
}

function Home() {
    const [homeState, setHomeState] = React.useState<HomeProp[]>();

    useEffect(() => {
        LoadHomeData();
    }, []);

    const contents = homeState === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>UserId</th>
                    <th>UserState</th>
                </tr>
            </thead>
            <tbody>
                {homeState.map(home =>
                    <tr key={home.userId}>
                        <td>{home.username}</td>
                        <td>{home.userId}</td>
                        <td>{home.UserState}</td>
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
        const response = await fetch('home');
        if (response.ok) {
            const data = await response.json();
            setHomeState(data);
        }
    }
}

export default Home;