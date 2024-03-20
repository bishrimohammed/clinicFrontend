import{f as x,d as j,l as y,j as e}from"./index-adc5c439.js";import{u as _}from"./index.esm-28bdf91a.js";import{c as f,a as c,f as N,o as v}from"./yup-e734d6e3.js";import{b as C}from"./useImagingService-42c714bb.js";import{C as F,b as l}from"./InputGroupContext-86e132d6.js";import{F as a}from"./Form-fd32e757.js";import{S}from"./index.esm-650f3687.js";import"./useQuery-0c7d53ac.js";import"./axiosInstance-8e812653.js";import"./useMutation-46d3959e.js";import"./useAxiosHeaders-0302b736.js";import"./ElementChildren-abb33785.js";import"./Col-cdbc53ce.js";const I=f().shape({test_name:c().required("lab test name is required"),price:N().transform(r=>isNaN(r)?void 0:r).moreThan(0).required("price is required"),imaging_category:c()}),z=()=>{var m,o;const{state:r}=x(),{mutateAsync:d,isPending:n}=C(),p=j();y();const{register:s,handleSubmit:u,setValue:i,formState:{errors:t}}=_({defaultValues:{test_name:r.test_name,price:r.price,imaging_category:r.imaging_category},resolver:v(I)}),g=h=>{d(h).then(b=>{b.status===201&&(i("test_name",""),i("price",""),i("imaging_category",""))})};return e.jsxs(F,{className:"p-0",children:[e.jsxs("h5",{className:"p-2 mt-1 mb-3 bluewhite-bg",children:["Edit IMaging Studies Pricing Item"," "]}),e.jsx("div",{className:"p-3 boxshadow borderRadius7px",children:e.jsxs(a,{onSubmit:u(g),noValidate:!0,className:"",children:[e.jsxs(a.Group,{className:"mb-3",children:[e.jsx(a.Label,{htmlFor:"test_name",children:"Name : "}),e.jsx(a.Control,{type:"text",name:"test_name",id:"test_name",...s("test_name"),placeholder:"Enter Test Name",isInvalid:t.test_name}),e.jsx(a.Control.Feedback,{type:"invalid",children:(m=t.test_name)==null?void 0:m.message})]}),e.jsxs(a.Group,{className:"mb-3",children:[e.jsx(a.Label,{htmlFor:"price",children:"Price : "}),e.jsx(a.Control,{type:"number",name:"price",id:"price",...s("price"),placeholder:"enter price",isInvalid:t.price}),e.jsx(a.Control.Feedback,{type:"invalid",children:(o=t.price)==null?void 0:o.message})]}),e.jsxs(a.Group,{className:"mb-3",children:[e.jsx(a.Label,{htmlFor:"Category",children:"Category : "}),e.jsx(a.Control,{type:"text",placeholder:"Disabled readonly input","aria-label":"Disabled input example",readOnly:!0,...s("imaging_category"),id:"Category",name:"lab_category"})]}),e.jsx("hr",{}),e.jsx(l,{variant:"danger",type:"button",className:"me-3",onClick:()=>p(-1),children:"Return"}),e.jsxs(l,{variant:"primary",disabled:n,type:"submit",children:[n&&e.jsx(S,{animation:"border",size:"sm"}),"Update"]})]})})]})};export{z as default};
