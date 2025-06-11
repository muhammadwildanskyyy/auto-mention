import { cn } from "@/src/lib/utils";
import React from "react";
import { Spinner } from "./spinner";

type Props = {
  state: Boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const Loader = ({ children, state, className, color }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  );
};

export default Loader;
