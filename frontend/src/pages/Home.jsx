import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Post from '../pages/Post'

import Axios from 'axios'


const Home = () => {
   const [posts, setPosts] = useState([])
   const [currentPost, setCurrentPost] = useState(null)

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
      console.log(currentPost)
   }, [currentPost])

   return (<div className="home-container">
      <div className="inner-main d-flex flex-column align-items-center">
         {posts.map((post) => {
            const { id, content, title, likes, dislikes, comments, categories } = post
            return (
               <div key={id} className="inner-main-body p-2 p-sm-3 forum-content show ">
                  <div className="card mb-2" style={{ maxWidth: "40rem" }}>
                     <div className="card-body p-2 p-sm-3" >
                        <div className="d-flex flex-column" >
                           <div className="media-body">
                              <div className="">
                                 <h6 className="text-body">{title}</h6>
                                 <section className="category-conteiner d-flex">
                                    {categories.map((category) => {
                                       return (
                                          <div key={category.id}>
                                             <span className="badge badge-secondary mr-2">{category}</span>
                                          </div>
                                       )
                                    })}
                                 </section>
                              </div>
                              <p className="text-secondary">
                                 {content}
                              </p>
                           </div>
                           <div className="text-muted small text-center align-self-center align-items-center">
                              <span className="d-none d-sm-inline-block"> <FaThumbsUp /> {likes.length} </span>
                              <span className="d-none d-sm-inline-block ml-2"> <FaThumbsDown /> {dislikes.length}</span>
                              <span onClick={() => setCurrentPost(post)}><button type="button" data-toggle="modal" data-target="#exampleModalLong" style={{ border: 'none' }}><i className="far fa-comment ml-2"></i>{comments.length}</button></span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                     {currentPost != null && <Post currentPost={currentPost} />}
                  </div>
               </div>
            )
         })}
      </div>
   </div>);
}

export default Home;