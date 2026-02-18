import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T={
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",green:"#4CAF50",red:"#F44336",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",green:"#66BB6A",red:"#EF5350",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",green:"#81C784",red:"#EF5350",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",green:"#69F0AE",red:"#FF5252",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",green:"#A5D6A7",red:"#EF5350",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C"},
};
const devices={ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430}};

/* ============ CALIBRATION STATES ============ */
const calibStates=[
  {text:"STEP INTO VIEW!",sub:"Stand 6-8 feet from the device",dist:null,parts:[0,0,0,0,0,0],ghost:true},
  {text:"DETECTING...",sub:"Hold still",dist:null,parts:[1,1,0,0,0,0],ghost:true},
  {text:"DETECTING...",sub:"Almost there...",dist:null,parts:[1,1,1,0,1,0],ghost:false},
  {text:"BODY DETECTED!",sub:"Checking distance...",dist:"perfect",parts:[1,1,1,1,1,1],ghost:false},
  {text:"3",sub:"Get ready!",dist:"perfect",parts:[1,1,1,1,1,1],big:true},
  {text:"2",sub:"",dist:"perfect",parts:[1,1,1,1,1,1],big:true},
  {text:"1",sub:"GO!",dist:"perfect",parts:[1,1,1,1,1,1],big:true},
  {text:"TOO CLOSE!",sub:"Take a step back",dist:"close",parts:[1,1,1,1,1,1]},
  {text:"TOO FAR!",sub:"Step closer to the device",dist:"far",parts:[1,1,1,1,1,1]},
];

export default function CameraCalibration(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[step,setStep]=useState(0);

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

  const cs=calibStates[step];
  const cardBg={background:t.card,backdropFilter:"blur(20px)"};
  const advance=()=>setStep(p=>(p+1)%calibStates.length);

  /* ============ VIEWFINDER CORNERS ============ */
  const Corners=()=>{
    const m=z(8,20,16,24),sz=z(14,30,24,34),bw=`${2*s}px solid ${t.a}55`;
    return<>
      <div style={{position:"absolute",top:m,left:m,width:sz,height:sz,borderTop:bw,borderLeft:bw}}/>
      <div style={{position:"absolute",top:m,right:m,width:sz,height:sz,borderTop:bw,borderRight:bw}}/>
      <div style={{position:"absolute",bottom:m,left:m,width:sz,height:sz,borderBottom:bw,borderLeft:bw}}/>
      <div style={{position:"absolute",bottom:m,right:m,width:sz,height:sz,borderBottom:bw,borderRight:bw}}/>
    </>;
  };

  /* ============ RECORDING DOT ============ */
  const RecDot=()=>(
    <div style={{position:"absolute",top:z(12,28,22,32),left:z(12,28,22,32),display:"flex",alignItems:"center",gap:z(3,6,5,8),zIndex:10}}>
      <div style={{width:z(5,10,8,12),height:z(5,10,8,12),borderRadius:"50%",background:"#F44336",animation:"pulse 1.5s infinite"}}/>
      <span style={{fontSize:z(5,10,8,12),fontWeight:800,color:"#F44336",letterSpacing:0.5*s}}>REC</span>
    </div>
  );

  /* ============ GHOST SILHOUETTE ============ */
  const Ghost=()=>{
    const u=z(1.5,3.5,3,4);
    const bdr=`${1.5*s}px dashed ${t.a}40`;
    const bg=`${t.a}06`;
    return(
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:u,opacity:cs.ghost?0.6:0}}>
        <div style={{width:10*u,height:10*u,borderRadius:"50%",border:bdr,background:bg}}/>
        <div style={{display:"flex",gap:u}}>
          <div style={{width:4*u,height:16*u,borderRadius:2*u,border:bdr,background:bg}}/>
          <div style={{width:12*u,height:16*u,borderRadius:2*u,border:bdr,background:bg}}/>
          <div style={{width:4*u,height:16*u,borderRadius:2*u,border:bdr,background:bg}}/>
        </div>
        <div style={{display:"flex",gap:2*u}}>
          <div style={{width:6*u,height:20*u,borderRadius:2*u,border:bdr,background:bg}}/>
          <div style={{width:6*u,height:20*u,borderRadius:2*u,border:bdr,background:bg}}/>
        </div>
      </div>
    );
  };

  /* ============ BODY TRACKING PANEL ============ */
  const BodyPanel=()=>{
    const u=z(1.2,2.5,2,3);
    const on="#4FC3F7",off="#EF5350";
    const c=i=>cs.parts[i]?on:off;
    const labels=["HEAD","TORSO","L.ARM","R.ARM","L.LEG","R.LEG"];
    const detected=cs.parts.filter(p=>p).length;
    return(
      <div style={{
        position:"absolute",top:z(12,28,22,32),right:z(12,28,22,32),
        ...cardBg,borderRadius:z(6,12,10,14),border:`${1*s}px solid ${t.td}44`,
        padding:`${z(4,10,8,12)}px`,width:z(55,120,100,140),zIndex:10,
      }}>
        <div style={{fontSize:z(4,8,7,9),fontWeight:800,color:t.a,letterSpacing:0.5*s,marginBottom:z(3,6,5,8),textAlign:"center"}}>TRACKING</div>
        {/* Body figure */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0.5*u,marginBottom:z(3,6,5,8)}}>
          <div style={{width:7*u,height:7*u,borderRadius:"50%",background:c(0),transition:"background 0.3s"}}/>
          <div style={{display:"flex",gap:0.5*u}}>
            <div style={{width:3*u,height:10*u,borderRadius:1.5*u,background:c(2),transition:"background 0.3s"}}/>
            <div style={{width:8*u,height:10*u,borderRadius:1.5*u,background:c(1),transition:"background 0.3s"}}/>
            <div style={{width:3*u,height:10*u,borderRadius:1.5*u,background:c(3),transition:"background 0.3s"}}/>
          </div>
          <div style={{display:"flex",gap:1.5*u}}>
            <div style={{width:5*u,height:12*u,borderRadius:1.5*u,background:c(4),transition:"background 0.3s"}}/>
            <div style={{width:5*u,height:12*u,borderRadius:1.5*u,background:c(5),transition:"background 0.3s"}}/>
          </div>
        </div>
        {/* Part list */}
        {labels.map((l,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:1*s}}>
            <span style={{fontSize:z(3.5,7,6,8),fontWeight:700,color:t.tm}}>{l}</span>
            <div style={{width:z(4,8,7,9),height:z(4,8,7,9),borderRadius:"50%",background:c(i),transition:"background 0.3s"}}/>
          </div>
        ))}
        <div style={{marginTop:z(2,5,4,6),textAlign:"center",fontSize:z(4,8,7,9),fontWeight:800,color:detected===6?on:t.tm}}>{detected}/6</div>
      </div>
    );
  };

  /* ============ STATUS TEXT ============ */
  const StatusText=()=>(
    <div style={{position:"absolute",top:cs.big?"35%":"40%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",zIndex:5}}>
      <div style={{
        fontSize:cs.big?z(60,120,100,140):z(16,34,28,40),fontWeight:900,
        color:cs.dist==="close"||cs.dist==="far"?t.red:cs.dist==="perfect"?t.green:t.tx,
        letterSpacing:z(2,4,3,5),textShadow:`0 ${2*s}px ${8*s}px rgba(0,0,0,0.8)`,
        transition:"all 0.3s",
      }}>{cs.text}</div>
      {cs.sub&&<div style={{
        fontSize:z(7,14,12,16),fontWeight:700,color:t.ts,marginTop:z(3,6,5,8),
        textShadow:`0 ${1*s}px ${4*s}px rgba(0,0,0,0.8)`,
      }}>{cs.sub}</div>}
    </div>
  );

  /* ============ DISTANCE BAR ============ */
  const DistanceBar=()=>{
    if(!cs.dist)return null;
    const barW=z(140,280,240,320);
    const barH=z(10,22,18,26);
    const pos=cs.dist==="close"?"15%":cs.dist==="far"?"85%":"50%";
    const col=cs.dist==="perfect"?t.green:t.red;
    return(
      <div style={{position:"absolute",bottom:z(16,40,32,50),left:"50%",transform:"translateX(-50%)",zIndex:5}}>
        <div style={{width:barW,height:barH,borderRadius:barH/2,background:`${t.td}33`,display:"flex",overflow:"hidden",position:"relative",border:`${1*s}px solid ${t.td}44`}}>
          <div style={{flex:1,background:`${t.red}15`}}/>
          <div style={{flex:1,background:`${t.green}15`,borderLeft:`${1*s}px solid ${t.td}33`,borderRight:`${1*s}px solid ${t.td}33`}}/>
          <div style={{flex:1,background:`${t.red}15`}}/>
          <div style={{
            position:"absolute",top:"50%",left:pos,transform:"translate(-50%,-50%)",
            width:barH*0.8,height:barH*0.8,borderRadius:"50%",
            background:col,border:`${2*s}px solid #FFF`,
            boxShadow:`0 0 ${6*s}px ${col}88`,transition:"left 0.5s ease",
          }}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:z(2,4,3,5),paddingLeft:z(2,4,3,5),paddingRight:z(2,4,3,5)}}>
          <span style={{fontSize:z(4,7,6,8),fontWeight:800,color:cs.dist==="close"?t.red:t.td}}>CLOSE</span>
          <span style={{fontSize:z(4,7,6,8),fontWeight:800,color:cs.dist==="perfect"?t.green:t.td}}>PERFECT</span>
          <span style={{fontSize:z(4,7,6,8),fontWeight:800,color:cs.dist==="far"?t.red:t.td}}>FAR</span>
        </div>
      </div>
    );
  };

  /* ============ TAP HINT ============ */
  const TapHint=()=>(
    <div style={{position:"absolute",bottom:z(4,10,8,12),left:"50%",transform:"translateX(-50%)",
      fontSize:z(4,9,8,10),color:`${t.tm}88`,fontWeight:700,zIndex:5,
    }}>TAP TO ADVANCE ({step+1}/{calibStates.length})</div>
  );

  /* ============ BACK BUTTON ============ */
  const BackBtn=()=>(
    <button onClick={(e)=>{e.stopPropagation();navigate("/main-menu")}} style={{
      position:"absolute",bottom:z(12,28,22,32),left:z(12,28,22,32),zIndex:20,
      padding:`${z(4,10,8,12)}px ${z(8,18,14,20)}px`,
      borderRadius:z(6,12,10,14),...cardBg,
      border:`${1.5*s}px solid ${t.cb}`,
      color:t.ts,fontSize:z(8,16,14,18),fontWeight:800,cursor:"pointer",letterSpacing:0.5*s,
    }}>{"\u2190"} BACK</button>
  );

  /* ============ CAMERA FEED BG ============ */
  const CameraBg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 40%, #1a2a1a 0%, #080808 70%)`}}/>
      {/* Scan lines */}
      <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",pointerEvents:"none"}}/>
      {/* Subtle vignette */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)"}}/>
    </div>
  );

  const layout=(
    <div style={{position:"relative",width:"100%",height:"100%",cursor:"pointer",overflow:"hidden"}} onClick={advance}>
      <CameraBg/>
      <Corners/>
      <RecDot/>
      <Ghost/>
      <BodyPanel/>
      <StatusText/>
      <DistanceBar/>
      <TapHint/>
      <BackBtn/>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#111118",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 6px",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"auto"}}>
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
      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:"#080808",boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        {layout}
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        ::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
