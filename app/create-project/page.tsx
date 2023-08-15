import Modal from "@/components/Modal/Modal";
import ProjectInput from "@/components/ProjectInput/ProjectInput";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async () => {
    const session = await getCurrentUser();
    if (!session) redirect("/");

    return (
        <Modal>
            <h3 className="modal-head-text">Create A New Project</h3>
            <ProjectInput type="create" session={session} />
        </Modal>
    );
};

export default CreateProject;
