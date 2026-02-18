import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const T = {
  darkPink: { name:"DARK PINK", bg:"#0A0A0A", card:"rgba(255,255,255,0.05)", cb:"rgba(255,64,129,0.15)", ca:"rgba(255,64,129,0.18)", cab:"#FF4081", a:"#FF4081", ad:"#C51162", al:"#FF80AB", g:"rgba(255,64,129,0.35)", tx:"#FFF", ts:"#DDD", tm:"#888", td:"#444", co:"#FFD740", ge:"#40C4FF", bb:"rgba(255,255,255,0.08)", pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)", pt:"#FFF", pg:"0 0 60px rgba(255,64,129,0.5),0 10px 40px rgba(255,64,129,0.25)", s1:"#1a0510", s2:"#2a1525", s3:"#0d1a0d", fl:"rgba(255,200,150,0.15)" },
  stadiumNight: { name:"STADIUM NIGHT", bg:"#080E1F", card:"rgba(255,255,255,0.04)", cb:"rgba(245,197,66,0.12)", ca:"rgba(245,197,66,0.14)", cab:"#F5C542", a:"#F5C542", ad:"#C49000", al:"#FFE082", g:"rgba(245,197,66,0.3)", tx:"#FFF", ts:"#C8D0E8", tm:"#7888B0", td:"#3A4568", co:"#F5C542", ge:"#64B5F6", bb:"rgba(255,255,255,0.06)", pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)", pt:"#0A0E1F", pg:"0 0 60px rgba(245,197,66,0.45),0 10px 40px rgba(245,197,66,0.2)", s1:"#0a0e20", s2:"#141e38", s3:"#0a150a", fl:"rgba(255,220,130,0.2)" },
  cricketGreen: { name:"CRICKET GREEN", bg:"#060F08", card:"rgba(255,255,255,0.04)", cb:"rgba(76,175,80,0.15)", ca:"rgba(76,175,80,0.15)", cab:"#4CAF50", a:"#4CAF50", ad:"#2E7D32", al:"#A5D6A7", g:"rgba(76,175,80,0.3)", tx:"#FFF", ts:"#C0D8C2", tm:"#6E9E72", td:"#2E5032", co:"#FFD740", ge:"#40C4FF", bb:"rgba(255,255,255,0.06)", pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)", pt:"#FFF", pg:"0 0 60px rgba(76,175,80,0.45),0 10px 40px rgba(76,175,80,0.2)", s1:"#050e06", s2:"#0f2215", s3:"#0a1f0a", fl:"rgba(200,255,200,0.12)" },
  neonSport: { name:"NEON SPORT", bg:"#060810", card:"rgba(255,255,255,0.03)", cb:"rgba(0,229,255,0.12)", ca:"rgba(0,229,255,0.12)", cab:"#00E5FF", a:"#00E5FF", ad:"#0097A7", al:"#80F0FF", g:"rgba(0,229,255,0.35)", tx:"#FFF", ts:"#B8D8E8", tm:"#6090B0", td:"#2A4860", co:"#FFD740", ge:"#00E5FF", bb:"rgba(255,255,255,0.06)", pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)", pt:"#060810", pg:"0 0 60px rgba(0,229,255,0.5),0 10px 40px rgba(0,229,255,0.25)", s1:"#050812", s2:"#0c1428", s3:"#061008", fl:"rgba(150,240,255,0.18)" },
  premiumGold: { name:"PREMIUM GOLD", bg:"#0C0C0C", card:"rgba(255,255,255,0.04)", cb:"rgba(255,179,0,0.12)", ca:"rgba(255,179,0,0.14)", cab:"#FFB300", a:"#FFB300", ad:"#E65100", al:"#FFE082", g:"rgba(255,179,0,0.3)", tx:"#FFF", ts:"#D8CFC0", tm:"#9A8A70", td:"#4A3E2E", co:"#FFB300", ge:"#64B5F6", bb:"rgba(255,255,255,0.06)", pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)", pt:"#0C0C0C", pg:"0 0 60px rgba(255,179,0,0.45),0 10px 40px rgba(255,179,0,0.2)", s1:"#100c04", s2:"#1a1408", s3:"#0c120a", fl:"rgba(255,210,120,0.18)" },
};

const modes = [
  { id:"quick",icon:"\u{1F3CF}",name:"QUICK MATCH",badge:"PLAY",tip:"Jump into a match instantly",desc:"Pick your team, choose your overs, and face the AI bowler. Perfect timing earns boundaries, mistimed shots risk wickets. The core cricket experience.",st:[{l:"SESSION",v:"2\u20135 MIN"},{l:"OVERS",v:"1 / 3 / 5"},{l:"DIFFICULTY",v:"AUTO"}],status:"DONE" },
  { id:"worldcup",icon:"\u{1F3C6}",name:"WORLD CUP",badge:"QF",tip:"8-team knockout tournament",desc:"Quarter-Finals \u2192 Semi-Finals \u2192 Final. Beat three opponents in escalating difficulty. Win the Cup for exclusive cosmetics and the Champion badge.",st:[{l:"FORMAT",v:"KNOCKOUT"},{l:"TEAMS",v:"8"},{l:"ROUNDS",v:"3"}],status:"MVP" },
  { id:"survival",icon:"\u{1F480}",name:"SURVIVAL",badge:"87",tip:"One life. Escalating difficulty",desc:"You have ONE wicket. Difficulty climbs every 2 overs from Club to Extreme. Consecutive boundaries build a score multiplier up to 4\u00d7. Chase the global leaderboard.",st:[{l:"WICKETS",v:"1"},{l:"ESCALATION",v:"2 OVERS"},{l:"MULTIPLIER",v:"UP TO 4\u00d7"}],status:"NEW" },
  { id:"challenge",icon:"\u2b50",name:"DAILY CHALLENGE",badge:"2/3",tip:"3 fresh challenges every day",desc:"Complete targeted objectives for Coins and Gems. Hit 3 fours in an over, survive 24 balls at Legend difficulty, score 30 off 12 balls. New challenges every midnight.",st:[{l:"DAILY",v:"3 + BONUS"},{l:"WEEKLY",v:"MEGA"},{l:"REWARDS",v:"COINS + GEMS"}],status:"NEW" },
  { id:"power",icon:"\u26a1",name:"POWER OVER",badge:"28",tip:"6 balls. Maximum carnage",desc:"One over. Six balls. Score as many runs as possible \u2014 no wicket penalty. Under 90 seconds. Star-rated performance. Can you hit the mythical perfect 36?",st:[{l:"BALLS",v:"6"},{l:"MAX SCORE",v:"36"},{l:"TIME",v:"~60 SEC"}],status:"NEW" },
  { id:"chase",icon:"\u{1F3AF}",name:"CHASE",badge:"3W",tip:"Chase the AI's target score",desc:"The AI batted first and set a target. Chase it down in 3 or 5 overs with 3 wickets. Live Required Run Rate display and last-ball thriller moments.",st:[{l:"WICKETS",v:"3"},{l:"OVERS",v:"3 / 5"},{l:"LIVE HUD",v:"RRR BAR"}],status:"V1.1" },
  { id:"party",icon:"\u{1F465}",name:"PARTY",badge:"2-4P",tip:"Pass the phone. Beat your friends",desc:"2\u20134 players on one device. Each player faces 6 balls. Highest score wins. Podium celebration and shareable group scorecard at the end.",st:[{l:"PLAYERS",v:"2\u20134"},{l:"BALLS EACH",v:"6"},{l:"FINISH",v:"PODIUM"}],status:"V1.1" },
  { id:"gauntlet",icon:"\u{1F6E1}\ufe0f",name:"GAUNTLET",badge:"7/10",tip:"Beat 10 nations back-to-back",desc:"10 consecutive 1-over matches against increasingly tough opponents. 3 wickets carry across all rounds. Ireland to Australia. No breaks, no mercy.",st:[{l:"ROUNDS",v:"10"},{l:"WICKETS",v:"3 TOTAL"},{l:"FINAL BOSS",v:"AUS"}],status:"V1.2" },
  { id:"scenario",icon:"\u{1F4D6}",name:"SCENARIOS",badge:"4/12",tip:"Relive famous cricket moments",desc:"Pre-built scenarios from cricket history. The Last Over, Century Chase, The Final Ball. Drop into a match situation and try to win. 3-star system.",st:[{l:"TOTAL",v:"12+"},{l:"STARS",v:"3 PER"},{l:"PACKS",v:"MONTHLY"}],status:"V1.2" },
  { id:"practice",icon:"\u{1F3BE}",name:"PRACTICE",badge:"",tip:"No pressure training nets",desc:"Unlimited deliveries. No wickets. Landing marker always visible. All tutorial overlays active. Perfect for learning the controls and experimenting.",st:[{l:"WICKETS",v:"NONE"},{l:"MARKER",v:"ALWAYS ON"},{l:"REWARDS",v:"NONE"}],status:"MVP" },
];

function StadiumBg({t}){return(<div style={{position:"absolute",inset:0,overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${t.s1} 0%,${t.s2} 30%,${t.s3} 60%,${t.s1} 100%)`}}/>
  <div style={{position:"absolute",top:"6%",left:"-5%",right:"-5%",height:"30%",background:`linear-gradient(180deg,${t.s2}ee 0%,${t.s2}55 60%,transparent 100%)`,borderRadius:"0 0 50% 50%",filter:"blur(10px)"}}/>
  <div style={{position:"absolute",top:"3%",left:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  <div style={{position:"absolute",top:"3%",right:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  <div style={{position:"absolute",top:"36%",left:"20%",right:"20%",height:"38%",background:`linear-gradient(180deg,${t.s3}cc 0%,${t.s3}66 100%)`,borderRadius:"5% 5% 0 0",filter:"blur(8px)"}}/>
  {[...Array(25)].map((_,i)=><div key={i} style={{position:"absolute",top:`${8+Math.random()*22}%`,left:`${3+Math.random()*94}%`,width:`${2+Math.random()*5}px`,height:`${2+Math.random()*5}px`,borderRadius:"50%",background:t.fl,filter:`blur(${1+Math.random()*3}px)`,opacity:0.25+Math.random()*0.4}}/>)}
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 45%,transparent 30%,${t.bg}bb 75%)`}}/>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 45%,transparent 35%,${t.bg} 100%)`,opacity:0.6}}/>
</div>)}

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

export default function MainMenu(){
  const navigate = useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[sel,setSel]=useState(0);
  const[hov,setHov]=useState(null);
  const[off,setOff]=useState(0);
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const t=T[theme];
  const d=devices[dev];
  const isPh=dev==="iphone";

  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  const isP=ori==="portrait";
  const isPhL=isPh&&!isP; // phone landscape — tightest vertical space
  const iW=isP?d.pw:d.lw, iH=isP?d.ph:d.lh;
  let dW=Math.min(ws.w-20,1100), dH=dW/(iW/iH);
  if(dH>ws.h-130){dH=ws.h-130;dW=dH*(iW/iH)}
  const s=dW/iW;
  const vis=isPh&&isP?3:4, maxOff=Math.max(0,modes.length-vis);
  const vm=modes.slice(off,off+vis);
  const m=modes[sel];
  const sc=st=>st==="DONE"?"#4CAF50":st==="NEW"?t.a:st==="MVP"?"#FF9800":t.tm;
  const cardH=(isPhL?65:isPh&&isP?100:120)*s;

  return(
    <div style={{minHeight:"100vh",background:"#111118",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 6px",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"auto"}}>
      {/* Back + Controls */}
      <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>navigate("/")} style={{padding:"4px 12px",borderRadius:5,border:"1px solid #444",cursor:"pointer",background:"#222",color:"#aaa",fontSize:9,fontWeight:700,marginRight:8}}>&larr; SCREENS</button>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {Object.entries(devices).map(([k,dv])=><button key={k} onClick={()=>{setDev(k);setOff(0)}} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:dev===k?"#444":"transparent",color:dev===k?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{dv.name}</button>)}
        </div>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {["portrait","landscape"].map(o=><button key={o} onClick={()=>setOri(o)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:ori===o?"#444":"transparent",color:ori===o?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{o==="portrait"?"\u2b1c Portrait":"\u25ac Landscape"}</button>)}
        </div>
        {Object.entries(T).map(([k,th])=><button key={k} onClick={()=>setTheme(k)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:theme===k?th.a:"#222",color:theme===k?(k==="stadiumNight"||k==="premiumGold"?"#111":"#fff"):"#666",fontSize:9,fontWeight:800,textTransform:"uppercase",transition:"all 0.3s"}}>{th.name}</button>)}
      </div>
      <div style={{fontSize:9,color:"#555",marginBottom:5}}>{d.name} &mdash; {iW}&times;{iH} &mdash; {(s*100).toFixed(0)}%</div>

      {/* iPad */}
      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:t.bg,boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,transition:"background 0.5s,width 0.4s,height 0.4s",flexShrink:0}}>
        <StadiumBg t={t}/>
        <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>

          {/* === TOP BAR === */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`${(isPhL?5:isPh?10:16)*s}px ${(isPh?12:22)*s}px ${(isPhL?4:isPh?8:12)*s}px`,background:`linear-gradient(180deg,${t.bg}f0,${t.bg}88)`,backdropFilter:"blur(12px)",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:(isPh?6:10)*s}}>
              <div style={{width:(isPhL?28:isPh?36:48)*s,height:(isPhL?28:isPh?36:48)*s,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.ad})`,border:`${2*s}px solid ${t.a}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:(isPhL?12:isPh?16:22)*s,boxShadow:`0 0 ${12*s}px ${t.g}`}}>{"\u{1F3CF}"}</div>
              <div>
                <div style={{fontSize:(isPhL?10:isPh?13:17)*s,fontWeight:900,color:t.tx,letterSpacing:1*s}}>PLAYER_01</div>
                {!isPhL&&<div style={{display:"flex",alignItems:"center",gap:(isPh?4:6)*s,marginTop:2*s}}>
                  <span style={{fontSize:(isPh?10:12)*s,fontWeight:800,color:t.a,background:`${t.a}22`,padding:`${2*s}px ${(isPh?5:8)*s}px`,borderRadius:5*s}}>LV.12</span>
                  <div style={{width:(isPh?40:60)*s,height:(isPh?4:5)*s,borderRadius:3,background:t.bb,overflow:"hidden"}}><div style={{width:"65%",height:"100%",borderRadius:3,background:`linear-gradient(90deg,${t.a},${t.al})`}}/></div>
                </div>}
              </div>
            </div>
            {!(isPh&&isP)&&<div style={{fontSize:isPhL?13*s:isP?15*s:19*s,fontWeight:900,color:t.tx,letterSpacing:(isPhL?2:4)*s,textShadow:`0 0 ${14*s}px ${t.g}`}}>TOP SPOT CRICKET</div>}
            <div style={{display:"flex",alignItems:"center",gap:(isPhL?4:isPh?6:10)*s}}>
              {[{e:"\u{1FA99}",v:"2,450",c:t.co},{e:"\u{1F48E}",v:"85",c:t.ge}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:(isPhL?2:isPh?3:5)*s,background:`${t.bg}aa`,padding:`${(isPhL?2:isPh?4:6)*s}px ${(isPhL?5:isPh?8:12)*s}px`,borderRadius:22*s,border:`${1*s}px solid ${t.cb}`}}>
                <span style={{fontSize:(isPhL?10:isPh?13:17)*s}}>{x.e}</span>
                <span style={{fontSize:(isPhL?9:isPh?12:15)*s,fontWeight:800,color:x.c}}>{x.v}</span>
                <span style={{fontSize:(isPhL?8:isPh?10:13)*s,fontWeight:900,color:t.a,background:`${t.a}33`,width:(isPhL?14:isPh?18:22)*s,height:(isPhL?14:isPh?18:22)*s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>+</span>
              </div>)}
              <div style={{width:(isPhL?24:isPh?32:42)*s,height:(isPhL?24:isPh?32:42)*s,borderRadius:(isPh?9:12)*s,background:`${t.bg}aa`,border:`${1*s}px solid ${t.cb}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:(isPhL?12:isPh?15:20)*s,cursor:"pointer",color:t.tm}}>{"\u2699"}</div>
            </div>
          </div>

          {/* === EVENT ROW === (hidden in phone landscape) */}
          {!isPhL&&<div style={{display:"flex",gap:(isPh?5:8)*s,padding:`${(isPh?3:5)*s}px ${(isPh?10:22)*s}px`,flexShrink:0}}>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:(isPh?6:10)*s,background:`${t.a}11`,border:`${1*s}px solid ${t.a}33`,borderRadius:(isPh?10:14)*s,padding:`${(isPh?7:10)*s}px ${(isPh?10:16)*s}px`}}>
              <span style={{fontSize:(isPh?18:26)*s}}>{"\u{1F3C6}"}</span>
              <div style={{flex:1}}><div style={{fontSize:(isPh?11:14)*s,fontWeight:800,color:t.a,letterSpacing:1*s}}>WORLD CUP SEASON</div>{!isPh&&<div style={{fontSize:12*s,color:t.ts,marginTop:2*s}}>Exclusive rewards &bull; 18 days left</div>}</div>
              <div style={{fontSize:(isPh?10:12)*s,fontWeight:800,color:t.a,background:`${t.a}22`,padding:`${(isPh?4:6)*s}px ${(isPh?8:14)*s}px`,borderRadius:8*s,cursor:"pointer"}}>VIEW &rarr;</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:(isPh?5:8)*s,background:`${t.co}11`,border:`${1*s}px solid ${t.co}33`,borderRadius:(isPh?10:14)*s,padding:`${(isPh?7:10)*s}px ${(isPh?10:16)*s}px`,cursor:"pointer"}}>
              <span style={{fontSize:(isPh?18:26)*s}}>{"\u{1F381}"}</span>
              <div><div style={{fontSize:(isPh?11:14)*s,fontWeight:800,color:t.co}}>DAY 5/7</div><div style={{fontSize:(isPh?10:12)*s,color:t.ts}}>Claim!</div></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:(isPh?4:6)*s,background:"rgba(255,100,0,0.08)",border:`${1*s}px solid rgba(255,100,0,0.2)`,borderRadius:(isPh?10:14)*s,padding:`${(isPh?7:10)*s}px ${(isPh?8:14)*s}px`}}>
              <span style={{fontSize:(isPh?18:26)*s}}>{"\u{1F525}"}</span>
              <div><div style={{fontSize:(isPh?16:20)*s,fontWeight:900,color:"#FF6D00",lineHeight:1}}>5</div><div style={{fontSize:(isPh?8:10)*s,color:t.tm,fontWeight:700}}>STREAK</div></div>
            </div>
          </div>}

          {/* === SEASON PASS === (hidden in phone landscape) */}
          {!isPhL&&<div style={{display:"flex",alignItems:"center",gap:(isPh?5:8)*s,padding:`${(isPh?3:4)*s}px ${(isPh?10:22)*s}px`,flexShrink:0}}>
            <span style={{fontSize:(isPh?9:11)*s,fontWeight:800,color:t.tm,letterSpacing:1*s,whiteSpace:"nowrap"}}>SEASON PASS</span>
            <div style={{flex:1,height:(isPh?4:5)*s,borderRadius:3,background:t.bb,overflow:"hidden"}}><div style={{width:"43%",height:"100%",borderRadius:3,background:`linear-gradient(90deg,${t.a},${t.al})`}}/></div>
            <span style={{fontSize:(isPh?9:11)*s,fontWeight:800,color:t.a}}>TIER 13 / 30</span>
          </div>}

          {/* === CENTER: MODE INFO === */}
          <div style={{flex:1,display:"flex",alignItems:isP?"stretch":"center",justifyContent:"center",padding:`${isPhL?3*s:isP?(isPh?4:8)*s:16*s}px ${(isPhL?8:isPh?10:28)*s}px`,minHeight:0,overflow:"hidden"}}>
            <div style={{
              width:"100%",maxWidth:740*s,
              display:"flex",flexDirection:"column",
              justifyContent:isP?"center":"flex-start",
              padding:`${(isPhL?8:isPh?16:isP?36:28)*s}px ${(isPhL?12:isPh?16:32)*s}px`,
              background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:(isPh?14:22)*s,
              backdropFilter:"blur(20px)",boxShadow:`0 ${8*s}px ${30*s}px rgba(0,0,0,0.3)`,
              gap:(isPhL?6:isPh?14:isP?36:28)*s,
              overflow:"auto",
            }}>
              <div style={{display:"flex",alignItems:isPhL?"center":"flex-start",gap:(isPhL?10:isPh?14:28)*s}}>
                <div style={{fontSize:(isPhL?28:isPh?42:68)*s,lineHeight:1,filter:`drop-shadow(0 0 ${16*s}px ${t.g})`,flexShrink:0,marginTop:isPhL?0:2*s}}>{m.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:(isPh?8:12)*s,marginBottom:isPhL?0:(isPh?5:8)*s}}>
                    <div style={{fontSize:(isPhL?14:isPh?20:28)*s,fontWeight:900,color:t.tx,letterSpacing:2*s,textShadow:`0 0 ${10*s}px ${t.g}`}}>{m.name}</div>
                    <div style={{fontSize:(isPhL?7:isPh?8:10)*s,fontWeight:800,color:sc(m.status),background:`${sc(m.status)}22`,padding:`${(isPhL?2:3)*s}px ${(isPhL?5:isPh?7:10)*s}px`,borderRadius:6*s,letterSpacing:1.5*s}}>{m.status}</div>
                  </div>
                  {!isPhL&&<div style={{fontSize:(isPh?13:17)*s,color:t.ts,lineHeight:1.7}}>{m.desc}</div>}
                </div>
                {isPhL&&<button style={{
                  padding:`${6*s}px ${20*s}px`,borderRadius:20*s,
                  border:"none",cursor:"pointer",background:t.pb,color:t.pt,
                  fontSize:12*s,fontWeight:900,letterSpacing:3*s,
                  boxShadow:t.pg,position:"relative",overflow:"hidden",flexShrink:0,whiteSpace:"nowrap",
                }}>
                  <div style={{position:"absolute",top:0,left:0,width:"200%",height:"100%",background:"linear-gradient(100deg,transparent 20%,rgba(255,255,255,0.18) 50%,transparent 80%)",animation:"shimmer 2.5s ease-in-out infinite"}}/>
                  <span style={{position:"relative",zIndex:1}}>{m.id==="quick"?"\u25b6 PLAY":"\u25b6 START"}</span>
                </button>}
              </div>
              <div style={{display:"flex",gap:(isPhL?4:isPh?6:10)*s}}>
                {m.st.map((x,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",background:t.card,border:`${1*s}px solid ${t.cb}`,borderRadius:(isPh?8:12)*s,padding:`${(isPhL?4:isPh?7:10)*s}px ${(isPhL?4:isPh?6:12)*s}px`}}>
                  <span style={{fontSize:(isPhL?7:isPh?9:12)*s,fontWeight:700,color:t.tm,letterSpacing:1.2*s,marginBottom:(isPhL?1:3)*s}}>{x.l}</span>
                  <span style={{fontSize:(isPhL?11:isPh?16:22)*s,fontWeight:900,color:t.a}}>{x.v}</span>
                </div>)}
              </div>
              {!isPhL&&<button style={{
                width:"100%",padding:`${(isPh?12:18)*s}px 0`,borderRadius:30*s,
                border:"none",cursor:"pointer",background:t.pb,color:t.pt,
                fontSize:(isPh?18:26)*s,fontWeight:900,letterSpacing:(isPh?4:6)*s,
                boxShadow:t.pg,position:"relative",overflow:"hidden",flexShrink:0,
              }}>
                <div style={{position:"absolute",top:0,left:0,width:"200%",height:"100%",background:"linear-gradient(100deg,transparent 20%,rgba(255,255,255,0.18) 50%,transparent 80%)",animation:"shimmer 2.5s ease-in-out infinite"}}/>
                <span style={{position:"relative",zIndex:1}}>{m.id==="quick"?"\u25b6   PLAY NOW":"\u25b6   START"}</span>
              </button>}
            </div>
          </div>

          {/* === MODE CARDS === */}
          <div style={{flexShrink:0,background:`linear-gradient(0deg,${t.bg}f8,${t.bg}bb)`,backdropFilter:"blur(12px)",borderTop:`${1*s}px solid ${t.cb}`,padding:`${(isPhL?3:isPh?5:8)*s}px 0 ${(isPhL?2:isPh?4:6)*s}px`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`0 ${(isPh?12:22)*s}px ${(isPhL?2:isPh?3:5)*s}px`}}>
              <span style={{fontSize:(isPhL?8:isPh?10:12)*s,fontWeight:900,color:t.tm,letterSpacing:(isPh?1.5:2)*s}}>GAME MODES</span>
              <div style={{display:"flex",alignItems:"center",gap:(isPh?3:4)*s}}>
                {Array.from({length:Math.ceil(modes.length/vis)}).map((_,i)=><div key={i} style={{width:(isPh?5:7)*s,height:(isPh?5:7)*s,borderRadius:"50%",background:Math.floor(off/vis)===i?t.a:t.td,transition:"background 0.3s"}}/>)}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",padding:`0 ${(isPh?4:6)*s}px`,height:cardH}}>
              <button onClick={()=>setOff(Math.max(0,off-1))} style={{width:(isPhL?22:isPh?30:44)*s,height:cardH,borderRadius:(isPhL?8:isPh?10:14)*s,flexShrink:0,marginRight:(isPh?4:6)*s,border:`${1.5*s}px solid ${off>0?t.cb:"transparent"}`,background:off>0?t.card:"transparent",color:off>0?t.tx:"transparent",fontSize:(isPhL?16:isPh?20:28)*s,fontWeight:300,cursor:off>0?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s"}}>{"\u2039"}</button>
              <div style={{flex:1,display:"flex",gap:(isPhL?4:isPh?6:10)*s,height:"100%"}}>
                {vm.map((mode,vi)=>{
                  const ri=off+vi, isSel=ri===sel, isH=ri===hov;
                  return(
                    <div key={mode.id} onClick={()=>setSel(ri)} onMouseEnter={()=>setHov(ri)} onMouseLeave={()=>setHov(null)}
                      style={{flex:1,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:(isPhL?2:isPh?4:6)*s,cursor:"pointer",position:"relative",
                        background:isSel?t.ca:t.card,borderRadius:(isPhL?9:isPh?12:18)*s,
                        border:`${(isSel?2.5:1)*s}px solid ${isSel?t.cab:t.cb}`,
                        transition:"all 0.3s ease",
                        boxShadow:isSel?`0 0 ${28*s}px ${t.g},inset 0 0 ${20*s}px ${t.g}`:isH?`0 0 ${14*s}px ${t.g}`:"none",
                        transform:isSel?"scale(1.04)":isH?"scale(1.02)":"scale(1)",
                      }}>
                      {mode.badge&&<div style={{position:"absolute",top:-6*s,right:(isPh?6:10)*s,background:isSel?t.a:`${t.a}aa`,color:t.pt,fontSize:(isPhL?6:isPh?7:9)*s,fontWeight:900,padding:`${2*s}px ${(isPh?5:7)*s}px`,borderRadius:(isPh?5:7)*s,boxShadow:isSel?`0 0 ${10*s}px ${t.g}`:"none"}}>{mode.badge}</div>}
                      <span style={{fontSize:(isPhL?20:isPh?28:40)*s,lineHeight:1,filter:isSel?`drop-shadow(0 0 ${12*s}px ${t.g})`:"none",transition:"filter 0.3s"}}>{mode.icon}</span>
                      <span style={{fontSize:(isPhL?7:isPh?9:12)*s,fontWeight:800,color:isSel?t.a:t.ts,textAlign:"center",lineHeight:1.2,letterSpacing:0.8*s,transition:"color 0.3s"}}>{mode.name}</span>
                      {isSel&&<div style={{width:"40%",height:(isPh?2:3)*s,borderRadius:2,background:t.a,boxShadow:`0 0 ${10*s}px ${t.g}`}}/>}
                      {isH&&!isSel&&<div style={{position:"absolute",bottom:`calc(100% + ${8*s}px)`,left:"50%",transform:"translateX(-50%)",background:`${t.bg}f0`,border:`${1*s}px solid ${t.cb}`,borderRadius:10*s,padding:`${(isPh?5:7)*s}px ${(isPh?8:12)*s}px`,whiteSpace:"nowrap",zIndex:100,backdropFilter:"blur(12px)",boxShadow:`0 ${4*s}px ${18*s}px rgba(0,0,0,0.6)`}}>
                        <span style={{fontSize:(isPh?9:11)*s,color:t.ts,fontWeight:600}}>{mode.tip}</span>
                        <div style={{position:"absolute",bottom:-5*s,left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:`${6*s}px solid transparent`,borderRight:`${6*s}px solid transparent`,borderTop:`${6*s}px solid ${t.bg}f0`}}/>
                      </div>}
                    </div>
                  );
                })}
              </div>
              <button onClick={()=>setOff(Math.min(maxOff,off+1))} style={{width:(isPhL?22:isPh?30:44)*s,height:cardH,borderRadius:(isPhL?8:isPh?10:14)*s,flexShrink:0,marginLeft:(isPh?4:6)*s,border:`${1.5*s}px solid ${off<maxOff?t.cb:"transparent"}`,background:off<maxOff?t.card:"transparent",color:off<maxOff?t.tx:"transparent",fontSize:(isPhL?16:isPh?20:28)*s,fontWeight:300,cursor:off<maxOff?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s"}}>{"\u203a"}</button>
            </div>
          </div>

          {/* === BOTTOM NAV === */}
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",padding:`${(isPhL?3:isPh?6:10)*s}px ${(isPh?10:16)*s}px ${(isPhL?4:isPh?8:14)*s}px`,background:`${t.bg}f8`,borderTop:`${1*s}px solid ${t.cb}`,backdropFilter:"blur(10px)",flexShrink:0}}>
            {[{i:"\u2302",l:"HOME",a:true},{i:"\u25b2",l:"RANKS"},{i:"\u25c6",l:"SHOP"},{i:"\u25cf",l:"PROFILE"}].map((n,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:(isPhL?1:isPh?2:3)*s,cursor:"pointer",opacity:n.a?1:0.4,minWidth:(isPhL?30:isPh?40:60)*s}}>
              <div style={{width:(isPhL?22:isPh?28:36)*s,height:(isPhL?22:isPh?28:36)*s,borderRadius:(isPhL?6:isPh?8:11)*s,background:n.a?`${t.a}22`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:(isPhL?11:isPh?14:18)*s,color:n.a?t.a:t.tm,fontWeight:900}}>{n.i}</div>
              {!isPhL&&<span style={{fontSize:(isPh?8:10)*s,fontWeight:800,color:n.a?t.a:t.tm,letterSpacing:1*s}}>{n.l}</span>}
              {n.a&&!isPhL&&<div style={{width:(isPh?14:20)*s,height:(isPh?2:3)*s,borderRadius:2,background:t.a,boxShadow:`0 0 ${6*s}px ${t.g}`}}/>}
            </div>)}
          </div>
        </div>
      </div>

      {/* Swatches */}
      <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center",padding:"7px 12px",background:"rgba(255,255,255,0.02)",borderRadius:7,border:"1px solid #222",maxWidth:dW}}>
        {[{c:t.bg,l:"BG"},{c:t.a,l:"ACCENT"},{c:t.ad,l:"DARK"},{c:t.al,l:"LIGHT"},{c:t.co,l:"COIN"},{c:t.ge,l:"GEM"},{c:t.tx,l:"TEXT"},{c:t.tm,l:"MUTED"}].map((x,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
          <div style={{width:26,height:26,borderRadius:4,background:x.c,border:"2px solid #333",transition:"background 0.5s"}}/>
          <span style={{fontSize:7,color:"#555",fontWeight:700}}>{x.l}</span>
          <span style={{fontSize:6,color:"#333",fontFamily:"monospace"}}>{x.c}</span>
        </div>)}
      </div>

      <style>{`
        @keyframes shimmer{0%,100%{transform:translateX(-60%)}50%{transform:translateX(20%)}}
        ::-webkit-scrollbar{display:none}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
