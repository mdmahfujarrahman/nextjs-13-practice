import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { getProjectByUserId } from "@/lib/actions";
import React from "react";

type Props = {
    params: {
        id: string;
    };
};

const UserProfile = async ({ params: { id } }: Props) => {
    const userProject = (await getProjectByUserId(id, 100)) as {
        user: UserProfile;
    };

    if (!userProject.user) {
        return <p className="no-result-text">Failed to fecth user Info</p>;
    }

    return <ProfilePage user={userProject?.user} />;
};

export default UserProfile;
