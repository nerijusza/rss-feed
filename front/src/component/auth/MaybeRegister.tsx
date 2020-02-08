import {Box, Link} from "@material-ui/core";
import * as React from "react";

export const MaybeRegister = () => {
  return <Box>Do not have account? <Link href="/register">Go to registration page</Link></Box>
};