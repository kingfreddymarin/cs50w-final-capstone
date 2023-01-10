import { useEffect, useState } from "react";
import '../styles/Home.css'
import Posts from '../components/Posts'
import Comments from "./Comments";
import Filters from "../containers/Filters";

import Axios from 'axios'


const Feed = ({ currentUser, categories }) => {
    const [posts, setPosts] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [post, setPost] = useState([])
    const [activeFilter, setActiveFilter] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts] = useState([])

    const sortedPosts = posts.sort((a, b) => b.likes - a.likes);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Axios.get('http://localhost:8000/all-posts/')
                    .then(function (response) {
                        const postArray = response.data
                        postArray.forEach((post) => {
                            let newPost = {}
                            Axios.post('http://localhost:8000/postData/', {
                                post_id: post.id
                            }).then(function (response) {
                                newPost = {
                                    ...post,
                                    likes: response.data.likes,
                                    dislikes: response.data.dislikes,
                                    comments: response.data.comments
                                }
                                // !newPost.isStudent ? (
                                //     newPost.categories.map((category) => {
                                //         if (currentUser.profile_data.ctg_following.indexOf(category) !== -1) {
                                //             setPosts(posts => [...posts, newPost])
                                //         }
                                //     })
                                // ) : console.log('none')
                                if (!newPost.isStudent) {
                                    for (let i = 0; i < newPost.categories.length; i++) {
                                        let category = newPost.categories[i]
                                        if (currentUser.profile_data.ctg_following.indexOf(category) !== -1) {
                                            setPosts(posts => [...posts, newPost]);
                                            break;
                                        }
                                    }
                                } else {
                                    console.log('none')
                                }
                                if (!newPost.isStudent) {
                                    for (let i = 0; i < newPost.categories.length; i++) {
                                        let category = newPost.categories[i]
                                        if (currentUser.profile_data.ctg_following.indexOf(category) !== -1) {
                                            setAllPosts(posts => [...posts, newPost]);
                                            break;
                                        }
                                    }
                                } else {
                                    console.log('none')
                                }
                            }).catch(function (error) {
                                console.log(error)
                            });
                        })
                    }).catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        console.log(currentUser.profile_data.ctg_following)
        console.log(categories)
    }, [currentUser])

    useEffect(() => {
        if (activeFilter.length === 0) {
            setPosts(allPosts)
        }
        activeFilter.length === 0 ? setPosts(allPosts) : console.log(activeFilter[0].name)
        if (activeFilter.length === 1) {
            let array = []
            setPosts(allPosts)
            allPosts.forEach((post) => {
                const categories = post.categories
                activeFilter.forEach((category) => {
                    if (categories.indexOf(category.name) !== -1) {
                        console.log(post)
                        array.unshift(post)
                    }
                })
            })
            setPosts(array)
        }
        console.log(allPosts)
    }, [activeFilter, allPosts, filteredPosts])


    return (
        <>
            <div className="home-container">
                {!showComments && (
                    <>
                        <Filters categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter}></Filters>
                        <div className="inner-main d-flex flex-column align-items-center">
                            <h1 className="ml-3 display-4">Welcome back, {currentUser.username}</h1>

                            {sortedPosts.length > 0 && posts.map((post) => {
                                return (
                                    <Posts setPost={setPost} showCommets={showComments} setShowComments={setShowComments} currentUser={currentUser} key={post.id} post={post} />
                                )
                            })}
                            {sortedPosts.length === 0 && (
                                <div className="mt-5">
                                    <h1>Woops!</h1>
                                    <h4>Seems like there's no posts regarding this topic ;(</h4>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {showComments && (
                    <Comments currentUser={currentUser} currentPost={post} setShowComments={setShowComments} />
                )}
            </div>
        </>);
}

export default Feed;