import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { text_limit } from "../../utils/css";
import { ButtonSmall } from "../Button/buttonSmall";
import { SocketContext } from "../../app/services/socket"
import { useSelector } from "react-redux";


export const ChatForm = ({ conversationId }) => {
  const { register, handleSubmit, reset } = useForm();
  const userId = useSelector(state => state.user.id)
  const socket = useContext(SocketContext);

  const onSubmit = async (data) => {
    socket.emit('handleMessage', { ...data, conversationId, userId }, (res) => {
      if (res.message === 'SUCCESS') {
        reset({ content: "" });
      }
    });
  };

  const onChange = async () => {
    socket.emit('handleTyping', { conversationId, userId });
  };

  return (
    <div className="w-full h-full flex items-center bg-white rounded p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
        <textarea
          type="text"
          placeholder="Message something"
          maxLength={text_limit}
          {...register("content", { required: true })}
          onChange={() => onChange()}
          className="resize-none text-sm w-full focus:outline-none border-none rounded mr-5"
        />

        <div className="flex items-center">
          <ButtonSmall text={"Send"} type="submit" />
        </div>
      </form>
    </div>
  );
};