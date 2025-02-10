import { HotelSortEnum } from '../../enums/hotelSortEnum';
import SortBy from '../../ui/SortBy'
import { Link, useSearchParams } from 'react-router-dom'
import { createLabel } from '../../utils/text';
import { useState } from 'react';
import { useClickOutside } from '../../components/lib/useClickOutSide';
import { FaTimes } from 'react-icons/fa';

const AllHotelsNavBar = () => {
    const modalRef = useClickOutside<HTMLDivElement>(() => setOpenDropDown(false));
    const [searchParams, setSearchParams] = useSearchParams();

    const sortOptions = Object.values(HotelSortEnum)
    const [openDropDown, setOpenDropDown] = useState(false);

    const handleStarsChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
        e.preventDefault();
        const star = e.target.value;
        searchParams.set("hotelStar", star);
        setSearchParams(searchParams);
    };

    const handleSortChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
        e.preventDefault();
        const sort = e.target.value;
        searchParams.set("sort", sort);
        setSearchParams(searchParams);
    };
    return (
        <div className=''>
            <div className="md:flex hidden flex-row items-center gap-2">
                <div className="flex items-center justify-between gap-2">
                    {/* Sort by Hotel Star */}
                    <SortBy
                        handleChange={handleStarsChange}
                        options={[
                            { label: "hotel star", value: "" },
                            { label: "1 star", value: "1" },
                            { label: "2 star", value: "2" },
                            { label: "3 star", value: "3" },
                            { label: "4 star", value: "4" },
                            { label: "5 star", value: "5" },
                        ]}
                    />

                    {/* Other Sorting */}
                    <SortBy
                        handleChange={handleSortChange}
                        options={sortOptions.map((sort) => ({
                            label: createLabel(sort),
                            value: sort,
                        }))}
                    />
                </div>

                {/* Add Hotel Button */}
                <Link
                    to="/dashboard/add-hotel"
                    className="mr-2 cursor-pointer rounded-md  bg-accent-500 px-4 py-[6px] text-lg text-white transition-all duration-200 hover:scale-105"
                >
                    Add Hotel
                </Link>
            </div>
            <div className="  flex md:hidden flex-row items-center gap-2">
                <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => setOpenDropDown(!openDropDown)}
                >
                    {/* Hamburger icon for mobile */}
                    <span className={`text-2xl ${openDropDown ? 'transform rotate-90' : ''}`}>☰</span>
                </button>

                {
                    openDropDown && (
                        <div ref={modalRef} className="absolute pt-12 top-10 w-[90vw] gap-2 left-0 flex flex-col z-50 items-stretch bg-white shadow-md rounded-md p-2">
                            {/* Sort by Hotel Star */}
                            <button
                                className="absolute top-4 right-4 text-accent-500"
                                onClick={() => setOpenDropDown(false)}
                            >
                                <FaTimes />
                            </button>
                            <SortBy
                                handleChange={handleStarsChange}
                                options={[
                                    { label: "hotel star", value: "" },
                                    { label: "1 star", value: "1" },
                                    { label: "2 star", value: "2" },
                                    { label: "3 star", value: "3" },
                                    { label: "4 star", value: "4" },
                                    { label: "5 star", value: "5" },
                                ]}
                            />

                            {/* Other Sorting */}
                            <SortBy
                                handleChange={handleSortChange}
                                options={sortOptions.map((sort) => ({
                                    label: createLabel(sort),
                                    value: sort,
                                }))}
                            />

                            {/* Add Hotel Button */}
                            <Link
                                to="/dashboard/add-hotel"
                                className="mr-2 cursor-pointer rounded-md text-slate-100 bg-accent-500 px-4 py-[6px] text-lg text-white transition-all duration-200 hover:scale-105"
                            >
                                Add Hotel
                            </Link>
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default AllHotelsNavBar
