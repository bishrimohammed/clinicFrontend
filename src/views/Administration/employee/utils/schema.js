import * as yup from "yup";
export const Employeeschema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  middleName: yup.string().required("middleName is required"),
  lastName: yup.string(),
  photo: yup.mixed(),
  gender: yup.string().required("Gender is required"),
  position: yup.string().required("position is required"),
  date_of_birth: yup.date().required("Date of birth is required"),
  date_of_hire: yup.date().required("Date of hire is required"),

  address: yup.object().shape({
    street: yup.string(),
    region_id: yup.string().required("region is required"),
    city_id: yup.string().required("city is required"),
    subcity_id: yup.string().required("sub city is required"),
    woreda_id: yup.string().required("woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
  Emergency: yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    middleName: yup.string().required("middleName is required"),
    lastName: yup.string(),
    the_same_address_as_employee: yup.boolean(),
    relation: yup.string().required("relationship is required"),
    other_relation: yup.string().when("relation", ([relation], schema) => {
      if (relation === "Other") {
        return schema.required("relation ship type is required");
      }
      return schema.nullable();
    }),
    region_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("region is required");
          }
          return schema.nullable();
        }
      ),
    city_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("city is required");
          }
          return schema.nullable();
        }
      ),
    subcity_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("subcity is required");
          }
          return schema.nullable();
        }
      ),
    woreda_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("woreda is required");
          }
          return schema.nullable();
        }
      ),
    house_number: yup.string(),
    phone_1: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          // console.log(the_same_address_as_employee);
          if (!the_same_address_as_employee) {
            return schema
              .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
              .required("phone number is required");
          }
          return schema.nullable();
        }
      ),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
});
