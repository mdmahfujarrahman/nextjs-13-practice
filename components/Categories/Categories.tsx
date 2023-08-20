"use client";

import { useState } from "react";
import { categoryFilters } from "../constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const category = searchParams.get("category");

    const handleTags = (value: string) => {
        router.push(`${pathname}?category=${value}`);
    };

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => handleTags(filter)}
                        className={`${
                            category === filter
                                ? "bg-light-white-500 font-medium "
                                : "font-normal"
                        } px-4 py-2 mb-1 rounded-lg capitalize whitespace-nowrap`}
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
