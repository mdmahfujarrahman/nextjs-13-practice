"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
    id,
    title,
    imageUrl,
    name,
    avatarUrl,
    userId,
}: ProjectCardProps) => {
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState("");

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000));
        setRandomViews(
            String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
        );
    }, []);
    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link
                href={`/project/${id}`}
                className="flexCenter group relative w-full h-full"
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    width={414}
                    height={314}
                    className="w-full h-full rounded-2xl object-cover"
                />
                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>
            <div className="flexBetween w-full px-2 mt-3 font font-semibold text-sm">
                <Link
                    href={`/profile
                /${userId}`}
                >
                    <div className="flexCenter gap-2 ">
                        <Image
                            src={avatarUrl}
                            alt={name}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <p className="text-sm">{name}</p>
                    </div>
                </Link>
                <div className="flexCenter gap-0-3">
                    <div className="flexCenter gap-2">
                        <Image
                            src="/hearth.svg"
                            alt="reaction image"
                            width={13}
                            height={12}
                        />
                        <p className="text-sm">{randomLikes}</p>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image
                            src="/eye.svg"
                            alt="reaction image"
                            width={13}
                            height={12}
                        />
                        <p className="text-sm">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ProjectCardProps = {
    title: string;
    id: string;
    imageUrl: string;
    name: string;
    avatarUrl: string;
    userId: string;
};

export default ProjectCard;
