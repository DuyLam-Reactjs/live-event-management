(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[16],{643:function(e,t,c){"use strict";c(1);var n=c(624),i=c(21);t.a=function(e){var t=e.title,c=e.isCreateProvider,s=e.editContentProvider;return Object(i.jsx)(n.H,{className:"pt-2 pb-4",children:Object(i.jsxs)(n.i,{className:"col-lg-7",children:[c&&Object(i.jsxs)("h3",{className:"m-0",children:[Object(i.jsx)("span",{style:{color:"#9B9B9B"},children:" Content Provider List "}),Object(i.jsx)("strong",{children:" / Th\xeam Content Provider"})]}),s&&Object(i.jsxs)("h3",{className:"m-0",children:[Object(i.jsx)("span",{style:{color:"#9B9B9B"},children:" Content Provider List "}),Object(i.jsx)("strong",{children:" / S\u1eeda Content Provider"})]}),Object(i.jsx)("h2",{children:t})]})})}},796:function(e,t,c){"use strict";c.r(t);var n=c(23),i=c(625),s=c(1),l=c.n(s),r=c(624),a=c(159),d=c(643),o=c(627),j=c(639),u=c(634),b=c(651),O=c(652),v=c(21),h=[{id:1,name:"5 d\xf2ng",value:5},{id:2,name:"10 d\xf2ng",value:10},{id:3,name:"20 d\xf2ng",value:20}];t.default=function(){var e=Object(a.b)(),t=Object(s.useState)(),c=Object(i.a)(t,2),x=c[0],f=c[1],m=Object(s.useState)(),p=Object(i.a)(m,2),g=p[0],E=p[1],P=Object(s.useState)(1),S=Object(i.a)(P,2),C=S[0],N=S[1],k=Object(s.useState)(10),w=Object(i.a)(k,2),y=w[0],B=w[1],U=Object(s.useState)(1),A=Object(i.a)(U,2),L=A[0],R=A[1],Q=Object(s.useState)(),T=Object(i.a)(Q,2),F=T[0],_=T[1];Object(s.useEffect)((function(){null===j.a||void 0===j.a||j.a.listUser(C,y).then((function(e){var t,c=null===e||void 0===e?void 0:e.data;(null===e||void 0===e?void 0:e.success)&&(f(null===c||void 0===c?void 0:c.items),_(null===c||void 0===c||null===(t=c.metadata)||void 0===t?void 0:t.total))}))}),[C,y]),Object(s.useEffect)((function(){if(x){var e=Object(o.f)(F,y);R(e)}}),[F,y]),Object(s.useEffect)((function(){var e=(x||[]).map((function(e){return Object(n.a)(Object(n.a)({},e),{},{isEdit:!1})}));null===e||void 0===e||e.forEach((function(e){var t=null===g||void 0===g?void 0:g.find((function(t){return t.id===e.id}));e.isEdit=!!t&&t.isEdit})),E(e)}),[x]);var D=["Email","Quy\u1ec1n h\u1ea1n","Qu\u1ea3n l\xfd"];return Object(v.jsx)(l.a.Fragment,{children:Object(v.jsxs)("div",{className:"justify-content-between",children:[Object(v.jsx)(d.a,{title:"User List"}),Object(v.jsx)(r.H,{children:Object(v.jsx)(r.i,{children:Object(v.jsx)(r.f,{children:Object(v.jsx)(r.g,{children:Object(v.jsx)(r.l,{items:x,fields:D,itemsPerPage:10,scopedSlots:{Email:function(e){return Object(v.jsx)("td",{children:e.email})},"Quy\u1ec1n h\u1ea1n":function(e){var t,c,n;return Object(v.jsxs)("td",{children:[(null===e||void 0===e||null===(t=e.role)||void 0===t?void 0:t.read)&&Object(v.jsx)(r.a,{children:Object(v.jsx)(r.d,{block:!0,color:"success",children:"Read"})}),(null===e||void 0===e||null===(c=e.role)||void 0===c?void 0:c.write)&&Object(v.jsx)(r.a,{children:Object(v.jsx)(r.d,{block:!0,color:"success",children:"Write"})}),(null===e||void 0===e||null===(n=e.role)||void 0===n?void 0:n.is_admin)&&Object(v.jsx)(r.a,{children:Object(v.jsx)(r.d,{block:!0,color:"success",children:"Admin"})})]})},"Qu\u1ea3n l\xfd":function(t){return Object(v.jsxs)("td",{children:[Object(v.jsx)(r.a,{children:Object(v.jsxs)(r.d,{block:!0,color:"info",onClick:function(){return function(t){e(Object(u.b)({name:b.a.NAME.USER.EDIT_USER,editField:g,setEditField:E,userItem:t}))}(t)},children:[Object(v.jsx)(r.v,{src:O.a.edit,alt:"edit"}),Object(v.jsx)("span",{className:"ml-1",children:"Ch\u1ec9nh s\u1eeda"})]})}),Object(v.jsx)(r.a,{children:Object(v.jsx)(r.d,{block:!0,color:"danger",onClick:function(){return function(t){e(Object(u.b)({name:b.a.NAME.USER.DELETE_USER,item:t,currentPage:C,rowPerPage:y,setCurrentPageList:f}))}(t)},children:Object(v.jsx)(r.v,{src:O.a.deleteAds,alt:"delete"})})})]})}}})})})})}),Object(v.jsxs)("div",{className:"m-1 d-flex justify-content-between align-items-center",children:[Object(v.jsxs)(r.m,{className:"btn-group",style:{width:"100px"},children:[Object(v.jsx)(r.p,{color:"default",className:"shadow-none mb-2 row-page color-white",children:Object(v.jsx)("span",{className:"mr-2",style:{color:"#222"},children:y+" d\xf2ng"})}),Object(v.jsx)(r.o,{children:h&&(h||[]).map((function(e,t){return Object(v.jsx)(r.n,{onClick:function(){return function(e){B(null===e||void 0===e?void 0:e.value)}(e)},children:null===e||void 0===e?void 0:e.name},t)}))})]}),Object(v.jsx)(r.G,{nextButton:"Sau",previousButton:"Tr\u01b0\u1edbc",activePage:C,pages:L,onActivePageChange:N})]})]})})}}}]);
//# sourceMappingURL=16.267543f2.chunk.js.map