import{d,j as t}from"./index-adc5c439.js";import{u as o}from"./useQuery-0c7d53ac.js";import{A as l}from"./axiosInstance-8e812653.js";import{S as c}from"./index.esm-650f3687.js";import{T as h,a as i}from"./Tabs-162d704d.js";import{T as m}from"./Table-892073ec.js";import"./InputGroupContext-86e132d6.js";import"./DefaultLayout-65fbaa93.js";import"./index.es-ffb0b0ea.js";import"./Nav-d46f6c14.js";import"./NoopTransition-52f737ac.js";import"./CardHeaderContext-3f12a520.js";import"./ElementChildren-abb33785.js";const x=()=>o({queryKey:["Draft payments"],queryFn:async()=>l.get("/bill/draft").then(r=>r.data),staleTime:5*60*60*1e3}),B=()=>{const r=d(),{data:s,isPending:n}=x();return n?t.jsx(c,{animation:"grow"}):t.jsx(t.Fragment,{children:t.jsxs(h,{defaultActiveKey:"home",id:"controlled-tab-example",children:[t.jsxs(i,{eventKey:"home",title:"Drafts",children:[t.jsx("hr",{className:"mt-0"}),t.jsxs(m,{striped:!0,bordered:!0,children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Bill Number"}),t.jsx("th",{children:"Bill Date"}),t.jsx("th",{children:"Patient"}),t.jsx("th",{children:"status"}),t.jsx("th",{children:"Total"}),t.jsx("th",{children:"Action"})]})}),t.jsxs("tbody",{children:[s.length!==0&&s.map((e,a)=>t.jsxs("tr",{style:{cursor:"pointer"},onClick:()=>r(`/patients/history/${e.history}/billdetail`,{state:e}),children:[t.jsx("td",{children:e._id}),t.jsx("td",{children:e.createdAt}),t.jsx("td",{children:e.patient.name}),t.jsx("td",{children:e.paymentStatus}),t.jsx("td",{children:e.totalAmount}),t.jsx("td",{children:"acti"})]},a)),t.jsx("tr",{})]})]})]}),t.jsx(i,{eventKey:"profile",title:"Paid",children:"paid"})]})})};export{B as default};
