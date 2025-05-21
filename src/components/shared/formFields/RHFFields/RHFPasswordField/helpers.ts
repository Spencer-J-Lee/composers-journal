export const checkPasswordRules = (password: string) => ({
  minLength: password.length >= 8,
  hasLowercase: /[a-z]/.test(password),
  hasUppercase: /[A-Z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSymbol: /[^A-Za-z0-9]/.test(password),
});
