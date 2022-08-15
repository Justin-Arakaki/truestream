import React from 'react';
import NumberFormat from 'react-number-format';

const MoneyFormat = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

export default MoneyFormat;
