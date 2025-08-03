import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DropdownIndicator = <T,>(props: DropdownIndicatorProps<T>) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faChevronDown} fixedWidth />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = <T,>(props: ClearIndicatorProps<T>) => {
  return (
    <components.ClearIndicator {...props}>
      <FontAwesomeIcon icon={faXmark} fixedWidth />
    </components.ClearIndicator>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <FontAwesomeIcon icon={faXmark} size="sm" fixedWidth />
    </components.MultiValueRemove>
  );
};
