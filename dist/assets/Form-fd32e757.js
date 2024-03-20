import{P as h,c as d,a as i}from"./InputGroupContext-86e132d6.js";import{r,j as l}from"./index-adc5c439.js";import{h as W}from"./ElementChildren-abb33785.js";import{C as X}from"./Col-cdbc53ce.js";const Y={type:h.string,tooltip:h.bool,as:h.elementType},k=r.forwardRef(({as:e="div",className:o,type:a="valid",tooltip:t=!1,...s},n)=>l.jsx(e,{...s,ref:n,className:d(o,`${a}-${t?"tooltip":"feedback"}`)}));k.displayName="Feedback";k.propTypes=Y;const I=k,Z=r.createContext({}),F=Z,T=r.forwardRef(({id:e,bsPrefix:o,className:a,type:t="checkbox",isValid:s=!1,isInvalid:n=!1,as:m="input",...p},f)=>{const{controlId:c}=r.useContext(F);return o=i(o,"form-check-input"),l.jsx(m,{...p,ref:f,type:t,id:e||c,className:d(a,o,s&&"is-valid",n&&"is-invalid")})});T.displayName="FormCheckInput";const b=T,O=r.forwardRef(({bsPrefix:e,className:o,htmlFor:a,...t},s)=>{const{controlId:n}=r.useContext(F);return e=i(e,"form-check-label"),l.jsx("label",{...t,ref:s,htmlFor:a||n,className:d(o,e)})});O.displayName="FormCheckLabel";const x=O,S=r.forwardRef(({id:e,bsPrefix:o,bsSwitchPrefix:a,inline:t=!1,reverse:s=!1,disabled:n=!1,isValid:m=!1,isInvalid:p=!1,feedbackTooltip:f=!1,feedback:c,feedbackType:u,className:C,style:$,title:j="",type:N="checkbox",label:g,children:w,as:H="input",...J},K)=>{o=i(o,"form-check"),a=i(a,"form-switch");const{controlId:R}=r.useContext(F),Q=r.useMemo(()=>({controlId:e||R}),[R,e]),L=!w&&g!=null&&g!==!1||W(w,x),U=l.jsx(b,{...J,type:N==="switch"?"checkbox":N,ref:K,isValid:m,isInvalid:p,disabled:n,as:H});return l.jsx(F.Provider,{value:Q,children:l.jsx("div",{style:$,className:d(C,L&&o,t&&`${o}-inline`,s&&`${o}-reverse`,N==="switch"&&a),children:w||l.jsxs(l.Fragment,{children:[U,L&&l.jsx(x,{title:j,children:g}),c&&l.jsx(I,{type:u,tooltip:f,children:c})]})})})});S.displayName="FormCheck";const y=Object.assign(S,{Input:b,Label:x}),G=r.forwardRef(({bsPrefix:e,type:o,size:a,htmlSize:t,id:s,className:n,isValid:m=!1,isInvalid:p=!1,plaintext:f,readOnly:c,as:u="input",...C},$)=>{const{controlId:j}=r.useContext(F);return e=i(e,"form-control"),l.jsx(u,{...C,type:o,size:t,ref:$,readOnly:c,id:s||j,className:d(n,f?`${e}-plaintext`:e,a&&`${e}-${a}`,o==="color"&&`${e}-color`,m&&"is-valid",p&&"is-invalid")})});G.displayName="FormControl";const P=Object.assign(G,{Feedback:I}),E=r.forwardRef(({className:e,bsPrefix:o,as:a="div",...t},s)=>(o=i(o,"form-floating"),l.jsx(a,{ref:s,className:d(e,o),...t})));E.displayName="FormFloating";const ee=E,M=r.forwardRef(({controlId:e,as:o="div",...a},t)=>{const s=r.useMemo(()=>({controlId:e}),[e]);return l.jsx(F.Provider,{value:s,children:l.jsx(o,{...a,ref:t})})});M.displayName="FormGroup";const B=M,V=r.forwardRef(({as:e="label",bsPrefix:o,column:a=!1,visuallyHidden:t=!1,className:s,htmlFor:n,...m},p)=>{const{controlId:f}=r.useContext(F);o=i(o,"form-label");let c="col-form-label";typeof a=="string"&&(c=`${c} ${c}-${a}`);const u=d(s,o,t&&"visually-hidden",a&&c);return n=n||f,a?l.jsx(X,{ref:p,as:"label",className:u,htmlFor:n,...m}):l.jsx(e,{ref:p,className:u,htmlFor:n,...m})});V.displayName="FormLabel";const oe=V,_=r.forwardRef(({bsPrefix:e,className:o,id:a,...t},s)=>{const{controlId:n}=r.useContext(F);return e=i(e,"form-range"),l.jsx("input",{...t,type:"range",ref:s,className:d(o,e),id:a||n})});_.displayName="FormRange";const ae=_,q=r.forwardRef(({bsPrefix:e,size:o,htmlSize:a,className:t,isValid:s=!1,isInvalid:n=!1,id:m,...p},f)=>{const{controlId:c}=r.useContext(F);return e=i(e,"form-select"),l.jsx("select",{...p,size:a,ref:f,className:d(t,e,o&&`${e}-${o}`,s&&"is-valid",n&&"is-invalid"),id:m||c})});q.displayName="FormSelect";const te=q,z=r.forwardRef(({bsPrefix:e,className:o,as:a="small",muted:t,...s},n)=>(e=i(e,"form-text"),l.jsx(a,{...s,ref:n,className:d(o,e,t&&"text-muted")})));z.displayName="FormText";const se=z,A=r.forwardRef((e,o)=>l.jsx(y,{...e,ref:o,type:"switch"}));A.displayName="Switch";const re=Object.assign(A,{Input:y.Input,Label:y.Label}),D=r.forwardRef(({bsPrefix:e,className:o,children:a,controlId:t,label:s,...n},m)=>(e=i(e,"form-floating"),l.jsxs(B,{ref:m,className:d(o,e),controlId:t,...n,children:[a,l.jsx("label",{htmlFor:t,children:s})]})));D.displayName="FloatingLabel";const le=D,ne={_ref:h.any,validated:h.bool,as:h.elementType},v=r.forwardRef(({className:e,validated:o,as:a="form",...t},s)=>l.jsx(a,{...t,ref:s,className:d(e,o&&"was-validated")}));v.displayName="Form";v.propTypes=ne;const pe=Object.assign(v,{Group:B,Control:P,Floating:ee,Check:y,Switch:re,Label:oe,Text:se,Range:ae,Select:te,FloatingLabel:le});export{pe as F,b as a};
