import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import moment from "moment";

const Comment = ({ data }) => {
  const [readMore, setReadMore] = useState("text-comment");
  const [isReadMore, setIsReadMore] = useState(true);
  const [date, setDate] = useState("");

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    setDate(moment(data.createdAt).fromNow());
  }, [data]);

  return (
    <div className="container-comment">
      <div className="header">
        {!data.profile ? (
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          />
        ) : (
          <img src={`http://localhost:3001/image${data.profile}`} />
        )}
        <div className="name">
          <h3>{data.userName}</h3>
          <p>
            {date}
            <AiFillStar className="icon" /> {data.rate} / 10
          </p>
        </div>
      </div>
      <div className={readMore}>
        <h2>{data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
      </div>
    </div>
  );
};

export default Comment;
