import React from "react";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./common/components/AppLayout";
import HomePage from "./HomePage";
import TwitterReportPage from "./TwitterReportPage";
import YoutubeReportPage from "./YoutubeReportPage";
import ContactPage from "./ContactPage";
import ErrorPage from "./ErrorPage";
import './App.css';

function App() {
    return (
        <>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reporting/twitter" element={<TwitterReportPage />} />
                    <Route path="/reporting/youtube" element={<YoutubeReportPage />} />
                    <Route path="/contact-us" element={<ContactPage />} />
                    <Route element={<ErrorPage />} />
                </Routes>
            </AppLayout>
        </>
    );
}

export default App;
