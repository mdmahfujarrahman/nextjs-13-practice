import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal/Modal";
import ProjectActions from "@/components/ProjectActions/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects/RelatedProjects";
import { getProjectById } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser();
    const posts = (await getProjectById(id)) as { project?: ProjectInterface };

    if (!posts.project) return <p>404 | Failed to fetch project </p>;

    const renderLink = () => `/profile/${posts?.project?.createdBy?.id}`;

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={posts?.project?.createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {posts?.project?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {posts?.project?.createdBy?.name}
                            </Link>
                            <Image
                                src="/dot.svg"
                                width={4}
                                height={4}
                                alt="dot"
                            />
                            <Link
                                href={`/?category=${posts?.project.category}`}
                                className="text-primary-purple font-semibold"
                            >
                                {posts?.project?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === posts?.project?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={posts?.project?.id} />
                    </div>
                )}
            </section>
            <section className="mt-14">
                <Image
                    src={`${posts?.project?.imageUrl}`}
                    className="object-cover rounded-2xl"
                    width={1064}
                    height={798}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {posts?.project?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link
                        href={posts?.project?.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
                    >
                        🖥 <span className="underline">Github</span>
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link
                        href={posts?.project?.liveSiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
                    >
                        🚀 <span className="underline">Live Site</span>
                    </Link>
                </div>
            </section>

            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={posts?.project?.createdBy?.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects
                userId={posts?.project?.createdBy?.id}
                projectId={posts?.project?.id}
            />
        </Modal>
    );
};

export default Project;
