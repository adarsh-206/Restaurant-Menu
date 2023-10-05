import React, { useState, useEffect } from 'react';
import knife from '../assets/knife.png';
import jsonData from '../../public/foodData.json';
import { useAppContext } from './AppContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setSharedData } = useAppContext();

    const toggleMenu = () => {
        setOpen(!open);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        if (searchResults !== null) {
            const dataArray = Object.entries(searchResults);
            setSharedData(dataArray);
        }
    }, [searchResults]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            performSearch(searchQuery);
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const performSearch = (query) => {
        const filteredResults = Object.keys(jsonData).reduce((acc, category) => {
            const categoryData = jsonData[category];
            const categoryResults = {};

            Object.keys(categoryData).forEach(subCategory => {
                const subCategoryData = categoryData[subCategory];
                const filteredItems = subCategoryData.filter(item => {
                    return item.name.toLowerCase().includes(query.toLowerCase());
                });

                if (filteredItems.length > 0) {
                    categoryResults[subCategory] = filteredItems;
                }
            });

            if (Object.keys(categoryResults).length > 0) {
                acc[category] = categoryResults;
            }

            return acc;
        }, {});

        setSearchResults(filteredResults);
    };


    return (
        <div className="w-full text-gray-700">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                    <div className="flex justify-between items-center">
                        <img src={knife} alt="Chef" className="hidden sm:block w-6 h-6 mr-2" />
                        <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                            Food Adda
                        </a>
                        <img src={knife} alt="Chef" className="hidden sm:block w-6 h-6 ml-2" />
                    </div>
                    <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={toggleMenu}>
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                            <path
                                style={{ display: !open ? 'block' : 'none' }}
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                            <path
                                style={{ display: open ? 'block' : 'none' }}
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <nav className={`flex-col flex-grow pb-4 md:pb-0 ${open ? 'flex' : 'hidden'} md:flex md:justify-end md:flex-row`}>
                    <div className="relative text-gray-600 lg:block hidden">
                        <input
                            className="border-2 border-gray-300 bg-slate-50 h-9 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
                            <svg className="text-gray-600 h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg"
                                version="1.1" id="Capa_1" x="0px" y="0px"
                                viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966;' }}
                                xmlSpace="preserve"
                                width="512px" height="512px">
                                <path
                                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative" onClick={toggleDropdown}>
                        <button
                            className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        >
                            <span>My Profile</span>
                            <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
                                onClick={closeDropdown}
                            >
                                <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    >
                                        My Orders
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    >
                                        My Favourites
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    >
                                        Settings
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;