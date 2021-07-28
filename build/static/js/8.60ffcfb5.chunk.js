(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[8],{627:function(e,t,n){"use strict";n.d(t,"f",(function(){return E})),n.d(t,"j",(function(){return p})),n.d(t,"k",(function(){return u})),n.d(t,"l",(function(){return l})),n.d(t,"i",(function(){return m})),n.d(t,"b",(function(){return d})),n.d(t,"g",(function(){return O})),n.d(t,"d",(function(){return v})),n.d(t,"c",(function(){return f})),n.d(t,"e",(function(){return h})),n.d(t,"a",(function(){return j})),n.d(t,"h",(function(){return T}));var a=n(631),r=n.n(a),o=n(632),i=n(635),c=n(640),s=n(657),u=function(e,t){var n=new URL(e);return t&&Object.keys(t)&&Object.keys(t).forEach((function(e){t[e]&&n.searchParams.set(e,t[e])})),n},l=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},d=function(e,t,n){if("undefined"===typeof window||!window.localStorage)return"";try{if(e===i.a.GET)return window.localStorage.getItem(t);if(e===i.a.SET)return window.localStorage.setItem(t,n);if(e===i.a.REMOVE)return window.localStorage.removeItem(t);if(e===i.a.CLEAR)return window.localStorage.clear()}catch(a){return{error:a}}};function O(e){var t=new Date(e),n=6e4*(new Date).getTimezoneOffset();return new Date(t.getTime()+n).toLocaleString("en-GB")}function v(e){var t=[];return null===e||void 0===e||e.forEach((function(e){t.push(null===e||void 0===e?void 0:e.id)})),t}function p(e){var t=e.message;return s.b.info(t)}function h(e){var t=e||{},n="";return t.url_1&&(n=1),t.url_2&&(n+=1),t.url_3&&(n+=1),n}function f(e){var t=[];return null===e||void 0===e||e.forEach((function(e){var n;null===e||void 0===e||null===(n=e.adsGroups)||void 0===n||n.forEach((function(e){var n={};n.id=null===e||void 0===e?void 0:e.id,n.status=null===e||void 0===e?void 0:e.status,t.push(n)}))})),t}function E(e,t){var n=Math.floor(e/t);return e%t!==0&&n++,0===n&&(n=1),n}function m(e){var t=new Date;t.setFullYear(t.getFullYear()+1);var n={expires:t,path:"/"};try{var a=c.a.getTokenKey(),r=c.a.METHOD.SAVE,o=e;c.a.handleCookie({type:r,key:a,value:o,option:n}),c.a.handleCookie({type:c.a.METHOD.REMOVE,key:c.a.KEY.ANONYMOUS_TOKEN,option:n}),d(i.a.SET,i.a.RE_LOGIN,!0),d(i.a.SET,"Token",e)}catch(s){throw s}}function T(e,t){return _.apply(this,arguments)}function _(){return(_=Object(o.a)(r.a.mark((function e(t,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.remove(c.a.KEY.ACCESS_TOKEN);case 3:return e.next=5,c.a.remove(c.a.KEY.ACCESS_TOKEN_TEST);case 5:return e.next=7,c.a.remove(c.a.KEY.ACCESS_TOKEN_DEV);case 7:return e.next=9,c.a.remove(c.a.KEY.ANONYMOUS_TOKEN);case 9:e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(0),e.t0;case 14:if("undefined"!==typeof window){e.next=16;break}return e.abrupt("return");case 16:n||window.location.reload();case 17:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}var j=function(e){return{root:{"& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)":{transform:"transparent"},"& .MuiFormLabel-root":{color:"#222222",fontSize:"12.5px"},"& .MuiSvgIcon--root":{color:"#636f83"},"& .MuiInputLabel-root":{textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"50%",overflow:"hidden"}},inputRoot:{color:"#222222",fontSize:"12.5px",'&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child':{paddingLeft:5.25},"& .MuiOutlinedInput-notchedOutline":{borderColor:"transparent"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:"transparent"},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"transparent"}}}}},635:function(e,t,n){"use strict";t.a={GET:"GET",SET:"SET",REMOVE:"REMOVE",CLEAR:"CLEAR",CONTENT_PROVIDER:"CONTENT_PROVIDER",FIRST_LOGIN:"FIRST_LOGIN",TRIAL_APP:"TRIAL_APP",USER_GUEST:"USER_GUEST",RE_LOGIN:"RE_LOGIN",LOGIN:"LOGIN",DEVICE_ID:"DEVICE_ID",ID_CONTENT_PROVIDER:"ID_CONTENT_PROVIDER"}},636:function(e,t){e.exports={API_METHOD:{GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH"},ANONYMOUS_TOKEN:"token_anonymous"}},639:function(e,t,n){"use strict";var a=n(631),r=n.n(a),o=n(23),i=n(632),c=n(161),s=n(162),u=function e(t){Object(c.a)(this,e),this.accessToken=null===t||void 0===t?void 0:t.token,this.profile=null===t||void 0===t?void 0:t.user_data,this.message=null===t||void 0===t?void 0:t.message},l=n(647),d=n(649),O=n(636),v=n.n(O),p=function(){function e(){Object(c.a)(this,e)}return Object(s.a)(e,null,[{key:"login",value:function(){var e=Object(i.a)(r.a.mark((function e(t,n){var a,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.a.user.login,i=v.a.API_METHOD.POST,c={email:t,password:n},e.abrupt("return",d.a.executeWithCache({url:a,method:i,params:c}).then((function(e){var t=new u(null===e||void 0===e?void 0:e.data);return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"changePassword",value:function(){var e=Object(i.a)(r.a.mark((function e(t,n){var a,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.a.user.changePassword,i=v.a.API_METHOD.PUT,c={old_password:t,new_password:n},e.abrupt("return",d.a.executeWithCache({url:a,method:i,params:c}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"listUser",value:function(){var e=Object(i.a)(r.a.mark((function e(t,n){var a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.a.user.listUser+"?page="+t+"&limit="+n,i=v.a.API_METHOD.GET,e.abrupt("return",d.a.executeWithCache({url:a,method:i}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"deleteUser",value:function(){var e=Object(i.a)(r.a.mark((function e(t){var n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.a.user.listUser+"/"+t,a=v.a.API_METHOD.DELETE,e.abrupt("return",d.a.executeWithCache({url:n,method:a}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateInfoUser",value:function(){var e=Object(i.a)(r.a.mark((function e(t,n,a){var i,c,s,u,O,p;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=a.read,c=a.write,s=a.is_admin,u=l.a.user.listUser+"/"+t,O=v.a.API_METHOD.PUT,p={email:n,role:{read:i,write:c,is_admin:s}},e.abrupt("return",d.a.executeWithCache({url:u,method:O,params:p}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 5:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"createUser",value:function(){var e=Object(i.a)(r.a.mark((function e(t){var n,a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.a.user.listUser,a=v.a.API_METHOD.POST,i=t,e.abrupt("return",d.a.executeWithCache({url:n,method:a,params:i}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"userProfile",value:function(){var e=Object(i.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.a.user.userProfile,n=v.a.API_METHOD.GET,e.abrupt("return",d.a.executeWithCache({url:t,method:n}).then((function(e){var t=null===e||void 0===e?void 0:e.data;return Object(o.a)(Object(o.a)({},e),{},{data:t})})));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}();t.a=p},640:function(e,t,n){"use strict";var a=n(646),r=n.n(a),o=n(641),i={ACCESS_TOKEN:"access_token",ACCESS_TOKEN_TEST:"access_token_test",ACCESS_TOKEN_DEV:"access_token_dev",ANONYMOUS_TOKEN:"anonymous_token"},c={SAVE:"SAVE",LOAD:"LOAD",REMOVE:"REMOVE"};t.a={KEY:i,METHOD:c,getTokenKey:function(){var e=i.ACCESS_TOKEN,t=o.DOMAIN_API,n=(t||"").includes("testing-api"),a=(t||"").includes("dev-api");return n?e=i.ACCESS_TOKEN_TEST:a&&(e=i.ACCESS_TOKEN_DEV),e},handleCookie:function(e){var t=e.type,n=e.key,a=e.value,o=e.option;switch(t){case c.SAVE:return r.a.save(n,a,o);case c.LOAD:return r.a.load(n);case c.REMOVE:return void r.a.remove(n,o)}},remove:function(e,t){var n=new Date;n.setFullYear(n.getFullYear()+1);var a={expires:n,path:"/"},o={expires:n,domain:".vieon.vn",path:"/"};t?r.a.remove(e,t):(r.a.remove(e,a),r.a.remove(e,o))}}},641:function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://testing-api.vieon.vn/backend/",REACT_APP_STATIC_DOMAIN:"https://localhost.vieon.vn"}).PORT,a="undefined"!==typeof Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://testing-api.vieon.vn/backend/",REACT_APP_STATIC_DOMAIN:"https://localhost.vieon.vn"}).BUILD_ID?Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://testing-api.vieon.vn/backend/",REACT_APP_STATIC_DOMAIN:"https://localhost.vieon.vn"}).BUILD_ID:(new Date).getTime()+"";e.exports={ENV:"production",DOMAIN_API:"https://dev-api.vieon.vn/",BUILD_ID:a,STATIC_DOMAIN:"https://localhost.vieon.vn",DEFAULT_PORT:n}},647:function(e,t,n){"use strict";var a=n(641),r={user:{login:a.DOMAIN_API+"live-event/v1.0/customers/login",changePassword:a.DOMAIN_API+"admin-ads/user/change-password",listUser:a.DOMAIN_API+"admin-ads/users",userProfile:a.DOMAIN_API+"admin-ads/user"},content:{contentProvider:a.DOMAIN_API+"admin-ads/content-providers",getContentList:a.DOMAIN_API+"admin-ads/contents",getContentType:a.DOMAIN_API+"admin-ads/list-all/content-types",getContentCategories:a.DOMAIN_API+"admin-ads/list-all/content-categories"},inStreamAds:{inStreamAds:a.DOMAIN_API+"admin-ads/instream-ads",listInStreamAds:a.DOMAIN_API+"admin-ads/content-providers",getListAllInStreamAds:a.DOMAIN_API+"admin-ads/list-all/content-providers"}};t.a=r},649:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var a=n(23),r=n(161),o=n(162),i=n(636),c=n.n(i),s=n(627),u=n(663),l=n.n(u),d=n(646),O=n.n(d),v=n(640);l.a.interceptors.request.use((function(e){e.timeout=1e4,e.params||(e.params={});var t=O.a.load(v.a.getTokenKey());return t?(e.headers.Authorization=t||"",e):e}),(function(e){return Promise.reject(e)}));var p=l.a,h=function(){function e(){Object(r.a)(this,e)}return Object(o.a)(e,null,[{key:"executeWithCache",value:function(e){var t=e.url,n=e.method,r=e.params,o=e.config,i=e.accessToken,u=Object(a.a)({},r),l=Object(a.a)({},o||{}),d=i||"";d&&(l.headers=Object(a.a)(Object(a.a)({},l.headers||{}),{},{Authorization:d||""}));var O=c.a.API_METHOD;switch(n){case O.GET:var v=Object(s.k)(t,r),h=null===v||void 0===v?void 0:v.href;return p.get(h,l||{}).then((function(e){return f.createResponseData(e||{})})).catch((function(e){var t=(null===e||void 0===e?void 0:e.response)||{};return f.createResponseData(t||{})}));case O.POST:var E=u||{};return p.post(t,E,l||{}).then((function(e){return f.createResponseData(e||{})})).catch((function(e){var t=(null===e||void 0===e?void 0:e.response)||{};return f.createResponseData(t||{})}));case O.DELETE:return p.delete(t,l||{}).then((function(e){return f.createResponseData(e||{})})).catch((function(e){var t=(null===e||void 0===e?void 0:e.response)||{};return f.createResponseData(t||{})}));case O.PUT:var m=u||{};return p.put(t,m,l||{}).then((function(e){return f.createResponseData(e||{})})).catch((function(e){var t=(null===e||void 0===e?void 0:e.response)||{};return f.createResponseData(t||{})}))}}}]),e}(),f=function(){function e(){Object(r.a)(this,e),this.success=!1,this.statusText="",this.message="",this.data=null,this.httpCode=0}return Object(o.a)(e,null,[{key:"createResponseData",value:function(t){var n=new e;return t&&(n.httpCode=t.status,n.success=200===t.status,n.statusText=t.statusText||"",t.problem&&"TIMEOUT_ERROR"===t.problem&&(n.message="Request timeout"),n.message=t.message||"",Array.isArray(t.data)?n.data={items:t.data}:n.data=t.data||null),n}}]),e}()},660:function(e,t){e.exports={user:{LOGIN:"login",CHANGE_PASSWORD:"change-password",REGISTER:"register"},content:{},inStreamAds:{}}},795:function(e,t,n){"use strict";n.r(t);var a=n(631),r=n.n(a),o=n(632),i=n(23),c=n(625),s=n(1),u=n(624),l=n(629),d=n(627),O=n(639),v=n(18),p=n(660),h=n.n(p),f=n(21);t.default=function(){var e,t,n,a=Object(s.useState)({email:"",password:"",role:{read:!0,write:!0,is_admin:!1}}),p=Object(c.a)(a,2),E=p[0],m=p[1],T=Object(v.f)(),_=Object(s.useState)(!1),j=Object(c.a)(_,2),b=j[0],A=j[1],S=Object(s.useState)(""),I=Object(c.a)(S,2),C=I[0],D=I[1],x=function(){var e=Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(d.l)(null===E||void 0===E?void 0:E.email)?O.a.createUser(E).then((function(e){e.success&&T.push(h.a.user.LOGIN+"?rel=/")})):D("Email kh\xf4ng h\u1ee3p l\u1ec7");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(e){"Enter"===e.key&&x()};return Object(f.jsx)("div",{className:"c-app c-default-layout flex-row align-items-center",children:Object(f.jsx)(u.j,{children:Object(f.jsx)(u.H,{className:"justify-content-center",children:Object(f.jsx)(u.i,{md:"9",lg:"7",xl:"6",children:Object(f.jsx)(u.f,{className:"mx-4",children:Object(f.jsx)(u.g,{className:"p-4",children:Object(f.jsxs)(u.r,{children:[Object(f.jsx)("h1",{children:"Register"}),Object(f.jsx)("p",{className:"text-muted",children:"Create your account"}),Object(f.jsxs)(u.x,{className:"mb-3",children:[Object(f.jsx)(u.z,{children:Object(f.jsx)(u.A,{children:"@"})}),Object(f.jsx)(u.w,{type:"text",placeholder:"Email",autoComplete:"email",onKeyPress:w,onChange:function(e){var t=e.target.value,n=Object(d.l)(t);A(n),m(Object(i.a)(Object(i.a)({},E),{},{email:t}))}})]}),!b&&Object(f.jsx)("p",{className:"",style:{color:"red",textAlign:"end"},children:C}),Object(f.jsxs)(u.x,{className:"mb-3",children:[Object(f.jsx)(u.z,{children:Object(f.jsx)(u.A,{children:Object(f.jsx)(l.a,{name:"cil-lock-locked"})})}),Object(f.jsx)(u.w,{type:"password",placeholder:"Password",autoComplete:"new-password",onKeyPress:w,onChange:function(e){var t=e.target.value;m(Object(i.a)(Object(i.a)({},E),{},{password:t}))}})]}),Object(f.jsxs)(u.H,{className:"p-2",children:[Object(f.jsxs)(u.i,{xs:"12",sm:"4",children:[Object(f.jsx)("span",{children:"Read"}),Object(f.jsx)(u.Q,{className:"mx-2",variant:"3d",color:"primary",defaultChecked:null===E||void 0===E||null===(e=E.role)||void 0===e?void 0:e.read,size:"sm",name:"Read",onChange:function(e){var t=e.target.checked;m(Object(i.a)(Object(i.a)({},E),{},{role:{read:t,write:E.role.write,is_admin:E.role.is_admin}}))}})]}),Object(f.jsxs)(u.i,{xs:"12",sm:"4",children:[Object(f.jsx)("span",{children:"Write"}),Object(f.jsx)(u.Q,{className:"mx-2",variant:"3d",color:"primary",defaultChecked:null===E||void 0===E||null===(t=E.role)||void 0===t?void 0:t.write,size:"sm",name:"Read",onChange:function(e){var t=e.target.checked;m(Object(i.a)(Object(i.a)({},E),{},{role:{read:E.role.read,write:t,is_admin:E.role.is_admin}}))}})]}),Object(f.jsxs)(u.i,{xs:"12",sm:"4",children:[Object(f.jsx)("span",{children:"Admin"}),Object(f.jsx)(u.Q,{className:"mx-2",variant:"3d",color:"primary",defaultChecked:null===E||void 0===E||null===(n=E.role)||void 0===n?void 0:n.is_admin,size:"sm",name:"Read",onChange:function(e){var t=e.target.checked;m(Object(i.a)(Object(i.a)({},E),{},{role:{read:E.role.read,write:E.role.write,is_admin:t}}))}})]})]}),Object(f.jsx)(u.d,{color:"success",block:!0,onClick:x,children:"Create Account"}),Object(f.jsx)(u.B,{to:"/instream-ads/content-provider-list",children:Object(f.jsx)("p",{className:"mt-3 mb-0 register-back",children:"Quay l\u1ea1i Instream Ads Tool"})})]})})})})})})})}}}]);
//# sourceMappingURL=8.60ffcfb5.chunk.js.map