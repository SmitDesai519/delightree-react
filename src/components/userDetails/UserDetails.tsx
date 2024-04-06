import {
  Card,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, chakraComponents } from "chakra-react-select";
import { CheckboxIcon } from "@chakra-ui/react";
import "./UserDetails.css";
import React from "react";

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  texhStack: string[];
  email: string;
  phonenNumber: number;
};

const genderOptions = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

const customSelectComponents = {
  Option: ({ children, ...props }: { children: React.ReactNode }) => (
    <chakraComponents.Option {...props}>
      {children}
      {/* <Box ml="auto"> */}
      <CheckboxIcon color="green.500" />
      {/* </Box> */}
    </chakraComponents.Option>
  ),
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
        <Heading as="h6" size="xs" mb={2}>
          Basic Details
        </Heading>
        <Stack direction={["column", "row"]}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input variant="outline" placeholder="Enter First Name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input variant="outline" placeholder="Enter Last Name*" />
          </FormControl>
        </Stack>
        <Heading as="h6" size="xs" mb={2} mt={4}>
          Other Information
        </Heading>
        <Stack direction={["column", "row"]}>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              options={genderOptions}
              placeholder="Select Gender"
              components={customSelectComponents}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input placeholder="Select Date" size="md" type="date" />
          </FormControl>
        </Stack>
      </Card>
    </form>
  );
};
