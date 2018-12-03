import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import AutoSuggest from "../src/AutoSuggest";

import "./default.css";

const list = [
  "🍎 Apple",
  "🍍 Pineapple",
  "🖊 Pen",
  "💫 Ugh",
  "🍎🖊 ApplePen",
  "🍍🖊 PineapplePen",
  "🖊🍍🍎🖊 PenPineappleApplePen"
];

class Wrapper extends React.Component {
  state = {
    text: "",
    list
  };

  render() {
    return (
      <AutoSuggest
        containerClassName={"autosuggest-container"}
        inputClassName={"autosuggest-input"}
        optionContainerClassName={"autosuggest-option-container"}
        defaultOptions={list}
        options={this.state.list}
        value={this.state.text}
        onKeyEnd={value =>
          this.setState({
            list: list.filter(
              txt => txt.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )
          })
        }
        onChange={e => this.setState({ text: e.target.value })}
        renderOption={option => (
          <div
            key={option}
            onMouseDown={e => {
              this.setState({ text: option });
            }}
            className="autosuggest-option"
          >
            {option}
          </div>
        )}
      />
    );
  }
}

storiesOf("AutoSuggest", module).add("with text", () => <Wrapper />);
