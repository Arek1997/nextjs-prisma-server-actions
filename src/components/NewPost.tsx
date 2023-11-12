"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

const NewPosts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="mb-5 justify-self-center" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>New Post</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  label="TITLE"
                  variant="underlined"
                />
                <Input
                  type="file"
                  label="IMAGE"
                  placeholder=" "
                  variant="underlined"
                />
                <Textarea isRequired variant="underlined" label="Content" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="default" onPress={onClose}>
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPosts;
