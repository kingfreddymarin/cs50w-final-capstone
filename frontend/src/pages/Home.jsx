import { useEffect, useState } from "react";
import '../styles/Home.css'
import Posts from '../components/Posts'
import Comments from "./Comments";
import Filters from "../containers/Filters";

import Axios from 'axios'


const Home = ({ currentUser, categories }) => {
   const [posts, setPosts] = useState([])
   const [showComments, setShowComments] = useState(false)
   const [post, setPost] = useState([])
   const [activeFilter, setActiveFilter] = useState([])
   const [allPosts, setAllPosts] = useState([])
   const [filteredPosts, setFilteredPosts] = useState([])
   // const sortedPosts = posts.sort((a, b) => b.likes - a.likes);

   useEffect(() => {
      console.log(currentUser)
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
                        setPosts(posts => [...posts, newPost])
                        setAllPosts(posts => [...posts, newPost])
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
         setFilteredPosts([])
      }
      if (activeFilter.length === 1) {
         posts.forEach((post) => {
            const categories = post.categories
            activeFilter.forEach((category) => {
               if (categories.indexOf(category.name) !== -1) {
                  setFilteredPosts((posts) => [...posts, post])
               }
            })
         })
         setPosts(filteredPosts)
      }

   }, [setFilteredPosts, filteredPosts, activeFilter, allPosts])


   return (
      <>
         <Filters categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter}></Filters>
         <div className="home-container">
            {!showComments && (
               <div className="inner-main d-flex flex-column align-items-center">
                  <h1 className="ml-3 display-4">Welcome back, {currentUser.username}</h1>
                  {posts.map((post) => {
                     return (
                        <Posts setPost={setPost} showCommets={showComments} setShowComments={setShowComments} currentUser={currentUser} key={post.id} post={post} />
                     )
                  })}
               </div>
            )}
            {showComments && (
               <Comments currentPost={post} setShowComments={setShowComments} />
            )}
         </div>
      </>);
}

export default Home;