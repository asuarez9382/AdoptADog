import * as yup from "yup";


export const dogFormSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(15),
    breed: yup.string().required("Must enter a breed").max(15),
    description: yup.string().required("Must enter a description"),
    image: yup.string().required("Required").matches(/\.(jpg|jpeg|png)$/i, 'Image URL must end with .jpg, .jpeg, or .png'),
    age: yup.number().positive().integer().required("Must enter age").typeError('Please enter an Integer').max(20),
    price: yup.number().positive("Price must be positive").integer().required("Must enter a price").typeError('Please enter an Integer').min(0, "Minimum price is $0")
  });

  
  export const userFormSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").max(15),
    email: yup.string().email("Please enter a valid email").required("Must enter an email"),
    password: yup.string().min(8).required("Must enter a password"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Required")
  });