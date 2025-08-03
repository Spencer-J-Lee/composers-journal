import ReactSelect, { Props as ReactSelectProps } from "react-select";

import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
} from "./components";

type SelectProps<Option, IsMulti extends boolean = false> = ReactSelectProps<
  Option,
  IsMulti
>;

/**
 * TODO: Fix bug where the first option is highlighted for a split second
 * once another option is chosen. Possibly due to options getting re-rendered
 * after the chosen option is removed from the list.
 */
export const Select = <Option, IsMulti extends boolean = false>(
  props: SelectProps<Option, IsMulti>,
) => {
  return (
    <ReactSelect
      {...props}
      components={{
        DropdownIndicator: DropdownIndicator<Option>,
        ClearIndicator: ClearIndicator<Option>,
        MultiValueRemove,
      }}
      styles={{
        container: (base) => ({
          ...base,
        }),

        control: (base) => ({
          ...base,
          boxShadow: "none",
          backgroundColor: "var(--color-input-background)",
          borderColor: "var(--color-input-border)",
          borderRadius: "0.5rem",

          ":hover": {
            ...base[":hover"],
            borderColor: "var(--color-input-border-hover)",
          },
          ":focus-within": {
            ...base[":focus-within"],
            borderColor: "var(--color-input-border-focus)",
          },
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0.375rem 0.5rem",
        }),
        input: (base) => ({
          ...base,
          margin: "0.325rem 0.375rem",
          color: "var(--color-text)",
          fontSize: "0.875rem",
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: "0.875rem",
        }),

        multiValue: (base) => ({
          ...base,
          borderRadius: "999px",
          backgroundColor: "var(--color-surface-light)",
          overflow: "hidden",
          margin: "0.25rem",
        }),
        multiValueLabel: (base) => ({
          ...base,
          padding: "0.25rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.25rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "var(--color-negative)",
          paddingLeft: "0.125rem",
          paddingRight: "0.25rem",
          cursor: "pointer",

          ":hover": {
            ...base[":hover"],
            backgroundColor: "inherit",
            filter: "brightness(1.25)",
          },
          ":active": {
            ...base[":active"],
            filter: "brightness(1.4)",
          },
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "var(--color-input-background)",
          color: "var(--color-text)",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: "var(--color-input-background)",
          color: "var(--color-text)",
          filter: isSelected
            ? "brightness(1.4)"
            : isFocused
              ? "brightness(1.25)"
              : undefined,
          cursor: "cursor",

          ":active": {
            ...base[":active"],
            backgroundColor: undefined,
          },
        }),

        clearIndicator: (base) => ({
          ...base,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "2rem",
          width: "2rem",
          borderRadius: "999px",
          backgroundColor: "var(--color-input-background)",
          cursor: "pointer",
          marginRight: "0.5rem",

          ":hover": {
            ...base[":hover"],
            filter: "brightness(1.25)",
            color: undefined,
          },
          ":active": {
            ...base[":active"],
            filter: "brightness(1.4)",
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "2rem",
          width: "2rem",
          borderRadius: "999px",
          backgroundColor: "var(--color-input-background)",
          cursor: "pointer",
          marginRight: "0.5rem",
          marginLeft: "0.5rem",

          ":hover": {
            ...base[":hover"],
            filter: "brightness(1.25)",
            color: undefined,
          },
          ":active": {
            ...base[":active"],
            filter: "brightness(1.4)",
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: "var(--color-border)",
        }),
      }}
    />
  );
};
