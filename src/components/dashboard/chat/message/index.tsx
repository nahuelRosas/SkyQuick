import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { chatsAtom } from "../../../../atoms/chatsAtom";
import { principalChatAtom } from "../../../../atoms/principalChatAtom";
import { sessionAtom } from "../../../../atoms/sessionAtom";
import { GetTime } from "../getTime";
import Reciver from "./reciver";
import Sender from "./sender";

const MessageComponent = ({ Data }: { Data: chatsAtom }) => {
  const { user } = useRecoilValue(sessionAtom);
  const { uid } = useRecoilValue(principalChatAtom);

  console.log(Data);

  if (Data.senderUID === user?.uid && Data.reciverUID === uid) {
    return <Sender message={Data.message} />;
  } else if (Data.senderUID === uid && Data.reciverUID === user?.uid) {
    return <Reciver message={Data.message} />;
  }

  return <></>;
};

export default MessageComponent;
