import { Card, CardHeader, Heading, Input, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./UserDetails.css";

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
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <Heading as="h1" size="md">
        User Details
      </Heading>
      <Card variant="outline" p={4}>
        <CardHeader fontWeight={500}>Basic Details</CardHeader>
        <Stack direction={{ xs: "column", md: "row" }}>
          <Input variant="outline" placeholder="First Name*" />
          <Input variant="outline" placeholder="Last Name*" />
        </Stack>
      </Card>
    </form>
  );
};
