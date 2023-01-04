import { useEffect, useState } from "react";
import '../styles/Home.css'
import Posts from '../components/Posts'

import Axios from 'axios'


const Home = ({ currentUser }) => {
   const [posts, setPosts] = useState([])
   const sortedPosts = posts.sort((a, b) => b.likes - a.likes);

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


   return (<div className="home-container">
      <div className="inner-main d-flex flex-column align-items-center">
         {sortedPosts.map((post) => {
            return (
               <Posts currentUser={currentUser} key={post.id} post={post} />
            )
         })}
      </div>
   </div>);
}

export default Home;