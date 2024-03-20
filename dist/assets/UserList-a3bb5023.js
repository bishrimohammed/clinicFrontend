import{m as j,l as u,Q as i,d as p,j as e,N as v}from"./index-adc5c439.js";import{B as y,a as b}from"./index.esm-ed00e8fc.js";import{u as g}from"./useQuery-0c7d53ac.js";import{A as d}from"./axiosInstance-8e812653.js";import{A as o}from"./useAxiosHeaders-0302b736.js";import{u as h}from"./useMutation-46d3959e.js";import{S as f}from"./index.esm-650f3687.js";import{b as c}from"./InputGroupContext-86e132d6.js";import{T as N}from"./Table-892073ec.js";const A=()=>{const n=o();return g({queryKey:["users"],queryFn:async()=>d.get("/user",{...n}).then(a=>a.data),staleTime:5*60*60*1e3})},q=()=>{const n=o();j();const a=u();return h({mutationFn:async s=>d.patch(`/user/${s}/activate`,{},{...n}),onSuccess:async(s,t)=>{i.success("user activated"),a.invalidateQueries({queryKey:["users"],exact:!0})},onError:async s=>{const{data:t}=s.response;i.error(t.message),console.log(t.message)}})},C=()=>{const n=o(),a=u();return h({mutationFn:async s=>d.patch(`/user/${s}/diactivate`,{},{...n}),onSuccess:async(s,t)=>{i.success("user deactivated"),a.invalidateQueries({queryKey:["users"],exact:!0})},onError:async s=>{const{data:t}=s.response;i.error(t.message),console.log(t.message)}})},K=()=>{const{data:n,isPending:a,error:s}=A(),t=p(),{mutate:m}=q(),{mutate:x}=C();return a?e.jsx(f,{animation:"grow"}):s?e.jsxs("div",{children:["error ",s.message]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"d-flex justify-content-between p-2 mb-2",children:[e.jsx("h4",{children:"Users"}),e.jsx("div",{className:"   ",children:e.jsx(c,{variant:"success",type:"button",onClick:()=>t("/administrations/user/newuser"),children:"+ Add User"})})]}),e.jsx("div",{className:"mb-3 me-2  d-flex align-items-center justify-content-end",children:e.jsxs("div",{className:"search border border-2 border-color borderRadius7px",children:[e.jsx("input",{placeholder:"Search...",className:"border-0 p-2"}),e.jsx("button",{className:"border-0 py-2 px-3 bg-white",id:"button-addon2",children:e.jsx(y,{size:20})})]})}),e.jsxs(N,{striped:!0,bordered:!0,responsive:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"name"}),e.jsx("th",{children:"gender"}),e.jsx("th",{children:"status"}),e.jsx("th",{children:"email"}),e.jsx("th",{children:"phone"}),e.jsx("th",{children:"role"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:n.length!==0&&n.map((r,l)=>e.jsxs("tr",{children:[e.jsx("td",{children:l+1}),e.jsx("td",{children:`${r.username}`}),e.jsx("td",{children:r.gender}),e.jsx("td",{children:r.status?"active":"inactive"}),e.jsx("td",{children:r.email}),e.jsx("td",{children:r.phone}),e.jsx("td",{children:r.role}),e.jsx("td",{children:e.jsx(v,{to:`/administrations/user/edit/${r._id}`,state:r,children:e.jsx(b,{size:20})})}),e.jsx("td",{children:r.status?e.jsx(c,{onClick:()=>x(r._id),variant:"primary",children:"diactivate"}):e.jsx(c,{onClick:()=>m(r._id),variant:"danger",children:"activate"})})]},l))})]})]})};export{K as default};
