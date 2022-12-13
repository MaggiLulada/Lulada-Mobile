import React from 'react'
import { HelperText, TextInput } from 'react-native-paper'

const Input = ({
    label,
    value,
    onChangeText,
    style,
    underlineColor,
    multiline,
    right,
    keyboardType,
    error,
    placeholder,
    labelError
}) => {
  return (
    <>
    <TextInput
      keyboardType={keyboardType}
      multiline={multiline}
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={style}
      underlineColor={underlineColor}
      right={right ? <TextInput.Affix text={right} /> : null}
      error={error}
      placeholder={placeholder}
    />
    <HelperText type='error' visible={error} >
      {labelError}
    </HelperText>
    </>
  )
}

export default Input