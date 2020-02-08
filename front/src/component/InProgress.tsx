import {Alert} from "@material-ui/lab";
import * as React from "react";
import {ProgressBar} from "./ProgressBar";

type Props = {
    message: string
}

export const InProgress = (props: Props) => {
    if (props.message) {
        return (
            <Alert severity="info">
                {props.message}
                <ProgressBar visible={true} />
            </Alert>
        )
    }

    return null;
};
