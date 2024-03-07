import * as yup from "yup";
export const History_Note_schema = yup.object().shape({
  chiefcomplaint: yup.string().required("chief complaint is required"),
  HPI: yup.string().required("HPI is required"),

  assesement: yup.string().required("assesement is required"),
  plan: yup.string().required("plan is required"),

  physicalExam: yup.object().shape({
    vitals: yup.object().shape({
      pulseRate: yup.number().required("pulseRate is required"),
      SPO2: yup.number().required("SPO2 is required"),
      SaO2: yup.number(),
      respirationRate: yup.number().required("respirationRate is required"),
      height: yup.number().positive(),
      weight: yup.number().positive(),
      temperature: yup.number().required("temperature is required"),
      Dbloodpressure: yup.number().required("Dbloodpressure is required"),
      Sbloodpressure: yup.number().required(" Sbloodpressure is required"),
    }),
    generalAppreance: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    CVS: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    CNS: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    Abdominal: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),

    HEENT: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    Musculoskeletal: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    Neurological: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    Respiratory: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
  }),
});
