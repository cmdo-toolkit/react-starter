import React, { useEffect, useRef } from "react";

import { forms } from "../../Lib/Forms";
import s from "./Pin.module.scss";

type Props = {
  id?: string;
  name?: string;
  size?: number;
  disabled?: boolean;
  onChange: OnChange;
};

type State = {
  data: () => string;
  onChange: OnChange;
};

type OnChange = (index: number, value: string) => void;

export function Pin({ id, name, size = 5, disabled = false, onChange }: Props): JSX.Element {
  const inputs = useRef<Map<number, HTMLInputElement>>(new Map());
  const values = useRef<Map<number, string>>(new Map());

  useEffect(
    () =>
      forms.subscribe("focus", (fid: string, target?: string) => {
        if (id === fid && target === name) {
          inputs.current.get(0)?.focus();
        }
      }),
    [id, name]
  );

  useEffect(
    () =>
      forms.subscribe("clear", (fid: string) => {
        if (id === fid) {
          inputs.current.forEach((input) => {
            input.value = "";
          });
        }
      }),
    [id, name]
  );

  return (
    <div className={s.container}>
      {Array.from(Array(size)).map((_, index) => (
        <input
          key={index}
          ref={(component) => {
            if (component !== null) {
              inputs.current.set(index, component);
            }
          }}
          className={s.input}
          maxLength={1}
          disabled={disabled}
          onPaste={(e) => {
            e.preventDefault();
            if (typeof navigator.clipboard.readText === "function") {
              navigator.clipboard.readText().then((text) => {
                text.split("").forEach((value, index) => {
                  const input = inputs.current.get(index);
                  if (input) {
                    input.blur();
                    input.value = value;
                    onChange(index, value);
                  }
                });
              });
            }
          }}
          onKeyUp={({ key }) => {
            if (key === "Backspace") {
              const nextIndex = index - 1;
              const hasValue = values.current.has(index) && values.current.get(index) !== "";
              if (!hasValue && nextIndex > -1) {
                inputs.current.get(nextIndex)?.focus();
              }
            } else {
              const hasValue = values.current.has(index) && values.current.get(index) !== "";
              if (hasValue) {
                const nextIndex = index + 1;
                if (nextIndex < size) {
                  inputs.current.get(nextIndex)?.focus();
                }
              }
            }
          }}
          onFocus={() => {
            inputs.current.get(index)?.select();
          }}
          onChange={({ target: { value } }) => {
            values.current.set(index, value);
            onChange(index, value);
          }}
        />
      ))}
    </div>
  );
}

export function usePin(): State {
  const ref = useRef<string[]>([]);
  return {
    data() {
      return ref.current.reduce((pin, value) => `${pin}${value}`, "");
    },
    onChange(index: number, value: string) {
      ref.current[index] = value;
    }
  };
}
