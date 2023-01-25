import { Flex, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiCheck, HiPencil } from 'react-icons/hi';

import useRecoveryData from '../../../../../hooks/useRecoveryData';

const EditAbout = ({ about }: { about: string }) => {
  const [activateInput, setActivateInput] = useState(false);
  const [aboutUser, setAboutUser] = useState("");

  const { updateAbout } = useRecoveryData();

  return (
    <Flex
      direction="row"
      w={"100%"}
      h={"auto"}
      bg={"blackAlpha.900"}
      p={5}
      borderRadius="md"
      alignContent={"center"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={4}>
      <Text
        fontSize={"lg"}
        fontWeight={"light"}
        color={"gray.200"}
        textOverflow={"ellipsis"}
        w={"100%"}
        h={"auto"}
        maxW={"90%"}
        maxH={"auto"}
        overflow={"hidden"}
        noOfLines={2}
        display={activateInput ? "none" : "block"}
        textAlign={"left"}>
        {about ? about : "This user has not yet added an about."}
      </Text>
      <Input
        p={2}
        fontSize={"lg"}
        fontWeight={"light"}
        color={"gray.200"}
        borderColor={"cyan.900"}
        borderWidth={"2px"}
        w={"100%"}
        h={"auto"}
        maxW={"90%"}
        maxH={"auto"}
        overflow={"hidden"}
        display={activateInput ? "block" : "none"}
        textAlign={"left"}
        value={aboutUser}
        onChange={(e) => setAboutUser(e.target.value)}
      />

      <IconButton
        aria-label="Edit"
        variant={"ghost"}
        fontSize="2rem"
        _hover={{ bg: "cyan.900", color: "gray.200" }}
        _active={{ bg: "cyan.900", color: "gray.200" }}
        icon={aboutUser.length > 0 ? <HiCheck /> : <HiPencil />}
        onClick={
          aboutUser.length > 0
            ? () => {
                updateAbout(aboutUser);
                setActivateInput(!activateInput);
                setAboutUser("");
              }
            : () => setActivateInput(!activateInput)
        }
        colorScheme="cyan"
      />
    </Flex>
  );
};
export default EditAbout;
