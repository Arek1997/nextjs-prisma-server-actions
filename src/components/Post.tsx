import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  ButtonGroup,
  Button,
} from "@nextui-org/react";

export interface PostInterface {
  _id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  image: string;
  imageAlt: string;
}

type Props = PostInterface;

const Post = ({ author, date, title, content, image, imageAlt }: Props) => {
  return (
    <Card className="max-w-[500px] py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-tiny uppercase">
            Posted by <span className="font-bold">{author}</span>
          </p>
          <small className="text-default-500 underline">{date}</small>
        </div>
        <h2 className="mt-2 text-large font-bold">{title}</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          placeholder="blur"
          className="rounded-xl object-cover"
          alt={imageAlt}
          src={image}
        />
        <p className="mt-3 max-h-[100px] overflow-y-auto">{content}</p>
        <ButtonGroup fullWidth className="mt-5">
          <Button className="uppercase" variant="light">
            View
          </Button>
          <Button className="uppercase" variant="light">
            Edit
          </Button>
          <Button className="uppercase" color="danger" variant="light">
            Delete
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default Post;
