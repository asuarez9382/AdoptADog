import * as yup from "yup";

const validFileExtensions = ['jpg', 'png', 'jpeg'];

export const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(15),
    breed: yup.string().required("Must enter a breed").max(15),
    description: yup.string().required("Must enter a description"),
    /*image: yup.mixed().required("Required")
        .test("is-valid-type", "Not a valid image type",
            value => {
                const extension = value.split(".").pop().toLowerCase();
                return extension in validFileExtensions;
            }),*/
    age: yup.number().positive().integer().required("Must enter age").typeError('Please enter an Integer').max(20),
    price: yup.number().positive("Price must be positive").integer().required("Must enter age").typeError('Please enter an Integer').min(0, "Minimum price is $0")
  });

  