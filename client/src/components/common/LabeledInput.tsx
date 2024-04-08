import { forwardRef, useId } from "react";
import "./LabeledInput.css";

interface LabeledInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    hideUpDown?: boolean;
    isMoney?: boolean;
    required?: boolean;
}

const LabeledInput: React.ForwardRefRenderFunction<HTMLInputElement, LabeledInputProps> = (props, ref) => {
  const id = useId();

  const type = props.type || "text";
  const placeholder = props.placeholder || props.label;

  let inputClasses = "input input-bordered";
  if (props.hideUpDown)
    inputClasses += " hide-up-down";

  // TODO: SHOULD SHOW DOLLAR SYMBOL IF ISMONEY IS TRUE
  //       THE DOLLAR SYMBOL SHOULD NOT AFFECT THE STRING VALUE
  //       IT MAY REQUIRE A DIFFERENT HTML STRUCTURE THAN THE STANDARD ONE
  //       THAT ALREADY EXISTS
  //       OR ALTERNATIVELY WE CAN MAKE IT PART OF THE STRING, BUT
  //       THAT WOULD REQUIRE REMEMBERING TO PARSE IT CORRECTLY FOR
  //       EACH TIME WE WANT TO GET THE VALUE FROM THE COMPONENT

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
          <span className="label-text">{props.label}</span>
      </label>
      <input id={id} ref={ref} type={type} placeholder={placeholder}
        className={inputClasses} required={props.required} />
    </div>
  );
}

export default forwardRef(LabeledInput);
