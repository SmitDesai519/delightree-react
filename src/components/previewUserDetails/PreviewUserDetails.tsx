import { Card, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const dataRow = (fieldName: string, value: string) => (
  <Stack direction="row" alignItems="center">
    <Heading as="h6" size="sm">
      {fieldName} :
    </Heading>
    {value && <Text fontSize="md">{value}</Text>}
  </Stack>
);
const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const isNotValid = isNaN(date.getTime());
  if (isNotValid) return "";
  const formatedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const arr = formatedDate.split(" ");
  return `${arr[0]}/${arr[1]}/${arr[2]}`;
};

export const PreviewUserDetails = () => {
  const {
    getValues,
    formState: { isSubmitting },
  } = useFormContext();
  const values = getValues();
  return (
    <>
      <Heading as="h1" size="lg" mt={8}>
        Preview User Details
      </Heading>
      <Card variant="outline" p={4} gap={3}>
        {isSubmitting ? (
          <Stack spacing={4}>
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton height="10px" key={index} />
            ))}
          </Stack>
        ) : (
          <>
            {dataRow("First Name", values?.firstName)}
            {dataRow("Last Name", values?.lastName)}
            {dataRow("Gender", values?.gender?.label)}
            {dataRow("Date of Birth", formatDate(values?.dob))}
            {dataRow("Email Address", values?.email)}
            {dataRow("Phone Number", `+91 ${values?.phoneNumber}`)}
            {dataRow("Tech Stacks", values?.techStacks.join(", "))}
          </>
        )}
      </Card>
    </>
  );
};
