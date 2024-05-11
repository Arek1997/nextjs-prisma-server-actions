import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import ThreeDotsIcon from "/public/three-dots-vertical.svg";

const CommentOptions = () => {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2">
      <Dropdown
        classNames={{
          content: "min-w-[auto]",
        }}
      >
        <DropdownTrigger>
          <Button isIconOnly aria-label="Comments option menu">
            <Image src={ThreeDotsIcon} alt="Three dots" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          color="primary"
          aria-label="Comment options"
        >
          <DropdownItem className="w-fit" key="edit">
            Edit
          </DropdownItem>
          <DropdownItem className="w-fit" key="delete">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CommentOptions;
