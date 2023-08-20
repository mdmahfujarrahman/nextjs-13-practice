"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

import { ProjectInterface, SessionInterface } from "@/common.types";
import FormInput from "../FormInput/FormInput";
import CustomMenu from "../CustomMenu/CustomMenu";
import { categoryFilters } from "../constant";
import Button from "../Button/Button";
import { createNewProject, editProject, fetchToken } from "@/lib/actions";

type Props = {
    type: string;
    session: SessionInterface;
    project?: ProjectInterface;
};

const ProjectInput = ({ type, session, project }: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        title: project?.title ?? "",
        imageUrl: project?.imageUrl ?? "",
        description: project?.description ?? "",
        liveSiteUrl: project?.liveSiteUrl ?? "",
        githubUrl: project?.githubUrl ?? "",
        category: project?.category ?? "",
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { token } = await fetchToken();
        console.log(token);

        try {
            if (type === "create") {
                // create project
                await createNewProject(inputData, session.user?.id, token);
                router.push("/");
            }
            if (type === "edit") {
                await editProject(inputData, project?.id as string, token);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes("image")) {
            return alert("Please upload an image file");
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setInputData({ ...inputData, imageUrl: dataUrl });
        };
    };

    const handleStateChange = (key: string, value: string) => {
        setInputData({ ...inputData, [key]: value });
    };

    console.log(inputData);

    return (
        <form onSubmit={handleSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!inputData?.imageUrl && "Choose a poster for your project"}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {inputData?.imageUrl && (
                    <Image
                        src={inputData?.imageUrl}
                        className="sm:p-10 object-contain z-20"
                        alt="project poster"
                        fill
                    />
                )}
            </div>
            <FormInput
                title="Title"
                state={inputData.title}
                placeholder="Enter a title for your project"
                setState={(value) => handleStateChange("title", value)}
            />

            <FormInput
                title="Website URL"
                type="url"
                state={inputData.liveSiteUrl}
                placeholder="https://www.example.com"
                setState={(value) => handleStateChange("liveSiteUrl", value)}
            />
            <FormInput
                title="GitHub URL"
                type="url"
                state={inputData.githubUrl}
                placeholder="https://www.github.com/mdmahfujarrahman"
                setState={(value) => handleStateChange("githubUrl", value)}
            />
            <FormInput
                title="Description"
                type="textarea"
                isTextArea={true}
                state={inputData.description}
                placeholder="Showcase and discover remakable developer projects."
                setState={(value) => handleStateChange("description", value)}
            />
            <CustomMenu
                title="Category"
                state={inputData.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />

            <div className="flexStart w-full">
                <Button
                    type="submit"
                    title={
                        isLoading
                            ? `${type === "create" ? "Creating" : "Editing"}`
                            : `${type === "create" ? "Create" : "Edit"}`
                    }
                    leftIcon={isLoading ? "" : "/plus.svg"}
                    isLoading={isLoading}
                />
            </div>
        </form>
    );
};

export default ProjectInput;
