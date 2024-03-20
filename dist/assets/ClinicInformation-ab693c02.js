import{d as m,j as i}from"./index-adc5c439.js";import{u as d}from"./useGetClinicInformation-c3f94354.js";import{S as j}from"./index.esm-650f3687.js";import{C as x,b as p}from"./InputGroupContext-86e132d6.js";import{T as b}from"./Table-892073ec.js";import{I as u}from"./DefaultLayout-65fbaa93.js";import"./useQuery-0c7d53ac.js";import"./axiosInstance-8e812653.js";import"./index.es-ffb0b0ea.js";const k=()=>{const{data:e,isPending:c,error:s}=d(),n=m();if(c)return i.jsx(j,{animation:"border"});if(s)return i.jsxs("div",{children:["erroo ",s.message]});const h="http://localhost:5000";return i.jsx(x,{fluid:!0,className:"p-3  mb-5",children:i.jsxs("div",{className:"p-1   bg-hrun-box hrunboxshadow",children:[i.jsx("h5",{className:"border-bottom border-1 border-black py-2 mb-3 fw-bold",children:"Clinic Profile Information"}),e?i.jsxs(b,{responsive:!0,striped:!0,bordered:!0,children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"#"}),i.jsx("th",{children:"clinic name"}),i.jsx("th",{children:"phone"}),i.jsx("th",{children:"email"}),i.jsx("th",{children:"website"}),i.jsx("th",{children:"logo"})]})}),i.jsx("tbody",{children:e.map((r,o)=>{var t,l;return i.jsxs("tr",{style:{cursor:"pointer"},onClick:()=>n("/administrations/setting/editclinicinfo",{state:r}),children:[i.jsx("td",{children:o+1}),i.jsx("td",{children:r==null?void 0:r.name}),i.jsx("td",{children:(t=r==null?void 0:r.address)==null?void 0:t.phone_1}),i.jsx("td",{children:(l=r==null?void 0:r.address)==null?void 0:l.email}),i.jsx("td",{children:r==null?void 0:r.website_url}),i.jsx("td",{children:i.jsx(u,{src:`${h}/${r==null?void 0:r.logo}`,alt:"logo",style:{objectFit:"contain",objectPosition:"center"},width:30,fluid:!0})})]},o)})})]}):i.jsx(p,{className:"mt-3",onClick:()=>n("/administrations/setting/addclinicinfo"),children:"+ Add Clinic Information"})]})})};export{k as default};
