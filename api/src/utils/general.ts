import otpGenerator from 'otp-generator';

export const validateEmail = (input: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(input).toLowerCase());
};

export const otpGeneratorUtil = () => {
  const genOtp = otpGenerator.generate(6, {
    // 567890
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  return genOtp; // 009078 -> 9078
};

export enum loginStrategies {
  LOCAL = 'LOCAL',
  GITHUB = 'GITHUB',
}
