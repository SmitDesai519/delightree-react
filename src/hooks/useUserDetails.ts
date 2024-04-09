import * as yup from "yup";
import { PhoneNumberRegex, emailRegex } from "../utils/regex";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../types/userDetails";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name is incorrect"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name is incorrect"),
  gender: yup.object().shape({
    value: yup.string().required("Gender is required"),
    label: yup.string().required("Gender is required"),
  }),
  dob: yup
    .date()
    .typeError("Invalid date")
    .required("Date of birth is required"),
  techStacks: yup
    .array()
    .of(yup.string().required("Tech stack is required"))
    .required(),
  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRegex(), "Email format is incorrect"),
  phoneNumber: yup
    .string()
    .required("phone number is required")
    .matches(PhoneNumberRegex(), "Mobile format is incorrect"),
});

export const useUserDetails = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const methods = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      dob: undefined,
      email: undefined,
      phoneNumber: undefined,
      techStacks: [""],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;
  const lastTechStackRef = useRef<HTMLInputElement | null>(null);
  const doSetAutoFocus = useRef(false);
  const teckStacksValue = watch("techStacks");

  useEffect(() => {
    if (lastTechStackRef.current && doSetAutoFocus.current)
      lastTechStackRef.current.focus();
  }, [teckStacksValue.length, doSetAutoFocus]);

  const onSubmit: SubmitHandler<FormInputs> = () => {
    setIsSubmitted(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 3000);
    });
  };

  const addStack = () => {
    const currentStacks = getValues("techStacks");
    setValue("techStacks", [...currentStacks, ""]);
    doSetAutoFocus.current = true;
  };

  const removeStack = (indexToRemove: number) => {
    const currentStacks = getValues("techStacks");
    setValue(
      "techStacks",
      currentStacks.filter((_, index) => index !== indexToRemove)
    );
  };

  return {
    methods,
    isSubmitted,
    control,
    errors,
    isSubmitting,
    lastTechStackRef,
    teckStacksValue,
    addStack,
    removeStack,
    onSubmit,
    register,
    handleSubmit,
  };
};
