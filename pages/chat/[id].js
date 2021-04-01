import React from 'react'
import Head from 'next/head'
import styled from "styled-components";
const Chat = () => {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <h1>This is chat</h1>
        </Container>
    )
}

export default Chat
const Container = styled.div``;