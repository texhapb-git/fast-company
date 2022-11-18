import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import CommentForm from "../common/comments/commentsForm";

const Comments = ({ userId }) => {
    const params = useParams();

    if (!userId) {
        userId = params.userId;
    }

    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setLoading(true);
        api.comments.fetchCommentsForUser(userId).then(data => {
            setComments(data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = (data) => {
        const addData = { ...data, pageId: userId };
        api.comments.add(addData).then(data => setComments(prevState => [...prevState, data]));
    };

    const handleRemove = (id) => {
        api.comments.remove(id).then(id => {
            setComments(prevState => prevState.filter(comment => comment._id !== id));
        });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <CommentForm userId={userId} onSubmit={handleSubmit} />

            {loading
                ? <p>loading...</p>
                : <CommentsList comments={sortedComments} onRemove={handleRemove} />
            }
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
