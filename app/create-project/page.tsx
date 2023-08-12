import Modal from "@/components/Modal/Modal";
import ProjectInput from "@/components/ProjectInput/ProjectInput";

const CreateProject = () => {
    return (
        <Modal>
            <h3 className="modal-head-text">Create A New Project</h3>
            <ProjectInput />
        </Modal>
    );
};

export default CreateProject;
