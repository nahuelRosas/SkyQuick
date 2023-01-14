import { Avatar } from '@chakra-ui/react';
import React from 'react';

import { chatDefault } from '../../../utils/chatDefault';

type chatsProps = {
  PhotoURL?: string;
  Name?: string;
  lastMessage?: string;
  time?: string;
  isOnline?: boolean;
};

const Chats: React.FC<chatsProps> = ({
  PhotoURL,
  Name,
  lastMessage,
  time,
  isOnline,
}) => {
  const _Message = lastMessage ? lastMessage : chatDefault.lastMessage;
  const Message =
    _Message.length > 50 ? _Message.slice(0, 50) + "..." : _Message;

  const _Name = Name ? Name : chatDefault.Name;
  const Name_ = _Name.length > 20 ? _Name.slice(0, 20) + "..." : _Name;

  const _isOnline = isOnline ? isOnline : chatDefault.isOnline;

  return (
    <>
      <Avatar></Avatar>
    </>
    //   
  );
};
export default Chats;
