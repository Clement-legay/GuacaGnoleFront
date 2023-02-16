import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const CommentEntity = () => {
    const [comments, setComments] = useState([]);
    const { token } = useContext(MainContext)

    return {
        comments: comments,
        fetchComments: (store = false) => (
            fetchAPI("/Comment")
                .then((res) => {
                    // res.data = res.data.length > 0 ? res.data.map(
                    //     (item) => {
                    //         item.id = item.CommentId;
                    //         delete item.CommentId;
                    //         return item
                    //     }
                    // ) : [];
                    if (store) {
                        setComments(res.data);
                    }
                    return res.data;
                })
        ),
        fetchCommentById: (id) => (
            fetchAPI(`Comment/${id}`)
                .then(res => res.data)
        ),
        postComment: (data) => (
            postAPI("Comment", data, {token: token})
                .then(res => res.data)
        ),
        putComment: (id, data) => (
            putAPI(`Comment/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteComment: (id) => (
            deleteAPI(`Comment/${id}`, {token: token})
                .then(res => res.data)
        ),
        deleteCommentByUserId: (id, userId) => (
            deleteAPI(`Comment/${id}/${userId}`, {token: token})
                .then(res => res.data)
        )
    };
};