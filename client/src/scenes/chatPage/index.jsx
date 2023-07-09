import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "../../components/Chat";
import { useSelector } from "react-redux";
import { set } from "mongoose";

const socket = io("http://localhost:4000");

const ChatPage = () => {
  const [name, setName] = useState("");
  const [cluster, setCluster] = useState("");
  const [message, setMessage] = useState("");
  const [clusterList, setClusterList] = useState([]);
  const user = useSelector((state) => state.user);
  // console.log(user);
  // setName(user.firstname);
  const joinCluster = (e) => {
    e.preventDefault();
    setName(user.firstname);
    if (name !== "" && cluster !== "") {
      if(!clusterList.includes(cluster)) {
      setClusterList([...clusterList, cluster]);
      }
      socket.emit("join_room", cluster);
    }
  };

  const connect = (cluster) => {
    setCluster(cluster);
    socket.emit("join_room", cluster);
  };

  
  return (
    <div className="flex">
     <form onSubmit={joinCluster} className="box-border flex flex-col h-screen p-1 bg-cyan-200 drop-shadow-lg">
       <h1 className="text-center text-stone-500">Join A Cluster</h1>
       <input
         onChange={(e) => setCluster(e.target.value)}
         type="text"
         placeholder="Cluster"
         className="p-2 my-2 rounded-md drop-shadow-lg"
       />
       <button className="p-2 my-2 bg-white rounded-md focus:bg-cyan-400 drop-shadow-lg">Join Cluster</button>
       {
          clusterList.map((cluster, index) => {
            return (
              <div key={index}>
                <button onClick={()=>connect(cluster)} className="flex w-full px-2 py-2 my-1 rounded-md bg-cyan-500 drop-shadow-lg focus:bg-cyan-400 hover:bg-opacity-90 hover:bg-cyan-400 bg-opacity-20">{cluster}</button>
              </div>
            );
          }
        )
       }
     </form>
      <Chat socket={socket} username={name} cluster={cluster} />
    </div>
  );
};

export default ChatPage;
