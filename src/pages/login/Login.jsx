import { Form } from "../../components/form/Form";

export const Login = () => {

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
    }
  ];

  const onSubmit = (FormData) => {
    // Custom submit logic
    console.log("Form submitted with data:", FormData);
  };

  const initialState = {
    username: "",
    password: ""
  };


  return (
    <div>
      < Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Login" btnTxt="Sign In"/>
    </div>
  )
}
