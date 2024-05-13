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
import { createPost } from "../actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Response from "@/components/Response";
import SubmitButton from "@/components/SubmitButton";

const NewPosts = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createPost, {
    error: "",
    invalidElement: "",
  });

  useEffect(() => {
    if (state.error.length === 0) {
      onClose();
    }
  }, [state]);

  return (
    <>
      <Button onPress={onOpen}>New posts</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="grid gap-2">
                New Post
                {state.error && <Response error>{state.error}</Response>}
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="title"
                  label="TITLE"
                  variant="underlined"
                  isInvalid={state.invalidElement === "title"}
                  isRequired
                />
                <Input type="file" variant="underlined" />
                <Textarea
                  variant="underlined"
                  name="message"
                  label="Message"
                  isInvalid={state.invalidElement === "message"}
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <SubmitButton
                  text="Create"
                  pendingText="Creating"
                  variant="solid"
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPosts;
