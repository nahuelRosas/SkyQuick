import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import { ImSpinner10 } from "react-icons/im";

type blockIconsProps = {};

const BlockIcons: React.FC<blockIconsProps> = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      flexDir={"row"}>
      <IconButton
        aria-label="story"
        colorScheme={"red"}
        icon={<ImSpinner10 />}
        fontSize="2xl"
        variant="ghost"
        isRound
      />
      <IconButton
        aria-label="new message"
        colorScheme={"red"}
        icon={<HiPencilSquare />}
        fontSize="2xl"
        variant="ghost"
        isRound
      />
      <IconButton
        aria-label="Menu"
        colorScheme={"red"}
        icon={<HiOutlineDotsVertical />}
        fontSize="2xl"
        variant="ghost"
        isRound
      />
    </Flex>
  );
};
export default BlockIcons;
