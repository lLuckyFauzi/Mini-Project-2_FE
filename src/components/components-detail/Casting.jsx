import React from "react";

const Casting = ({ name, character, profile }) => {
  return (
    <div className="casting">
      <div className="img">
        {!profile ? (
          <img
            className="backup-profile"
            width={"100px"}
            height={"100px"}
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1650203036~exp=1650203636~hmac=ae85857e70801b4cf5be495c67d7da5a9caac167918b25ba0d4bd51112f6b6f9&w=740"
            alt=""
          />
        ) : (
          <img
            height={"103px"}
            width={"100px"}
            src={`https://image.tmdb.org/t/p/w500${profile}`}
            alt="img"
          />
        )}
      </div>
      <div className="text">
        <h3>{name}</h3>
        <p>as {character}</p>
      </div>
    </div>
  );
};

export default Casting;
