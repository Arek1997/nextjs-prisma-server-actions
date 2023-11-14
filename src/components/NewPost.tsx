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
import { useState } from "react";

const NewPosts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const addNewPostHandler = async (callBack: () => void) => {
    if (!title.trim() || !content.trim()) {
      return setResponse(`Title and content are required.`);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      console.log(data);
      callBack();
    } catch (error) {}
  };

  return (
    <>
      <Button className="mb-5 justify-self-center" onPress={onOpen}>
        New posts
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid gap-2">
                New Post
                {response && (
                  <p className="text-sm text-danger-400">{response}</p>
                )}
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  label="TITLE"
                  variant="underlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={title.trim().length !== 2}
                />
                <Input
                  type="file"
                  label="IMAGE"
                  placeholder=" "
                  variant="underlined"
                />
                <Textarea
                  isRequired
                  variant="underlined"
                  label="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  isInvalid={content.trim().length !== 5}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="default"
                  onPress={() => addNewPostHandler(onClose)}
                >
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
