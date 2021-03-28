import React from "react";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { auth, db } from "../../firebase";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
const Sidebar = () => {
    const [user] = useAuthState(auth);
    const ChatAlreadyExists = (receiptEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === receiptEmail)
                    ?.length > 0,
        );
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);
    const createChat = () => {
        const input = prompt(
            "Please Enter the email ID with whom you want to chat",
        );
        if (!input) return null;
        if (
            EmailValidator.validate(input) &&
            input !== user.email &&
            !ChatAlreadyExists(input)
        ) {
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };

    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()} />
                <IconContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder='Search in Chat' />
            </Search>
            <SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
            {/* chats */}
        </Container>
    );
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;
const IconContainer = styled.div``;
const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;
const SidebarButton = styled(Button)`
    width: 100%;
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
