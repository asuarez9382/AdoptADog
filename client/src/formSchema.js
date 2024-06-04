import * as yup from "yup";


export const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(15),
    breed: yup.string().required("Must enter a breed").max(15),
    description: yup.string().required("Must enter a description"),
    image: yup.string().required("Required").matches(/\.(jpg|jpeg|png)$/i, 'Image URL must end with .jpg, .jpeg, or .png'),
    age: yup.number().positive().integer().required("Must enter age").typeError('Please enter an Integer').max(20),
    price: yup.number().positive("Price must be positive").integer().required("Must enter a price").typeError('Please enter an Integer').min(0, "Minimum price is $0")
  });

  