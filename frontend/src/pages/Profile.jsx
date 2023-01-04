// https://www.bootdey.com/snippets/view/profile-with-data-and-skills
const Profile = ({ currentUser }) => {

    const { username, email, first_name, last_name, likes, dislikes, comments, profile_data } = currentUser
    const { ctg_following } = profile_data
    return (
        <>
            <h1>Welcome back, {first_name} {last_name}!</h1>
            <h3>{username}</h3>
            <p>{email}</p>
            <h5>Following: {ctg_following.length}</h5>

            <br />
            <h5>likes: {likes.length}</h5>
            {likes.map((like) => {
                const { timestamp } = like
                return (
                    <p>{timestamp}</p>
                )
            })}
            <h5>comments: {comments.length}</h5>
            {comments.map((comment) => {
                const { timestamp } = comment
                return (
                    <p>{timestamp}</p>
                )
            })}
            <h5>dislikes: {dislikes.length}</h5>
            {dislikes.map((dislike) => {
                const { timestamp } = dislike
                return (
                    <p>{timestamp}</p>
                )
            })}
        </>
    );
}

export default Profile;