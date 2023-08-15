import { Menu } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type Props = {
    title: string;
    state: string;
    filters: Array<string>;
    setState: (value: string) => void;
};

const CustomMenu = ({ title, state, filters, setState }: Props) => {
    return (
        <div className="flex justify-start items-start flex-col w-full gap-7 relative">
            <label htmlFor={title} className="w-full text-gray-100">
                {" "}
                {title}
            </label>
            <Menu as="div" className="self-start relative">
                <div>
                    <Menu.Button className="flexCenter custom_menu-btn">
                        {state || "Select a category"}
                        <Image
                            src="/arrow-down.svg"
                            alt="down arrow"
                            width={15}
                            height={15}
                        />
                    </Menu.Button>
                </div>

                <Menu.Items className="flex justify-start items-start custom_menu-items">
                    {filters?.map((item) => (
                        <Menu.Item key={item}>
                            <button
                                type="button"
                                value={item}
                                onClick={(e) => setState(e.currentTarget.value)}
                                className={`custom_menu-item ${
                                    state === item && "text-blue-500"
                                } hover:text-blue-500`}
                            >
                                {item}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default CustomMenu;
