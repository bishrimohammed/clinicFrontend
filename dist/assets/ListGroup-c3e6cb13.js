import{a as f,c as d}from"./InputGroupContext-86e132d6.js";import{r as p,j as $}from"./index-adc5c439.js";import{m as L,e as k,n as G}from"./DefaultLayout-65fbaa93.js";import{u as b,B as j}from"./Nav-d46f6c14.js";const v=p.forwardRef(({bsPrefix:e,active:m,disabled:r,eventKey:c,className:i,variant:a,action:n,as:l,...t},s)=>{e=f(e,"list-group-item");const[o,I]=b({key:L(c,t.href),active:m,...t}),N=k(u=>{if(r){u.preventDefault(),u.stopPropagation();return}o.onClick(u)});r&&t.tabIndex===void 0&&(t.tabIndex=-1,t["aria-disabled"]=!0);const h=l||(n?t.href?"a":"button":"div");return $.jsx(h,{ref:s,...t,...o,onClick:N,className:d(i,e,I.isActive&&"active",r&&"disabled",a&&`${e}-${a}`,n&&`${e}-action`)})});v.displayName="ListGroupItem";const y=v,x=p.forwardRef((e,m)=>{const{className:r,bsPrefix:c,variant:i,horizontal:a,numbered:n,as:l="div",...t}=G(e,{activeKey:"onSelect"}),s=f(c,"list-group");let o;return a&&(o=a===!0?"horizontal":`horizontal-${a}`),$.jsx(j,{ref:m,...t,as:l,className:d(r,s,i&&`${s}-${i}`,o&&`${s}-${o}`,n&&`${s}-numbered`)})});x.displayName="ListGroup";const E=Object.assign(x,{Item:y});export{E as L};
