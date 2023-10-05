import React, { useState, useEffect } from 'react';
import chef from '../assets/chef.png';
import { useAppContext } from './AppContext';

const Menu = () => {
    const [foodData, setFoodData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const { sharedData } = useAppContext();

    useEffect(() => {
        if (sharedData !== null && Array.isArray(sharedData)) {
            const dataObject = sharedData.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
            setFoodData(dataObject);
        }
    }, [sharedData])

    useEffect(() => {
        // Fetch the data from the JSON file
        fetch('/foodData.json')
            .then((response) => response.json())
            .then((data) => setFoodData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
    };

    const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    return (
        <>
            <div className="flex flex-col items-center mt-8">
                <div className="flex justify-between items-center">
                    <img src={chef} alt="Chef" className="hidden sm:block w-12 h-12 mr-2" />
                    <h1 className="text-2xl font-semibold">Food Menu</h1>
                    <img src={chef} alt="Chef" className="hidden sm:block w-12 h-12 ml-2" />
                </div>

                {/* Render categories after data is loaded */}
                {foodData && (
                    <div className="flex mt-4 space-x-4">
                        {foodData && Object.keys(foodData).map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {selectedCategory && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-center">Sub-Options for {selectedCategory}</h2>
                        {selectedCategory && foodData && foodData[selectedCategory] && (
                            <div className="flex mt-2 space-x-4">
                                {Object.keys(foodData[selectedCategory]).map((subCategory) => (
                                    <button
                                        key={subCategory}
                                        onClick={() => handleSubCategoryClick(subCategory)}
                                        className={`px-4 py-2 rounded-lg ${selectedSubCategory === subCategory ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white' : 'bg-gray-300 text-gray-700'}`}
                                    >
                                        {subCategory}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {selectedSubCategory && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-center">Items for {selectedCategory} - {selectedSubCategory}</h3>
                        {foodData && (
                            <div className="mt-2 flex flex-wrap">
                                {foodData[selectedCategory][selectedSubCategory].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`w-full ${foodData[selectedCategory][selectedSubCategory].length === 1
                                            ? 'sm:w-full'
                                            : 'sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'
                                            } p-4`}
                                    >
                                        <div className="bg-white rounded-lg shadow-lg p-6 h-96">
                                            <img src={item.image} alt={item.name} className="w-full h-auto sm:h-48 mb-4" />
                                            <h4 className="text-xl font-semibold">{item.name}</h4>
                                            <p className="text-base">Quantity: {item.quantity}</p>
                                            <p className="text-base">Price: ₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Menu;