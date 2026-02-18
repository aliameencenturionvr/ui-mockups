import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T = {
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",green:"#4CAF50",orange:"#FF9800",red:"#F44336"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",green:"#66BB6A",orange:"#FFB74D",red:"#EF5350"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",green:"#81C784",orange:"#FFA726",red:"#EF5350"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",green:"#69F0AE",orange:"#FFAB40",red:"#FF5252"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",green:"#A5D6A7",orange:"#FFB74D",red:"#EF5350"},
};

/* ============ DEVICES ============ */
const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

/* ============ CHALLENGE DATA ============ */
const dailyChallenges=[
  {id:1,name:"Boundary Blitz",objective:"Hit 3 fours in a single over",difficulty:"HARD",xp:75,coins:60,icon:"\u{1F3CF}",completed:false},
  {id:2,name:"The Wall",objective:"Survive 12 balls without losing a wicket",difficulty:"MEDIUM",xp:75,coins:40,icon:"\u{1F6E1}\uFE0F",completed:true},
  {id:3,name:"Speed Demon",objective:"Score 20 runs in under 6 balls",difficulty:"HARD",xp:75,coins:50,icon:"\u26A1",completed:false},
];

const bonusChallenge={id:4,name:"Perfect Timing",objective:"Hit 5 PERFECT shots in a row",difficulty:"EXTREME",xp:150,coins:100,gems:5,icon:"\u{1F48E}",locked:true};

const weeklyMega={name:"Century Maker",objective:"Score a total of 500 runs across all modes this week",progress:312,target:500,coins:500,gems:50,daysLeft:3,icon:"\u{1F3C6}"};

export default function DailyChallenge(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("landscape");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[challenges,setChallenges]=useState(dailyChallenges);
  const[bonus,setBonus]=useState(bonusChallenge);
  const[countdown,setCountdown]=useState({h:7,m:23,s:41});

  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  /* Countdown timer */
  useEffect(()=>{
    const id=setInterval(()=>{
      setCountdown(c=>{
        let{h,m,s}=c;
        s--;
        if(s<0){s=59;m--}
        if(m<0){m=59;h--}
        if(h<0){h=23;m=59;s=59}
        return{h,m,s};
      });
    },1000);
    return()=>clearInterval(id);
  },[]);

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
  const completedCount=challenges.filter(c=>c.completed).length;
  const allDone=completedCount===3;
  const pad=()=>n=>String(n).padStart(2,"0");
  const p=pad();
  const timerStr=`${p(countdown.h)}:${p(countdown.m)}:${p(countdown.s)}`;

  const diffColor=(d)=>d==="EASY"?t.green:d==="MEDIUM"?t.orange:d==="HARD"?t.red:d==="EXTREME"?"#E040FB":t.a;

  /* Toggle complete for demo */
  const toggleComplete=(id)=>{
    setChallenges(prev=>prev.map(c=>c.id===id?{...c,completed:!c.completed}:c));
  };
  const unlockBonus=()=>setBonus(b=>({...b,locked:false}));

  /* ============ CHALLENGE CARD COMPONENT ============ */
  const ChallengeCard=({ch,isBonus})=>{
    const done=ch.completed;
    const locked=ch.locked;
    const cardH=z(38,80,66,90);
    return(
      <div
        onClick={()=>{if(locked)unlockBonus();else if(!done)toggleComplete(ch.id);}}
        style={{
          ...cardBg,
          borderRadius:z(8,16,14,18),
          border:`${1.5*s}px solid ${done?t.green+"66":locked?t.td+"44":t.cb}`,
          padding:`${z(5,12,10,14)}px ${z(6,14,12,16)}px`,
          display:"flex",
          alignItems:"center",
          gap:z(5,12,10,14),
          cursor:"pointer",
          opacity:done?0.65:1,
          transition:"all 0.2s",
          minHeight:cardH,
          position:"relative",
          overflow:"hidden",
        }}
      >
        {/* Done overlay */}
        {done&&<div style={{position:"absolute",inset:0,background:`${t.green}08`}}/>}

        {/* Icon */}
        <div style={{
          width:z(24,50,44,56),height:z(24,50,44,56),borderRadius:z(6,12,10,14),
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:z(14,28,24,32),flexShrink:0,
          background:done?`${t.green}22`:locked?`${t.td}22`:`${t.a}15`,
          border:`${1*s}px solid ${done?t.green+"44":locked?t.td+"44":t.a+"33"}`,
        }}>
          {done?"\u2705":locked?"\u{1F512}":ch.icon}
        </div>

        {/* Info */}
        <div style={{flex:1,minWidth:0,position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:z(4,8,6,10),marginBottom:z(1,3,2,4)}}>
            <span style={{fontSize:z(9,18,16,20),fontWeight:900,color:done?t.green:t.tx,letterSpacing:0.5*s}}>
              {ch.name}
            </span>
            <span style={{
              fontSize:z(5,9,8,10),fontWeight:800,
              color:diffColor(ch.difficulty),
              background:`${diffColor(ch.difficulty)}22`,
              padding:`${1*s}px ${z(3,6,5,7)}px`,
              borderRadius:z(2,4,3,5),
              letterSpacing:0.5*s
            }}>{ch.difficulty}</span>
          </div>
          <div style={{fontSize:z(6,13,11,15),color:done?t.green:t.ts,lineHeight:1.3,
            textDecoration:done?"line-through":"none",
          }}>
            {locked?"Watch an ad to unlock this challenge":ch.objective}
          </div>
        </div>

        {/* Reward + Action */}
        <div style={{display:"flex",alignItems:"center",gap:z(4,8,7,10),flexShrink:0,position:"relative",zIndex:1}}>
          {/* Rewards */}
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:z(6,11,10,13),fontWeight:800,color:t.co}}>+{ch.xp} XP</div>
            <div style={{fontSize:z(5,10,9,12),color:t.tm}}>
              {ch.coins}{"\u{1FA99}"}{ch.gems?` + ${ch.gems}\u{1F48E}`:""}
            </div>
          </div>
          {/* Button */}
          <div style={{
            padding:`${z(4,10,8,12)}px ${z(8,18,14,20)}px`,
            borderRadius:z(5,10,8,12),
            background:done?`${t.green}22`:locked?`${t.td}33`:t.pb,
            color:done?t.green:locked?t.tm:t.pt,
            fontSize:z(7,14,12,16),fontWeight:900,letterSpacing:z(1,2,2,2),
            border:done?`${1.5*s}px solid ${t.green}44`:locked?`${1.5*s}px solid ${t.td}44`:"none",
            cursor:"pointer",
          }}>
            {done?"DONE":locked?"\u{1F4FA} AD":"PLAY"}
          </div>
        </div>
      </div>
    );
  };

  /* ============ PROGRESS BAR ============ */
  const ProgressSection=()=>{
    const barH=z(5,10,8,12);
    const pct=(completedCount/3)*100;
    return(
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:z(2,5,4,6)}}>
          <span style={{fontSize:z(6,12,10,14),fontWeight:800,color:t.tm,letterSpacing:1*s}}>
            {completedCount}/3 COMPLETED
          </span>
          {allDone&&(
            <span style={{fontSize:z(6,12,10,14),fontWeight:900,color:t.co,letterSpacing:0.5*s,animation:"pulse 1.5s infinite"}}>
              COLLECT DAILY BONUS!
            </span>
          )}
        </div>
        <div style={{height:barH,borderRadius:barH/2,background:`${t.td}44`,overflow:"hidden"}}>
          <div style={{
            height:"100%",width:`${pct}%`,borderRadius:barH/2,
            background:allDone?t.green:t.pb,
            transition:"width 0.5s ease",
            boxShadow:allDone?`0 0 ${8*s}px ${t.green}66`:undefined,
          }}/>
        </div>
        {allDone&&(
          <div style={{
            display:"flex",alignItems:"center",justifyContent:"center",gap:z(4,8,7,10),
            marginTop:z(3,6,5,8),
            padding:`${z(3,8,6,10)}px`,
            borderRadius:z(5,10,8,12),
            background:`${t.co}15`,
            border:`${1*s}px solid ${t.co}44`,
          }}>
            <span style={{fontSize:z(10,20,18,24)}}>🎁</span>
            <span style={{fontSize:z(7,14,12,16),fontWeight:800,color:t.co}}>200{"\u{1FA99}"} + 10{"\u{1F48E}"}</span>
            <button style={{
              padding:`${z(3,7,5,8)}px ${z(8,16,12,18)}px`,
              borderRadius:z(4,8,6,10),background:t.co,color:"#000",
              fontSize:z(6,12,10,14),fontWeight:900,border:"none",cursor:"pointer",letterSpacing:0.5*s,
            }}>COLLECT</button>
          </div>
        )}
      </div>
    );
  };

  /* ============ WEEKLY MEGA CARD ============ */
  const WeeklyMega=()=>{
    const pct=Math.round((weeklyMega.progress/weeklyMega.target)*100);
    const barH=z(5,10,8,12);
    return(
      <div style={{
        ...cardBg,
        borderRadius:z(8,16,14,18),
        border:`${1.5*s}px solid ${t.co}44`,
        padding:`${z(5,12,10,14)}px ${z(6,14,12,16)}px`,
        background:`linear-gradient(135deg, ${t.card}, ${t.co}08)`,
        backdropFilter:"blur(20px)",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:z(5,12,10,14)}}>
          <div style={{
            width:z(24,50,44,56),height:z(24,50,44,56),borderRadius:z(6,12,10,14),
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:z(14,28,24,32),flexShrink:0,
            background:`${t.co}22`,border:`${1*s}px solid ${t.co}44`,
          }}>{weeklyMega.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:z(4,8,6,10),marginBottom:z(1,3,2,4)}}>
              <span style={{fontSize:z(6,10,9,12),fontWeight:800,color:t.co,letterSpacing:1*s}}>WEEKLY MEGA CHALLENGE</span>
              <span style={{fontSize:z(5,9,8,10),fontWeight:800,color:t.orange,background:`${t.orange}22`,padding:`${1*s}px ${z(3,6,5,7)}px`,borderRadius:z(2,4,3,5)}}>{weeklyMega.daysLeft}d LEFT</span>
            </div>
            <div style={{fontSize:z(8,16,14,18),fontWeight:900,color:t.tx,marginBottom:z(1,3,2,3)}}>{weeklyMega.name}</div>
            <div style={{fontSize:z(6,12,10,14),color:t.ts,marginBottom:z(2,5,4,6)}}>{weeklyMega.objective}</div>
            <div style={{display:"flex",alignItems:"center",gap:z(4,8,6,10)}}>
              <div style={{flex:1,height:barH,borderRadius:barH/2,background:`${t.td}44`,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,borderRadius:barH/2,background:t.pb,transition:"width 0.5s ease"}}/>
              </div>
              <span style={{fontSize:z(6,11,10,13),fontWeight:800,color:t.a,flexShrink:0}}>{weeklyMega.progress}/{weeklyMega.target}</span>
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:z(6,11,10,13),fontWeight:800,color:t.co}}>500{"\u{1FA99}"}</div>
            <div style={{fontSize:z(6,11,10,13),fontWeight:800,color:"#E040FB"}}>50{"\u{1F48E}"}</div>
          </div>
        </div>
      </div>
    );
  };

  /* ============ HEADER ============ */
  const Header=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:z(4,10,8,12)}}>
      <div style={{display:"flex",alignItems:"center",gap:z(4,10,8,12)}}>
        <span style={{fontSize:z(16,32,28,36)}}>⭐</span>
        <div>
          <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.tx,letterSpacing:z(2,4,3,4)}}>DAILY CHALLENGES</div>
          <div style={{fontSize:z(6,12,10,14),color:t.tm,fontWeight:700}}>Complete all 3 to earn the Daily Bonus!</div>
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontSize:z(5,10,8,12),fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>REFRESHES IN</div>
        <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.a,fontVariantNumeric:"tabular-nums",letterSpacing:1*s}}>{timerStr}</div>
      </div>
    </div>
  );

  /* ============ BACK BUTTON ============ */
  const BackBtn=()=>(
    <button
      onClick={()=>navigate("/main-menu")}
      style={{
        position:"absolute",top:z(6,14,12,16),left:z(6,14,12,16),zIndex:20,
        padding:`${z(4,10,8,12)}px ${z(8,18,14,20)}px`,
        borderRadius:z(6,12,10,14),
        ...cardBg,
        border:`${1.5*s}px solid ${t.cb}`,
        color:t.ts,fontSize:z(8,16,14,18),fontWeight:800,cursor:"pointer",letterSpacing:0.5*s,
      }}
    >
      ← BACK
    </button>
  );

  /* ============ LAYOUTS ============ */
  /* iPad Landscape: single column — header+progress above challenge cards + weekly */
  const iPadLandscape=(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:"85%",maxWidth:700*s,display:"flex",flexDirection:"column",justifyContent:"center",flex:1,padding:`${z(0,0,14,0)}px 0`,gap:z(0,0,6,0)}}>
        <Header/>
        <ProgressSection/>
        <div style={{display:"flex",flexDirection:"column",gap:z(0,0,6,0),marginTop:z(0,0,4,0)}}>
          {challenges.map(ch=><ChallengeCard key={ch.id} ch={ch}/>)}
          <ChallengeCard ch={bonus} isBonus/>
        </div>
        <div style={{marginTop:z(0,0,4,0)}}><WeeklyMega/></div>
      </div>
    </div>
  );

  /* Phone Landscape: single column — compact header above cards + weekly */
  const phoneLandscape=(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:"90%",display:"flex",flexDirection:"column",justifyContent:"center",flex:1,padding:`${z(4,0,0,0)}px 0`,gap:z(2,0,0,0)}}>
        <Header/>
        <ProgressSection/>
        <div style={{display:"flex",flexDirection:"column",gap:z(2,0,0,0),marginTop:z(2,0,0,0)}}>
          {challenges.map(ch=><ChallengeCard key={ch.id} ch={ch}/>)}
          <ChallengeCard ch={bonus} isBonus/>
        </div>
        <div style={{marginTop:z(2,0,0,0)}}><WeeklyMega/></div>
      </div>
    </div>
  );

  /* Phone Portrait: single column, scrollable area */
  const phonePortrait=(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:`${z(0,36,0,0)}px ${z(0,14,0,0)}px ${z(0,14,0,0)}px`,gap:z(0,8,0,0),justifyContent:"center"}}>
        <Header/>
        <ProgressSection/>
        <div style={{display:"flex",flexDirection:"column",gap:z(0,7,0,0)}}>
          {challenges.map(ch=><ChallengeCard key={ch.id} ch={ch}/>)}
          <ChallengeCard ch={bonus} isBonus/>
        </div>
        <WeeklyMega/>
      </div>
    </div>
  );

  /* iPad Portrait: centered column, wider cards */
  const iPadPortrait=(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:"80%",maxWidth:600*s,display:"flex",flexDirection:"column",padding:`${z(0,0,0,36)}px 0 ${z(0,0,0,14)}px`,gap:z(0,0,0,10),justifyContent:"center",flex:1}}>
        <Header/>
        <ProgressSection/>
        <div style={{display:"flex",flexDirection:"column",gap:z(0,0,0,8)}}>
          {challenges.map(ch=><ChallengeCard key={ch.id} ch={ch}/>)}
          <ChallengeCard ch={bonus} isBonus/>
        </div>
        <WeeklyMega/>
      </div>
    </div>
  );

  /* Pick layout */
  const layout=isPhL?phoneLandscape:isPh?phonePortrait:isP?iPadPortrait:iPadLandscape;

  /* ============ BACKGROUND ============ */
  const Bg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 20%, ${t.a}12 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${t.co}08 0%, transparent 40%), ${t.bg}`}}/>
      {/* Decorative star shapes */}
      {[{x:15,y:12,sz:60},{x:80,y:25,sz:40},{x:50,y:85,sz:50},{x:90,y:70,sz:35}].map((st,i)=>(
        <div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,fontSize:st.sz*s*0.15,opacity:0.06,transform:"rotate(15deg)"}}>⭐</div>
      ))}
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

      {/* Device frame */}
      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:t.bg,boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        <Bg/>
        <div style={{position:"relative",width:"100%",height:"100%",zIndex:1}}>
          {layout}
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        ::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
