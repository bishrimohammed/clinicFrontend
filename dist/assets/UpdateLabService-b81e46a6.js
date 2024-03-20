import{f,d as C,j as e}from"./index-adc5c439.js";import{u as N}from"./index.esm-28bdf91a.js";import{c as F,a as m,f as L,o as S}from"./yup-e734d6e3.js";import{b as q,u as k}from"./useLabService-84113ed5.js";import"./axiosInstance-8e812653.js";import{u as G}from"./useGetUnits-59750a75.js";import{C as I,b as x}from"./InputGroupContext-86e132d6.js";import{F as a}from"./Form-fd32e757.js";import{R as j}from"./Row-191556ab.js";import{C as n}from"./Col-cdbc53ce.js";import{S as R}from"./index.esm-650f3687.js";import"./useQuery-0c7d53ac.js";import"./useMutation-46d3959e.js";import"./useAxiosHeaders-0302b736.js";import"./ElementChildren-abb33785.js";const w=F().shape({test_name:m().required("lab test name is required"),price:L().transform(t=>isNaN(t)?void 0:t).moreThan(0).required("price is required"),lab_category:m().required("lab category is required"),unit:m()}),W=()=>{var p,u,b,h;const{state:t}=f(),{mutate:g,isPending:d}=q(),{data:o}=k(),{data:l}=G(),v=C(),{register:i,handleSubmit:y,formState:{errors:r},watch:U}=N({defaultValues:{test_name:t.service_name,price:t.price,lab_category:t.serviceCategory_id,unit:t.unit_id},resolver:S(w)}),_=s=>{console.log(s),g(s)};return e.jsx(I,{className:"p-0",children:e.jsxs("div",{className:"boxshadow borderRadius7px",children:[e.jsxs("h5",{className:"p-2 mt-1 mb-3 bluewhite-bg",children:["Edit Laboratory Pricing Item"," "]}),e.jsxs(a,{onSubmit:y(_),noValidate:!0,className:"p-3",children:[e.jsxs(j,{children:[e.jsx(n,{children:e.jsxs(a.Group,{className:"mb-3",children:[e.jsx(a.Label,{htmlFor:"test_name",children:"Name : "}),e.jsx(a.Control,{type:"text",name:"test_name",id:"test_name",...i("test_name"),placeholder:"Enter Test Name",isInvalid:r.test_name}),e.jsx(a.Control.Feedback,{type:"invalid",children:(p=r.test_name)==null?void 0:p.message})]})}),e.jsx(n,{children:e.jsxs(a.Group,{className:"mb-3",children:[e.jsx(a.Label,{htmlFor:"price",children:"Price : "}),e.jsx(a.Control,{type:"number",name:"price",id:"price",...i("price"),placeholder:"enter price",isInvalid:r.price}),e.jsx(a.Control.Feedback,{type:"invalid",children:(u=r.price)==null?void 0:u.message})]})})]}),e.jsxs(j,{children:[e.jsx(n,{children:e.jsxs(a.Group,{className:"mb-3 ",children:[e.jsx(a.Label,{htmlFor:"lab_category",children:"Lab Category : "}),e.jsx(a.Select,{id:"lab_category",...i("lab_category"),"aria-label":"Default select example",isInvalid:r.lab_category,children:o==null?void 0:o.map((s,c)=>e.jsx("option",{value:s.id,children:s.name},c))}),e.jsx(a.Control.Feedback,{type:"invalid",children:(b=r.lab_category)==null?void 0:b.message})]})}),e.jsx(n,{children:e.jsxs(a.Group,{className:"mb-3 ",children:[e.jsx(a.Label,{htmlFor:"lab_category",children:" unit "}),e.jsxs(a.Select,{id:"unit",...i("unit"),"aria-label":"Default select example",isInvalid:r.unit,children:[e.jsx("option",{value:"",children:"Select unit"}),l==null?void 0:l.map((s,c)=>e.jsx("option",{value:s.id,children:s.name},c))]}),e.jsx(a.Control.Feedback,{type:"invalid",children:(h=r.unit)==null?void 0:h.message})]})})]}),e.jsx("hr",{}),e.jsx(x,{variant:"danger",type:"button",className:"me-3",onClick:()=>v(-1),children:"Return"}),e.jsxs(x,{variant:"primary",disabled:d,type:"submit",children:[d&&e.jsx(R,{animation:"border",size:"sm"}),"Update"]})]})]})})};export{W as default};
