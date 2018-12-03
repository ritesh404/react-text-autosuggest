import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const useDebounced = (fn, time) => {
  const [timer, setTimer] = useState(null);

  return textValue => {
    clearTimeout(timer);
    setTimer(setTimeout(() => fn(textValue), time));
  };
};

const focusFnHOC = (focusFn, updateFocus) =>
  focusFn
    ? R.compose(
        focusFn,
        updateFocus
      )
    : updateFocus;

const AutoSuggest = ({
  value,
  defaultValue,
  defaultOptions,
  options,
  debounceTime,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyEnd,
  autoFocus,
  renderOption,
  containerClassName,
  inputClassName,
  optionContainerClassName
}) => {
  const [isFocused, setFocused] = useState(false);
  const renderOptionContainerWithDefault = renderWithDefault(
    renderList(optionContainerClassName, renderOption)
  );
  const debouncedFn = useDebounced(onKeyEnd, debounceTime);

  return (
    <div className={containerClassName}>
      <input
        className={inputClassName}
        type="text"
        autoFocus={autoFocus}
        value={value}
        defaultValue={defaultValue}
        onChange={e => {
          onChange ? onChange(e) : null;
          onKeyEnd ? debouncedFn(e.target.value) : null;
        }}
        onFocus={focusFnHOC(onFocus, () => setFocused(true))}
        onBlur={focusFnHOC(onBlur, () => setFocused(false))}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
      {isFocused
        ? renderOptionContainerWithDefault(
            renderOptionContainerWithDefault(null)(defaultOptions)
          )(options)
        : null}
    </div>
  );
};

const renderWithDefault = R.curry((render, defaultRender) =>
  R.ifElse(R.isEmpty, R.always(defaultRender), render)
);

const renderList = R.curry(
  (optionContainerClassName, renderOption, options) => (
    <div className={optionContainerClassName}>
      {R.map(renderOption, options)}
    </div>
  )
);

AutoSuggest.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  defaultOptions: PropTypes.array,
  options: PropTypes.array,
  debounceTime: PropTypes.number,
  autoFocus: PropTypes.bool,
  renderOption: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  optionContainerClassName: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyEnd: PropTypes.func,
  onBlur: PropTypes.func
};

AutoSuggest.defaultProps = {
  debounceTime: 300,
  immediate: false,
  defaultOptions: [],
  options: []
};

export default AutoSuggest;
