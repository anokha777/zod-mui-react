import { z } from 'zod';

export const RegistrationSchema = z.object({
  name: z.string().min(2, {message: "Provide the name."}),
  email: z.string().email({message: "Not a valid email."}),
  password: z.string().min(5, {message: "Password has to be at least 5 charecters"}),
  confirmPassword: z.string().min(5, {message: "Confirm Password has to be at least 5 charecters"}),
  birthday: z.string().transform((value) => new Date(value)).or(z.undefined()),
  gender: z.string({
    errorMap: () => {
      return { message: "You have to select a gender" }
    }
  }),
  termsAndConditions: z.boolean()
})
.superRefine(({ password, confirmPassword, termsAndConditions, birthday }, ctx) => {
  if(password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password do not match",
      path: ["confirmPassword"],
    })
  }
  if(termsAndConditions !== true) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You have to accept terms and conditions",
      path: ["termsAndConditions"],
    })
  }
  if(birthday) {
    const now = new Date();
    const nowMinus18Years = now.getTime() - 567648000000;
    const isValidAge = birthday.getTime() < nowMinus18Years;
    if(isNaN(birthday.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No Valid date",
        path: ["birthday"],
      })
    }
    if(!isValidAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You have to be at least 18 years old  .",
        path: ["birthday"],
      })
    }
  }
});
