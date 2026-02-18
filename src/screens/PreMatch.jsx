import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const T = {
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(255,255,255,0.05)",cb:"rgba(255,64,129,0.15)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",g:"rgba(255,64,129,0.35)",tx:"#FFF",ts:"#DDD",tm:"#888",td:"#444",co:"#FFD740",ge:"#40C4FF",bb:"rgba(255,255,255,0.08)",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",pg:"0 0 60px rgba(255,64,129,0.5),0 10px 40px rgba(255,64,129,0.25)",s1:"#1a0510",s2:"#2a1525",s3:"#0d1a0d",fl:"rgba(255,200,150,0.15)"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(255,255,255,0.04)",cb:"rgba(245,197,66,0.12)",a:"#F5C542",ad:"#C49000",al:"#FFE082",g:"rgba(245,197,66,0.3)",tx:"#FFF",ts:"#C8D0E8",tm:"#7888B0",td:"#3A4568",co:"#F5C542",ge:"#64B5F6",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",pg:"0 0 60px rgba(245,197,66,0.45),0 10px 40px rgba(245,197,66,0.2)",s1:"#0a0e20",s2:"#141e38",s3:"#0a150a",fl:"rgba(255,220,130,0.2)"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(255,255,255,0.04)",cb:"rgba(76,175,80,0.15)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",g:"rgba(76,175,80,0.3)",tx:"#FFF",ts:"#C0D8C2",tm:"#6E9E72",td:"#2E5032",co:"#FFD740",ge:"#40C4FF",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",pg:"0 0 60px rgba(76,175,80,0.45),0 10px 40px rgba(76,175,80,0.2)",s1:"#050e06",s2:"#0f2215",s3:"#0a1f0a",fl:"rgba(200,255,200,0.12)"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(255,255,255,0.03)",cb:"rgba(0,229,255,0.12)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",g:"rgba(0,229,255,0.35)",tx:"#FFF",ts:"#B8D8E8",tm:"#6090B0",td:"#2A4860",co:"#FFD740",ge:"#00E5FF",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",pg:"0 0 60px rgba(0,229,255,0.5),0 10px 40px rgba(0,229,255,0.25)",s1:"#050812",s2:"#0c1428",s3:"#061008",fl:"rgba(150,240,255,0.18)"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(255,255,255,0.04)",cb:"rgba(255,179,0,0.12)",a:"#FFB300",ad:"#E65100",al:"#FFE082",g:"rgba(255,179,0,0.3)",tx:"#FFF",ts:"#D8CFC0",tm:"#9A8A70",td:"#4A3E2E",co:"#FFB300",ge:"#64B5F6",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",pg:"0 0 60px rgba(255,179,0,0.45),0 10px 40px rgba(255,179,0,0.2)",s1:"#100c04",s2:"#1a1408",s3:"#0c120a",fl:"rgba(255,210,120,0.18)"},
};

const teams=[
  {name:"INDIA",flag:"\u{1F1EE}\u{1F1F3}",short:"IND"},
  {name:"AUSTRALIA",flag:"\u{1F1E6}\u{1F1FA}",short:"AUS"},
  {name:"ENGLAND",flag:"\u{1F1EC}\u{1F1E7}",short:"ENG"},
  {name:"PAKISTAN",flag:"\u{1F1F5}\u{1F1F0}",short:"PAK"},
  {name:"SOUTH AFRICA",flag:"\u{1F1FF}\u{1F1E6}",short:"SA"},
  {name:"NEW ZEALAND",flag:"\u{1F1F3}\u{1F1FF}",short:"NZ"},
  {name:"WEST INDIES",flag:"\u{1F3DD}\uFE0F",short:"WI"},
  {name:"SRI LANKA",flag:"\u{1F1F1}\u{1F1F0}",short:"SL"},
  {name:"BANGLADESH",flag:"\u{1F1E7}\u{1F1E9}",short:"BAN"},
  {name:"AFGHANISTAN",flag:"\u{1F1E6}\u{1F1EB}",short:"AFG"},
  {name:"IRELAND",flag:"\u{1F1EE}\u{1F1EA}",short:"IRE"},
  {name:"ZIMBABWE",flag:"\u{1F1FF}\u{1F1FC}",short:"ZIM"},
];

const stadiums=[
  {name:"MCG",city:"Melbourne"},
  {name:"Lord's",city:"London"},
  {name:"Wankhede",city:"Mumbai"},
  {name:"Eden Gardens",city:"Kolkata"},
  {name:"The Oval",city:"Sydney"},
];

const diffs=[
  {name:"ROOKIE",color:"#4CAF50"},
  {name:"CLUB",color:"#FFB300"},
  {name:"INTL",color:"#FF6D00"},
  {name:"LEGEND",color:"#F44336"},
];

function StadiumBg({t}){return(<div style={{position:"absolute",inset:0,overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${t.s1} 0%,${t.s2} 30%,${t.s3} 60%,${t.s1} 100%)`}}/>
  <div style={{position:"absolute",top:"6%",left:"-5%",right:"-5%",height:"30%",background:`linear-gradient(180deg,${t.s2}ee 0%,${t.s2}55 60%,transparent 100%)`,borderRadius:"0 0 50% 50%",filter:"blur(10px)"}}/>
  <div style={{position:"absolute",top:"3%",left:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  <div style={{position:"absolute",top:"3%",right:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  {[...Array(15)].map((_,i)=><div key={i} style={{position:"absolute",top:`${8+Math.random()*22}%`,left:`${3+Math.random()*94}%`,width:`${2+Math.random()*4}px`,height:`${2+Math.random()*4}px`,borderRadius:"50%",background:t.fl,filter:`blur(${1+Math.random()*3}px)`,opacity:.3+Math.random()*.4}}/>)}
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 45%,transparent 30%,${t.bg}bb 75%)`}}/>
</div>)}

function MiniStadium({s,dn,h}){
  return(
    <div style={{width:"100%",height:h,borderRadius:8*s,overflow:"hidden",position:"relative",border:`${1*s}px solid rgba(255,255,255,0.1)`}}>
      <div style={{position:"absolute",inset:0,background:dn==="day"?"linear-gradient(180deg,#4a90c2 0%,#87CEEB 40%,#a8d8a8 60%,#2d6b30 100%)":"linear-gradient(180deg,#0a0e20 0%,#141e38 40%,#1a3a1a 60%,#0d2b0d 100%)"}}/>
      <div style={{position:"absolute",bottom:0,left:"10%",right:"10%",height:"50%",background:"radial-gradient(ellipse at 50% 100%,#3a8c3e 0%,#1a5c1e 60%,transparent 100%)",opacity:.8}}/>
      <div style={{position:"absolute",bottom:"15%",left:"46%",width:"8%",height:"25%",background:dn==="day"?"#d4b46a":"#8a7a4a",borderRadius:1*s,opacity:.7}}/>
      {dn==="night"&&<>{[15,85].map(x=><div key={x} style={{position:"absolute",top:"8%",left:`${x}%`,width:3*s,height:3*s,borderRadius:"50%",background:"#ffe",boxShadow:`0 0 ${6*s}px #ffe`}}/>)}</>}
    </div>
  );
}

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

export default function PreMatch(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[batIdx,setBatIdx]=useState(0);
  const[bowlIdx,setBowlIdx]=useState(1);
  const[selOvers,setSelOvers]=useState(3);
  const[selDiff,setSelDiff]=useState(1);
  const[stadIdx,setStadIdx]=useState(0);
  const[dn,setDn]=useState("day");

  const t=T[theme];
  const dv=devices[dev];
  const isPh=dev==="iphone";
  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  const isP=ori==="portrait";
  const isPhL=isPh&&!isP;
  const iW=isP?dv.pw:dv.lw,iH=isP?dv.ph:dv.lh;
  let dW=Math.min(ws.w-20,1100),dH=dW/(iW/iH);
  if(dH>ws.h-130){dH=ws.h-130;dW=dH*(iW/iH)}
  const s=dW/iW;

  // 4-tier sizing: z(phoneLandscape, phonePortrait, iPadLandscape, iPadPortrait)
  const z=(a,b,c,d)=>(isPhL?a:isPh?b:isP?d:c)*s;

  const bat=teams[batIdx],bowl=teams[bowlIdx];
  const stad=stadiums[stadIdx];
  const cyc=(idx,set,dir,len)=>set((idx+dir+len)%len);

  /* --- Helpers --- */
  const Arr=({dir,onClick,sz})=>(
    <button onClick={onClick} style={{width:sz,height:sz,borderRadius:sz/2,border:`${1.5*s}px solid ${t.cb}`,background:t.card,color:t.ts,fontSize:sz*.45,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,backdropFilter:"blur(8px)"}}>{dir<0?"\u276E":"\u276F"}</button>
  );
  const Pill=({label,selected,onClick,color})=>(
    <button onClick={onClick} style={{flex:1,padding:`${z(4,12,12,16)}px 0`,borderRadius:30*s,border:`${(selected?2.5:1.5)*s}px solid ${selected?(color||t.a)+"aa":t.cb}`,background:selected?`${color||t.a}22`:t.card,color:selected?(color||t.a):t.tm,fontSize:z(8,16,16,20),fontWeight:selected?900:700,cursor:"pointer",letterSpacing:1*s,backdropFilter:"blur(8px)",transition:"all 0.15s"}}>{label}</button>
  );

  const cardS={background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:z(10,16,16,20),backdropFilter:"blur(20px)",padding:`${z(7,14,14,18)}px ${z(8,16,18,22)}px`};
  const lblS={fontSize:z(9,13,16,15),fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:z(3,6,6,8)};
  const arrSz=z(28,44,54,50);
  const flagSz=z(36,60,80,85);

  /* --- Section builders --- */
  const teamPicker=(label,team,idx,setIdx)=>(
    <div style={{flex:1,textAlign:"center"}}>
      <div style={lblS}>{label}</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:z(4,8,10,12)}}>
        <Arr dir={-1} onClick={()=>cyc(idx,setIdx,-1,teams.length)} sz={arrSz}/>
        <div>
          <div style={{fontSize:flagSz,lineHeight:1}}>{team.flag}</div>
          <div style={{fontSize:z(10,16,22,20),fontWeight:800,color:t.tx,marginTop:z(1,3,3,4),letterSpacing:1*s}}>{isPhL?team.short:team.name}</div>
        </div>
        <Arr dir={1} onClick={()=>cyc(idx,setIdx,1,teams.length)} sz={arrSz}/>
      </div>
    </div>
  );

  const oversEl=(
    <div>
      <div style={lblS}>OVERS</div>
      <div style={{display:"flex",gap:z(4,8,8,10)}}>
        {[1,3,5].map(o=><Pill key={o} label={o} selected={selOvers===o} onClick={()=>setSelOvers(o)}/>)}
      </div>
    </div>
  );

  const diffEl=(
    <div>
      <div style={lblS}>DIFFICULTY</div>
      <div style={{display:"flex",gap:z(3,6,6,8)}}>
        {diffs.map((d,i)=><Pill key={i} label={d.name} selected={selDiff===i} onClick={()=>setSelDiff(i)} color={d.color}/>)}
      </div>
    </div>
  );

  const stadElFull=(
    <div>
      <div style={lblS}>STADIUM</div>
      <div style={{display:"flex",alignItems:"center",gap:z(6,10,10,14)}}>
        <Arr dir={-1} onClick={()=>cyc(stadIdx,setStadIdx,-1,stadiums.length)} sz={arrSz}/>
        <div style={{flex:1}}>
          <MiniStadium s={s} dn={dn} h={z(40,70,70,90)}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:z(3,5,5,6)}}>
            <div>
              <div style={{fontSize:z(9,16,16,20),fontWeight:800,color:t.tx}}>{stad.name}</div>
              <div style={{fontSize:z(7,11,10,14),color:t.tm}}>{stad.city}</div>
            </div>
            <div style={{display:"flex",gap:z(2,4,4,5)}}>
              {["day","night"].map(m=>(
                <button key={m} onClick={()=>setDn(m)} style={{padding:`${z(2,6,5,8)}px ${z(5,10,10,14)}px`,borderRadius:20*s,border:`${1.5*s}px solid ${dn===m?t.a+"88":t.cb}`,background:dn===m?`${t.a}22`:t.card,color:dn===m?t.a:t.tm,fontSize:z(7,12,10,14),fontWeight:800,cursor:"pointer"}}>{m==="day"?"\u2600\uFE0F Day":"\u{1F319} Night"}</button>
              ))}
            </div>
          </div>
        </div>
        <Arr dir={1} onClick={()=>cyc(stadIdx,setStadIdx,1,stadiums.length)} sz={arrSz}/>
      </div>
    </div>
  );

  const stadElCompact=(
    <div>
      <div style={lblS}>STADIUM</div>
      <div style={{display:"flex",alignItems:"center",gap:4*s}}>
        <Arr dir={-1} onClick={()=>cyc(stadIdx,setStadIdx,-1,stadiums.length)} sz={arrSz}/>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6*s}}>
          <span style={{fontSize:9*s,fontWeight:800,color:t.tx}}>{stad.name}</span>
          <span style={{fontSize:7*s,color:t.tm}}>{stad.city}</span>
        </div>
        <div style={{display:"flex",gap:2*s}}>
          {["day","night"].map(m=>(
            <button key={m} onClick={()=>setDn(m)} style={{padding:`${2*s}px ${5*s}px`,borderRadius:12*s,border:`${1*s}px solid ${dn===m?t.a+"88":t.cb}`,background:dn===m?`${t.a}22`:"transparent",color:dn===m?t.a:t.tm,fontSize:12*s,cursor:"pointer",lineHeight:1}}>{m==="day"?"\u2600\uFE0F":"\u{1F319}"}</button>
          ))}
        </div>
        <Arr dir={1} onClick={()=>cyc(stadIdx,setStadIdx,1,stadiums.length)} sz={arrSz}/>
      </div>
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

      {/* Device Frame */}
      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:t.bg,boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        <StadiumBg t={t}/>
        <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>

          {/* MODE HEADER */}
          <div style={{textAlign:"center",padding:`${z(6,14,14,18)}px ${z(12,16,20,24)}px ${z(4,8,8,10)}px`,background:`linear-gradient(180deg,${t.bg}f0,${t.bg}88)`,backdropFilter:"blur(12px)",flexShrink:0}}>
            <div style={{fontSize:z(14,32,26,42),fontWeight:900,color:t.tx,letterSpacing:z(3,5,5,6),lineHeight:1}}>{"\u{1F3CF}"} QUICK MATCH</div>
            {!isPhL&&<div style={{fontSize:z(8,13,12,16),color:t.tm,marginTop:z(3,4,4,5),fontWeight:600}}>Configure your match and step up to the crease</div>}
          </div>

          {/* CONTENT */}
          <div style={{flex:1,overflow:"hidden",padding:`${z(4,8,8,10)}px ${z(8,14,20,24)}px`,display:"flex",flexDirection:"column",gap:z(5,10,12,14)}}>

          {isPhL?(
            /* ========== PHONE LANDSCAPE ========== */
            <div style={{display:"flex",gap:6*s,flex:1,minHeight:0}}>
              {/* Left: Teams */}
              <div style={{...cardS,flex:"0 0 36%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:6*s}}>
                  {teamPicker("BAT",bat,batIdx,setBatIdx)}
                  <div style={{fontSize:14*s,fontWeight:900,color:t.a}}>VS</div>
                  {teamPicker("BOWL",bowl,bowlIdx,setBowlIdx)}
                </div>
              </div>
              {/* Right: All settings */}
              <div style={{...cardS,flex:1,display:"flex",flexDirection:"column",gap:5*s,justifyContent:"center"}}>
                {oversEl}
                {diffEl}
                {stadElCompact}
              </div>
            </div>
          ):isP?(
            /* ========== PORTRAIT ========== */
            <>
              <div style={{...cardS,display:"flex",alignItems:"center",gap:z(6,10,10,14)}}>
                {teamPicker("BATTING TEAM",bat,batIdx,setBatIdx)}
                <div style={{fontSize:z(12,20,16,24),fontWeight:900,color:t.a,letterSpacing:3*s}}>VS</div>
                {teamPicker("BOWLING TEAM",bowl,bowlIdx,setBowlIdx)}
              </div>
              <div style={{...cardS,display:"flex",flexDirection:"column",gap:z(8,12,12,16)}}>
                {oversEl}
                {diffEl}
              </div>
              <div style={{...cardS}}>{stadElFull}</div>
            </>
          ):(
            /* ========== LANDSCAPE (iPad) ========== */
            <div style={{display:"flex",gap:14*s,flex:1,minHeight:0}}>
              <div style={{flex:"0 0 42%",display:"flex",flexDirection:"column",gap:12*s}}>
                <div style={{...cardS,flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14*s}}>
                    {teamPicker("BATTING TEAM",bat,batIdx,setBatIdx)}
                    <div style={{fontSize:24*s,fontWeight:900,color:t.a,letterSpacing:3*s}}>VS</div>
                    {teamPicker("BOWLING TEAM",bowl,bowlIdx,setBowlIdx)}
                  </div>
                </div>
              </div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:12*s}}>
                <div style={{...cardS,display:"flex",flexDirection:"column",gap:14*s}}>
                  {oversEl}
                  {diffEl}
                </div>
                <div style={{...cardS,flex:1}}>{stadElFull}</div>
              </div>
            </div>
          )}
          </div>

          {/* START MATCH */}
          <div style={{flexShrink:0,padding:`${z(4,10,10,14)}px ${z(8,14,20,24)}px ${z(6,14,14,18)}px`,background:`linear-gradient(0deg,${t.bg}f8,${t.bg}cc)`,backdropFilter:"blur(12px)",borderTop:`${1*s}px solid ${t.cb}`}}>
            <button style={{width:"100%",padding:`${z(7,16,16,22)}px 0`,borderRadius:30*s,border:"none",cursor:"pointer",background:t.pb,color:t.pt,fontSize:z(11,22,20,28),fontWeight:900,letterSpacing:z(3,5,5,6),boxShadow:t.pg,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,width:"200%",height:"100%",background:"linear-gradient(100deg,transparent 20%,rgba(255,255,255,0.18) 50%,transparent 80%)",animation:"shimmer 2.5s ease-in-out infinite"}}/>
              <span style={{position:"relative",zIndex:1}}>{"\u{1F3CF}"}   START MATCH</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes shimmer{0%,100%{transform:translateX(-60%)}50%{transform:translateX(20%)}}::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
