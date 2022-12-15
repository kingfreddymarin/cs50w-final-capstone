import { useState } from "react";
import { useEffect } from "react";
// https://www.bootdey.com/snippets/view/profile-with-data-and-skills
const Profile = ({ currentUser }) => {
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState("")

    const { id, username, email } = currentUser
    useEffect(() => {
        console.log(currentUser)
    }, [])
    return (
        <>
            <h1>{username}</h1>
            <p>{email}</p>
        </>
    );
}

export default Profile;