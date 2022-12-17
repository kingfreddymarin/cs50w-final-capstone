import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

import Axios from 'axios'


const Home = () => {
   const [posts, setPosts] = useState([])

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
   }, [])

   return (<div className="home-container">
      <div className="inner-main">
         {posts.map((post) => {
            const { id, content, title, likes, dislikes, comments } = post
            return (
               <div key={id} className="inner-main-body p-2 p-sm-3 forum-content show">
                  <div className="card mb-2">
                     <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                           <div className="media-body">
                              <h6><a href="#" data-target=".forum-content" className="text-body">{title}</a></h6>
                              <p className="text-secondary">
                                 {content.substring(0, 144)}...
                              </p>
                           </div>
                           <div className="text-muted small text-center align-self-center align-items-center">
                              <span className="d-none d-sm-inline-block"> <FaThumbsUp /> {likes.length} </span>
                              <span className="d-none d-sm-inline-block ml-2"> <FaThumbsDown /> {dislikes.length}</span>
                              <span><i className="far fa-comment ml-2"></i>{comments.length}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )
         })}
         {/* <div class="inner-main-body p-2 p-sm-3 collapse forum-content">
            <a href="#" class="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target=".forum-content"><i class="fa fa-arrow-left mr-2"></i>Back</a>
            <div class="card mb-2">
               <div class="card-body">
                  <div class="media forum-item">
                     <div class="media-body ml-3">
                        <a href="javascript:void(0)" class="text-secondary">Mokrani</a>
                        <small class="text-muted ml-2">1 hour ago</small>
                        <h5 class="mt-1">Realtime fetching data</h5>
                        <div class="mt-3 font-size-sm">
                           <p>Hellooo :)</p>
                           <p>
                              I'm newbie with laravel and i want to fetch data from database in realtime for my dashboard anaytics and i found a solution with ajax but it dosen't work if any one have a simple solution it will be
                              helpful
                           </p>
                           <p>Thank</p>
                        </div>
                     </div>
                     <div class="text-muted small text-center">
                        <span class="mr-2 d-none d-sm-inline-block"> Likes</span>
                        <span>Dislikes</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="card mb-2">
               <div class="card-body">
                  <div class="media forum-item">
                     <div class="media-body ml-3">
                        <a href="javascript:void(0)" class="text-secondary">drewdan</a>
                        <small class="text-muted ml-2">1 hour ago</small>
                        <div class="mt-3 font-size-sm">
                           <p>What exactly doesn't work with your ajax calls?</p>
                           <p>Also, WebSockets are a great solution for realtime data on a dashboard. Laravel offers this out of the box using broadcasting</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div> */}
      </div>
   </div>);
}

export default Home;