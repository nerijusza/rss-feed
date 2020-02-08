import * as React from "react";
import UserForm, {LoginProps} from "./UserForm";

const LoginPage = () => {
    return <UserForm {...LoginProps} />
};

export default LoginPage