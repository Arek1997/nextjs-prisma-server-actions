"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import DeleteModal from "./DeleteModal";

type Props = Prisma.postsGetPayload<{
  include: {
    user: true;
  };
}>;

const Post = ({ id, title, message, date, user: { name } }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="mb-8 max-w-[500px] py-4">
        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
          <div className="flex w-full items-center justify-between">
            <p className="text-tiny uppercase">
              Posted by <span className="font-bold">{name}</span>
            </p>
            <small className="text-default-500 underline">
              {new Date(date).toDateString()}
            </small>
          </div>
          <h2 className="mt-2 text-large font-bold">{title}</h2>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            className="rounded-xl object-cover"
            src="/images/girl.jpeg"
            alt="Girl image"
          />
          <p className="mt-3 max-h-[100px] overflow-y-auto">{message}</p>
          <ButtonGroup fullWidth className="mt-5">
            <Button className="uppercase" variant="light">
              View
            </Button>
            <Button className="uppercase" variant="light">
              Edit
            </Button>
            <Button
              className="uppercase"
              color="danger"
              variant="light"
              onPress={onOpen}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <DeleteModal
        postId={id}
        postTitle={title}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Post;
