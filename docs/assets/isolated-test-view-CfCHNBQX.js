import{c as r,a as n,b as c,t as d,r as m,o as i,_ as u,V as D}from"./index-DpVbjpXy.js";const f={class:"test-view"};function g(e,o,b,w,v,s){const l=m("vue-cal");return i(),r("div",f,[n(l,{class:"ml2 mr1 vuecal--blue-theme",events:e.events,"editable-events":"","cell-contextmenu":"","today-button":"","time-from":7*60,"time-to":20*60,"special-hours":e.specialHours,selectedDate:e.selectedDate,"onUpdate:selectedDate":o[0]||(o[0]=a=>e.selectedDate=a),onCellContextmenu:s.log},null,8,["events","special-hours","selectedDate","onCellContextmenu"]),c("p",null,"selectedDate: "+d(e.selectedDate),1)])}const t=new Date,p={components:{VueCal:D},data:()=>({selectedDate:t,view:"week",specialHours:{1:{from:8*60,to:17*60,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},2:{from:9*60,to:18*60,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},3:[{from:8*60,to:12*60,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Morning shift</em>"},{from:14*60,to:19*60,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Afternoon shift</em>"}],4:{from:8*60,to:17*60,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},5:{from:9*60,to:18*60,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Full day shift</em>"},6:{from:9*60,to:18*60,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},7:{from:7*60,to:20*60,class:"closed",label:"<strong>Closed</strong>"}},events:[{start:new Date(new Date(t).setHours(1,0,0)),end:new Date(new Date(t).setHours(4,0,0)),allDay:!0,title:"Event 1",split:2},{start:new Date(new Date(t).setHours(1,0,0)),end:new Date(new Date(t).setHours(4,0,0)),title:"Event 2",split:1},{start:new Date(new Date(t).setHours(3,0,0)),end:new Date(new Date(t).setHours(5,0,0)),title:"Event 3",split:2}],daySplits:[{label:"Tom",color:"green"},{label:"Kate",color:"pink"}]}),methods:{log(...e){console.log(...e)}}},y=u(p,[["render",g]]);export{y as default};
