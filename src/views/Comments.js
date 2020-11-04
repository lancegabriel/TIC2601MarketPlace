import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Comment from "../components/UserComment";
import { getUserComments } from "../actions/userComments";

const Comments = ({ logins, userComments, userProducts }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserComments(logins?.data.token, logins?.data.data[0]?.accID))
    }, [logins, dispatch])
    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />

            <div id="comments">
                <h3 id="heading">This are all your comments:</h3>
                {
                    Array.isArray(userComments.data) ? userComments.data.map((comment, index) => {
                        Array.isArray(userProducts.data) && userProducts.data.filter((product) => { if (product.productID === comment.productID) { comment.productID = product } return false });
                        return <Comment key={index} comment={comment} />
                    }) : <h3 id="heading">No Comments Found</h3>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    logins: state.logins,
    userComments: state.userComments,
    userProducts: state.userProducts
})

export default connect(mapStateToProps, { getUserComments })(Comments)
