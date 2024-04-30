import { useEffect, useState } from "react";
import '../styles/Home.css'
import '../styles/Create.css'
import Posts from '../components/Posts'
import Comments from "./Comments";
import Filters from "../containers/Filters";
import CategoryBox from "../containers/CategoryBox";
import Loader from "../components/Loader";

import Axios from 'axios'


const Comunity = ({ currentUser, categories, catArray, setCatArray }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [post, setPost] = useState([])
    const [activeFilter, setActiveFilter] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts] = useState([])

    const creator = currentUser;

    const handleSubmit = (e) => {
        const post = {
            isStudent: true,
            creator: creator,
            question: e.target.elements.question.value,
            content: e.target.elements.content.value,
            categories: catArray
        }
        if (post.question && post.content && post.categories.length > 0) {
            if (post.question.length > 99) {
                e.preventDefault()
                alert('Please be more concise with your question')
            } else if (post.content.length > 999) {
                e.preventDefault()
                alert("there's a limit of 1000 characters per description")
            } else {
                e.preventDefault()
                Axios.post('http://localhost:8000/new-post/', post)
                    .then(function (response) {
                        console.log(response);
                        window.location.reload()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            e.preventDefault()
            alert('no blanks')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                Axios.get('http://localhost:8000/all-posts/')
                    .then(function (response) {
                        console.log(response.data)
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
                                setPosts(newPost.isStudent ? posts => [...posts, newPost] : posts => [...posts])
                                setAllPosts(newPost.isStudent ? posts => [...posts, newPost] : posts => [...posts])
                                setIsLoading(false)
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
    }, [activeFilter, allPosts, filteredPosts])


    return (
        <>
            <div className="home-container">
                {!showComments && (
                    <>
                        <Filters categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter}></Filters>
                        <div className="inner-main d-flex flex-column align-items-center ">
                            <h1 className="ml-3 mt-3 display-4">Welcome back, {currentUser.first_name}</h1>
                            <form onSubmit={handleSubmit} id="tweet-form">
                                <div id="tweetbox" className="wrapper mb-5" >
                                    <div className="input-box">
                                        <h6> what's your question?</h6>
                                        <input className="question mb-2" type="text" name="question" />
                                        <CategoryBox catArray={catArray} setCatArray={setCatArray} categories={categories}></CategoryBox>
                                        <h6> Detail your question!</h6>
                                        <div className="tweet-area">
                                            <textarea id="content"
                                                required
                                                name="content"
                                                cols="30"
                                                rows="10"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="content">
                                            <input className="btn btn-primary" value="post" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {posts.length > 0 && posts.map((post) => {
                                return (
                                    <Posts setPost={setPost} showCommets={showComments} setShowComments={setShowComments} currentUser={currentUser} key={post.id} post={post} />
                                )
                            })}
                            {isLoading && (
                                <div className="ml-2 mt-5">
                                    <Loader/>
                                </div>
                            )}
                            {(posts.length === 0 && !isLoading) && (
                                <div className="ml-2 mt-5">
                                    <h1>Woops!</h1>
                                    <h4>Seems like there's no posts regarding this topic ;(</h4>
                                </div>
                            )}
                        </div>
                    </>
                )
                }
                {
                    showComments && (
                        <Comments currentUser={currentUser} currentPost={post} setShowComments={setShowComments} />
                    )
                }
            </div >
        </>);
}

export default Comunity;