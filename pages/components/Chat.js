import React from "react";
import styled from "styled-components";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar } from "@material-ui/core";
const Chat = ({ id, users }) => {
    
    const [user] = useAuthState(auth);
    const [receiptSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user)));
    const receiptEmail = getRecipientEmail(users, user);
    // console.log(receiptSnapshot)
    const recipient = receiptSnapshot?.docs?.[0]?.data();
    console.log(recipient);
    return (
        <Container>
            {recipient ? (
                <UserAvatar src={recipient?.photoUrl} />
            ) : (
                <UserAvatar>{receiptEmail[0]}</UserAvatar>
            )}

            <p>{receiptEmail}</p>
        </Container>
    );
};

export default Chat;
const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
`;
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
