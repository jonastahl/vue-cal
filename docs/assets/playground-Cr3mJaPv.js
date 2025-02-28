import{b as I}from"./index-Djxm443Z.js";import{u as K,r,s as C,c as u,b as y,e as s,y as z,m as F,f as o,w as a,h as i,a as f,g as S,v as Y,F as U,t as p,d as g}from"./index-DRP-525q.js";import{_ as A}from"./index-BDYH3WJa.js";const G={class:"config-panel w-flex gap6 no-grow"},J={class:"w-flex column gap1 no-grow"},Q={class:"w-flex column grow"},X={class:"w-flex gap2 align-center justify-end no-grow"},Z={class:"w-flex gap2 align-center justify-end no-grow"},_={class:"mta w-flex justify-space-between no-grow gap2"},h={class:"w-flex wrap gap2"},ee={class:"w-flex gap2 mt2 mx2 ovh"},le={class:"no-shrink no-grow"},te={class:"w-flex align-center gap1 body wrap no-grow"},oe={class:"code"},se={class:"code"},ne={key:1,class:"grey"},ae={class:"w-flex align-center gap1 wrap size--sm no-grow"},de={class:"code"},re={class:"code"},ie={key:1,class:"grey"},ue={class:"w-flex justify-end mt2 gap2"},me={class:"w-flex align-center justify-end gap2"},ve={class:"w-flex align-center justify-center title1 mt6 mb4"},De={__name:"playground",setup(we){I();const H=K(),W=r(null),B=[{value:"ko",label:"ko"},{value:"en-gb",label:"en-gb"},{value:"en-us",label:"en-us"},{value:"ja",label:"ja"},{value:"zh-cn",label:"zh-cn"},{value:"ar",label:"ar"},{value:"fr",label:"fr"},{value:"ca",label:"ca"}],O={day:{label:"Day"},days:{label:"Days",cols:365,rows:1},week:{label:"Week"},month:{label:"Month"},year:{label:"Year"},years:{label:"Years"}},R=Object.entries(O).map(([v,e])=>({...e,value:v})),k=r(null),c=[{value:null,label:"Normal"},{value:"sm",label:"small"},{value:"xs",label:"Extra small"}],q=[{label:"mon"},{label:"tue"},{label:"wed"},{label:"thu"},{label:"fri"},{label:"sat"},{label:"sun"}],E=r([]),L=[{value:"leisure",label:"Leisure"},{value:"health",label:"Health"},{value:"sport",label:"Sport"}],M=C({datePicker:!0,dark:u(()=>H.darkMode),selectedDate:u(()=>t.selectedDate),locale:u(()=>t.locale),startWeekOnSunday:u(()=>t.startWeekOnSunday),todayButton:u(()=>t.todayButton),hideWeekends:u(()=>t.hideWeekends),hideWeekdays:u(()=>t.hideWeekdays),viewDayOffset:u(()=>t.viewDayOffset)}),t=C({views:O,view:r("week"),dark:u(()=>H.darkMode),selectedDate:r(null),viewDate:r(new Date),locale:r(""),startWeekOnSunday:r(!1),todayButton:r(!0),xs:u(()=>k.value==="xs"),sm:u(()=>k.value==="sm"),timeStep:60,twelveHour:r(!1),hideWeekends:r(!1),hideWeekdays:E,viewDayOffset:r(0),clickToNavigate:r(!1),watchRealTime:r(!0),events:r([{title:"Event 1",start:new Date(new Date().setHours(8,0,0,0)),end:new Date(new Date().setHours(8,30,0,0))},{title:"Event 2",start:new Date(new Date().setHours(9,0,0,0)),end:new Date(new Date().setHours(9,30,0,0))}]),showSchedules:r(!1),schedules:u(()=>t.showSchedules?[{label:"Dr 1",class:"dr-1",style:"background-color: rgba(255, 0, 0, 0.1)"},{label:"Dr 2",class:"dr-2"}]:void 0),eventsOnMonthView:!0,showSpecialHours:r(!1),specialHours:u(()=>t.showSpecialHours?{mon:{from:0*60,to:23*60,class:"doctor-1",label:"<strong>Doctor 1</strong><em>Full day shift</em>"},tue:{from:4*60,to:5*60,class:"doctor-2",label:"<strong>Doctor 2</strong><em>Full day shift</em>"},wed:[{from:8*60,to:12*60,class:"doctor-1",label:"<strong>Doctor 1</strong><em>Morning shift</em>"},{from:14*60,to:19*60,class:"doctor-3",label:"<strong>Doctor 3</strong><em>Afternoon shift</em>"}],thu:{from:8*60,to:17*60,class:"doctor-1",label:"<strong>Doctor 1</strong><em>Full day shift</em>"},fri:{from:9*60,to:18*60,class:"doctor-3",label:"<strong>Doctor 3</strong><em>Full day shift</em>"},sat:{from:9*60,to:18*60,class:"doctor-2",label:"<strong>Doctor 2</strong><em>Full day shift</em>"},sun:{from:7*60,to:20*60,class:"closed",label:"<strong>Closed</strong>"}}:void 0),editableEvents:r(!1)});let b=2;const P=()=>{t.events.push({title:"Event "+ ++b,start:new Date().subtractHours(2),end:new Date().subtractHours(1),schedule:(b-1)%2+1})},$=()=>{W.value.view.createEvent({title:"Event "+ ++b,start:new Date,end:new Date().addHours(1),schedule:(b-1)%2+1})},n=(...v)=>console.log(...v),m=C({onEventDelayedClick:v=>{n("event-delayed-click",v),m.event=v.event,m.showDialog=!0},showDialog:r(!1),event:r(null)}),d=C({show:r(!1),resolve:null,event:{title:"",background:!1,class:""},open:({event:v,resolve:e})=>{d.show=!0,d.event=v,d.resolve=e,n("event-create",{event:v,resolve:e})},cancel:()=>{d.resolve(!1),d.show=!1},save:()=>{d.resolve(d.event),d.show=!1}});return(v,e)=>{const w=f("w-switch"),N=f("w-radios"),D=f("w-icon"),x=f("w-select"),T=f("w-input"),V=f("w-button"),j=f("w-dialog");return g(),y(U,null,[s("div",G,[s("div",J,[o(w,{class:"no-grow",modelValue:t.twelveHour,"onUpdate:modelValue":e[0]||(e[0]=l=>t.twelveHour=l)},{default:a(()=>e[45]||(e[45]=[i("12h Format")])),_:1},8,["modelValue"]),o(w,{class:"lh0 no-grow",modelValue:t.startWeekOnSunday,"onUpdate:modelValue":e[1]||(e[1]=l=>t.startWeekOnSunday=l)},{default:a(()=>e[46]||(e[46]=[i("Start Week On Sunday")])),_:1},8,["modelValue"]),o(w,{class:"no-grow",modelValue:t.hideWeekends,"onUpdate:modelValue":e[2]||(e[2]=l=>t.hideWeekends=l)},{default:a(()=>e[47]||(e[47]=[i("Hide Weekends")])),_:1},8,["modelValue"]),o(w,{class:"no-grow",modelValue:t.clickToNavigate,"onUpdate:modelValue":e[3]||(e[3]=l=>t.clickToNavigate=l)},{default:a(()=>e[48]||(e[48]=[i("Click to Navigate")])),_:1},8,["modelValue"]),o(w,{class:"no-grow",modelValue:t.showSchedules,"onUpdate:modelValue":e[4]||(e[4]=l=>t.showSchedules=l)},{default:a(()=>e[49]||(e[49]=[i("Day Schedules")])),_:1},8,["modelValue"]),o(w,{class:"no-grow",modelValue:t.showSpecialHours,"onUpdate:modelValue":e[5]||(e[5]=l=>t.showSpecialHours=l)},{default:a(()=>e[50]||(e[50]=[i("Business Hours")])),_:1},8,["modelValue"]),o(w,{class:"no-grow",modelValue:t.editableEvents,"onUpdate:modelValue":e[6]||(e[6]=l=>t.editableEvents=l)},{default:a(()=>e[51]||(e[51]=[i("Editable Events")])),_:1},8,["modelValue"])]),s("div",Q,[s("div",X,[o(N,{modelValue:k.value,"onUpdate:modelValue":e[7]||(e[7]=l=>k.value=l),items:c,"return-values":"",inline:""},null,8,["modelValue"]),o(D,{class:"grey"},{default:a(()=>e[52]||(e[52]=[i("mdi mdi-translate")])),_:1}),e[53]||(e[53]=s("div",{class:"grey"},"Locale",-1)),o(x,{class:"no-grow",modelValue:t.locale,"onUpdate:modelValue":e[8]||(e[8]=l=>t.locale=l),items:B,style:{width:"60px"}},null,8,["modelValue"])]),s("div",Z,[e[54]||(e[54]=s("div",{class:"grey"},"View Day Offset",-1)),o(T,{modelValue:t.viewDayOffset,"onUpdate:modelValue":e[9]||(e[9]=l=>t.viewDayOffset=l),type:"number","label-position":"left",style:{"max-width":"30px"}},null,8,["modelValue"]),e[55]||(e[55]=s("div",{class:"grey"},"Week Days",-1)),o(x,{class:"mb4",modelValue:E.value,"onUpdate:modelValue":e[10]||(e[10]=l=>E.value=l),items:q,multiple:"","fit-to-content":""},null,8,["modelValue"])]),s("div",_,[s("div",h,[o(V,{onClick:P,tooltip:"Add event to the<br>events array prop"},{default:a(()=>e[56]||(e[56]=[i("Add Event Externally")])),_:1}),o(V,{onClick:$,tooltip:"Add event via<br><code>$refs.vuecal.view.createEvent()</code>"},{default:a(()=>e[57]||(e[57]=[i("Add Event Internally")])),_:1})]),o(N,{class:"justify-end",modelValue:t.view,"onUpdate:modelValue":e[11]||(e[11]=l=>t.view=l),items:S(R),inline:""},null,8,["modelValue","items"])])])]),s("div",ee,[s("aside",le,[o(S(A),Y({class:"no-shrink no-grow","selected-date":t.selectedDate,"onUpdate:selectedDate":[e[12]||(e[12]=l=>t.selectedDate=l),e[13]||(e[13]=l=>t.viewDate=l)]},M),null,16,["selected-date"]),s("div",te,[e[59]||(e[59]=s("span",null,"View Date:",-1)),t.viewDate?(g(),y(U,{key:0},[s("span",oe,p(t.viewDate.format("DD/MM/YYYY")),1),o(D,{class:"grey mx-1",xs:""},{default:a(()=>e[58]||(e[58]=[i("mdi mdi-clock-outline")])),_:1}),s("span",se,p(t.viewDate.formatTime()),1)],64)):(g(),y("div",ne,"N/A"))]),s("div",ae,[e[61]||(e[61]=s("span",null,"Selected Date:",-1)),t.selectedDate?(g(),y(U,{key:0},[s("span",de,p(t.selectedDate.format("DD/MM/YYYY")),1),o(D,{class:"grey mx-1",xs:""},{default:a(()=>e[60]||(e[60]=[i("mdi mdi-clock-outline")])),_:1}),s("span",re,p(t.selectedDate.formatTime()),1)],64)):(g(),y("div",ie,"N/A"))])]),o(S(A),Y({class:"vue-cal--main grow",ref_key:"vueCalRef",ref:W,view:t.view,"onUpdate:view":e[14]||(e[14]=l=>t.view=l),"selected-date":t.selectedDate,"onUpdate:selectedDate":e[15]||(e[15]=l=>t.selectedDate=l),"view-date":t.viewDate,"onUpdate:viewDate":[e[16]||(e[16]=l=>t.viewDate=l),e[17]||(e[17]=l=>M.viewDate=l)]},t,{onEventCreate:d.open,onEventMousedown:e[18]||(e[18]=l=>n("event-mousedown",l)),onEventMouseup:e[19]||(e[19]=l=>n("event-mouseup",l)),onEventClick:e[20]||(e[20]=l=>n("event-click",l)),onEventDelayedClick:m.onEventDelayedClick,onEventHold:e[21]||(e[21]=l=>n("event-hold",l)),onEventDragStart:e[22]||(e[22]=l=>n("event-drag-start",l)),onEventDrag:e[23]||(e[23]=l=>n("event-drag",l)),onEventDragEnd:e[24]||(e[24]=l=>n("event-drag-end",l)),onEventDrop:e[25]||(e[25]=l=>n("event-drop",l)),onEventDropped:e[26]||(e[26]=l=>n("event-dropped",l)),onEventResize:e[27]||(e[27]=l=>n("event-resize",l)),onEventResizeEnd:e[28]||(e[28]=l=>n("event-resize-end",l)),onEventContextmenu:e[29]||(e[29]=l=>n("event-contextmenu",l)),onCellClick:e[30]||(e[30]=l=>n("cell-click",l)),onCellDblclick:e[31]||(e[31]=l=>n("cell-dblclick",l)),onCellDragStart:e[32]||(e[32]=l=>n("cell-drag-start",l)),onCellDrag:e[33]||(e[33]=l=>n("cell-drag",l)),onCellDragEnd:e[34]||(e[34]=l=>n("cell-drag-end",l)),onCellHold:e[35]||(e[35]=l=>n("cell-hold",l)),onCellMousedown:e[36]||(e[36]=l=>n("cell-mousedown",l)),onCellMouseup:e[37]||(e[37]=l=>n("cell-mouseup",l)),onCellTouchstart:e[38]||(e[38]=l=>n("cell-touchstart",l)),onCellContextmenu:e[39]||(e[39]=l=>n("cell-contextmenu",l))}),null,16,["view","selected-date","view-date","onEventCreate","onEventDelayedClick"])]),d.event?(g(),z(j,{key:0,modelValue:d.show,"onUpdate:modelValue":e[43]||(e[43]=l=>d.show=l),width:"300",onClose:d.cancel},{default:a(()=>[o(T,{modelValue:d.event.title,"onUpdate:modelValue":e[40]||(e[40]=l=>d.event.title=l)},{default:a(()=>e[62]||(e[62]=[i("Event Title")])),_:1},8,["modelValue"]),o(x,{modelValue:d.event.class,"onUpdate:modelValue":e[41]||(e[41]=l=>d.event.class=l),items:L},{default:a(()=>e[63]||(e[63]=[i("Event Class")])),_:1},8,["modelValue"]),o(w,{class:"my2",modelValue:d.event.background,"onUpdate:modelValue":e[42]||(e[42]=l=>d.event.background=l)},{default:a(()=>e[64]||(e[64]=[i("Background")])),_:1},8,["modelValue"]),s("div",ue,[o(V,{onClick:d.cancel},{default:a(()=>e[65]||(e[65]=[i("Cancel")])),_:1},8,["onClick"]),o(V,{onClick:d.save},{default:a(()=>e[66]||(e[66]=[i("OK")])),_:1},8,["onClick"])])]),_:1},8,["modelValue","onClose"])):F("",!0),m.event?(g(),z(j,{key:1,modelValue:m.showDialog,"onUpdate:modelValue":e[44]||(e[44]=l=>m.showDialog=l),title:m.event.title,width:"380"},{default:a(()=>[s("div",me,[o(D,{class:"grey"},{default:a(()=>e[67]||(e[67]=[i("mdi mdi-calendar")])),_:1}),s("small",null,p(m.event.start.format()),1),o(D,{class:"grey ml2"},{default:a(()=>e[68]||(e[68]=[i("mdi mdi-clock-outline")])),_:1}),s("small",null,p(m.event.start.formatTime())+" - "+p(m.event.end.formatTime()),1)]),s("div",ve,[o(D,{class:"grey ml2",size:"3rem"},{default:a(()=>e[69]||(e[69]=[i("mdi mdi-party-popper")])),_:1})]),e[70]||(e[70]=s("p",{class:"lh1"},`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti,
labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.`,-1))]),_:1},8,["modelValue","title"])):F("",!0)],64)}}};export{De as default};
