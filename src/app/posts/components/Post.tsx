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
import type { users, posts } from "@prisma/client";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import { deletePost } from "../actions";

type Props = {
  user: users;
  loggedUserId: string;
} & posts;

const Post = ({
  id: postId,
  createdAt,
  title,
  message,
  user_id: creatorId,
  user: creator,
  loggedUserId,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="mb-8 max-w-[500px] py-4">
        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
          <div className="flex w-full items-center justify-between">
            <p className="text-tiny uppercase">
              Posted by{" "}
              <span className="font-bold">{creator.name || "unknow"}</span>
            </p>
            <small className="text-default-500 underline">
              {new Date(createdAt).toDateString()}
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
          <p className="mt-3 line-clamp-3 max-h-[100px]">{message}</p>
          <ButtonGroup fullWidth className="mt-5">
            <Button
              as={Link}
              href={`/posts/${postId}`}
              className="uppercase"
              variant="light"
            >
              View
            </Button>
            {creatorId === loggedUserId && (
              <>
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
              </>
            )}
          </ButtonGroup>
        </CardBody>
      </Card>
      <DeleteModal
        title={`Delete ${title} post`}
        isOpen={isOpen}
        errorMessage="Creator ID does not match"
        onDeleteHandler={() => deletePost(postId)}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Post;
