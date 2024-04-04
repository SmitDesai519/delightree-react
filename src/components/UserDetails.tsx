import { Card, CardHeader, typography } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  texhStack: string[];
  email: string;
  phonenNumber: number;
};

export const UserDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant="outline" p={3}>
        <CardHeader>User Details</CardHeader>
      </Card>
    </form>
  );
};
