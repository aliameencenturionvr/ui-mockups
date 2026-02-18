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

/* ============ PROFILE DATA ============ */
const player={
  name:"CricketKing99",title:"Century Maker",level:34,xp:7200,xpMax:10000,
  team:{name:"INDIA",flag:"\u{1F1EE}\u{1F1F3}"},streak:5,playerId:"TSC-4829-XKRM",
};
const stats=[
  {label:"RUNS",value:"12,847",icon:"\u{1F3CF}"},
  {label:"MATCHES",value:"342",icon:"\u{1F3AE}"},
  {label:"WIN RATE",value:"67%",icon:"\u{1F3C6}"},
  {label:"HIGH SCORE",value:"187",icon:"\u2B50"},
  {label:"SIXES",value:"1,205",icon:"\u{1F4A5}"},
  {label:"FOURS",value:"2,891",icon:"\u{1F525}"},
  {label:"SURVIVAL",value:"287",icon:"\u{1F6E1}\uFE0F"},
  {label:"POWER OVER",value:"36",icon:"\u26A1"},
];
const achievements=[
  {name:"First Blood",icon:"\u{1F3CF}",unlocked:true},{name:"Century",icon:"\u{1F4AF}",unlocked:true},
  {name:"Six Machine",icon:"\u{1F525}",unlocked:true},{name:"The Wall",icon:"\u{1F9F1}",unlocked:true},
  {name:"Boundary King",icon:"\u{1F451}",unlocked:true},{name:"Speed Demon",icon:"\u26A1",unlocked:false},
  {name:"Hat Trick",icon:"\u{1F3A9}",unlocked:false},{name:"World Champ",icon:"\u{1F30D}",unlocked:false},
  {name:"Perfectionist",icon:"\u{1F48E}",unlocked:false},{name:"Legend",icon:"\u{1F31F}",unlocked:false},
  {name:"Streak Master",icon:"\u{1F525}",unlocked:true},{name:"Daily Grind",icon:"\u{1F4AA}",unlocked:true},
];
const masteryZones=[
  {name:"Cover",short:"COV",value:0.85},{name:"Square",short:"SQR",value:0.6},
  {name:"Pull",short:"PUL",value:0.45},{name:"Straight",short:"STR",value:0.75},
  {name:"Lofted",short:"LOF",value:0.3},{name:"Leg",short:"LEG",value:0.7},
];
const matchHistory=[
  {mode:"Quick Match",result:"WON",score:"142/3",overs:"5",date:"2 hrs ago"},
  {mode:"Survival",result:"OUT",score:"87",overs:"-",date:"5 hrs ago"},
  {mode:"World Cup",result:"WON",score:"165/4",overs:"5",date:"1 day ago"},
  {mode:"Power Over",result:"-",score:"28/6",overs:"1",date:"1 day ago"},
  {mode:"Quick Match",result:"LOST",score:"98/10",overs:"5",date:"2 days ago"},
];

export default function PlayerProfile(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});

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

  /* ============ HERO SECTION ============ */
  const Hero=()=>{
    const xpPct=(player.xp/player.xpMax)*100;
    const barH=z(4,8,6,10);
    return(
      <div style={{display:"flex",alignItems:"center",gap:z(5,14,12,16),marginBottom:z(4,10,8,12)}}>
        {/* Avatar */}
        <div style={{position:"relative",flexShrink:0}}>
          <div style={{
            width:z(36,72,60,80),height:z(36,72,60,80),borderRadius:"50%",
            background:`linear-gradient(135deg, ${t.a}33, ${t.ad}33)`,
            border:`${2.5*s}px solid ${t.a}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:z(20,40,34,46),
          }}>{player.team.flag}</div>
          <div style={{
            position:"absolute",bottom:-z(2,4,3,5),right:-z(2,4,3,5),
            background:t.pb,borderRadius:z(4,8,6,10),
            padding:`${z(1,3,2,4)}px ${z(3,6,5,8)}px`,
            fontSize:z(5,10,8,12),fontWeight:900,color:t.pt,
          }}>LV.{player.level}</div>
        </div>
        {/* Info */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:z(11,22,18,26),fontWeight:900,color:t.tx,letterSpacing:0.5*s}}>{player.name}</div>
          <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8),marginTop:z(1,2,2,3)}}>
            <span style={{fontSize:z(5,10,9,12),fontWeight:800,color:t.a}}>{player.title}</span>
            <span style={{fontSize:z(5,10,9,12),color:t.tm}}>|</span>
            <span style={{fontSize:z(5,10,9,12),fontWeight:800,color:t.co}}>{"\u{1F525}"} {player.streak} Day Streak</span>
          </div>
          {/* XP Bar */}
          <div style={{marginTop:z(3,6,5,8)}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:z(1,2,2,3)}}>
              <span style={{fontSize:z(4,8,7,9),fontWeight:700,color:t.tm}}>XP</span>
              <span style={{fontSize:z(4,8,7,9),fontWeight:700,color:t.tm}}>{player.xp.toLocaleString()}/{player.xpMax.toLocaleString()}</span>
            </div>
            <div style={{height:barH,borderRadius:barH/2,background:`${t.td}44`,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${xpPct}%`,borderRadius:barH/2,background:t.pb}}/>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ============ SECTION LABEL ============ */
  const SectionLabel=({icon,label})=>(
    <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8),marginTop:z(4,10,8,12),marginBottom:z(2,5,4,6)}}>
      <span style={{fontSize:z(8,16,14,18)}}>{icon}</span>
      <span style={{fontSize:z(6,12,10,14),fontWeight:900,color:t.a,letterSpacing:z(1,2,2,3)}}>{label}</span>
    </div>
  );

  /* ============ STATS GRID ============ */
  const StatsGrid=()=>(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:z(2,5,4,6)}}>
      {stats.map((st,i)=>(
        <div key={i} style={{
          ...cardBg,borderRadius:z(6,12,10,14),border:`${1*s}px solid ${t.td}33`,
          padding:`${z(3,8,6,10)}px`,textAlign:"center",
        }}>
          <div style={{fontSize:z(8,16,14,18),marginBottom:z(1,2,2,3)}}>{st.icon}</div>
          <div style={{fontSize:z(7,14,12,16),fontWeight:900,color:t.tx}}>{st.value}</div>
          <div style={{fontSize:z(4,7,6,8),fontWeight:700,color:t.tm,letterSpacing:0.3*s}}>{st.label}</div>
        </div>
      ))}
    </div>
  );

  /* ============ ACHIEVEMENTS ============ */
  const AchievementGrid=()=>(
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:z(2,5,4,6)}}>
      {achievements.map((a,i)=>(
        <div key={i} style={{
          ...cardBg,borderRadius:z(5,10,8,12),border:`${1*s}px solid ${a.unlocked?t.a+"33":t.td+"22"}`,
          padding:`${z(3,6,5,8)}px`,textAlign:"center",
          opacity:a.unlocked?1:0.4,position:"relative",
        }}>
          <div style={{fontSize:z(10,20,16,22),filter:a.unlocked?"none":"grayscale(1) brightness(0.5)"}}>{a.icon}</div>
          <div style={{fontSize:z(3.5,7,6,8),fontWeight:700,color:a.unlocked?t.ts:t.td,marginTop:z(1,2,2,3),lineHeight:1.1}}>
            {a.unlocked?a.name:"???"}
          </div>
          {a.unlocked&&<div style={{position:"absolute",top:z(1,2,2,3),right:z(1,2,2,3),width:z(3,6,5,7),height:z(3,6,5,7),borderRadius:"50%",background:t.green}}/>}
        </div>
      ))}
    </div>
  );

  /* ============ MASTERY RADAR ============ */
  const MasteryRadar=()=>{
    const sz=z(80,170,140,190);
    const cx=100,cy=100,r=75;
    const hp=(i,rad)=>{
      const a=(Math.PI/3)*i-Math.PI/2;
      return[cx+rad*Math.cos(a),cy+rad*Math.sin(a)];
    };
    const hexPath=(rad)=>masteryZones.map((_,i)=>hp(i,rad)).map((p,i)=>`${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ")+" Z";
    const dataPath=masteryZones.map((mz,i)=>hp(i,r*mz.value)).map((p,i)=>`${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ")+" Z";

    return(
      <div style={{display:"flex",alignItems:"center",gap:z(6,14,12,16)}}>
        <svg viewBox="0 0 200 200" width={sz} height={sz}>
          {[0.33,0.66,1].map(sc=><path key={sc} d={hexPath(r*sc)} fill="none" stroke={t.td+"44"} strokeWidth="0.8"/>)}
          {masteryZones.map((_,i)=>{const[x,y]=hp(i,r);return<line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={t.td+"33"} strokeWidth="0.5"/>})}
          <path d={dataPath} fill={`${t.a}25`} stroke={t.a} strokeWidth="2.5"/>
          {masteryZones.map((mz,i)=>{const[x,y]=hp(i,r*mz.value);return<circle key={i} cx={x} cy={y} r="4" fill={t.a}/>})}
          {masteryZones.map((mz,i)=>{const[x,y]=hp(i,r+16);return<text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={t.tm} fontSize="9" fontWeight="700">{mz.short}</text>})}
        </svg>
        <div style={{display:"flex",flexDirection:"column",gap:z(2,4,3,5)}}>
          {masteryZones.map((mz,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:z(3,6,5,8)}}>
              <div style={{width:z(40,80,70,90),height:z(4,8,6,10),borderRadius:z(2,4,3,5),background:`${t.td}44`,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${mz.value*100}%`,borderRadius:z(2,4,3,5),background:t.pb}}/>
              </div>
              <span style={{fontSize:z(4,8,7,9),fontWeight:700,color:t.tm,minWidth:z(20,40,34,46)}}>{mz.name}</span>
              <span style={{fontSize:z(4,8,7,9),fontWeight:800,color:t.a}}>{Math.round(mz.value*100)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ============ MATCH HISTORY ============ */
  const MatchHistory=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:z(1,3,2,4)}}>
      {matchHistory.map((m,i)=>(
        <div key={i} style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:`${z(3,7,5,8)}px ${z(4,10,8,12)}px`,
          borderRadius:z(5,10,8,12),background:`${t.td}08`,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8)}}>
            <span style={{
              fontSize:z(4,8,7,9),fontWeight:900,letterSpacing:0.3*s,
              color:m.result==="WON"?t.green:m.result==="LOST"?"#EF5350":t.tm,
              minWidth:z(18,36,30,40),
            }}>{m.result}</span>
            <span style={{fontSize:z(5,10,9,12),fontWeight:700,color:t.tx}}>{m.mode}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:z(4,8,7,10)}}>
            <span style={{fontSize:z(6,12,10,14),fontWeight:900,color:t.tx}}>{m.score}</span>
            <span style={{fontSize:z(4,8,7,9),color:t.td}}>{m.date}</span>
          </div>
        </div>
      ))}
    </div>
  );

  /* ============ PLAYER ID ============ */
  const PlayerId=()=>(
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      marginTop:z(4,10,8,12),padding:`${z(3,8,6,10)}px ${z(5,12,10,14)}px`,
      borderRadius:z(6,12,10,14),background:`${t.td}10`,border:`${1*s}px solid ${t.td}22`,
    }}>
      <div>
        <span style={{fontSize:z(4,8,7,9),fontWeight:700,color:t.tm}}>PLAYER ID</span>
        <div style={{fontSize:z(7,14,12,16),fontWeight:800,color:t.a,fontFamily:"monospace",letterSpacing:1*s}}>{player.playerId}</div>
      </div>
      <div style={{
        padding:`${z(3,6,5,7)}px ${z(5,12,10,14)}px`,borderRadius:z(4,8,6,10),
        background:`${t.a}22`,border:`${1*s}px solid ${t.a}44`,
        fontSize:z(5,10,8,12),fontWeight:800,color:t.a,cursor:"pointer",
      }}>COPY</div>
    </div>
  );

  /* ============ LAYOUT BUILDER ============ */
  const buildLayout=(padTop,width,maxW)=>(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:width?"center":"stretch",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:width||"auto",maxWidth:maxW,display:"flex",flexDirection:"column",flex:1,minHeight:0,overflow:"hidden",paddingTop:padTop,...(!width&&{padding:`${padTop}px ${z(0,14,0,14)}px ${z(0,10,0,10)}px`})}}>
        <div style={{flex:1,overflow:"auto",minHeight:0}}>
          <Hero/>
          <SectionLabel icon={"\u{1F4CA}"} label="CAREER STATS"/>
          <StatsGrid/>
          <SectionLabel icon={"\u{1F3C5}"} label="ACHIEVEMENTS"/>
          <AchievementGrid/>
          <SectionLabel icon={"\u{1F3AF}"} label="SHOT MASTERY"/>
          <MasteryRadar/>
          <SectionLabel icon={"\u{1F4CB}"} label="RECENT MATCHES"/>
          <MatchHistory/>
          <PlayerId/>
          <div style={{height:z(4,10,8,12)}}/>
        </div>
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

  const Bg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 15%, ${t.a}10 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, ${t.co}06 0%, transparent 40%), ${t.bg}`}}/>
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
      <style>{`::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
