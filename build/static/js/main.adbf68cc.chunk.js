(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),a=t(17),u=t.n(a),i=(t(22),t(8)),o=t(3),s=t(0),b=function(e){var n=e.onSubmit,t=e.name,c=e.nameChange,r=e.number,a=e.numberChange;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:t,onChange:c})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:r,onChange:a})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var n=e.person,t=e.deleteFunc;return Object(s.jsxs)("li",{children:[n.name," ",n.number,Object(s.jsx)("button",{onClick:t,children:"delete"})]})},l=function(e){var n=e.filter,t=e.filterChange;return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.message,t=e.className;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},f=t(4),h=t.n(f),m="/api/persons",O={getAll:function(){return h.a.get(m).then((function(e){return e.data}))},create:function(e){return h.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},v=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),u=Object(o.a)(a,2),f=u[0],h=u[1],m=Object(c.useState)(""),v=Object(o.a)(m,2),p=v[0],x=v[1],g=Object(c.useState)(""),w=Object(o.a)(g,2),C=w[0],S=w[1],k=Object(c.useState)(null),N=Object(o.a)(k,2),y=N[0],A=N[1],D=Object(c.useState)(null),E=Object(o.a)(D,2),F=E[0],I=E[1];Object(c.useEffect)((function(){O.getAll().then((function(e){r(e)}))}),[]);var J=function(){h(""),x("")},T=function(){return t.find((function(e){return e.name===f}))};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(d,{message:y,className:"success"}),Object(s.jsx)(d,{message:F,className:"error"}),Object(s.jsx)(l,{filter:C,filterChange:function(e){S(e.target.value)}}),Object(s.jsx)("h2",{children:"Add a new person"}),Object(s.jsx)(b,{onSubmit:function(e){e.preventDefault();var n={name:f,number:p},c=T();c&&window.confirm("".concat(c.name," is already added to phonebook, replace the old number with a new one?"))?O.update(c.id,n).then((function(e){var n=t.map((function(n){return n.id===c.id?Object(i.a)(Object(i.a)({},n),{},{number:e.number}):n}));r(n)})):O.create(n).then((function(e){r(t.concat(e)),A("Added ".concat(e.name)),setTimeout((function(){A(null)}),5e3)})),J()},name:f,nameChange:function(e){h(e.target.value)},number:p,numberChange:function(e){x(e.target.value)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)("ul",{children:t.filter((function(e){return e.name.toLowerCase().includes(C)})).map((function(e){return Object(s.jsx)(j,{person:e,deleteFunc:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&O.remove(e).then((function(n){r(t.filter((function(n){return n.id!==e})))})).catch((function(e){I("Information for ".concat(n.name," has already been removed from the server.")),setTimeout((function(){I(null)}),5e3)}))}(e.id)}},e.id)}))})]})};u.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.adbf68cc.chunk.js.map