import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories/Categories";
import LoadMore from "@/components/LoadMore/LoadMore";
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

type Props = {
    searchParams: {
        category?: string;
        endcursor?: string;
    };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
    const fetchPosts = (await fetchProjects(category)) as ProjectSearch;
    const projectDisplay = fetchPosts?.projectSearch?.edges || [];
    const pagination = fetchPosts?.projectSearch?.pageInfo || {};

    if (projectDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                <Categories />
                <p className="no-result-text text-center">
                    No Project found, Go Create Some
                </p>
            </section>
        );
    }

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
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
            <LoadMore
                startCursor={pagination?.startCursor}
                endCursor={pagination?.endCursor}
                hasPreviousPage={pagination?.hasPreviousPage}
                hasNextPage={pagination?.hasNextPage}
            />
        </section>
    );
};

export default Home;
