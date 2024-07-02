import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [category, setCategory] = useState('');
    const location = useLocation();
    const history = useNavigate();
    const userId = getUserIdFromLocation(location);
    const show = location.pathname === '/' || location.pathname === '/signup';
    const isOnHomeRoute = location.pathname.startsWith('/home');
    const isRegistrationRoute = location.pathname.startsWith('/registrations');

    function handleClick(selectedCategory) {
        setCategory(selectedCategory);
        console.log(selectedCategory);
        // Navigate to the home route with the selected category
        history.push(`/home/${userId}?category=${selectedCategory}`);
    }

    // Example function to extract userId from the pathname
    function getUserIdFromLocation(location) {
        const parts = location.pathname.split('/');
        return parts[parts.length - 1]; // Assuming userId is the last part of the pathname
    }

    return (
        <>
            {!show && (
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backdropFilter: 'blur(10px)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, marginBottom: '56px' }}>
                    <a className="navbar-brand" href="#">EventHub</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {!isOnHomeRoute && (
                                <li className="nav-item">
                                    <Link to={`/home/${userId}`} className="nav-item active" style={{ color: '#ff5a91' }}>
                                        Home <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                            )}
                            {!isRegistrationRoute && (
                                <li className="nav-item">
                                    <Link to={`/registrations/${userId}`} className="nav-item active" style={{ color: '#ff5a91' }}>
                                        My Registrations <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                            )}
                            {isOnHomeRoute && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Category
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" onClick={(e) => handleClick(e.values)}>Music Festival</a>
                                        <a className="dropdown-item" onClick={(e) => handleClick('Sports')}>Sports</a>
                                        <a className="dropdown-item" onClick={(e) => handleClick('Others')}>Others</a>
                                    </div>
                                </li>
                            )}
                        </ul>
                        {/* Search bar added here */}
                        <div className="searchBox ml-auto">
                            <input className="searchInput" type="text" name="" placeholder="Search something" />
                            <button className="searchButton" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                    <g clipPath="url(#clip0_2_17)">
                                        <g filter="url(#filter0_d_2_17)">
                                            <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"></path>
                                        </g>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                            <feOffset dy="4"></feOffset>
                                            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
                                        </filter>
                                        <clipPath id="clip0_2_17">
                                            <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}
