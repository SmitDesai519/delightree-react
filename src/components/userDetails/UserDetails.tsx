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
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Controller, FormProvider } from "react-hook-form";
import { Select, chakraComponents } from "chakra-react-select";
import { FaCheck } from "react-icons/fa";
import "./UserDetails.css";
import React from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { PreviewUserDetails } from "../previewUserDetails/PreviewUserDetails";
import { genderOptions } from "../../utils/constant";
import { useUserDetails } from "../../hooks/useUserDetails";

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

export const UserDetails = () => {
  const {
    isSubmitted,
    methods,
    errors,
    control,
    isSubmitting,
    teckStacksValue,
    lastTechStackRef,
    addStack,
    removeStack,
    register,
    handleSubmit,
    onSubmit,
  } = useUserDetails();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <Heading as="h1" size="lg">
          User Details
        </Heading>
        <Card variant="outline" p={4}>
          <Heading as="h6" size="md" mb={2}>
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
          <Heading as="h6" size="md" mb={2} mt={6}>
            Other Information
          </Heading>
          <Stack spacing={4}>
            <Stack direction={["column", "row"]}>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.gender?.value?.message}>
                    <FormLabel>
                      Gender <span className="error">*</span>
                    </FormLabel>
                    <Select
                      {...field}
                      options={genderOptions}
                      placeholder="Select Gender"
                      components={customSelectComponents}
                      isInvalid={!!errors.gender?.value?.message}
                    />
                    {errors.gender?.value?.message && (
                      <FormErrorMessage>
                        {errors.gender?.value?.message}
                      </FormErrorMessage>
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
            <Stack direction={["column", "row"]}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel>
                      Email Address <span className="error">*</span>
                    </FormLabel>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      {...field}
                    />
                    {errors.email?.message && (
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.phoneNumber?.message}>
                    <FormLabel>
                      Phone Number <span className="error">*</span>
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>+91</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </InputGroup>
                    {errors.phoneNumber?.message && (
                      <FormErrorMessage>
                        {errors.phoneNumber?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
            <Stack spacing={4} width={["100%", "50%"]}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormLabel>
                  Tech Stack <span className="error">*</span>
                </FormLabel>
                <IconButton
                  icon={<RiAddLine />}
                  aria-label="Add"
                  size="sm"
                  onClick={addStack}
                  mr="1.25rem"
                />
              </Flex>
              {teckStacksValue.map((_, index) => (
                <Controller
                  name={`techStacks.${index}`}
                  control={control}
                  key={index}
                  render={({ field }) => (
                    <FormControl
                      isInvalid={!!errors.techStacks?.[index]?.message}
                    >
                      <InputGroup size="md">
                        <Input
                          {...field}
                          placeholder="Enter Tech Stack"
                          ref={
                            index === teckStacksValue.length - 1
                              ? lastTechStackRef
                              : null
                          }
                        />
                        <InputRightElement width="4.5rem">
                          {index > 0 && (
                            <IconButton
                              size="sm"
                              icon={<RiCloseLine />}
                              aria-label="Remove"
                              onClick={() => removeStack(index)}
                            />
                          )}
                        </InputRightElement>
                      </InputGroup>
                      {errors.techStacks?.[index]?.message && (
                        <FormErrorMessage>
                          {errors.techStacks?.[index]?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              ))}
            </Stack>
          </Stack>
          <Button
            colorScheme="teal"
            size="sm"
            type="submit"
            className="submitbtn"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Card>
        {isSubmitted && <PreviewUserDetails />}
      </form>
    </FormProvider>
  );
};
