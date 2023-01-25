import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';

import useRecoveryData from '../../../../../hooks/useRecoveryData';

const EditPhotoProfile = ({
  isOpen,
  onClose,
  user,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onOpen: () => void;
}) => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(
    user?.photoURL || null
  );
  const [loading, setLoading] = useState(false);
  const { updatePhotoURL } = useRecoveryData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (file) {
      setLoading(true);
      updatePhotoURL(file as string).then(() => {
        setLoading(false);
      });
      onClose();
    }
  };

  return (
    <>
      <Box
        onClick={onOpen}
        backgroundImage={`url(${user?.photoURL})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        w={150}
        h={150}
        borderRadius="full"
        cursor="pointer"
        bgSize="cover">
        <Center
          w={150}
          h={150}
          borderRadius="full"
          color="transparent"
          bg={"transparent"}
          fontSize="xl"
          fontWeight="bold"
          transition="all 0.2s"
          _hover={{
            bg: "rgba(0,0,0,0.7)",
            color: "white",
          }}>
          <Icon as={FiImage} />
        </Center>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg={"gray.900"}
            color={"gray.300"}
            fontSize="xl"
            fontWeight="bold"
            alignItems={"center"}
            textAlign={"center"}>
            Change Avatar
          </ModalHeader>
          <ModalCloseButton color={"gray.300"} />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            bg={"gray.900"}
            justifyContent="center">
            <Center h="auto">
              <Avatar
                src={file as string}
                size="2xl"
                name={user?.displayName}
                bg="gray.100"
                color="gray.500"
                fontSize="4xl"
                fontWeight="bold"
                mb={4}
              />
            </Center>
            <InputGroup
              mt={4}
              size="md"
              borderRadius="md"
              fontSize="sm"
              color="gray.300"
              fontWeight="medium"
              w="50%"
              alignItems="center"
              cursor={"pointer"}
              lineHeight="short">
              <InputLeftElement pointerEvents="none" cursor={"pointer"}>
                <Icon as={FiImage} color="gray.300" />
              </InputLeftElement>
              <Input
                type="file"
                cursor={"pointer"}
                name="avatar"
                accept="image/*"
                placeholder="Upload Avatar"
                onChange={handleFileChange}
                sx={{
                  "::file-selector-button": {
                    height: 10,
                    color: "gray.300",
                    width: "auto",
                    padding: 0,
                    borderRadius: "md",
                    border: "none",
                    mr: 4,
                    background: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  },
                }}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter bg={"gray.900"}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Button
                color={"red.300"}
                bg={"gray.900"}
                _hover={{
                  bg: "red.700",
                  color: "white",
                }}
                _active={{
                  bg: "red.800",
                  color: "white",
                }}
                variant="ghost"
                disabled={loading}
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                color={"cyan.300"}
                bg={"gray.900"}
                _hover={{
                  bg: "cyan.800",
                  color: "white",
                }}
                _active={{
                  bg: "cyan.800",
                  color: "white",
                }}
                variant="solid"
                onClick={handleSave}
                disabled={loading}
                isLoading={loading}
                loadingText="Saving"
                mr={3}>
                Save
              </Button>
            </Grid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPhotoProfile;
