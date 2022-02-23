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
        laboris nulla elit non id ullamco incididunt ad.\r\n"
      </p>
      <h4 className="welcome-dev-by">
        Developed by:<b>Virtual biopsiess</b>
      </h4>
      <img
        className="welcome-background"
        src="https://media.istockphoto.com/photos/pattern-of-books-in-different-positions-and-located-in-the-part-of-picture-id1320488856"
      ></img>
    </div>
  );
}

export default Welcome;
