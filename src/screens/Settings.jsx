import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T={
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",green:"#4CAF50",red:"#F44336",orange:"#FF9800"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",green:"#66BB6A",red:"#EF5350",orange:"#FFB74D"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",green:"#81C784",red:"#EF5350",orange:"#FFA726"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",green:"#69F0AE",red:"#FF5252",orange:"#FFAB40"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",green:"#A5D6A7",red:"#EF5350",orange:"#FFB74D"},
};

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

/* ============ SETTINGS DATA — flat list with section headers ============ */
const settingsItems=[
  {type:"header",label:"CAMERA",icon:"\u{1F4F7}"},
  {id:"small_room",label:"Small Room Mode",type:"switch",defaultVal:false,tag:"NEW"},

  {type:"header",label:"GAMEPLAY",icon:"\u{1F3AE}"},
  {id:"difficulty",label:"Difficulty",type:"toggle",options:["ROOKIE","CLUB","INTL","LEGEND"],defaultVal:1},
  {id:"landing_marker",label:"Landing Marker",type:"switch",defaultVal:true},
  {id:"camera_view",label:"Camera View",type:"toggle",options:["BROADCAST","CLOSE-UP"],defaultVal:0},

  {type:"header",label:"AUDIO",icon:"\u{1F50A}"},
  {id:"master_vol",label:"Master",type:"slider",min:0,max:100,defaultVal:80},
  {id:"sfx_vol",label:"SFX",type:"slider",min:0,max:100,defaultVal:70},
  {id:"music_vol",label:"Music",type:"slider",min:0,max:100,defaultVal:60},
  {id:"commentary_vol",label:"Commentary",type:"slider",min:0,max:100,defaultVal:50},
  {id:"crowd_vol",label:"Crowd",type:"slider",min:0,max:100,defaultVal:40},

  {type:"header",label:"NOTIFICATIONS",icon:"\u{1F514}"},
  {id:"notif_challenges",label:"Challenges",type:"switch",defaultVal:true},
  {id:"notif_leaderboard",label:"Leaderboard",type:"switch",defaultVal:true},
  {id:"notif_friends",label:"Friends",type:"switch",defaultVal:false},
  {id:"notif_tournament",label:"Tournament",type:"switch",defaultVal:true},

  {type:"header",label:"ACCOUNT",icon:"\u{1F464}"},
  {id:"player_id",label:"Player ID",type:"info",value:"TSC-4829-XKRM"},
  {id:"link_account",label:"Link Account",type:"button",buttonLabel:"LINK"},
  {id:"privacy",label:"Privacy Policy",type:"button",buttonLabel:"VIEW"},
  {id:"terms",label:"Terms of Service",type:"button",buttonLabel:"VIEW"},
  {id:"delete_account",label:"Delete Account",type:"button",buttonLabel:"DELETE",danger:true},
];

export default function Settings(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});

  /* Settings state: map of id -> value */
  const[vals,setVals]=useState(()=>{
    const m={};
    settingsItems.forEach(it=>{
      if(it.type==="header")return;
      if(it.type==="info")m[it.id]=it.value;
      else if(it.type==="button")m[it.id]=null;
      else m[it.id]=it.defaultVal;
    });
    return m;
  });

  const setVal=(id,v)=>setVals(prev=>({...prev,[id]:v}));

  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  const t=T[theme];
  const dv=devices[dev];
  const isPh=dev==="iphone";
  const isP=ori==="portrait";
  const isPhL=isPh&&!isP;
  const iW=isP?dv.pw:dv.lw,iH=isP?dv.ph:dv.lh;
  let dW=Math.min(ws.w-20,1100),dH=dW/(iW/iH);
  if(dH>ws.h-130){dH=ws.h-130;dW=dH*(iW/iH)}
  const s=dW/iW;
  const z=(a,b,c,d)=>(isPhL?a:isPh?b:isP?d:c)*s;

  const cardBg={background:t.card,backdropFilter:"blur(20px)"};

  /* ============ BACK BUTTON ============ */
  const BackBtn=()=>(
    <button onClick={()=>navigate("/main-menu")} style={{
      position:"absolute",top:z(6,14,12,16),left:z(6,14,12,16),zIndex:20,
      padding:`${z(4,10,8,12)}px ${z(8,18,14,20)}px`,
      borderRadius:z(6,12,10,14),...cardBg,
      border:`${1.5*s}px solid ${t.cb}`,
      color:t.ts,fontSize:z(8,16,14,18),fontWeight:800,cursor:"pointer",letterSpacing:0.5*s,
    }}>{"\u2190"} BACK</button>
  );

  /* ============ HEADER ============ */
  const Header=()=>(
    <div style={{display:"flex",alignItems:"center",gap:z(4,10,8,12),marginBottom:z(3,8,6,10)}}>
      <span style={{fontSize:z(16,32,28,36)}}>{"\u2699\uFE0F"}</span>
      <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.tx,letterSpacing:z(2,4,3,4)}}>SETTINGS</div>
    </div>
  );

  /* ============ TOGGLE CONTROL ============ */
  const ToggleControl=({item})=>{
    const val=vals[item.id];
    return(
      <div style={{display:"flex",gap:z(2,3,3,4)}}>
        {item.options.map((opt,i)=>(
          <button key={i} onClick={()=>setVal(item.id,i)} style={{
            padding:`${z(3,6,5,7)}px ${z(5,12,10,14)}px`,
            borderRadius:z(4,8,6,10),border:`${1*s}px solid ${val===i?t.a+"88":t.td+"44"}`,
            background:val===i?`${t.a}33`:"transparent",
            color:val===i?t.a:t.tm,fontSize:z(5,10,9,12),fontWeight:800,
            cursor:"pointer",letterSpacing:0.3*s,
          }}>{opt}</button>
        ))}
      </div>
    );
  };

  /* ============ SWITCH CONTROL ============ */
  const SwitchControl=({item})=>{
    const on=vals[item.id];
    const trackW=z(24,48,40,52);
    const trackH=z(12,24,20,26);
    const knobSz=trackH-4*s;
    return(
      <div onClick={()=>setVal(item.id,!on)} style={{
        width:trackW,height:trackH,borderRadius:trackH/2,
        background:on?t.a:`${t.td}66`,cursor:"pointer",
        position:"relative",transition:"background 0.2s",flexShrink:0,
      }}>
        <div style={{
          position:"absolute",top:2*s,
          left:on?trackW-knobSz-2*s:2*s,
          width:knobSz,height:knobSz,borderRadius:"50%",
          background:"#FFF",transition:"left 0.2s",
          boxShadow:`0 ${1*s}px ${3*s}px rgba(0,0,0,0.3)`,
        }}/>
      </div>
    );
  };

  /* ============ SLIDER CONTROL ============ */
  const SliderControl=({item})=>{
    const val=vals[item.id];
    const pct=((val-item.min)/(item.max-item.min))*100;
    const trackH=z(5,10,8,12);
    return(
      <div style={{display:"flex",alignItems:"center",gap:z(4,8,6,10),flex:1,maxWidth:z(120,250,200,280)}}>
        <div
          style={{flex:1,height:trackH,borderRadius:trackH/2,background:`${t.td}44`,position:"relative",cursor:"pointer"}}
          onClick={(e)=>{
            const rect=e.currentTarget.getBoundingClientRect();
            const p=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
            setVal(item.id,Math.round(item.min+p*(item.max-item.min)));
          }}
        >
          <div style={{
            height:"100%",width:`${pct}%`,borderRadius:trackH/2,
            background:t.pb,position:"relative",
          }}>
            <div style={{
              position:"absolute",right:-z(5,10,8,12),top:"50%",transform:"translateY(-50%)",
              width:z(10,20,16,24),height:z(10,20,16,24),borderRadius:"50%",
              background:t.a,border:`${2*s}px solid #FFF`,
              boxShadow:`0 ${1*s}px ${4*s}px rgba(0,0,0,0.3)`,
            }}/>
          </div>
        </div>
        <span style={{fontSize:z(6,12,10,14),fontWeight:800,color:t.a,minWidth:z(16,32,28,36),textAlign:"right"}}>{val}</span>
      </div>
    );
  };

  /* ============ SECTION HEADER ============ */
  const SectionHeader=({item,first})=>(
    <div style={{
      display:"flex",alignItems:"center",gap:z(3,6,5,8),
      marginTop:first?0:z(4,10,8,12),marginBottom:z(2,4,3,5),
      paddingBottom:z(2,4,3,5),
      borderBottom:`${1*s}px solid ${t.td}33`,
    }}>
      <span style={{fontSize:z(9,18,16,20)}}>{item.icon}</span>
      <span style={{fontSize:z(6,12,10,14),fontWeight:900,color:t.a,letterSpacing:z(1,2,2,3)}}>{item.label}</span>
    </div>
  );

  /* ============ SETTING ROW ============ */
  const SettingRow=({item})=>(
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:`${z(5,12,10,14)}px ${z(6,14,12,16)}px`,
      borderRadius:z(6,12,10,14),
      background:`${t.td}08`,
      marginBottom:z(2,4,3,5),
      gap:z(4,10,8,12),
    }}>
      <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8),flexShrink:0}}>
        <span style={{fontSize:z(7,14,12,16),fontWeight:800,color:item.danger?t.red:t.tx}}>{item.label}</span>
        {item.tag&&(
          <span style={{
            fontSize:z(4,7,6,8),fontWeight:900,color:t.pt,background:t.a,
            padding:`${1*s}px ${z(3,5,4,6)}px`,borderRadius:z(2,4,3,5),
          }}>{item.tag}</span>
        )}
      </div>

      {item.type==="toggle"&&<ToggleControl item={item}/>}
      {item.type==="switch"&&<SwitchControl item={item}/>}
      {item.type==="slider"&&<SliderControl item={item}/>}
      {item.type==="info"&&(
        <span style={{fontSize:z(6,12,10,14),fontWeight:700,color:t.a,fontFamily:"monospace",letterSpacing:0.5*s}}>{item.value}</span>
      )}
      {item.type==="button"&&(
        <button style={{
          padding:`${z(3,7,5,8)}px ${z(6,14,12,16)}px`,
          borderRadius:z(4,8,6,10),
          background:item.danger?`${t.red}22`:t.pb,
          border:item.danger?`${1*s}px solid ${t.red}44`:"none",
          color:item.danger?t.red:t.pt,
          fontSize:z(5,10,9,12),fontWeight:900,cursor:"pointer",letterSpacing:0.5*s,
        }}>{item.buttonLabel}</button>
      )}
    </div>
  );

  /* ============ ALL SETTINGS LIST ============ */
  const SettingsList=()=>(
    <div style={{flex:1,overflow:"auto",minHeight:0}}>
      {settingsItems.map((item,i)=>
        item.type==="header"
          ?<SectionHeader key={i} item={item} first={i===0}/>
          :<SettingRow key={item.id} item={item}/>
      )}
    </div>
  );

  /* ============ LAYOUT BUILDER ============ */
  const buildLayout=(padTop,width,maxW)=>(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:width?"center":"stretch",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:width||"auto",maxWidth:maxW,display:"flex",flexDirection:"column",flex:1,minHeight:0,overflow:"hidden",paddingTop:padTop,...(!width&&{padding:`${padTop}px ${z(0,14,0,14)}px ${z(0,10,0,10)}px`})}}>
        <Header/>
        <SettingsList/>
      </div>
    </div>
  );

  const layout=isPhL
    ?buildLayout(z(4,0,0,0),"92%",undefined)
    :isPh
    ?buildLayout(z(0,36,0,0),null,undefined)
    :isP
    ?buildLayout(z(0,0,0,36),"80%",600*s)
    :buildLayout(z(0,0,14,0),"85%",700*s);

  /* ============ BACKGROUND ============ */
  const Bg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 20%, ${t.a}08 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, ${t.td}06 0%, transparent 40%), ${t.bg}`}}/>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#111118",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 6px",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"auto"}}>
      {/* Controls */}
      <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>navigate("/")} style={{padding:"4px 12px",borderRadius:5,border:"1px solid #444",cursor:"pointer",background:"#222",color:"#aaa",fontSize:9,fontWeight:700,marginRight:8}}>&larr; SCREENS</button>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {Object.entries(devices).map(([k,d])=><button key={k} onClick={()=>setDev(k)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:dev===k?"#444":"transparent",color:dev===k?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{d.name}</button>)}
        </div>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {["portrait","landscape"].map(o=><button key={o} onClick={()=>setOri(o)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:ori===o?"#444":"transparent",color:ori===o?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{o==="portrait"?"\u2b1c Portrait":"\u25ac Landscape"}</button>)}
        </div>
        {Object.entries(T).map(([k,th])=><button key={k} onClick={()=>setTheme(k)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:theme===k?th.a:"#222",color:theme===k?(k==="stadiumNight"||k==="premiumGold"?"#111":"#fff"):"#666",fontSize:9,fontWeight:800,textTransform:"uppercase"}}>{th.name}</button>)}
      </div>
      <div style={{fontSize:9,color:"#555",marginBottom:5}}>{dv.name} &mdash; {iW}&times;{iH} &mdash; {(s*100).toFixed(0)}%</div>

      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:t.bg,boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        <Bg/>
        <div style={{position:"relative",width:"100%",height:"100%",zIndex:1}}>
          {layout}
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
