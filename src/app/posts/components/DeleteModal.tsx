import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { deletePost } from "../actions";

type Props = {
  postId: string;
  postTitle: string;
  isOpen: boolean;
  onOpenChange: () => void;
};

const DeleteModal = ({ postTitle, postId, isOpen, onOpenChange }: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const onDelete = async () => {
    setDeleting(true);

    try {
      await deletePost(postId);
    } catch (error) {
      console.error(error);
      setDeleting(false);
      setError("Creator ID does not match");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h2>Delete {postTitle} post</h2>
              <p>Are you sure you wanna delete this post?</p>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </ModalHeader>

            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                isDisabled={deleting}
                isLoading={deleting}
                onPress={onDelete}
              >
                {deleting ? "Deleting" : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
