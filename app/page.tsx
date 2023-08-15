import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fetchProjects } from "@/lib/actions";

type ProjectSearch = {
    projectSearch: {
        edges: {
            node: ProjectInterface;
        }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
};

const Home = async () => {
    const fetchPosts = (await fetchProjects()) as ProjectSearch;
    const projectDisplay = fetchPosts?.projectSearch?.edges || [];

    if (projectDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                categories
                <p className="no-result-text text-center">
                    No Project found, Go Create Some
                </p>
            </section>
        );
    }

    return (
        <section className="flex-start flex-col paddings mb-16">
            <h1>categories</h1>
            <section className="projects-grid">
                {projectDisplay.map(({ node }: { node: ProjectInterface }) => (
                    <ProjectCard
                        key={node.id}
                        id={node.id}
                        imageUrl={node.imageUrl as string}
                        title={node?.title}
                        name={node?.createdBy.name}
                        avatarUrl={node?.createdBy.avatarUrl}
                        userId={node?.createdBy.id}
                    />
                ))}
            </section>
            <h1>loadmore</h1>
        </section>
    );
};

export default Home;
