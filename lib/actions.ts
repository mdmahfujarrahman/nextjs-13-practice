import { ProjectForm } from "@/common.types";
import {
    createProjectMutation,
    createUserMutation,
    deleteProjectMutation,
    getProjectByIdQuery,
    getProjectsOfUserQuery,
    getUserQuery,
    projectsQuery,
    updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_API_URL || ""
    : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "dev";
const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";
const client = new GraphQLClient(apiUrl);

const makeGrapQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
};

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGrapQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
    const variables = {
        input: {
            name,
            email,
            avatarUrl,
        },
    };
    client.setHeader("x-api-key", apiKey);
    return makeGrapQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async (image: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: image }),
        });
        return response.json();
    } catch (error) {
        throw error;
    }
};

export const createNewProject = async (
    form: ProjectForm,
    creatorId: string,
    token: string
) => {
    const imageUrl = await uploadImage(form?.imageUrl);

    if (!imageUrl) {
        throw new Error("Image upload failed");
    } else {
        client.setHeader("Authorization", `Bearer ${token}`);
        const variables = {
            input: {
                ...form,
                imageUrl: imageUrl?.result.url,
                createdBy: {
                    link: creatorId,
                },
            },
        };

        return makeGrapQLRequest(createProjectMutation, variables);
    }
};

export const fetchProjects = async (category?: string, endCursor?: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGrapQLRequest(projectsQuery, {
        category,
        endCursor,
    });
};

export const getProjectById = async (id: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGrapQLRequest(getProjectByIdQuery, { id });
};
export const getProjectByUserId = async (id: string, last?: number) => {
    client.setHeader("x-api-key", apiKey);
    return makeGrapQLRequest(getProjectsOfUserQuery, { id, last });
};
export const deleteProject = async (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGrapQLRequest(deleteProjectMutation, { id, token });
};
export const editProject = async (
    form: ProjectForm,
    projectId: string,
    token: string
) => {
    const isBase64DataUrl = (value: string) => {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    };

    let updatedForm = { ...form };
    const isUploadingNewImage = isBase64DataUrl(form.imageUrl);

    if (isUploadingNewImage) {
        const imageUrl = await uploadImage(form?.imageUrl);
        if (imageUrl.url) {
            updatedForm = { ...form, imageUrl: imageUrl.url };
        }
    }

    const variables = {
        id: projectId,
        input: updatedForm,
    };

    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGrapQLRequest(updateProjectMutation, variables);
};
