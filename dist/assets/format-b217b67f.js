import{t as l,m as B,a as L}from"./constants-0a94a958.js";function b(e,n){return e instanceof Date?new e.constructor(n):new Date(n)}let j={};function D(){return j}function W(e,n){var u,c,d,h;const t=D(),r=(n==null?void 0:n.weekStartsOn)??((c=(u=n==null?void 0:n.locale)==null?void 0:u.options)==null?void 0:c.weekStartsOn)??t.weekStartsOn??((h=(d=t.locale)==null?void 0:d.options)==null?void 0:h.weekStartsOn)??0,a=l(e),i=a.getDay(),s=(i<r?7:0)+i-r;return a.setDate(a.getDate()-s),a.setHours(0,0,0,0),a}function v(e){return W(e,{weekStartsOn:1})}function _(e){const n=l(e),t=n.getFullYear(),r=b(e,0);r.setFullYear(t+1,0,4),r.setHours(0,0,0,0);const a=v(r),i=b(e,0);i.setFullYear(t,0,4),i.setHours(0,0,0,0);const s=v(i);return n.getTime()>=a.getTime()?t+1:n.getTime()>=s.getTime()?t:t-1}function q(e){const n=l(e);return n.setHours(0,0,0,0),n}function p(e){const n=l(e),t=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return t.setUTCFullYear(n.getFullYear()),+e-+t}function A(e,n){const t=q(e),r=q(n),a=+t-p(t),i=+r-p(r);return Math.round((a-i)/B)}function V(e){const n=_(e),t=b(e,0);return t.setFullYear(n,0,4),t.setHours(0,0,0,0),v(t)}function I(e){return e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}function J(e){if(!I(e)&&typeof e!="number")return!1;const n=l(e);return!isNaN(Number(n))}function $(e){const n=l(e),t=b(e,0);return t.setFullYear(n.getFullYear(),0,1),t.setHours(0,0,0,0),t}const U={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},z=(e,n,t)=>{let r;const a=U[e];return typeof a=="string"?r=a:n===1?r=a.one:r=a.other.replace("{{count}}",n.toString()),t!=null&&t.addSuffix?t.comparison&&t.comparison>0?"in "+r:r+" ago":r};function S(e){return(n={})=>{const t=n.width?String(n.width):e.defaultWidth;return e.formats[t]||e.formats[e.defaultWidth]}}const K={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Z={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},tt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},et={date:S({formats:K,defaultWidth:"full"}),time:S({formats:Z,defaultWidth:"full"}),dateTime:S({formats:tt,defaultWidth:"full"})},nt={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},rt=(e,n,t,r)=>nt[e];function k(e){return(n,t)=>{const r=t!=null&&t.context?String(t.context):"standalone";let a;if(r==="formatting"&&e.formattingValues){const s=e.defaultFormattingWidth||e.defaultWidth,u=t!=null&&t.width?String(t.width):s;a=e.formattingValues[u]||e.formattingValues[s]}else{const s=e.defaultWidth,u=t!=null&&t.width?String(t.width):e.defaultWidth;a=e.values[u]||e.values[s]}const i=e.argumentCallback?e.argumentCallback(n):n;return a[i]}}const at={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},it={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ot={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},st={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ut={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ct={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},dt=(e,n)=>{const t=Number(e),r=t%100;if(r>20||r<10)switch(r%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"},ft={ordinalNumber:dt,era:k({values:at,defaultWidth:"wide"}),quarter:k({values:it,defaultWidth:"wide",argumentCallback:e=>e-1}),month:k({values:ot,defaultWidth:"wide"}),day:k({values:st,defaultWidth:"wide"}),dayPeriod:k({values:ut,defaultWidth:"wide",formattingValues:ct,defaultFormattingWidth:"wide"})};function x(e){return(n,t={})=>{const r=t.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],i=n.match(a);if(!i)return null;const s=i[0],u=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(u)?mt(u,g=>g.test(s)):ht(u,g=>g.test(s));let d;d=e.valueCallback?e.valueCallback(c):c,d=t.valueCallback?t.valueCallback(d):d;const h=n.slice(s.length);return{value:d,rest:h}}}function ht(e,n){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&n(e[t]))return t}function mt(e,n){for(let t=0;t<e.length;t++)if(n(e[t]))return t}function lt(e){return(n,t={})=>{const r=n.match(e.matchPattern);if(!r)return null;const a=r[0],i=n.match(e.parsePattern);if(!i)return null;let s=e.valueCallback?e.valueCallback(i[0]):i[0];s=t.valueCallback?t.valueCallback(s):s;const u=n.slice(a.length);return{value:s,rest:u}}}const gt=/^(\d+)(th|st|nd|rd)?/i,wt=/\d+/i,yt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},bt={any:[/^b/i,/^(a|c)/i]},Pt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Mt={any:[/1/i,/2/i,/3/i,/4/i]},Ot={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},kt={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},xt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Wt={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},vt={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Dt={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Yt={ordinalNumber:lt({matchPattern:gt,parsePattern:wt,valueCallback:e=>parseInt(e,10)}),era:x({matchPatterns:yt,defaultMatchWidth:"wide",parsePatterns:bt,defaultParseWidth:"any"}),quarter:x({matchPatterns:Pt,defaultMatchWidth:"wide",parsePatterns:Mt,defaultParseWidth:"any",valueCallback:e=>e+1}),month:x({matchPatterns:Ot,defaultMatchWidth:"wide",parsePatterns:kt,defaultParseWidth:"any"}),day:x({matchPatterns:xt,defaultMatchWidth:"wide",parsePatterns:Wt,defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:vt,defaultMatchWidth:"any",parsePatterns:Dt,defaultParseWidth:"any"})},St={code:"en-US",formatDistance:z,formatLong:et,formatRelative:rt,localize:ft,match:Yt,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Tt(e){const n=l(e);return A(n,$(n))+1}function Et(e){const n=l(e),t=+v(n)-+V(n);return Math.round(t/L)+1}function G(e,n){var h,g,M,O;const t=l(e),r=t.getFullYear(),a=D(),i=(n==null?void 0:n.firstWeekContainsDate)??((g=(h=n==null?void 0:n.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??a.firstWeekContainsDate??((O=(M=a.locale)==null?void 0:M.options)==null?void 0:O.firstWeekContainsDate)??1,s=b(e,0);s.setFullYear(r+1,0,i),s.setHours(0,0,0,0);const u=W(s,n),c=b(e,0);c.setFullYear(r,0,i),c.setHours(0,0,0,0);const d=W(c,n);return t.getTime()>=u.getTime()?r+1:t.getTime()>=d.getTime()?r:r-1}function Ft(e,n){var u,c,d,h;const t=D(),r=(n==null?void 0:n.firstWeekContainsDate)??((c=(u=n==null?void 0:n.locale)==null?void 0:u.options)==null?void 0:c.firstWeekContainsDate)??t.firstWeekContainsDate??((h=(d=t.locale)==null?void 0:d.options)==null?void 0:h.firstWeekContainsDate)??1,a=G(e,n),i=b(e,0);return i.setFullYear(a,0,r),i.setHours(0,0,0,0),W(i,n)}function Ct(e,n){const t=l(e),r=+W(t,n)-+Ft(t,n);return Math.round(r/L)+1}function o(e,n){const t=e<0?"-":"",r=Math.abs(e).toString().padStart(n,"0");return t+r}const w={y(e,n){const t=e.getFullYear(),r=t>0?t:1-t;return o(n==="yy"?r%100:r,n.length)},M(e,n){const t=e.getMonth();return n==="M"?String(t+1):o(t+1,2)},d(e,n){return o(e.getDate(),n.length)},a(e,n){const t=e.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return t.toUpperCase();case"aaa":return t;case"aaaaa":return t[0];case"aaaa":default:return t==="am"?"a.m.":"p.m."}},h(e,n){return o(e.getHours()%12||12,n.length)},H(e,n){return o(e.getHours(),n.length)},m(e,n){return o(e.getMinutes(),n.length)},s(e,n){return o(e.getSeconds(),n.length)},S(e,n){const t=n.length,r=e.getMilliseconds(),a=Math.trunc(r*Math.pow(10,t-3));return o(a,n.length)}},P={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},N={G:function(e,n,t){const r=e.getFullYear()>0?1:0;switch(n){case"G":case"GG":case"GGG":return t.era(r,{width:"abbreviated"});case"GGGGG":return t.era(r,{width:"narrow"});case"GGGG":default:return t.era(r,{width:"wide"})}},y:function(e,n,t){if(n==="yo"){const r=e.getFullYear(),a=r>0?r:1-r;return t.ordinalNumber(a,{unit:"year"})}return w.y(e,n)},Y:function(e,n,t,r){const a=G(e,r),i=a>0?a:1-a;if(n==="YY"){const s=i%100;return o(s,2)}return n==="Yo"?t.ordinalNumber(i,{unit:"year"}):o(i,n.length)},R:function(e,n){const t=_(e);return o(t,n.length)},u:function(e,n){const t=e.getFullYear();return o(t,n.length)},Q:function(e,n,t){const r=Math.ceil((e.getMonth()+1)/3);switch(n){case"Q":return String(r);case"QQ":return o(r,2);case"Qo":return t.ordinalNumber(r,{unit:"quarter"});case"QQQ":return t.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return t.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return t.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,n,t){const r=Math.ceil((e.getMonth()+1)/3);switch(n){case"q":return String(r);case"qq":return o(r,2);case"qo":return t.ordinalNumber(r,{unit:"quarter"});case"qqq":return t.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return t.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return t.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,n,t){const r=e.getMonth();switch(n){case"M":case"MM":return w.M(e,n);case"Mo":return t.ordinalNumber(r+1,{unit:"month"});case"MMM":return t.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return t.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return t.month(r,{width:"wide",context:"formatting"})}},L:function(e,n,t){const r=e.getMonth();switch(n){case"L":return String(r+1);case"LL":return o(r+1,2);case"Lo":return t.ordinalNumber(r+1,{unit:"month"});case"LLL":return t.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return t.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return t.month(r,{width:"wide",context:"standalone"})}},w:function(e,n,t,r){const a=Ct(e,r);return n==="wo"?t.ordinalNumber(a,{unit:"week"}):o(a,n.length)},I:function(e,n,t){const r=Et(e);return n==="Io"?t.ordinalNumber(r,{unit:"week"}):o(r,n.length)},d:function(e,n,t){return n==="do"?t.ordinalNumber(e.getDate(),{unit:"date"}):w.d(e,n)},D:function(e,n,t){const r=Tt(e);return n==="Do"?t.ordinalNumber(r,{unit:"dayOfYear"}):o(r,n.length)},E:function(e,n,t){const r=e.getDay();switch(n){case"E":case"EE":case"EEE":return t.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return t.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return t.day(r,{width:"short",context:"formatting"});case"EEEE":default:return t.day(r,{width:"wide",context:"formatting"})}},e:function(e,n,t,r){const a=e.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(n){case"e":return String(i);case"ee":return o(i,2);case"eo":return t.ordinalNumber(i,{unit:"day"});case"eee":return t.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return t.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return t.day(a,{width:"short",context:"formatting"});case"eeee":default:return t.day(a,{width:"wide",context:"formatting"})}},c:function(e,n,t,r){const a=e.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(n){case"c":return String(i);case"cc":return o(i,n.length);case"co":return t.ordinalNumber(i,{unit:"day"});case"ccc":return t.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return t.day(a,{width:"narrow",context:"standalone"});case"cccccc":return t.day(a,{width:"short",context:"standalone"});case"cccc":default:return t.day(a,{width:"wide",context:"standalone"})}},i:function(e,n,t){const r=e.getDay(),a=r===0?7:r;switch(n){case"i":return String(a);case"ii":return o(a,n.length);case"io":return t.ordinalNumber(a,{unit:"day"});case"iii":return t.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return t.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return t.day(r,{width:"short",context:"formatting"});case"iiii":default:return t.day(r,{width:"wide",context:"formatting"})}},a:function(e,n,t){const a=e.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,n,t){const r=e.getHours();let a;switch(r===12?a=P.noon:r===0?a=P.midnight:a=r/12>=1?"pm":"am",n){case"b":case"bb":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,n,t){const r=e.getHours();let a;switch(r>=17?a=P.evening:r>=12?a=P.afternoon:r>=4?a=P.morning:a=P.night,n){case"B":case"BB":case"BBB":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,n,t){if(n==="ho"){let r=e.getHours()%12;return r===0&&(r=12),t.ordinalNumber(r,{unit:"hour"})}return w.h(e,n)},H:function(e,n,t){return n==="Ho"?t.ordinalNumber(e.getHours(),{unit:"hour"}):w.H(e,n)},K:function(e,n,t){const r=e.getHours()%12;return n==="Ko"?t.ordinalNumber(r,{unit:"hour"}):o(r,n.length)},k:function(e,n,t){let r=e.getHours();return r===0&&(r=24),n==="ko"?t.ordinalNumber(r,{unit:"hour"}):o(r,n.length)},m:function(e,n,t){return n==="mo"?t.ordinalNumber(e.getMinutes(),{unit:"minute"}):w.m(e,n)},s:function(e,n,t){return n==="so"?t.ordinalNumber(e.getSeconds(),{unit:"second"}):w.s(e,n)},S:function(e,n){return w.S(e,n)},X:function(e,n,t){const r=e.getTimezoneOffset();if(r===0)return"Z";switch(n){case"X":return Q(r);case"XXXX":case"XX":return y(r);case"XXXXX":case"XXX":default:return y(r,":")}},x:function(e,n,t){const r=e.getTimezoneOffset();switch(n){case"x":return Q(r);case"xxxx":case"xx":return y(r);case"xxxxx":case"xxx":default:return y(r,":")}},O:function(e,n,t){const r=e.getTimezoneOffset();switch(n){case"O":case"OO":case"OOO":return"GMT"+H(r,":");case"OOOO":default:return"GMT"+y(r,":")}},z:function(e,n,t){const r=e.getTimezoneOffset();switch(n){case"z":case"zz":case"zzz":return"GMT"+H(r,":");case"zzzz":default:return"GMT"+y(r,":")}},t:function(e,n,t){const r=Math.trunc(e.getTime()/1e3);return o(r,n.length)},T:function(e,n,t){const r=e.getTime();return o(r,n.length)}};function H(e,n=""){const t=e>0?"-":"+",r=Math.abs(e),a=Math.trunc(r/60),i=r%60;return i===0?t+String(a):t+String(a)+n+o(i,2)}function Q(e,n){return e%60===0?(e>0?"-":"+")+o(Math.abs(e)/60,2):y(e,n)}function y(e,n=""){const t=e>0?"-":"+",r=Math.abs(e),a=o(Math.trunc(r/60),2),i=o(r%60,2);return t+a+n+i}const X=(e,n)=>{switch(e){case"P":return n.date({width:"short"});case"PP":return n.date({width:"medium"});case"PPP":return n.date({width:"long"});case"PPPP":default:return n.date({width:"full"})}},R=(e,n)=>{switch(e){case"p":return n.time({width:"short"});case"pp":return n.time({width:"medium"});case"ppp":return n.time({width:"long"});case"pppp":default:return n.time({width:"full"})}},qt=(e,n)=>{const t=e.match(/(P+)(p+)?/)||[],r=t[1],a=t[2];if(!a)return X(e,n);let i;switch(r){case"P":i=n.dateTime({width:"short"});break;case"PP":i=n.dateTime({width:"medium"});break;case"PPP":i=n.dateTime({width:"long"});break;case"PPPP":default:i=n.dateTime({width:"full"});break}return i.replace("{{date}}",X(r,n)).replace("{{time}}",R(a,n))},pt={p:R,P:qt},Nt=/^D+$/,Ht=/^Y+$/,Qt=["D","DD","YY","YYYY"];function Xt(e){return Nt.test(e)}function Lt(e){return Ht.test(e)}function _t(e,n,t){const r=Gt(e,n,t);if(console.warn(r),Qt.includes(e))throw new RangeError(r)}function Gt(e,n,t){const r=e[0]==="Y"?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${n}\`) for formatting ${r} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Rt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Bt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,jt=/^'([^]*?)'?$/,At=/''/g,Vt=/[a-zA-Z]/;function $t(e,n,t){var h,g,M,O,T,E,F,C;const r=D(),a=(t==null?void 0:t.locale)??r.locale??St,i=(t==null?void 0:t.firstWeekContainsDate)??((g=(h=t==null?void 0:t.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??r.firstWeekContainsDate??((O=(M=r.locale)==null?void 0:M.options)==null?void 0:O.firstWeekContainsDate)??1,s=(t==null?void 0:t.weekStartsOn)??((E=(T=t==null?void 0:t.locale)==null?void 0:T.options)==null?void 0:E.weekStartsOn)??r.weekStartsOn??((C=(F=r.locale)==null?void 0:F.options)==null?void 0:C.weekStartsOn)??0,u=l(e);if(!J(u))throw new RangeError("Invalid time value");let c=n.match(Bt).map(m=>{const f=m[0];if(f==="p"||f==="P"){const Y=pt[f];return Y(m,a.formatLong)}return m}).join("").match(Rt).map(m=>{if(m==="''")return{isToken:!1,value:"'"};const f=m[0];if(f==="'")return{isToken:!1,value:It(m)};if(N[f])return{isToken:!0,value:m};if(f.match(Vt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:m}});a.localize.preprocessor&&(c=a.localize.preprocessor(u,c));const d={firstWeekContainsDate:i,weekStartsOn:s,locale:a};return c.map(m=>{if(!m.isToken)return m.value;const f=m.value;(!(t!=null&&t.useAdditionalWeekYearTokens)&&Lt(f)||!(t!=null&&t.useAdditionalDayOfYearTokens)&&Xt(f))&&_t(f,n,String(e));const Y=N[f[0]];return Y(u,f,a.localize,d)}).join("")}function It(e){const n=e.match(jt);return n?n[1].replace(At,"'"):e}export{$t as f};
