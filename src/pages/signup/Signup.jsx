import { Form } from "../../components/form/Form"

export const Signup = () => {

    const fields = [
      {
        name: "username",
        label: "Username: ",
        type: "text",
        placeholder: "Username"
      },
      {
        name: "password",
        label: "Password:",
        type: "password",
        placeholder: "Password"
      }, 
      {
        name: "confirmPassword",
        label: "Confirm Password:",
        type: "password",
        placeholder: "Confirm Password"
      }
    ];

    const onSubmit = (FormData) => {
      // Custom submit logic
      console.log("Form submitted with data:", FormData);
    };

    const initialState = {
      username: "",
      password: "",
      confirmPassword: ""
    };
  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Create an account" btnTxt="Create" />
    </div>
  )
}
