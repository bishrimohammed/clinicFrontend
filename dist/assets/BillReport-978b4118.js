import{l as R,j as e}from"./index-adc5c439.js";import{c as B,b as y,d as E,o as L}from"./yup-e734d6e3.js";import{u as $}from"./index.esm-28bdf91a.js";import{u as k}from"./useQuery-0c7d53ac.js";import{A as u}from"./axiosInstance-8e812653.js";import{S as q}from"./index.esm-650f3687.js";import{F as i}from"./Form-fd32e757.js";import{T as F}from"./Table-892073ec.js";import{f as g}from"./format-b217b67f.js";import{g as K,B as C,X as o,Y as d,f as M,R as b,T as v,L as w,C as _,a as z,b as G}from"./LineChart-e82242d7.js";import"./InputGroupContext-86e132d6.js";import"./ElementChildren-abb33785.js";import"./Col-cdbc53ce.js";import"./constants-0a94a958.js";import"./isEqual-dc51beba.js";var I=K({chartName:"BarChart",GraphicalChild:C,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:o},{axisType:"yAxis",AxisComp:d}],formatAxisMap:M});const Q=B().shape({startdate:y().transform((r,s)=>{if(s&&typeof s=="string"){const a=new Date(s);return isNaN(a)?s:a}return r}).typeError("Type a start date").required("Enter a start date"),end_date:y().min(E("startdate"),"End date must be after start date").transform((r,s)=>{if(s&&typeof s=="string"){const a=new Date(s);return isNaN(a)?s:a}return r}).typeError("Type an end date")}),ie=()=>{var m,x,p,j;const{register:r,handleSubmit:s,formState:{errors:a},watch:l}=$({resolver:L(Q),defaultValues:{startdate:new Date().toISOString().substring(0,10),end_date:new Date().toISOString().substring(0,10)}}),c=l("startdate"),h=l("end_date"),D=R(),N=(n,f)=>{D.prefetchQuery({queryKey:["billreport",n,f],queryFn:()=>u.get(`/report/bill?start_date=${n}&end_date=${f}`).then(A=>A.data)})},{data:t,isPending:T}=k({queryKey:["billreport",c,h],queryFn:async()=>u.get(`/report/bill?start_date=${c}&end_date=${h}`).then(n=>n.data)});console.log(a);const S=n=>{N(n.startdate,n.end_date),console.log(n)};return T?e.jsx(q,{animation:"grow"}):e.jsxs("div",{style:{overflowX:"hidden"},children:[e.jsx("h3",{className:"text-center",children:"Bill Report"}),e.jsx(i,{onSubmit:s(S),children:e.jsx("div",{className:"d-flex justify-content-between aling-items-center gap-3",children:e.jsxs("div",{className:"d-flex flex-grow-1",children:[e.jsxs(i.Group,{className:"mb-3 w-50",children:[e.jsx(i.Label,{children:"Start Date"}),e.jsx(i.Control,{type:"date",name:"startdate",...r("startdate")})]}),e.jsxs(i.Group,{className:"mb-3 w-50",controlId:"exampleForm.ControlTextarea1",children:[e.jsx(i.Label,{children:"End Date"}),e.jsx(i.Control,{type:"date",name:"end_date",...r("end_date")})]})]})})}),e.jsx("div",{className:"mt-3",children:e.jsxs(F,{striped:!0,responsive:!0,bordered:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"startdate"}),e.jsx("th",{children:"end_date"}),e.jsx("th",{children:"total_amount"}),e.jsx("th",{children:"total_visit"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:g(new Date((m=t==null?void 0:t.billreport)==null?void 0:m.startDate),"MM/dd/yyyy")}),e.jsx("td",{children:g(new Date((x=t==null?void 0:t.billreport)==null?void 0:x.endDate),"MM/dd/yyyy")}),e.jsxs("td",{children:[(p=t==null?void 0:t.billreport)==null?void 0:p.totalAmount," ",e.jsx("span",{style:{fontSize:14,marginRight:2},children:"birr"})]}),e.jsx("td",{children:(j=t==null?void 0:t.billreport)==null?void 0:j.totalVisit})]})})]})}),e.jsxs("div",{className:"mt-3 ",children:[e.jsx("h3",{children:"laboratory Report"}),e.jsx(X,{labreport:t==null?void 0:t.groupByTestName,labpackage:t==null?void 0:t.groupByPackege})]})]})},X=({labreport:r,labpackage:s})=>{console.log(r.length);const a=[{name:"There is no data available for the specified range of days.",value:0}];return e.jsxs("div",{className:"d-flex flex-md-row flex-column w-100 h-100",children:[e.jsx(b,{className:"mt-5 d-flex",width:"100%",height:350,children:e.jsxs(I,{width:500,height:300,data:r.length===0?a:r,margin:{top:5,right:30,left:20,bottom:5},barSize:20,children:[e.jsx(o,{dataKey:r.length===0?"name":"_id",scale:"point",fontSize:"10"}),e.jsx(d,{}),e.jsx(v,{}),e.jsx(w,{}),e.jsx(_,{strokeDasharray:"3 3"}),e.jsx(C,{dataKey:r.length===0?"value":"lab_Test",fill:"#8884d8",background:{fill:"#eee"}})]})}),e.jsx(b,{className:"mt-5",width:"100%",height:350,children:e.jsxs(z,{width:500,height:300,data:r.length===0?a:s,margin:{top:5,right:30,left:20,bottom:5},children:[e.jsx(_,{strokeDasharray:"3 3"}),e.jsx(o,{dataKey:r.length===0?"name":"_id",fontSize:"10"}),e.jsx(d,{}),e.jsx(v,{}),e.jsx(w,{}),e.jsx(G,{type:"monotone",dataKey:r.length===0?"value":"lab_panel",stroke:"#8884d8",activeDot:{r:8}})]})})]})};export{ie as default};
