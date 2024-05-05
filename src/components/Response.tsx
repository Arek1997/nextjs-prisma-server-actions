import { cn } from "@nextui-org/react";
import { HTMLAttributes } from "react";

type Props = {
  success?: boolean;
  error?: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Response = ({ success, error, className, children, ...props }: Props) => (
  <p
    className={cn(
      "text-sm",
      success && "text-green-600",
      error && "text-red-600",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

export default Response;
