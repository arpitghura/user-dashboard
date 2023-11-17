'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface User {
    _id: string;
    username: string;
    email: string;
    phone: number;
    created_at: string;
    name: string;
    others: any;
}

const DataTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState({} as User)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const apiUrl = searchQuery
                ? `api/search?query=${searchQuery}`
                : 'api/userData';

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            setData(responseData.userData); // Set data for the table
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchQuery]); // Fetch data whenever searchQuery changes

    useEffect(() => {
        // Update filteredData based on the search query
        setFilteredData(
            searchQuery
                ? data.filter((row) =>
                    Object.values(row).some(
                        (value) =>
                            value &&
                            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
                : data
        );
    }, [data, searchQuery]); // Update filteredData whenever data or searchQuery changes


    const getDateInLocalTZ = (date: string) => {
        const newDate = new Date(date)
        return newDate.toLocaleDateString();
    }

    const handleClick = (id: string) => {
        console.log('selected row:', id)
        setIsShowModal(true)
        const selectedUserData = data.filter((row: User) => row._id === id)
        setSelectedUserData(selectedUserData[0])
    }

    return (
        <>
            <div className='flex flex-col align-center justify-center w-11/12 p-5 m-auto'>
                <h2 className='mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900'>
                    Search User Data
                </h2>
                <input
                    type="text"
                    placeholder="Search user by username, email, phone, id, date..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 mb-4 border-2 rounded-md w-full"
                />
                <h2 className='mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 '>
                    {searchQuery ? "Search Results" : "All Users Data"}
                </h2>
                <table className="table text-md w-full h-100 overflow-y-auto text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Creation Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((row: User) => (
                            <tr key={row._id} onClick={() => handleClick(row._id)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.username}</th>
                                <td className="px-6 py-4">{row.email}</td>
                                <td className="px-6 py-4">{row.phone}</td>
                                <td className="px-6 py-4">{getDateInLocalTZ(row.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isLoading && (
                <div className='items-center text-center justify-center'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-16 h-16 animate-spin m-auto"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="2"
                            className="opacity-25"
                        ></circle>
                        <path
                            d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10"
                            strokeLinecap="round"
                            strokeWidth="2"
                            className="opacity-75"
                        ></path>
                    </svg>
                </div>
                )}
            </div>

            {/* Modal Content */}
            {isShowModal && selectedUserData && (<div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">User Details</p>
                            <div className="cursor-pointer">
                                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 18 18">
                                    <path d="M1.39 1.393l15.318 15.314m-15.318 0L16.706 1.393" />
                                </svg>
                            </div>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600">ID:</p>
                            <p className="text-lg font-medium text-black">{selectedUserData?._id}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600">Name:</p>
                            <p className="text-lg font-medium text-black">{selectedUserData.name}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600">Email:</p>
                            <p className="text-lg font-medium text-black">{selectedUserData.email}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600">Username:</p>
                            <p className="text-lg font-medium text-black">{selectedUserData.username}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600">Phone:</p>
                            <p className="text-lg font-medium text-black">{selectedUserData.phone}</p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button className="px-4 bg-green-500 p-3 mr-3 rounded-lg border-red-400 text-white hover:bg-green-400" onClick={() => toast.success('Report is being generated!', { position: toast.POSITION.BOTTOM_CENTER }) }>Generate Report</button>
                            <button className="px-4 bg-blue-500 p-3 ml-3 rounded-lg border-red-400 text-white hover:bg-blue-400" onClick={() => setIsShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>

            </div>

            )}
        </>
    );
};

export default DataTable;
