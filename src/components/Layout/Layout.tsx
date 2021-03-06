import { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAppSelector } from "../../app/hooks";
import Header from "./Header";
import AddPost from "./AddPost";
import SnackBarError from "./SnackBarError";
import SnackBarSuccess from "./SnackBarSuccess";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
      },
    },
    // content: {
    //   flexGrow: 1,
    //   backgroundColor: theme.palette.background.default,
    //   padding: theme.spacing(3),
    // },
    // necessary for content to be below app bar
    toolbar: {
      minHeight: 64,
    },
  })
);

const Layout = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const classes = useStyles();

  if (!isAuthenticated)
    return (
      <>
        <SnackBarSuccess />
        <SnackBarError />
        {props.children}
      </>
    );

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div id="layout-div" className={classes.toolbar} />
        {props.children}
      </main>
      <AddPost />
      <SnackBarSuccess />
      <SnackBarError />
    </div>
  );
};

export default Layout;
