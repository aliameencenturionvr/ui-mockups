import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T={
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",green:"#4CAF50"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",green:"#66BB6A"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",green:"#81C784"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",green:"#69F0AE"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",green:"#A5D6A7"},
};
const devices={ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430}};

/* ============ ONBOARDING STEPS ============ */
const steps=[
  {
    icon:"\u{1F3CF}",title:"WELCOME TO",subtitle:"TOP SPOT CRICKET",
    text:"This game uses your front camera to track your body and control the batter in real time.",
    visual:"bat",
  },
  {
    icon:"\u{1F4F1}",title:"DEVICE SETUP",subtitle:"",
    text:"Place your device on a flat surface at waist height. Lean it against something sturdy.",
    visual:"device",
  },
  {
    icon:"\u{1F3AF}",title:"GET IN POSITION",subtitle:"",
    text:"Stand 6-8 feet away from the device. Make sure your full body is visible.",
    visual:"distance",
  },
  {
    icon:"\u{1F590}\uFE0F",title:"HAND POINTER",subtitle:"",
    text:"Raise your right hand to move the pointer. Hover over buttons to select them.",
    visual:"pointer",
  },
  {
    icon:"\u{1F3CF}",title:"HOW TO BAT",subtitle:"",
    text:"Hold your hands together and swing! Time your shot as the ball arrives. Aim for PERFECT timing!",
    visual:"swing",
  },
  {
    icon:"\u{1F680}",title:"YOU'RE READY!",subtitle:"",
    text:"Let's jump straight into a match. Don't worry \u2014 you'll get the hang of it!",
    visual:"play",last:true,
  },
];

export default function Onboarding(){
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

  const cardBg={background:t.card,backdropFilter:"blur(20px)"};
  const st=steps[step];
  const next=()=>setStep(p=>Math.min(p+1,steps.length-1));
  const prev=()=>setStep(p=>Math.max(p-1,0));

  /* ============ STEP DOTS ============ */
  const StepDots=()=>(
    <div style={{display:"flex",gap:z(3,6,5,8),justifyContent:"center",marginBottom:z(4,10,8,12)}}>
      {steps.map((_,i)=>(
        <div key={i} onClick={()=>setStep(i)} style={{
          width:i===step?z(16,32,28,36):z(5,10,8,12),
          height:z(5,10,8,12),borderRadius:z(3,5,4,6),
          background:i===step?t.a:i<step?`${t.a}66`:`${t.td}44`,
          cursor:"pointer",transition:"all 0.3s",
        }}/>
      ))}
    </div>
  );

  /* ============ VISUAL ILLUSTRATIONS ============ */
  const Illustration=()=>{
    const sz=z(60,130,110,150);
    const iconSz=z(36,72,60,80);

    if(st.visual==="bat")return(
      <div style={{width:sz,height:sz,borderRadius:"50%",background:`${t.a}12`,border:`${2*s}px solid ${t.a}22`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <span style={{fontSize:iconSz}}>{"\u{1F3CF}"}</span>
        <div style={{position:"absolute",inset:-z(4,8,7,10),borderRadius:"50%",border:`${1.5*s}px dashed ${t.a}22`,animation:"spin 8s linear infinite"}}/>
      </div>
    );

    if(st.visual==="device")return(
      <div style={{width:sz*0.5,height:sz*0.8,borderRadius:z(6,14,12,16),border:`${2.5*s}px solid ${t.a}`,background:`${t.a}08`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:z(2,4,3,5),position:"relative"}}>
        <div style={{width:"60%",height:"55%",borderRadius:z(2,4,3,5),background:`${t.a}15`,border:`${1*s}px solid ${t.a}33`}}/>
        <div style={{width:z(8,16,14,18),height:z(8,16,14,18),borderRadius:"50%",border:`${1.5*s}px solid ${t.a}44`}}/>
        <div style={{position:"absolute",bottom:-z(8,16,14,18),fontSize:z(5,10,9,12),fontWeight:700,color:t.tm}}>WAIST HEIGHT</div>
      </div>
    );

    if(st.visual==="distance")return(
      <div style={{display:"flex",alignItems:"flex-end",gap:z(12,28,22,32),position:"relative"}}>
        <div style={{width:sz*0.25,height:sz*0.4,borderRadius:z(4,8,6,10),border:`${2*s}px solid ${t.a}`,background:`${t.a}08`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:z(10,20,16,22)}}>{"\u{1F4F1}"}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <span style={{fontSize:z(24,50,42,58)}}>{"\u{1F9CD}"}</span>
          <span style={{fontSize:z(5,10,8,12),fontWeight:800,color:t.a,marginTop:z(2,4,3,5)}}>YOU</span>
        </div>
        <div style={{position:"absolute",bottom:-z(6,14,12,16),left:"50%",transform:"translateX(-50%)",
          fontSize:z(5,10,9,12),fontWeight:800,color:t.co,whiteSpace:"nowrap",
        }}>{"<"}--- 6-8 feet ---{">"}</div>
      </div>
    );

    if(st.visual==="pointer")return(
      <div style={{width:sz,height:sz*0.7,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{
          width:sz*0.5,height:sz*0.3,borderRadius:z(6,14,12,16),
          ...cardBg,border:`${2*s}px solid ${t.a}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:z(7,14,12,16),fontWeight:900,color:t.a,
        }}>BUTTON</div>
        <div style={{
          position:"absolute",top:z(4,8,7,10),right:z(8,20,16,22),
          fontSize:z(20,42,36,48),transform:"rotate(-15deg)",
        }}>{"\u{1F590}\uFE0F"}</div>
        <div style={{
          position:"absolute",top:z(2,4,3,5),right:z(16,34,28,38),
          width:z(6,12,10,14),height:z(6,12,10,14),borderRadius:"50%",
          background:t.a,boxShadow:`0 0 ${8*s}px ${t.a}88`,
        }}/>
      </div>
    );

    if(st.visual==="swing")return(
      <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:z(50,100,86,120)}}>{"\u{1F3CF}"}</span>
        <div style={{
          position:"absolute",top:"10%",right:"15%",
          fontSize:z(6,12,10,14),fontWeight:900,color:t.co,
          background:`${t.co}22`,padding:`${z(2,4,3,5)}px ${z(4,8,7,10)}px`,
          borderRadius:z(4,8,6,10),border:`${1*s}px solid ${t.co}44`,
        }}>PERFECT!</div>
        <div style={{position:"absolute",bottom:"5%",left:"20%",fontSize:z(16,32,28,36)}}>{"\u26BE"}</div>
      </div>
    );

    /* play */
    return(
      <div style={{width:sz,height:sz,borderRadius:"50%",background:t.pb,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 ${30*s}px ${t.a}44`,cursor:"pointer"}}>
        <span style={{fontSize:iconSz*0.7,marginLeft:z(3,6,5,8)}}>{"\u25B6"}</span>
      </div>
    );
  };

  /* ============ VOICE HINT ============ */
  const VoiceHint=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:z(2,5,4,6),marginTop:z(2,5,4,6)}}>
      <span style={{fontSize:z(7,14,12,16)}}>{"\u{1F3A4}"}</span>
      <span style={{fontSize:z(4,9,8,10),fontWeight:700,color:t.tm,fontStyle:"italic"}}>Or say &quot;NEXT&quot; to continue</span>
    </div>
  );

  /* ============ LAYOUT ============ */
  const buildLayout=(padTop,width,maxW)=>(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:width?"center":"stretch",overflow:"hidden"}}>
      <div style={{width:width||"auto",maxWidth:maxW,display:"flex",flexDirection:"column",flex:1,justifyContent:"center",paddingTop:padTop,...(!width&&{padding:`${padTop}px ${z(0,14,0,14)}px ${z(0,10,0,10)}px`})}}>
        {/* Step dots */}
        <StepDots/>

        {/* Illustration */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:z(6,14,12,16)}}>
          <Illustration/>
        </div>

        {/* Text content */}
        <div style={{textAlign:"center",marginBottom:z(6,14,12,16)}}>
          {st.subtitle?(
            <>
              <div style={{fontSize:z(6,12,10,14),fontWeight:800,color:t.tm,letterSpacing:z(2,4,3,4),marginBottom:z(1,3,2,4)}}>{st.title}</div>
              <div style={{fontSize:z(14,28,24,32),fontWeight:900,color:t.a,letterSpacing:z(2,4,3,5)}}>{st.subtitle}</div>
            </>
          ):(
            <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.tx,letterSpacing:z(1,3,2,3)}}>{st.title}</div>
          )}
          <div style={{fontSize:z(6,13,11,15),color:t.ts,lineHeight:1.5,marginTop:z(3,8,6,10),maxWidth:z(200,420,360,480),marginLeft:"auto",marginRight:"auto"}}>{st.text}</div>
        </div>

        {/* Buttons */}
        <div style={{display:"flex",justifyContent:"center",gap:z(4,10,8,12)}}>
          {step>0&&(
            <button onClick={prev} style={{
              padding:`${z(5,12,10,14)}px ${z(10,24,20,28)}px`,borderRadius:z(6,14,12,16),
              ...cardBg,border:`${1.5*s}px solid ${t.cb}`,
              color:t.ts,fontSize:z(7,14,12,16),fontWeight:800,cursor:"pointer",letterSpacing:0.5*s,
            }}>BACK</button>
          )}
          <button onClick={st.last?()=>setStep(0):next} style={{
            padding:`${z(5,12,10,14)}px ${z(14,32,26,36)}px`,borderRadius:z(6,14,12,16),
            background:t.pb,color:t.pt,border:"none",
            fontSize:z(7,14,12,16),fontWeight:900,cursor:"pointer",letterSpacing:z(1,2,2,3),
            boxShadow:`0 ${4*s}px ${12*s}px ${t.ad}44`,
          }}>{st.last?"LET'S PLAY!":"NEXT"}</button>
        </div>

        <VoiceHint/>
      </div>
    </div>
  );

  const layout=isPhL
    ?buildLayout(z(4,0,0,0),"92%",undefined)
    :isPh
    ?buildLayout(z(0,20,0,0),null,undefined)
    :isP
    ?buildLayout(z(0,0,0,20),"80%",600*s)
    :buildLayout(z(0,0,10,0),"85%",700*s);

  const Bg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 30%, ${t.a}10 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, ${t.ad}08 0%, transparent 40%), ${t.bg}`}}/>
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
      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:t.bg,boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        <Bg/>
        <div style={{position:"relative",width:"100%",height:"100%",zIndex:1}}>{layout}</div>
      </div>
      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
