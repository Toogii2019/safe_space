import React from "react";
import Wrapper from "../components/Wrapper";
import Head from "../components/Head";
import Nav from "../components/Nav";

function Member() {
    if (JSON.parse(localStorage.getItem("currentUser")) === null) {
      window.location.replace("/");
    }
    return (
        <Wrapper>
        <Head></Head>
        <Nav></Nav>
      </Wrapper>
    )
}

export default Member