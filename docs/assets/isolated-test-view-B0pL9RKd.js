import{b as V,s as g,c as M}from"./index-Dwq12mQ1.js";import{u as R,r as s,x as p,c as l,b as T,e as E,f as i,w,h as D,a as N,y as z,g as B,d as O}from"./index-BvM_WQDN.js";import{_ as P}from"./index-CTpGNbK6.js";const A={class:"test-view"},F={class:"w-flex gap2"},S={class:"w-flex gap2 mt4 ovh"},q={__name:"isolated-test-view",setup(U){V();const f=R(),v=s(null);p({datePicker:!0,dark:l(()=>f.darkMode),selectedDate:l(()=>n.selectedDate),locale:l(()=>n.locale)});const n=p({view:s("week"),dark:l(()=>f.darkMode),selectedDate:s(null),viewDate:s(new Date),locale:s(""),startWeekOnSunday:s(!1),todayButton:s(!0),xs:s(!1),sm:s(!1),timeFrom:8*60,timeTo:19*60,timeStep:60,twelveHour:s(!1),hideWeekends:s(!1),hideWeekdays:s([]),viewDayOffset:s(0),clickToNavigate:s(!1),watchRealTime:s(!0),editableEvents:s(!0),events:s([]),eventsOnMonthView:!0});setTimeout(()=>{n.events=[{id:123,title:"Event 1",start:new Date(new Date().setHours(10,0,0,0)),end:new Date(new Date().setHours(11,30,0,0)),schedule:1},{id:228,title:"Event 2",start:new Date(new Date().addDays(1).setHours(11,0,0,0)),end:new Date(new Date().addDays(1).setHours(13,30,0,0)),schedule:2}]},1e3);const c=()=>{n.events.push({title:`Event ${n.events.length}`,start:new Date().subtractHours(4),end:new Date().subtractHours(3),schedule:2})},k=()=>{v.value.view.createEvent({title:"New Event!",start:new Date().subtractHours(2),end:new Date().subtractHours(1),schedule:1})},C=()=>{v.value.view.deleteEvent({id:123})},a=(...o)=>console.log(...o),y=o=>{H(o.start.format(),o.end.format())},H=async(o,e)=>{console.log("fetchEvents",o,e),await new Promise(r=>setTimeout(r,500));const d=g(o),t=g(e);n.events=b(d,t)},b=(o,e)=>{const d=M(o,e),t=[];for(let r=0;r<d;r++)for(let u=0;u<10;u++){const m=new Date(o.addDays(r).setHours(Math.floor(Math.random()*8)+9,Math.floor(Math.random()*60),0,0)),x=m.addHours(1);t.push({title:`Event ${u}`,start:m,end:x})}return console.log("events",t),t};return(o,e)=>{const d=N("w-button");return O(),T("div",A,[E("div",F,[i(d,{onClick:c},{default:w(()=>e[12]||(e[12]=[D("Add event")])),_:1}),i(d,{onClick:k},{default:w(()=>e[13]||(e[13]=[D("Add event")])),_:1}),i(d,{onClick:C},{default:w(()=>e[14]||(e[14]=[D("Delete event")])),_:1})]),E("div",S,[i(B(P),z({class:"grow",ref_key:"vueCalRef",ref:v,view:n.view,"onUpdate:view":e[0]||(e[0]=t=>n.view=t),"selected-date":n.selectedDate,"onUpdate:selectedDate":e[1]||(e[1]=t=>n.selectedDate=t),"view-date":n.viewDate,"onUpdate:viewDate":e[2]||(e[2]=t=>n.viewDate=t)},n,{onViewChange:y,onEventCreate:e[3]||(e[3]=t=>a("event-create",t)),onEventClick:e[4]||(e[4]=t=>a("event-click",t)),onEventDrag:e[5]||(e[5]=t=>a("event-drag",t)),onEventDragEnd:e[6]||(e[6]=t=>a("event-drag",t)),onEventDrop:e[7]||(e[7]=t=>a("event-drop",t)),onEventResize:e[8]||(e[8]=t=>a("event-resize",t)),onEventResizeEnd:e[9]||(e[9]=t=>a("event-resize-end",t)),onCellDrag:e[10]||(e[10]=t=>a("cell-drag",t)),onCellDragEnd:e[11]||(e[11]=t=>a("cell-drag-end",t))}),null,16,["view","selected-date","view-date"])])])}}};export{q as default};
