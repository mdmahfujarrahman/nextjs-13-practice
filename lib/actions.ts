import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";


const client = new GraphQLClient()


const makeGrapQLRequest = async (query: string, variables = {}) => {
    try {

    } catch (error) {
        throw error;
    }
};
