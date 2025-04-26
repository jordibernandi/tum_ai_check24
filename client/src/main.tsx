import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
const loadingTextContainer = createRoot(document.getElementById('loading-text-container')!);

const LoadingLogo = () => (
    <div className="text-primary font-bold text-2xl mr-2">
        STAY<span className="text-secondary">24</span>
    </div>
);

const fetchInitialData = async () => {
    return null;
};

const renderApp = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    document.getElementById('root')!.style.display = 'block';
    root.render(<App />);
};

const initializeApp = async () => {
    loadingTextContainer.render(<LoadingLogo />);
    const initialData = await fetchInitialData();
    renderApp();
};

initializeApp();