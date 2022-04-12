import React, { useContext, useEffect } from "react";
import logo from "../../assets/logo-2.svg";
import { useForm } from "react-hook-form";
import { ButtonSmall } from "../Button/buttonSmall";
import { MyAxios } from "../../utils/api";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { text_limit } from "../../utils/css";
import { SocketContext } from "../../app/services/socket"

export const PostForm = () => {
  const { register, handleSubmit, reset } = useForm();
  let user = useSelector((state) => state.user);
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log(socket);
    socket.on('clientEvent', (data) => {
      console.log('emit data', data);
      console.log(socket.id); // "G5p5..."
    });

    socket.emit('events', { name: 'Nest' }, (data) => {
      console.log(data)
    });
  }, [])

  const onSubmit = async (data) => {
    await MyAxios.post(`posts`, { author: user.id, ...data })
      .then((res) => {
        if (res.statusText === "Created") {
          reset({ content: "" });
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-auto flex bg-white rounded border-b border-solid border-gray-200 p-5">
      {user.profileImageId ?
        <Image
          className="h-10 w-10 rounded object-cover mr-5"
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={user.profileImageId}
          crop="scale"
        />
        :
        <img
          className="h-10 w-10 rounded object-cover mr-5"
          src={logo}
          alt="logo"
        />
      }
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <textarea
          type="text"
          placeholder="What is new?"
          maxLength={text_limit}
          {...register("content", { required: true })}
          className="h-28 text-sm w-full focus:outline-none border-none rounded mb-5"
        />

        <div className="flex justify-end">
          <ButtonSmall text={"Upload"} type="submit" />
        </div>
      </form>
    </div>
  );
};
