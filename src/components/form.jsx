import React from "react";

export default function Form(props) {
  return (
    <div>
      <form className="form-container">
        <div>
          <input
            type="text"
            className="input"
            onInput={props.handleInput}
            ref={props.inputRef}
            required
            autoFocus
            maxLength={60}
            placeholder={
              props.isEmpty ? "This input Cannot be Empty" : "Enter Task"
            }
          />
        </div>

        <div>
          <button className="button" type="submit" onClick={props.handleAdd}>
            +
          </button>
        </div>
      </form>
    </div>
  );
}
