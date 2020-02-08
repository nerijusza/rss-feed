import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

type Props = {
    visible: boolean
}

export const ProgressBar = (props: Props) => {
    if (props.visible) {
        return <LinearProgress />
    }

    return null;
};
