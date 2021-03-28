import React from "react";
import styled from "styled-components";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Avatar } from "@material-ui/core";
const Chat = ({ id, users }) => {
    const [user] = useAuthState(auth);
    const receiptEmail = getRecipientEmail(users, user);

    return (
        <Container>
            <UserAvatar />
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
