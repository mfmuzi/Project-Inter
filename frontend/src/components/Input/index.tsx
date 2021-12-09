import { InputContainer } from "./styles";
import { InputHTMLAttributes } from "react";



const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
        <InputContainer>
            <input {...props} />
        </InputContainer>);
}

export default Input;