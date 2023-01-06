import React from 'react';
import "../styles/Comments.css"

const Comments = ({ currentPost, setShowComments }) => {
    return (
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header pb-2">
                    <h5 className="modal-title mb-1" id="exampleModalLongTitle">Comments</h5>
                    <button onClick={() => setShowComments(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pt-0">
                    {currentPost.comments.length < 1 && <strong><p>There are no comments yet :/</p></strong>}
                    <form id="tweet-form">
                        <div id="tweetbox" className="wrapper">
                            <div className="input-box">
                                <div className="tweet-area">
                                    <span className="placeholder"></span>
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
                                    <input className="btn btn-primary" value="Send" type="submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                    {currentPost.comments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <h6 className='mb-0'>{comment.profile}</h6>
                                <p className='mb-1'>{comment.content}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Comments;