import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T = {
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",gold:"#FFD740",silver:"#C0C0C0",bronze:"#CD7F32"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",gold:"#FFD740",silver:"#C0C0C0",bronze:"#CD7F32"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",gold:"#FFD740",silver:"#C0C0C0",bronze:"#CD7F32"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",gold:"#FFD740",silver:"#C0C0C0",bronze:"#CD7F32"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",gold:"#FFD740",silver:"#C0C0C0",bronze:"#CD7F32"},
};

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
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
];

const tabs=["WEEKLY","SURVIVAL","POWER OVER","WORLD CUP","GAUNTLET","FRIENDS"];
const scopes=["GLOBAL","MY COUNTRY","FRIENDS"];

/* Generate fake leaderboard data */
const names=["CricketKing99","BatMaster_X","SixHitter42","WicketWiz","SpinLord","RunMachine","BoundaryBoss","PacePro","CenturyMaker","SlamDunk6","FastBowl","SmashKing","DriveMaster","PullShot","CoverDrive","HookMaster","SweepKing","GlancePro","LegSpin","OffBreak"];

const generatePlayers=(tab)=>{
  const seed=tab*13;
  return Array.from({length:20},(_,i)=>{
    const idx=(seed+i*7)%names.length;
    const teamIdx=(seed+i*3)%teams.length;
    const baseScore=tab===1?[287,245,212,198,187,176,165,154,148,142,138,131,127,122,118,112,108,103,99,94]:
                    tab===2?[36,34,32,31,30,29,28,27,26,25,24,24,23,22,22,21,20,20,19,18]:
                    tab===3?[12,10,9,8,7,7,6,6,5,5,4,4,3,3,3,2,2,2,1,1]:
                    tab===4?[1840,1720,1650,1580,1520,1460,1400,1350,1290,1240,1190,1140,1100,1060,1020,980,940,900,870,840]:
                    [156,148,142,138,131,127,122,118,112,108,103,99,94,91,88,85,82,79,76,73];
    return{
      rank:i+1,
      name:names[idx],
      team:teams[teamIdx],
      score:baseScore[i]||(100-i*3),
      isMe:i===6,
    };
  });
};

export default function Leaderboard(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[tab,setTab]=useState(0);
  const[scope,setScope]=useState(0);

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
  const players=generatePlayers(tab);
  const top3=players.slice(0,3);
  const rest=players.slice(3);
  const myPlayer=players.find(p=>p.isMe);
  const myPct=myPlayer?Math.round((1-myPlayer.rank/100)*100):0;

  const metricLabel=tab===0?"RUNS":tab===1?"RUNS":tab===2?"RUNS/6B":tab===3?"WINS":tab===4?"SCORE":"RUNS";
  const resetLabel=tab===0?"Resets Monday":tab===1?"All Time":tab===2?"All Time":tab===3?"Resets Monthly":tab===4?"All Time":"Resets Monday";

  /* ============ BACK BUTTON ============ */
  const BackBtn=()=>(
    <button onClick={()=>navigate("/main-menu")} style={{
      position:"absolute",top:z(6,14,12,16),left:z(6,14,12,16),zIndex:20,
      padding:`${z(4,10,8,12)}px ${z(8,18,14,20)}px`,
      borderRadius:z(6,12,10,14),...cardBg,
      border:`${1.5*s}px solid ${t.cb}`,
      color:t.ts,fontSize:z(8,16,14,18),fontWeight:800,cursor:"pointer",letterSpacing:0.5*s,
    }}>← BACK</button>
  );

  /* ============ HEADER ============ */
  const Header=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:z(3,8,6,10)}}>
      <div style={{display:"flex",alignItems:"center",gap:z(4,10,8,12)}}>
        <span style={{fontSize:z(16,32,28,36)}}>🏆</span>
        <div>
          <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.tx,letterSpacing:z(2,4,3,4)}}>LEADERBOARDS</div>
          <div style={{fontSize:z(6,12,10,14),color:t.tm,fontWeight:700}}>{resetLabel}</div>
        </div>
      </div>
    </div>
  );

  /* ============ TABS ============ */
  const TabBar=()=>(
    <div style={{display:"flex",gap:z(2,4,3,4),marginBottom:z(3,8,6,10),flexWrap:"wrap"}}>
      {tabs.map((tb,i)=>(
        <button key={i} onClick={()=>setTab(i)} style={{
          padding:`${z(3,7,5,8)}px ${z(5,12,10,14)}px`,
          borderRadius:z(4,8,6,10),border:`${1*s}px solid ${tab===i?t.a+"88":t.td+"44"}`,
          background:tab===i?`${t.a}22`:"transparent",
          color:tab===i?t.a:t.tm,fontSize:z(5,10,9,12),fontWeight:800,
          cursor:"pointer",letterSpacing:0.3*s,
        }}>{tb}</button>
      ))}
    </div>
  );

  /* ============ SCOPE TOGGLE ============ */
  const ScopeToggle=()=>(
    <div style={{display:"flex",gap:z(1,2,2,2),background:`${t.td}22`,borderRadius:z(5,10,8,12),padding:z(1,2,2,2),marginBottom:z(3,8,6,10),alignSelf:"flex-start"}}>
      {scopes.map((sc,i)=>(
        <button key={i} onClick={()=>setScope(i)} style={{
          padding:`${z(3,6,5,7)}px ${z(6,14,10,16)}px`,
          borderRadius:z(4,8,6,10),border:"none",
          background:scope===i?t.a:"transparent",
          color:scope===i?t.pt:t.tm,fontSize:z(5,10,9,12),fontWeight:800,
          cursor:"pointer",letterSpacing:0.3*s,
        }}>{sc}</button>
      ))}
    </div>
  );

  /* ============ PODIUM ============ */
  const podiumColors=[t.gold,t.silver,t.bronze];
  const podiumHeights=[z(50,100,85,110),z(38,76,64,84),z(30,60,50,66)];
  const podiumOrder=[1,0,2];

  const Podium=()=>(
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:z(4,10,8,12),marginBottom:z(4,10,8,12)}}>
      {podiumOrder.map(idx=>{
        const p=top3[idx];
        if(!p) return null;
        const col=podiumColors[idx];
        const h=podiumHeights[idx];
        const isFirst=idx===0;
        return(
          <div key={idx} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:z(2,4,3,5)}}>
            <div style={{position:"relative"}}>
              {isFirst&&<div style={{position:"absolute",top:z(-8,-16,-14,-18),left:"50%",transform:"translateX(-50%)",fontSize:z(10,20,18,24)}}>👑</div>}
              <div style={{
                width:z(22,46,38,52),height:z(22,46,38,52),borderRadius:"50%",
                border:`${2*s}px solid ${col}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:z(12,24,20,28),background:`${col}22`,
              }}>{p.team.flag}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:z(6,12,10,14),fontWeight:800,color:t.tx,maxWidth:z(50,100,80,110),overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
              <div style={{fontSize:z(8,16,14,18),fontWeight:900,color:col}}>{p.score}</div>
            </div>
            <div style={{
              width:z(40,80,66,90),height:h,
              borderRadius:`${z(4,8,6,10)}px ${z(4,8,6,10)}px 0 0`,
              background:`linear-gradient(180deg, ${col}44, ${col}11)`,
              border:`${1*s}px solid ${col}44`,borderBottom:"none",
              display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:z(3,6,5,8),
            }}>
              <span style={{fontSize:z(12,24,20,28),fontWeight:900,color:col}}>#{idx+1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ============ PLAYER ROW ============ */
  const PlayerRow=({p})=>{
    const isMe=p.isMe;
    return(
      <div style={{
        display:"flex",alignItems:"center",gap:z(4,8,7,10),
        padding:`${z(4,8,7,10)}px ${z(5,10,8,12)}px`,
        borderRadius:z(6,12,10,14),
        background:isMe?`${t.a}15`:"transparent",
        border:isMe?`${1.5*s}px solid ${t.a}44`:`${1*s}px solid transparent`,
        marginBottom:z(1,2,2,3),
      }}>
        <div style={{width:z(16,32,28,36),textAlign:"center",flexShrink:0}}>
          <span style={{fontSize:z(8,16,14,18),fontWeight:900,color:isMe?t.a:t.tm}}>{p.rank}</span>
        </div>
        <span style={{fontSize:z(10,20,18,22),flexShrink:0}}>{p.team.flag}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:z(7,14,12,16),fontWeight:isMe?900:700,color:isMe?t.a:t.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {p.name}{isMe?" (YOU)":""}
          </div>
          <div style={{fontSize:z(5,9,8,11),color:t.tm}}>{p.team.short}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:z(9,18,16,20),fontWeight:900,color:isMe?t.a:t.tx}}>{p.score}</div>
          <div style={{fontSize:z(4,8,7,9),fontWeight:700,color:t.td}}>{metricLabel}</div>
        </div>
      </div>
    );
  };

  /* ============ STICKY MY RANK ============ */
  const MyRank=()=>myPlayer?(
    <div style={{
      ...cardBg,borderRadius:z(8,16,14,18),
      border:`${1.5*s}px solid ${t.a}66`,
      padding:`${z(4,10,8,12)}px ${z(6,14,12,16)}px`,
      display:"flex",alignItems:"center",justifyContent:"space-between",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:z(4,8,7,10)}}>
        <span style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.a}}>#{myPlayer.rank}</span>
        <span style={{fontSize:z(10,20,18,22)}}>{myPlayer.team.flag}</span>
        <div>
          <div style={{fontSize:z(7,14,12,16),fontWeight:900,color:t.a}}>{myPlayer.name}</div>
          <div style={{fontSize:z(5,10,9,12),color:t.tm}}>Top {myPct}%</div>
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.a}}>{myPlayer.score}</div>
        <div style={{fontSize:z(5,9,8,10),fontWeight:700,color:t.tm}}>{metricLabel}</div>
      </div>
    </div>
  ):null;

  /* ============ LIST ============ */
  const PlayerList=()=>(
    <div style={{flex:1,overflow:"auto",marginBottom:z(3,6,5,8)}}>
      {rest.map(p=><PlayerRow key={p.rank} p={p}/>)}
    </div>
  );

  /* ============ LAYOUT BUILDER ============ */
  const buildLayout=(padTop,width,maxW)=>(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:width?"center":"stretch",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:width||"auto",maxWidth:maxW,display:"flex",flexDirection:"column",flex:1,paddingTop:padTop,...(!width&&{padding:`${padTop}px ${z(0,14,0,14)}px ${z(0,10,0,10)}px`})}}>
        <Header/>
        <TabBar/>
        <ScopeToggle/>
        <Podium/>
        <PlayerList/>
        <MyRank/>
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
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 10%, ${t.gold}10 0%, transparent 40%), radial-gradient(ellipse at 30% 70%, ${t.a}08 0%, transparent 40%), ${t.bg}`}}/>
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
