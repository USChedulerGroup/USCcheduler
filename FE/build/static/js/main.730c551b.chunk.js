(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{108:function(e,t,n){},113:function(e,t,n){},114:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(0),a=n.n(c),s=n(13),i=n.n(s),o=n(27),l=n(8),u=n(31),d=n(9),j=n(65),h=n(64),b=n(32),m=n.n(b),f={M:"2020-12-08",T:"2020-12-09",W:"2020-12-10",H:"2020-12-11",F:"2020-12-12"},O=["blue","green","purple","orange","brown"],x=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[];return e.forEach((function(e){var r=[],c=0,a={};e.forEach((function(e){console.log("processing schedules");for(var n=0;n<e.daysOfWeek.length;n++){var s=e.sectionId,i=new Date(f[e.daysOfWeek[n]]),o=new Date(f[e.daysOfWeek[n]]);t?(i.setHours(e.startTime.hour,e.startTime.minute,0),o.setHours(e.endTime.hour,e.endTime.minute,0)):(i.setHours(parseInt(e.startTime.split(":")[0]),parseInt(e.startTime.split(":")[1])),o.setHours(parseInt(e.endTime.split(":")[0]),parseInt(e.endTime.split(":")[1])));var l=e.department+e.courseNumber.toString(),u=null;l in a?u=a[l]:(u=O[c++%O.length],a[l]=u);var d=l+"-"+e.sectionType+"-"+e.sectionId;r.push({id:s,title:d,start:i,end:o,color:u})}})),n.push(r)})),n},g=window.location.href+"CS201/api/",p=n(15),v=n(16),S=n.n(v),E=n(24),y=n(39),I=n.n(y),T=Object(c.createContext)(),w=function(e){var t=Object(c.useState)(!1),n=Object(d.a)(t,2),a=n[0],s=n[1];Object(c.useEffect)((function(){}),[a]);var i=function(){var e=Object(E.a)(S.a.mark((function e(t){var n,r,c,a;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,c=null,a=new URL(g+"session"),console.log(n,r),a.search=new URLSearchParams({email:n,password:r}),e.next=7,fetch(a,{method:"POST",credentials:"include"}).then((function(e){return e.json()})).then((function(e){console.log(e),"success"===e.status?(console.log("setting auth  = true"),s(!0)):(c=e.message,s(!1))})).catch((function(e){console.log(e)}));case 7:return e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(E.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(g+"session",{method:"DELETE",credentials:"include"}).then((function(){I.a.fire("Bye!"),s(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(T.Provider,Object(p.a)({value:{auth:a,signUp:function(e){var t=e.fname,n=e.lname,r=e.email,c=e.password,a=new URL(g+"users");a.search=new URLSearchParams({fname:t,lname:n,email:r,password:c}),fetch(a,{method:"POST",credentials:"include"}).then((function(e){return e.json()})).then((function(e){"success"===e.message?(I.a.fire({icon:"success",text:"welcome!"}),s(!0)):I.a.fire({icon:"error",text:e.message})})).catch((function(e){console.log(e)}))},signIn:i,signOut:o}},e))},C=function(){return Object(c.useContext)(T)},N=n(58),L=n.n(N),k=n(11),R=n(63),U={container:function(e,t){return Object(p.a)(Object(p.a)({},e),{},{width:"75%",margin:"auto"})},menu:function(e,t){return Object(p.a)(Object(p.a)({},e),{},{zIndex:10,marginTop:0})}},P=function(){var e=Object(E.a)(S.a.mark((function e(t){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){if(!t)return e([]);var n=t.match("[^0-9]+"),r=t.match("[0-9]+[^0-9]*");null!=n&&(n=n[0].toUpperCase()),null!=r&&(r=r[0].toUpperCase());var c=new URL(g+"query");c.search=new URLSearchParams({department:n,courseNumber:r}),m.a.get(c).then((function(t){var n=t.data.map((function(e){var t=e.department.toUpperCase()+e.courseNumber.toString();return{label:t+": "+e.title,value:t}}));return e(n)})).catch((function(t){return console.log(t),e([])}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)([]),o=Object(d.a)(i,2),l=(o[0],o[1]),u=Object(c.useRef)(L()(function(){var e=Object(E.a)(S.a.mark((function e(t,n){var r;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(t);case 2:r=e.sent,n(r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),500)).current;Object(c.useEffect)((function(){console.log("getting default options");var e=new URL(g+"query");e.search=new URLSearchParams({department:null,courseNumber:null}),m.a.get(e).then((function(e){var t=e.data.map((function(e){var t=e.department.toUpperCase()+e.courseNumber.toString();return{label:t+": "+e.title,value:t}}));l(t)})).catch((function(e){console.log("error getting default options",e),l([])}))}),[]);return Object(r.jsxs)("div",{style:{margin:"auto"},children:[Object(r.jsx)(R.a,{styles:U,onChange:function(e){null!=e&&e.map((function(e){return e.label=e.value,e})),s(e)},loadOptions:u,isMulti:!0,placeholder:"Enter course name e.g. csci201"}),Object(r.jsx)("div",{children:Object(r.jsx)(k.a,{block:!0,style:{width:"30%",margin:"22px auto",minWidth:"30%"},variant:"outline-danger",onClick:function(){var t="";a&&(a.forEach((function(e){t+=e.value+","})),t=t.slice(0,-1));var n=localStorage.getItem("startTime"),r=localStorage.getItem("endTime"),c=new URL(g+"guest");c.search=new URLSearchParams({courses:t,extraCurriculum:null,startTime:n,endTime:r}),fetch(c,{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(t){var n=t.schedule;localStorage.setItem("schedules",JSON.stringify(n));var r=x(n);localStorage.setItem("events",JSON.stringify(r)),e.show(!1)})).catch((function(e){console.log(e)}))},children:"GENERATE SCHEDULES"})})]})},G=(n(108),function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(0),o=Object(d.a)(i,2),l=o[0],b=o[1],m=C().auth,f=Object(c.useState)(!1),O=Object(d.a)(f,2),p=(O[0],O[1],function(){l<a.length-1?b(l+1):b(0)}),v=function(){b(l>0?l-1:a.length-1)};return Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("events"));s(null!=e?e:[])}),[]),Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{style:{margin:"auto"},children:[Object(r.jsx)(k.a,{variant:"outline-dark",id:"prev",className:"buttons",onClick:v,children:"Prev Schedule"}),Object(r.jsxs)("span",{id:"index",children:[a.length>0?l+1:0,Object(r.jsx)("span",{style:{color:"red"},children:"/"}),a.length]}),Object(r.jsx)(k.a,{variant:"outline-dark",id:"next",className:"buttons",onClick:p,children:"Next Schedule"})]}),Object(r.jsx)("div",{id:"calendar",children:Object(r.jsx)(j.a,Object(u.a)({schedulerLicenseKey:"CC-Attribution-NonCommercial-NoDerivatives",plugins:[h.a],initialView:"timeGridWeek",initialDate:"2020-12-07",hiddenDays:[0,6],dayHeaderFormat:{weekday:"long"},events:a[l],allDaySlot:!1,height:300,contentHeight:"auto",slotMinTime:"07:00:00",slotMaxTime:"22:00:00",customButtons:{right:{text:"Next Schedule",click:p},left:{text:"Prev Schedule",click:v},select:{text:"Save this schedule",click:function(){if(m){var e=JSON.parse(localStorage.getItem("schedules"));if(null!=e){console.log("SENDING SCHEDULES");var t="";console.log(e),e[l].forEach((function(e){t+=e.sectionId.toString()+","})),","===t.charAt(t.length-1)&&(t=t.slice(0,t.length-1));var n=new URL(g+"saveschedule");n.search=new URLSearchParams({id:t}),fetch(n,{method:"POST",credentials:"include"}).then((function(){alert("Success!")})).catch((function(e){console.log(e),alert("Error saving schedule")}))}}else alert("Must be logged in to save a schedule!")}},getSaved:{text:"Get saved schedule",click:function(){if(m){var e=new URL(g+"saveschedule");fetch(e,{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=x([e],!1);localStorage.setItem("events",JSON.stringify(t)),localStorage.setItem("schedules",JSON.stringify([e])),s(t),b(0)})).catch((function(e){console.log(e)}))}else alert("You must be logged in to get your schedule!")}},clear:{text:"Clear Schedules",click:function(){localStorage.removeItem("schedules"),localStorage.removeItem("events"),s([])}},search:{text:"Modify Courses",click:function(){return e.show(!0)}}},headerToolbar:!1},"dayHeaderFormat",{weekday:"short"}))})]})}),J=n(7),A=n(21),H=n(12),M=n(26),_=n(22),B=Object(c.createContext)(),W=function(e){Object(c.useEffect)((function(){t()}));var t=function(){var e=Object(E.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(g+"profile",{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(e){var t=e.Courses.split(",");t.map((function(e){return{department:e.match("[^0-9]+"),courseNumber:parseInt(e.match("[0-9]+"))}}));var n=[];t.forEach((function(e){if(e){var t=e.match("[^0-9]+")[0],r=parseInt(e.match("[0-9]+"));n.push({department:t,courseNumber:r})}})),localStorage.setItem("courses",JSON.stringify(n))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(B.Provider,Object(p.a)({value:{getUser:t}},e))},F=function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)([]),o=Object(d.a)(i,2),l=o[0],u=o[1],j=Object(c.useState)(""),h=Object(d.a)(j,2),b=h[0],m=h[1],f=Object(c.useState)(""),O=Object(d.a)(f,2),p=O[0],v=O[1],S=Object(c.useState)(!1),E=Object(d.a)(S,2),y=E[0],I=E[1],T=Object(c.useContext)(B).getUser,w=function(e){try{var t=e.split(":"),n=parseInt(t[0]),r=parseInt(t[1]);return 2===t[0].length&&2===t[1].length&&(console.log(t[0].length),!(n<0||n>=24)&&!(r<0||r>=60))}catch(c){return!1}};Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("courses")),t=JSON.parse(localStorage.getItem("extracurriculars")),n=localStorage.getItem("startTime"),r=localStorage.getItem("endTime");s(null!=e?e:[]),u(null!=t?t:[]),m(null!=n?n:null),v(null!=r?r:null)}),[y]);var C=function(e,t,n){var r=new URL(g+"courses");return r.search=new URLSearchParams({department:e,courseNumber:t,clear:0}),new Promise((function(e,t){fetch(r,{method:n?"GET":"DELETE",credentials:"include"}).then((function(e){return e.json()})).then((function(n){return console.log(n),0===Object.keys(n).length&&n.constructor===Object?t():e()})).catch((function(e){return console.log(e),t()}))}))};return Object(r.jsxs)("div",{children:[Object(r.jsx)(k.a,{variant:"info",onClick:function(){localStorage.removeItem("extracurriculars"),localStorage.removeItem("startTime"),localStorage.removeItem("endTime"),I(!y),alert("Success!")},children:"Clear Preferences"}),"\xa0\xa0",Object(r.jsx)(k.a,{variant:"info",onClick:function(){var e=new URL(g+"courses");e.search=new URLSearchParams({clear:1}),fetch(e,{method:"DELETE",credentials:"include"}).then((function(e){return e.json()})).then((function(e){0===Object.keys(e).length&&e.constructor===Object?(console.log("error"),alert("Error")):(console.log(e),alert("Success!"),T().then((function(){I(!y)})))})).catch((function(e){console.log(e),alert("Error")}))},children:"Clear courses"}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("p",{children:"Courses with TBA times are not considered"}),Object(r.jsx)("p",{children:"If a schedule can't meet preferences, it will ignore preferences"}),Object(r.jsx)("p",{children:"Extracurriculars are assumed to be for everyday"}),Object(r.jsxs)(A.a,{children:[Object(r.jsxs)(M.a,{children:[Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a,{onSubmit:function(e){e.preventDefault();var t=e.target.elements.add.value.toUpperCase().split(" "),n=t[0],r=parseInt(t[1]);console.log(n),console.log(r),C(n,r,!0).then((function(){alert("Valid Course!"),T().then((function(){I(!y)}))})).catch((function(){alert("Invalid course.")}))},children:[" ",Object(r.jsxs)(J.a.Group,{controlId:"add",children:[Object(r.jsx)(J.a.Label,{children:"Add a class:"}),Object(r.jsx)(J.a.Control,{type:"text",placeholder:"Enter a class e.g. CSCI 201"}),Object(r.jsx)(J.a.Text,{children:"Make sure there is a space between department and course number"})]}),Object(r.jsx)(k.a,{variant:"primary",type:"submit",children:"Add"})]})}),Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a,{onSubmit:function(e){e.preventDefault();var t=e.target.elements.remove.value.toUpperCase().split(" "),n=t[0],r=parseInt(t[1]);C(n,r,!1).then((function(){alert("Valid Course!"),T().then((function(){I(!y)}))})).catch((function(e){alert("Course does not exist")}))},children:[" ",Object(r.jsxs)(J.a.Group,{controlId:"remove",children:[Object(r.jsx)(J.a.Label,{children:"Remove a class:"}),Object(r.jsx)(J.a.Control,{type:"text",placeholder:"Enter a class e.g. CSCI 201"}),Object(r.jsx)(J.a.Text,{children:"Make sure there is a space between department and course number"})]}),Object(r.jsx)(k.a,{variant:"primary",type:"submit",children:"Remove"})]})})]}),Object(r.jsx)("br",{})]}),Object(r.jsx)(J.a,{onSubmit:function(e){e.preventDefault();var t=e.target.elements.start.value,n=e.target.elements.end.value;if(""!==t&&""!==n)if(w(t)&&w(n)){var r=[t+" "+n],c=JSON.parse(localStorage.getItem("extracurriculars"));null===c?c=[r]:c.push(r),console.log(c),localStorage.setItem("extracurriculars",JSON.stringify(c)),I(!y)}else alert("Invalid time format. Must be in military time");else alert("Both start time and end time must be present for an extracurricular!")},children:Object(r.jsxs)(A.a,{fluid:!0,children:[Object(r.jsxs)(M.a,{children:[Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a.Group,{controlId:"start",children:[Object(r.jsx)(J.a.Label,{children:"Extracurricular start time:"}),Object(r.jsx)(J.a.Control,{type:"time",placeholder:"00:00"}),Object(r.jsx)(J.a.Text,{children:"Enter military time format e.g. 08:20"})]})}),Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a.Group,{controlId:"end",children:[Object(r.jsx)(J.a.Label,{children:"Extracurricular end time:"}),Object(r.jsx)(J.a.Control,{type:"time",placeholder:"00:00"}),Object(r.jsx)(J.a.Text,{children:"Enter military time format e.g. 08:20"})]})})]}),Object(r.jsx)(M.a,{children:Object(r.jsx)(H.a,{children:Object(r.jsx)(k.a,{variant:"primary",type:"submit",children:"Submit"})})})]})}),Object(r.jsx)("br",{}),Object(r.jsx)(J.a,{onSubmit:function(e){e.preventDefault();var t=e.target.elements.start.value,n=e.target.elements.end.value;if(""!==t){if(!w(t))return void alert("Invalid time format. Must be in military time");localStorage.setItem("startTime",t)}if(""!==n){if(!w(n))return void alert("Invalid time format. Must be in military time");localStorage.setItem("endTime",n)}I(!y)},children:Object(r.jsxs)(A.a,{children:[Object(r.jsxs)(M.a,{children:[Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a.Group,{controlId:"start",children:[Object(r.jsx)(J.a.Label,{children:"Earliest start time:"}),Object(r.jsx)(J.a.Control,{type:"time",placeholder:"00:00"}),Object(r.jsx)(J.a.Text,{children:"Enter military time format e.g. 08:20"})]})}),Object(r.jsx)(H.a,{children:Object(r.jsxs)(J.a.Group,{controlId:"end",children:[Object(r.jsx)(J.a.Label,{children:"Latest end time:"}),Object(r.jsx)(J.a.Control,{type:"time",placeholder:"00:00"}),Object(r.jsx)(J.a.Text,{children:"Enter military time format e.g. 08:20"})]})})]}),Object(r.jsx)(M.a,{children:Object(r.jsx)(H.a,{children:Object(r.jsx)(k.a,{variant:"primary",type:"submit",children:"Submit"})})})]})}),Object(r.jsx)("br",{}),Object(r.jsx)("div",{children:Object(r.jsx)("p",{className:"text-center",children:Object(r.jsx)(k.a,{variant:"outline-danger",onClick:function(){console.log("GENERATING EVENTS");var t=new URL(g+"pref"),n=new URL(g+"generate"),r=JSON.parse(localStorage.getItem("extracurriculars")),c="";null!==r?(r.forEach((function(e){var t=JSON.stringify(e)+",";c+=t})),c=c.slice(0,-1)):c=null;var a=localStorage.getItem("startTime"),s=localStorage.getItem("endTime");t.search=new URLSearchParams({startTime:a,endTime:s,extraCurriculum:c}),fetch(t,{method:"POST",credentials:"include"}).then((function(){fetch(n,{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(t){localStorage.setItem("schedules",JSON.stringify(t));var n=x(t);localStorage.setItem("events",JSON.stringify(n)),e.history.push("/")})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))},children:"GENERATE EVENTS"})})}),Object(r.jsx)("br",{}),Object(r.jsx)(A.a,{fluid:!0,children:Object(r.jsxs)(M.a,{children:[Object(r.jsxs)(H.a,{children:[Object(r.jsx)("h4",{children:"Current Courses "}),Object(r.jsx)("div",{children:Object(r.jsx)(_.a,{children:a.map((function(e){return Object(r.jsx)(_.a.Item,{children:e.department+e.courseNumber.toString()})}))})})]}),Object(r.jsx)(H.a,{children:Object(r.jsxs)("div",{children:[Object(r.jsx)("h4",{children:"Extracurriculars "}),Object(r.jsx)(_.a,{children:l.map((function(e){var t=e[0].split(" ");return Object(r.jsxs)(_.a.Item,{children:["Start: ",t[0]," ",Object(r.jsx)("br",{})," End: ",t[1]]})}))})]})}),Object(r.jsx)(H.a,{children:Object(r.jsxs)(_.a,{children:[b?Object(r.jsxs)(_.a.Item,{children:["Start Time: ",b]}):null,p?Object(r.jsxs)(_.a.Item,{children:["End Time: ",p]}):null]})})]})})]})},V=function(){return console.log("authenticated"),Object(r.jsxs)(l.g,{children:[Object(r.jsx)(l.d,{exact:!0,path:"/",component:G}),Object(r.jsx)(l.d,{path:"/dashboard",component:F})]})},K=(n(113),n(114),n.p+"static/media/Scheduler.a4ab5cf0.png"),q=n(121),z=n(122),Y=n(60),Q=(n(116),function(e){var t=Object(c.useState)(0),n=Object(d.a)(t,2);n[0],n[1];return Object(r.jsxs)(q.a,{children:[e.search?null:Object(r.jsx)(Y.LinkContainer,{to:"/",children:Object(r.jsx)(q.a.Brand,{onClick:function(){return e.show(!0)},children:Object(r.jsx)("img",{id:"navLogo",src:K})})}),Object(r.jsx)(q.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(r.jsx)(q.a.Collapse,{id:"responsive-navbar-nav",className:"justify-content-end",children:Object(r.jsx)(z.a,{className:"ml-auto",children:e.search?Object(r.jsx)(z.a.Link,{onClick:function(){return e.show(!1)},children:"Previous Selections"}):Object(r.jsx)(z.a.Link,{onClick:function(){return e.show(!0)},children:"Modify Courses"})})})]})}),X=function(e){var t=Object(c.useState)(!0),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(!1),o=Object(d.a)(i,2),l=o[0],u=o[1],j=function(e){s(e)};return Object(r.jsxs)("div",{children:[Object(r.jsx)(Q,{search:a,clearSchedules:function(){localStorage.removeItem("schedules"),localStorage.removeItem("events"),u(!l)},clear:l,show:j}),Object(r.jsx)(A.a,{children:a?Object(r.jsxs)("div",{id:"home",children:[Object(r.jsx)("div",{style:{width:"50%",margin:"150px auto 20px auto",maxWidth:"50%",textAlign:"center"},children:Object(r.jsx)("img",{id:"mainLogo",src:K,alt:"schedule logo"})}),Object(r.jsx)(D,Object(p.a)({show:j},e))]}):Object(r.jsx)("div",{children:Object(r.jsx)(G,{show:j})})})]})},Z=function(){return Object(r.jsx)(l.g,{children:Object(r.jsx)(l.d,{exact:!0,path:"/",component:X})})},$=function(){var e=C().auth;return Object(r.jsx)("div",{children:e?Object(r.jsx)(W,{children:Object(r.jsx)(V,{})}):Object(r.jsx)(Z,{})})},ee=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,123)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(o.BrowserRouter,{basename:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_ROUTER_BASE||"/",children:Object(r.jsx)(w,{children:Object(r.jsx)($,{})})})}),document.getElementById("root")),ee()}},[[117,1,2]]]);
//# sourceMappingURL=main.730c551b.chunk.js.map