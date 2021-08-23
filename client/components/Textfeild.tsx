import React from 'react';

interface TextfeildProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
  name?: string;
  args?: any;
  autoComplete?: boolean;
}

const Textfeild: React.FC<TextfeildProps> = ({
  placeholder,
  onChange,
  value,
  autoFocus,
  defaultValue,
  className,
  name,
  args,
  autoComplete,
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      className={className}
      name={name}
      autoComplete={autoComplete ? 'on' : 'off'}
      {...args}
    />
  );
};

Textfeild.defaultProps = {
  autoComplete: false,
};

export default Textfeild;
