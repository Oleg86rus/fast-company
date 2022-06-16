import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';
import { orderBy } from 'lodash';
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from '../../hooks/useComment';

const Comments = () => {
  const {userId} = useParams();
  const [comments, setComments] = useState([]);
  const {createComment} = useComments();
  useEffect(() => {
    API.comments
      .fetchCommentsForUser(userId)
      .then((data)=>setComments(data));
  }, []);
  const handleSubmit = (data) => {
    createComment(data);
    // API.comments
    //   .add({...data, pageId: userId})
    //   .then((data)=>setComments([...comments, data]));
  };
  const handleRemoveComment = (id) => {
    API.comments.remove(id).then((id)=>{
      setComments(comments.filter((comment)=>comment._id !== id));
    });
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            <CommentsList
              comments = {sortedComments}
              onRemove = {handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Comments;