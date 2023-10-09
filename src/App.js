import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Header from './components/Header';
import Footer from './components/Footer';

import './css/App.scss';

function App() {
    const menu = [
        {
            id: '1',
            link: '/',
            text: 'Converter'
        }, {
            id: '2',
            link: '/list',
            text: 'Corrency list'
        },
    ];

    return (
        <Router basename={ '/currency' }>
            <div className="flex flex-col min-h-screen">
                <Header menu={ menu }/>
                <div className="container mx-auto px-4">
                    <div className="my-10">
                        <Routes>
                            <Route path="/" element={ <HomePage /> } />
                            <Route path="/list" element={ <ListPage /> } />
                        </Routes>
                    </div>
                </div>
                <Footer copy="©2023 Example for github by ekunitsa" />
            </div>
        </Router>
    );
}

export default App;
