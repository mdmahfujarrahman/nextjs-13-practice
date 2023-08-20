import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal/Modal";
import ProjectInput from "@/components/ProjectInput/ProjectInput";
import { getProjectById } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser();
    const posts = (await getProjectById(id)) as { project?: ProjectInterface };

    if (!session) redirect("/");

    return (
        <Modal>
            <h3 className="modal-head-text">Edit Project</h3>
            <ProjectInput type="edit" session={session} project={posts.project} />
        </Modal>
    );
};

export default EditProject;
