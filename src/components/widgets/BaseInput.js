import React, { PropTypes } from "react";

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    value,
    readonly,
    autofocus,
    onBlur,
    options,
    schema,
    formContext,
    registry,
    readOnlyForm,
    ...inputProps
  } = props;

  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === "" ? undefined : value, {id: props.id});
  };

  let classNames = "form-control"
  if(options.controlClassNames !== "" && options.controlClassNames !== null && options.controlClassNames !== undefined) {
    classNames = options.controlClassNames
                        .join(" ")
                        .trim();
  }

  return (
    <input
      {...inputProps}
      className={classNames}
      readOnly={readOnlyForm? readOnlyForm : readonly}
      autoFocus={autofocus}
      value={value == null ? "" : value}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
    />
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  options: {},
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    options: PropTypes.shape({
      titleClassNames: PropTypes.array,
      controlClassNames: PropTypes.array,
    }),
  };
}

export default BaseInput;
