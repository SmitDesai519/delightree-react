import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Select, chakraComponents } from "chakra-react-select";
import { FaCheck } from "react-icons/fa";
import "./UserDetails.css";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  techStacks: string[];
  email?: string;
  phonenNumber?: number;
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
  Option: ({
    children,
    isSelected,
    ...props
  }: {
    children: React.ReactNode;
    isSelected: boolean;
  }) => (
    <chakraComponents.Option {...props}>
      {children}
      {isSelected && (
        <Box ml="auto">
          <FaCheck color="green" />
        </Box>
      )}
    </chakraComponents.Option>
  ),
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name is incorrect"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name is incorrect"),
  gender: yup.object().required("Gender is required"),
  dob: yup
    .date()
    .typeError("Invalid date")
    .required("Date of birth is required"),
  techStacks: yup
    .array()
    .of(yup.string().required("Tech stack is required"))
    .min(1, "At least one tech stack is required"),
  // email: string;
  // phonenNumber: number;
});

export const UserDetails = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      techStacks: [""], // Initialize with one empty stack
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  const addStack = () => {
    const currentStacks = getValues("techStacks");
    setValue("techStacks", [...currentStacks, ""]);
  };

  const removeStack = (indexToRemove: number) => {
    const currentStacks = getValues("techStacks");
    setValue(
      "techStacks",
      currentStacks.filter((_, index) => index !== indexToRemove)
    );
  };

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
          <FormControl isInvalid={!!errors.firstName?.message}>
            <FormLabel>
              First name <span className="error">*</span>
            </FormLabel>
            <Input
              {...register("firstName")}
              variant="outline"
              placeholder="Enter First Name"
            />
            {errors.firstName?.message && (
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.lastName?.message}>
            <FormLabel>
              Last name <span className="error">*</span>
            </FormLabel>
            <Input
              variant="outline"
              placeholder="Enter Last Name"
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <Heading as="h6" size="xs" mb={2} mt={4}>
          Other Information
        </Heading>
        <Stack direction={["column", "row"]}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.gender?.message}>
                <FormLabel>
                  Gender <span className="error">*</span>
                </FormLabel>
                <Select
                  options={genderOptions}
                  placeholder="Select Gender"
                  components={customSelectComponents}
                  value={value}
                  onChange={onChange}
                />
                {errors.gender?.message && (
                  <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <FormControl isInvalid={!!errors.dob?.message}>
            <FormLabel>
              Date of Birth <span className="error">*</span>
            </FormLabel>
            <Input
              placeholder="Select Date"
              size="md"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("dob")}
            />
            {errors.dob?.message && (
              <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={4}>
          {getValues("techStacks").map((_, index) => (
            <Flex key={index}>
              <Controller
                name={`techStacks[${index}]`}
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Tech Stack"
                  />
                )}
              />
              {index > 0 && (
                <IconButton
                  icon={<RiCloseLine />}
                  aria-label="Remove"
                  onClick={() => removeStack(index)}
                />
              )}
            </Flex>
          ))}
          <IconButton
            icon={<RiAddLine />}
            aria-label="Add"
            onClick={addStack}
          />
        </Stack>
        <Button
          colorScheme="teal"
          size="sm"
          type="submit"
          className="submitbtn"
        >
          Submit
        </Button>
      </Card>
    </form>
  );
};
