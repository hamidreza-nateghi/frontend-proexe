import { Link } from "react-router-dom";
import Button from "../Button";

function ButtonLink({ children, to, ...rest }) {
  return (
    <Button component={Link} to={to} {...rest}>
      {children}
    </Button>
  );
}

export default ButtonLink;
