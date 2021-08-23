import React from 'react';
import PhoneInput from 'react-phone-input-2';

interface NumberfeildProps {
  placeholder: string;
  name?: string;
  onChange: (value: string, country: any) => void;
  value: string;
}

const Numberfeild: React.FC<NumberfeildProps> = ({
  onChange,
  placeholder,
  value,
  name,
}) => {
  return (
    <PhoneInput
      placeholder={placeholder}
      country='in'
      onChange={onChange}
      value={value}
      inputStyle={{
        width: '100%',
        border: '1px solid grey',
        padding: '5px',
        borderRadius: '5px',
      }}
      inputProps={{ name: name }}
    />
  );
};

export default Numberfeild;
