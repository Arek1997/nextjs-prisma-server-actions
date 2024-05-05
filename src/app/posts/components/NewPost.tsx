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
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import Response from "@/components/Response";

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
                <SubmitButton />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const SubmitButton = () => {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      color="default"
      isLoading={status.pending}
      isDisabled={status.pending}
    >
      {status.pending ? "Creating" : "Create"}
    </Button>
  );
};

export default NewPosts;
