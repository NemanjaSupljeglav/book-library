import React from "react";
import "./welcome.css";

function Welcome() {
  return (
    <div className="welcome-wrapper">
      <h1 className="welcome-title">Welcome page</h1>
      <p className="p-welcome">
        Laboris excepteur est minim et consectetur elit ipsum. Ullamco minim
        reprehenderit esse dolor. Nostrud commodo laborum non irure officia
        deserunt nisi elit elit quis labore id voluptate ipsum. Proident laboris
        sint proident labore sint nostrud mollit pariatur cillum ex amet.
        Commodo ullamco in amet pariatur in commodo ex irure qui eiusmod Lorem
        id. Aliquip officia dolore nostrud commodo sit ipsum ea elit aliquip
        consectetur voluptate ad laboris aliquip. Exercitation dolore incididunt
        laboris nulla elit non id ullamco incididunt ad.\r\n
      </p>
      <h4 className="welcome-dev-by">
        Developed by:<b>Virtual biopsiess</b>
      </h4>
      <img
        className="welcome-background"
        src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80"
      />
    </div>
  );
}

export default Welcome;
