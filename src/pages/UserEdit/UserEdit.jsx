import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Box from "@material-ui/core/Box";
import Button from "../../components/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { editUser, selectUserById } from "../../features/userSlice";

function UserEdit({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, id));
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const redirect = () => history.push("/");

  const onSubmit = (data) => {
    dispatch(editUser({ id, ...data }));
    redirect();
  };

  return (
    <Paper elevation={1}>
      <Box component="header" p={2}>
        Header
      </Box>
      <Divider />
      <Box p={2}>
        <Container maxWidth="sm">
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            gridGap={8}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField label="id" {...register("id")} disabled fullWidth />
            <TextField
              label="Name"
              {...register("name")}
              error={errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label="Email"
              {...register("email")}
              error={errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="Username"
              {...register("username")}
              error={errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
            <TextField label="City" {...register("city")} fullWidth />
            <Box display="flex" gridGap={8}>
              <Button onClick={redirect}>Cancel</Button>
              <Button type="submit" color="success">
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
}

export default UserEdit;
