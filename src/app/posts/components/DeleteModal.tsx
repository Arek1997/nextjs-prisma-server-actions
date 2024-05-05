import { useState } from "react";
import Response from "@/components/Response";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type Props = {
  title: string;
  isOpen: boolean;
  errorMessage?: string;
  onDeleteHandler: () => Promise<void>;
  onOpenChange: () => void;
};

const DeleteModal = ({
  title,
  isOpen,
  errorMessage = "Some error occurred. Please try again.",
  onDeleteHandler,
  onOpenChange,
}: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const onDelete = async () => {
    setDeleting(true);

    try {
      await onDeleteHandler();
    } catch (error) {
      console.error(error);
      setDeleting(false);
      setError(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h2>{title}</h2>
              <p>Are you sure you wanna delete this?</p>
              {error && <Response error>{error}</Response>}
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
