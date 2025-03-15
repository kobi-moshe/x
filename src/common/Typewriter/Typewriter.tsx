import { TypewriterType } from "./types";
import TypewriterComp from "typewriter-effect";

export const Typewriter: React.FC<TypewriterType> = (props) => {
  const { text, delay = 10, wrapperClassName } = props;

  return (
    <TypewriterComp
      onInit={(typewriter) => {
        typewriter.typeString(text).start();
      }}
      options={{ delay, cursor: "", wrapperClassName }}
    />
  );
};
