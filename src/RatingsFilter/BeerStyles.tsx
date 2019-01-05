import {
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { InputBaseComponentProps } from "@material-ui/core/InputBase";
import { Theme } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import CancelIcon from "@material-ui/icons/Cancel";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import Select from "react-select";
import { ValueContainerProps } from "react-select/lib/components/containers";
import { MenuProps, NoticeProps } from "react-select/lib/components/Menu";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { PlaceholderProps } from "react-select/lib/components/Placeholder";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import { OptionProps } from "react-select/lib/components/Option";
import { ControlProps } from "react-select/lib/components/Control";
import { SelectComponentsConfig } from "react-select/lib/components";

export type BeerStyle = string;
export interface Props {
  availableStyles: BeerStyle[];
  selectedStyles: BeerStyle[];
  onChange: (beerStyles: BeerStyle[]) => void;
}

type Option = { value: string; label: string };
const components: SelectComponentsConfig<Option> = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: "flex",
      padding: 0,
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center",
      overflow: "hidden",
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: "absolute",
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  }),
);

function beerStyleToOption(beerStyle: BeerStyle): Option {
  return {
    label: beerStyle,
    value: beerStyle,
  };
}

function beerStylesToOptions(beerStyles: BeerStyle[]): Option[] {
  return beerStyles.map(beerStyleToOption);
}

function BeerStyles(props: Props) {
  const { availableStyles, onChange, selectedStyles } = props;

  const classes = useClasses();
  const theme = useTheme<Theme>();
  const selectStyles = {
    input: (base: any) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };

  const handleChange = React.useCallback(
    (options: Option[] | Option | null | undefined) => {
      if (options == null) {
        onChange([]);
      } else if (!Array.isArray(options)) {
        onChange([options.value]);
      } else {
        onChange(options.map(({ value }) => value));
      }
    },
    [onChange],
  );
  const options: Option[] = React.useMemo(
    () => beerStylesToOptions(availableStyles),
    [availableStyles],
  );
  const value: Option[] = React.useMemo(
    () => beerStylesToOptions(selectedStyles),
    [selectStyles],
  );

  return (
    // @ts-ignore
    <Select<Option>
      styles={selectStyles}
      textFieldProps={{
        label: "Label",
        InputLabelProps: {
          shrink: true,
        },
      }}
      options={options}
      // ClearIndicator<Option> not assignable to ClearIndicator<string>
      components={components as any}
      value={value}
      onChange={handleChange}
      placeholder="Select multiple styles"
      isMulti
      /* selectProps  */
      classes={classes}
    />
  );
}

function inputComponent({ inputRef, ...props }: InputBaseComponentProps) {
  return <div ref={inputRef} {...props as any} />;
}

function Control(props: ControlProps<Option>) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Menu(props: MenuProps<Option>) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

function MultiValue(props: MultiValueProps<Option>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function NoOptionsMessage(props: NoticeProps<Option>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Option(props: OptionProps<Option>) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props: PlaceholderProps<Option>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<Option>) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<Option>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

export default BeerStyles;
