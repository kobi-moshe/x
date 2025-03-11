import { TypewriterType } from "./types";
import TypewriterComp from "typewriter-effect";

export const Typewriter: React.FC<TypewriterType> = (props) => {
  const { text, wrapperClassName } = props;

  return (
    <TypewriterComp
      onInit={(typewriter) => {
        typewriter.typeString(text).start();
      }}
      options={{ delay: 10, cursor: "", wrapperClassName }}
    />
  );
};
