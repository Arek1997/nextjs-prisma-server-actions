import { PropsWithChildren } from "react";

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="mx-auto mt-20 md:max-w-[80%] xl:max-w-[90%]">
      {children}
    </section>
  );
};

export default PostLayout;
