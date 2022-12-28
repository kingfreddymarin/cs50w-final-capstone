import React from 'react';

const Post = ({ currentPost }) => {
    return (
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header pb-2">
                    <h5 className="modal-title mb-1" id="exampleModalLongTitle">Comments</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pt-0">
                    {currentPost.comments.length < 1 && <strong><p>There are no comments yet :/</p></strong>}
                    {currentPost.comments.map((comment) => {
                        return (
                            <>
                                <h6 className='mb-0'>{comment.profile}</h6>
                                <p className='mb-1'>{comment.content}</p>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;