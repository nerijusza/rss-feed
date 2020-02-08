import {Alert} from "@material-ui/lab";
import * as React from "react";

type Props = {
    message: string
}

export const Error = (props: Props) => {
    if (props.message) {
        return <Alert severity="error">{props.message}</Alert>
    }

    return null;
};
