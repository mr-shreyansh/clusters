import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chat = ({ socket, username, cluster }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); // [{author: "name", message: "message", time: "time"}
  const user = useSelector((state) => state.user);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      setMessageList((list) => [
        ...list,
        {
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        },
      ]);
      const messageData = {
        cluster: cluster,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    // alert("useEffect");
    socket.on("receive_message", (data) => {
      // alert("receive_message");
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col justify-between w-full h-screen bg-gradient-to-tr from-stone-200 via-cyan-100 to-stone-200">
      <div className="flex">
        <p className="flex text-sm text-gray-500">
          Live Chat <span className="flex items-center text-[10px]">🟢</span>
        </p>
      </div>
      {console.log(messageList)}
      <div className="">
        {/* {
            messageList.map((messageContent, index) => {
              console.log(messageContent.author)
              console.log((user.firstname) ===  messageContent.author)
              return (
                <div className='flex flex-col items-end'>
                  <div key={index} className={`flex  flex-col w-fit items-end p-1 rounded-md ${ (user.firstname) ===  messageContent.author ? "bg-red-100" : "bg-cyan-500"} bg-opacity-60 `}>
                    <p className='text-md'>{messageContent.message}</p>
                  </div>
                    <div className='flex justify-end gap-2 text-stone-500'>
                      <p className='text-xs'>{messageContent.author}</p>
                      <p className='text-xs'>{messageContent.time}</p>
                    </div>
                </div>
              )
            })
          } */}
        {/* trial */}
        <div className="flex flex-col items-start mx-1">
          <div
            className={`flex  flex-col max-w-[500px] w-fit items-end p-1 drop-shadow-md rounded-md  bg-opacity-60 bg-red-300`}
          >
            <p className="text-md">Hey guys, how is the project going on?</p>
          </div>
          <div className="flex justify-end gap-2 text-stone-500">
            <p className="text-xs">Shreyansh</p>
            <p className="text-xs">8:45</p>
          </div>
        </div>

        <div className="flex flex-col items-end mx-1">
          <div
            className={`flex  flex-col max-w-[500px] w-fit drop-shadow-md items-end p-1 rounded-md  bg-opacity-60 bg-cyan-300`}
          >
            <p className="text-md">
              I am facing dificulties merging my branch, do you know how to
              solve it?
            </p>
          </div>
          <div className="flex justify-end gap-2 text-stone-500">
            <p className="text-xs">Yash</p>
            <p className="text-xs">8:45</p>
          </div>
        </div>


        <div className="flex flex-col items-start mx-1">
          <div
            className={`flex  flex-col max-w-[500px] w-fit items-end p-1 drop-shadow-md rounded-md  bg-opacity-60 bg-red-300`}
          >
            <p className="text-md">Try to pull the code first from github then try merging...</p>
          </div>
          <div className="flex justify-end gap-2 text-stone-500">
            <p className="text-xs">Shreyansh</p>
            <p className="text-xs">8:45</p>
          </div>
        </div>


        <div className="flex flex-col items-end mx-1">
          <div
            className={`flex  flex-col max-w-[500px] w-fit drop-shadow-md items-end p-1 rounded-md  bg-opacity-60 bg-cyan-300`}
          >
            <p className="text-md">
              Ok thanks, I'll try it right away and let you know if it works.
            </p>
          </div>
          <div className="flex justify-end gap-2 text-stone-500">
            <p className="text-xs">Yash</p>
            <p className="text-xs">8:45</p>
          </div>
        </div>
        {/* trial end  */}
      </div>
      <div className="flex mx-1 my-2">
        <input
          onChange={(e) => setCurrentMessage(e.target.value)}
          type="text"
          placeholder="Message"
          className="flex-grow p-1 border outline-none"
        />
        <button onClick={sendMessage} className="bg-blue-400">
          🏹
        </button>
      </div>
    </div>
  );
};

export default Chat;
