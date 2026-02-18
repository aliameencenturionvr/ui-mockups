import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const T = {
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C"},
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

const bowlers=["M. Starc","J. Bumrah","S. Afridi","T. Boult","K. Rabada","M. Henry","J. Archer","W. Hasaranga"];

const shotResults=[
  {runs:0,label:"DOT",timing:"GOOD",timColor:"#FFF"},
  {runs:1,label:"ONE",timing:"GOOD",timColor:"#FFF"},
  {runs:1,label:"ONE",timing:"EARLY",timColor:"#FF9800"},
  {runs:2,label:"TWO",timing:"PERFECT!",timColor:"#FFD740"},
  {runs:4,label:"FOUR!",timing:"PERFECT!",timColor:"#FFD740"},
  {runs:4,label:"FOUR!",timing:"GOOD",timColor:"#FFF"},
  {runs:6,label:"SIX!",timing:"PERFECT!",timColor:"#FFD740"},
  {runs:0,label:"DOT",timing:"LATE",timColor:"#FF9800"},
  {runs:0,label:"MISS",timing:"MISS",timColor:"#F44336"},
  {runs:0,label:"WICKET!",timing:"MISS",timColor:"#F44336",isWicket:true},
  {runs:2,label:"TWO",timing:"GOOD",timColor:"#FFF"},
  {runs:1,label:"ONE",timing:"LATE",timColor:"#FF9800"},
];

const speedPool=[128,131,134,137,139,141,143,145,138,126,133,140,147,136,142];

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

const gameModes=["QUICK MATCH","CHASE","POWER OVER","GAUNTLET"];
const hudVersions=[{v:"v1",label:"TV Scorestrip"},{v:"v2",label:"Minimal Top-Left"},{v:"v3",label:"Stadium Scoreboard"}];

export default function GameplayHUD(){
  const navigate=useNavigate();
  const[searchParams,setSearchParams]=useSearchParams();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("landscape");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[mode,setMode]=useState(0);

  const ver=searchParams.get("v")||"v3";
  const setVer=(v)=>setSearchParams({v});

  const[runs,setRuns]=useState(47);
  const[wickets,setWickets]=useState(1);
  const[overs,setOvers]=useState(2);
  const[ballInOver,setBallInOver]=useState(3);
  const[thisOver,setThisOver]=useState([4,1,0,"W"]);
  const[lastSpeed,setLastSpeed]=useState(138);
  const[bowlerIdx,setBowlerIdx]=useState(0);
  const[popup,setPopup]=useState(null);
  const[popKey,setPopKey]=useState(0);
  const[chaseFlip,setChaseFlip]=useState(false);

  const t=T[theme];
  const dv=devices[dev];
  const isPh=dev==="iphone";
  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  useEffect(()=>{
    if(mode!==1) return;
    const id=setInterval(()=>setChaseFlip(f=>!f),3000);
    return()=>clearInterval(id);
  },[mode]);

  const isP=ori==="portrait";
  const isPhL=isPh&&!isP;
  const iW=isP?dv.pw:dv.lw,iH=isP?dv.ph:dv.lh;
  let dW=Math.min(ws.w-20,1100),dH=dW/(iW/iH);
  if(dH>ws.h-130){dH=ws.h-130;dW=dH*(iW/iH)}
  const s=dW/iW;
  const z=(a,b,c,d)=>(isPhL?a:isPh?b:isP?d:c)*s;

  const chaseTarget=82;
  const gauntletRound=4;
  const gauntletTeam=teams[9];

  const nextBall=useCallback(()=>{
    const sr=shotResults[Math.floor(Math.random()*shotResults.length)];
    const spd=speedPool[Math.floor(Math.random()*speedPool.length)];
    setLastSpeed(spd);
    if(ballInOver>=6){
      setOvers(o=>o+1);setBallInOver(1);
      setThisOver([sr.isWicket?"W":sr.runs]);
      setBowlerIdx(i=>(i+1)%bowlers.length);
    }else{
      setBallInOver(b=>b+1);
      setThisOver(prev=>[...prev,sr.isWicket?"W":sr.runs]);
    }
    if(sr.isWicket) setWickets(w=>w+1);
    else setRuns(r=>r+sr.runs);
    setPopup(sr);setPopKey(k=>k+1);
    setTimeout(()=>setPopup(null),1200);
  },[ballInOver]);

  const overStr=`${overs}.${ballInOver>6?0:ballInOver}`;
  const need=Math.max(0,chaseTarget-runs);
  const ballsLeft=Math.max(1,18-(overs*6+ballInOver));
  const rrr=(need/(ballsLeft/6)).toFixed(1);
  const crr=(runs/((overs*6+ballInOver)/6)).toFixed(1);

  const dotColor=(v)=>{
    if(v==="W") return "#F44336";
    if(v===0) return t.tm;
    if(v===4) return "#4CAF50";
    if(v===6) return "#FFD740";
    return t.ts;
  };

  const Sep=()=>(<div style={{width:1.5*s,alignSelf:"stretch",background:t.cb,margin:`0 ${z(3,5,5,6)}px`,flexShrink:0}}/>);

  const cardBg={background:t.card,backdropFilter:"blur(20px)"};

  /* ========== Field Background ========== */
  const FieldBg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1a3a5c 0%,#2a5a3a 35%,#1a4a1a 50%,#0d2d0d 100%)"}}/>
      <div style={{position:"absolute",bottom:"10%",left:"42%",width:"16%",height:"60%",background:"linear-gradient(180deg,#c4a44a22 0%,#c4a44a44 40%,#c4a44a66 100%)",transform:"perspective(600px) rotateX(30deg)",transformOrigin:"bottom center"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"repeating-linear-gradient(0deg,#1a5a1a 0px,#1a5a1a 20px,#1d5d1d 20px,#1d5d1d 40px)",opacity:0.3}}/>
      <div style={{position:"absolute",top:"28%",left:"49%",width:3*s,height:18*s,background:"#d4b46a",borderRadius:1,opacity:0.6}}/>
      <div style={{position:"absolute",top:"28%",left:"50%",width:3*s,height:18*s,background:"#d4b46a",borderRadius:1,opacity:0.6}}/>
      <div style={{position:"absolute",top:"28%",left:"51%",width:3*s,height:18*s,background:"#d4b46a",borderRadius:1,opacity:0.6}}/>
      {[12,88].map(x=><div key={x} style={{position:"absolute",top:"5%",left:`${x}%`,width:4*s,height:4*s,borderRadius:"50%",background:"#ffe",boxShadow:`0 0 ${12*s}px #ffe,0 0 ${30*s}px rgba(255,255,230,0.3)`,opacity:0.7}}/>)}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 60%,transparent 20%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0.7) 100%)"}}/>
    </div>
  );

  /* ========== Shot Popup (all versions) ========== */
  const shotPopup=popup&&(
    <div key={popKey} style={{position:"absolute",top:isP?"40%":"36%",left:"50%",transform:"translate(-50%,-50%)",zIndex:20,textAlign:"center",animation:"popIn 0.3s ease-out",pointerEvents:"none"}}>
      <div style={{fontSize:z(34,72,60,85),fontWeight:900,color:popup.isWicket?"#F44336":popup.runs>=4?"#FFD740":t.tx,textShadow:`0 0 ${30*s}px ${popup.isWicket?"rgba(244,67,54,0.8)":popup.runs>=4?"rgba(255,215,64,0.8)":"rgba(255,255,255,0.5)"},0 ${4*s}px ${20*s}px rgba(0,0,0,0.8)`,letterSpacing:z(4,8,6,10)}}>{popup.label}</div>
      <div style={{fontSize:z(12,24,20,30),fontWeight:800,color:popup.timColor,textShadow:`0 ${2*s}px ${10*s}px rgba(0,0,0,0.8)`,marginTop:z(2,5,5,7),letterSpacing:z(3,5,5,6)}}>{popup.timing}</div>
    </div>
  );

  /* ========== Next Ball Button (all versions) ========== */
  const nextBallBtn=(
    <button onClick={nextBall} style={{position:"absolute",bottom:z(34,70,58,80),left:"50%",transform:"translateX(-50%)",zIndex:15,padding:`${z(8,18,14,22)}px ${z(20,44,36,52)}px`,borderRadius:z(24,36,36,44),border:`${2*s}px solid ${t.a}88`,background:`${t.a}22`,backdropFilter:"blur(12px)",color:t.a,fontSize:z(10,20,16,22),fontWeight:900,letterSpacing:z(2,4,4,5),cursor:"pointer"}}>
      NEXT BALL
    </button>
  );

  /* === Shared: over dot builder === */
  const makeDots=(sz)=>(
    <div style={{display:"flex",alignItems:"center",gap:z(3,5,4,6)}}>
      {[0,1,2,3,4,5].map(i=>(
        <div key={i} style={{width:sz,height:sz,borderRadius:sz/2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*0.55,fontWeight:900,
          background:i<thisOver.length?`${dotColor(thisOver[i])}22`:"rgba(255,255,255,0.06)",
          border:`${1.5*s}px solid ${i<thisOver.length?dotColor(thisOver[i])+"88":"rgba(255,255,255,0.1)"}`,
          color:i<thisOver.length?dotColor(thisOver[i]):t.td
        }}>
          {i<thisOver.length?(thisOver[i]==="W"?"W":thisOver[i]):""}
        </div>
      ))}
    </div>
  );

  /* ================================================================
     V1 — TV SCORESTRIP (upsized ~30%)
     ================================================================ */
  const v1_batSection=(
    <div style={{display:"flex",alignItems:"center",gap:z(4,7,7,8)}}>
      <span style={{fontSize:z(16,26,24,28)}}>{teams[0].flag}</span>
      <span style={{fontSize:z(11,18,16,18),fontWeight:800,color:t.ts,letterSpacing:0.5*s}}>{teams[0].short}</span>
      <span style={{fontSize:z(20,36,30,40),fontWeight:900,color:t.tx,letterSpacing:1*s}}>{runs}/{wickets}</span>
      <span style={{fontSize:z(10,18,16,20),fontWeight:700,color:t.a}}>({overStr})</span>
    </div>
  );

  const v1_bowlSection=(
    <div style={{display:"flex",alignItems:"center",gap:z(4,7,7,8)}}>
      <span style={{fontSize:z(16,26,24,28)}}>{teams[1].flag}</span>
      <div>
        <div style={{fontSize:z(9,16,14,17),fontWeight:700,color:t.ts,lineHeight:1.1}}>{bowlers[bowlerIdx]}</div>
        <div style={{fontSize:z(7,10,9,11),color:t.tm,lineHeight:1.1}}>BOWLING</div>
      </div>
      <Sep/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:z(13,24,20,28),fontWeight:900,color:t.tx,lineHeight:1}}>{lastSpeed}</div>
        <div style={{fontSize:z(6,9,8,10),fontWeight:700,color:t.tm}}>KM/H</div>
      </div>
    </div>
  );

  const v1_stat=(label,val,c)=>(
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:z(6,9,8,10),fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>{label}</div>
      <div style={{fontSize:z(13,24,20,28),fontWeight:900,color:c,lineHeight:1}}>{val}</div>
    </div>
  );

  const v1_chasePart=(<div style={{display:"flex",alignItems:"center",gap:z(5,10,10,12)}}>{v1_stat("NEED",need,"#FF9800")}{v1_stat("RRR",rrr,"#F44336")}{v1_stat("TGT",chaseTarget,t.tm)}</div>);
  const v1_powerPart=(<div style={{display:"flex",alignItems:"center",gap:z(5,10,10,12)}}>{v1_stat("BALL",`${Math.min(ballInOver,6)}/6`,t.a)}{v1_stat("TOTAL",runs,"#FFD740")}</div>);
  const v1_gauntletPart=(
    <div style={{display:"flex",alignItems:"center",gap:z(4,7,7,8)}}>
      {v1_stat("ROUND",`${gauntletRound}/10`,t.a)}
      <span style={{fontSize:z(13,20,18,22)}}>{gauntletTeam.flag}</span>
      <div style={{display:"flex",gap:z(2,3,3,4)}}>{[0,1,2].map(i=><span key={i} style={{fontSize:z(10,18,16,20),opacity:i<wickets?0.25:1}}>{"\u{1F3CF}"}</span>)}</div>
    </div>
  );
  const v1_modePart=mode===1?v1_chasePart:mode===2?v1_powerPart:mode===3?v1_gauntletPart:null;

  const v1_stripPad=`${z(6,12,10,14)}px ${z(8,14,14,18)}px`;
  const v1_dots=makeDots(z(16,26,24,30));

  const v1_landscapeStrip=(
    <div style={{...cardBg,display:"flex",alignItems:"center",padding:v1_stripPad,borderTop:`${1.5*s}px solid ${t.cb}`,gap:z(2,0,4,0)}}>
      {v1_batSection}<Sep/>{v1_dots}<Sep/>{v1_bowlSection}{v1_modePart&&<><Sep/>{v1_modePart}</>}
    </div>
  );

  const v1_portraitStrip=(
    <div style={{...cardBg,borderTop:`${1.5*s}px solid ${t.cb}`,display:"flex",flexDirection:"column",gap:z(0,6,0,7)}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`${z(0,10,0,12)}px ${z(0,14,0,18)}px 0`}}>
        {v1_batSection}
        {v1_modePart||v1_bowlSection}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`0 ${z(0,14,0,18)}px ${z(0,10,0,12)}px`}}>
        <div style={{display:"flex",alignItems:"center",gap:z(0,6,0,7)}}>
          <span style={{fontSize:z(0,11,0,13),fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>THIS OVER</span>
          {v1_dots}
        </div>
        {v1_modePart?v1_bowlSection:(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:z(0,24,0,28),fontWeight:900,color:t.tx,lineHeight:1}}>{lastSpeed}</div>
            <div style={{fontSize:z(0,9,0,10),fontWeight:700,color:t.tm}}>KM/H</div>
          </div>
        )}
      </div>
    </div>
  );

  const v1_hud=(
    <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{flex:1,position:"relative"}}>{shotPopup}{nextBallBtn}</div>
      {isP?v1_portraitStrip:v1_landscapeStrip}
    </div>
  );

  /* ================================================================
     V2 — MINIMAL TOP-LEFT (upsized ~30%)
     ================================================================ */
  const v2_chaseInfo=chaseFlip
    ?<span style={{color:"#FF9800"}}>{need} needed from {ballsLeft} balls</span>
    :<span><span style={{color:"#F44336"}}>RRR {rrr}</span> <span style={{color:t.tm}}>&bull;</span> <span style={{color:t.a}}>CRR {crr}</span></span>;
  const v2_powerInfo=<span style={{color:t.a}}>Ball {Math.min(ballInOver,6)}/6 <span style={{color:t.tm}}>&bull;</span> <span style={{color:"#FFD740"}}>{runs} runs</span></span>;
  const v2_gauntletInfo=<span style={{color:t.a}}>Round {gauntletRound}/10 <span style={{color:t.tm}}>&bull;</span> {gauntletTeam.flag} {gauntletTeam.short}</span>;

  const v2_hud=(
    <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",overflow:"hidden"}}>
      <div style={{position:"absolute",top:z(8,18,16,20),left:z(8,18,16,20),zIndex:10}}>
        <div style={{...cardBg,borderRadius:z(8,16,14,18),padding:`${z(6,14,10,16)}px ${z(8,16,14,20)}px`,border:`${1.5*s}px solid ${t.cb}`,minWidth:z(80,160,140,180)}}>
          <div style={{display:"flex",alignItems:"baseline",gap:z(4,7,6,8)}}>
            <span style={{fontSize:z(14,24,22,28)}}>{teams[0].flag}</span>
            <span style={{fontSize:z(22,42,34,48),fontWeight:900,color:t.tx,letterSpacing:1*s}}>{runs}/{wickets}</span>
            <span style={{fontSize:z(10,18,16,20),fontWeight:700,color:t.a}}>({overStr})</span>
          </div>
          {mode>=1&&(
            <div style={{fontSize:z(9,16,14,18),fontWeight:700,marginTop:z(2,4,4,5),lineHeight:1.3}}>
              {mode===1?v2_chaseInfo:mode===2?v2_powerInfo:v2_gauntletInfo}
            </div>
          )}
        </div>
      </div>
      <div style={{position:"absolute",inset:0}}>{shotPopup}{nextBallBtn}</div>
    </div>
  );

  /* ================================================================
     V3 — STADIUM SCOREBOARD (wide top-center panel, ~33% width)
     ================================================================ */
  const v3_scoreFz=z(26,50,42,56);
  const v3_overFz=z(12,22,18,26);
  const v3_subFz=z(8,16,14,18);
  const v3_dotSz=z(16,28,24,32);
  const v3_lblFz=z(6,10,8,12);

  const oversRemaining=Math.max(0,(mode===2?1:3)-overs)+(ballInOver>=6?0:1);

  /* Mode row for v3 */
  const v3_modeRow=mode===0?null:mode===1?(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>TARGET</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:t.tm}}>{chaseTarget}</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>NEED</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:"#FF9800"}}>{need} off {ballsLeft}</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>RRR</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:"#F44336"}}>{rrr}</div>
      </div>
    </div>
  ):mode===2?(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>POWER OVER</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:t.a}}>Ball {Math.min(ballInOver,6)}/6</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>TOTAL</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:"#FFD740"}}>{runs}</div>
      </div>
    </div>
  ):(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>GAUNTLET</div>
        <div style={{fontSize:v3_subFz,fontWeight:900,color:t.a}}>Round {gauntletRound}/10</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:z(2,4,3,5)}}>
        <span style={{fontSize:z(10,18,16,20)}}>{gauntletTeam.flag}</span>
        <span style={{fontSize:v3_subFz,fontWeight:800,color:t.ts}}>{gauntletTeam.short}</span>
      </div>
      <div style={{display:"flex",gap:z(2,3,3,4)}}>{[0,1,2].map(i=><span key={i} style={{fontSize:z(12,20,18,22),opacity:i<wickets?0.25:1}}>{"\u{1F3CF}"}</span>)}</div>
    </div>
  );

  const v3_hud=(
    <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",overflow:"hidden"}}>
      {/* TOP CENTER: Wide Scoreboard (~33% width) */}
      <div style={{position:"absolute",top:z(6,14,12,16),left:"50%",transform:"translateX(-50%)",width:"33%",minWidth:z(140,280,260,320),zIndex:10}}>
        <div style={{...cardBg,borderRadius:z(10,18,16,22),padding:`${z(5,12,8,14)}px ${z(8,16,14,20)}px`,border:`${1.5*s}px solid ${t.cb}`}}>
          {/* Row 1: Teams + Score */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:z(4,8,7,10)}}>
            <span style={{fontSize:z(14,24,20,28)}}>{teams[0].flag}</span>
            <span style={{fontSize:z(8,14,12,16),fontWeight:800,color:t.ts}}>{teams[0].short}</span>
            <span style={{fontSize:v3_scoreFz,fontWeight:900,color:t.tx,letterSpacing:2*s}}>{runs}/{wickets}</span>
            <span style={{fontSize:v3_overFz,fontWeight:700,color:t.a}}>({overStr})</span>
          </div>

          {/* Row 2: Bowler + Speed + CRR */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:z(3,6,5,8),marginTop:z(2,4,3,5)}}>
            <span style={{fontSize:z(10,16,14,18)}}>{teams[1].flag}</span>
            <span style={{fontSize:v3_subFz,fontWeight:700,color:t.ts}}>{bowlers[bowlerIdx]}</span>
            <span style={{fontSize:v3_subFz,color:t.td}}>&bull;</span>
            <span style={{fontSize:v3_subFz,fontWeight:900,color:t.tx}}>{lastSpeed} <span style={{fontSize:v3_lblFz,fontWeight:700,color:t.tm}}>km/h</span></span>
            <span style={{fontSize:v3_subFz,color:t.td}}>&bull;</span>
            <span style={{fontSize:v3_subFz,fontWeight:700,color:t.tm}}>CRR <span style={{color:t.a}}>{crr}</span></span>
          </div>

          {/* Row 3: This Over dots */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:z(3,5,4,6),marginTop:z(3,6,5,7),paddingTop:z(3,6,5,7),borderTop:`${1*s}px solid ${t.cb}`}}>
            <span style={{fontSize:v3_lblFz,fontWeight:800,color:t.tm,letterSpacing:0.5*s}}>THIS OVER</span>
            {makeDots(v3_dotSz)}
          </div>

          {/* Row 4: Mode-specific (if any) */}
          {v3_modeRow&&(
            <div style={{marginTop:z(3,6,5,7),paddingTop:z(3,6,5,7),borderTop:`${1*s}px solid ${t.cb}`}}>
              {v3_modeRow}
            </div>
          )}
        </div>
      </div>

      {/* Game area */}
      <div style={{position:"absolute",inset:0}}>{shotPopup}{nextBallBtn}</div>
    </div>
  );

  /* ================================================================
     RENDER
     ================================================================ */
  return(
    <div style={{minHeight:"100vh",background:"#111118",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 6px",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"auto"}}>
      {/* Controls */}
      <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>navigate("/")} style={{padding:"4px 12px",borderRadius:5,border:"1px solid #444",cursor:"pointer",background:"#222",color:"#aaa",fontSize:9,fontWeight:700,marginRight:8}}>&larr; SCREENS</button>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {hudVersions.map(h=><button key={h.v} onClick={()=>setVer(h.v)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:ver===h.v?"#444":"transparent",color:ver===h.v?"#fff":"#666",fontSize:9,fontWeight:700}}>{h.v.toUpperCase()} {h.label}</button>)}
        </div>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {Object.entries(devices).map(([k,d])=><button key={k} onClick={()=>setDev(k)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:dev===k?"#444":"transparent",color:dev===k?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{d.name}</button>)}
        </div>
        <div style={{display:"flex",gap:2,background:"#222",borderRadius:7,padding:2,marginRight:4}}>
          {["portrait","landscape"].map(o=><button key={o} onClick={()=>setOri(o)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:ori===o?"#444":"transparent",color:ori===o?"#fff":"#666",fontSize:9,fontWeight:700,textTransform:"uppercase"}}>{o==="portrait"?"\u2b1c Portrait":"\u25ac Landscape"}</button>)}
        </div>
        {Object.entries(T).map(([k,th])=><button key={k} onClick={()=>setTheme(k)} style={{padding:"4px 10px",borderRadius:5,border:"none",cursor:"pointer",background:theme===k?th.a:"#222",color:theme===k?(k==="stadiumNight"||k==="premiumGold"?"#111":"#fff"):"#666",fontSize:9,fontWeight:800,textTransform:"uppercase"}}>{th.name}</button>)}
      </div>
      <div style={{display:"flex",gap:3,marginBottom:6}}>
        {gameModes.map((m,i)=><button key={i} onClick={()=>setMode(i)} style={{padding:"4px 12px",borderRadius:5,border:`1px solid ${mode===i?t.a:"#333"}`,cursor:"pointer",background:mode===i?`${t.a}22`:"#1a1a1a",color:mode===i?t.a:"#666",fontSize:9,fontWeight:800,letterSpacing:0.5}}>{m}</button>)}
      </div>
      <div style={{fontSize:9,color:"#555",marginBottom:5}}>{dv.name} &mdash; {iW}&times;{iH} &mdash; {(s*100).toFixed(0)}%</div>

      <div style={{width:dW,height:dH,borderRadius:16*s,border:`${3*s}px solid #2a2a2a`,overflow:"hidden",position:"relative",background:"#0a1a0a",boxShadow:`0 ${18*s}px ${50*s}px rgba(0,0,0,0.6)`,flexShrink:0}}>
        <FieldBg/>
        {ver==="v1"?v1_hud:ver==="v2"?v2_hud:v3_hud}
      </div>

      <style>{`
        @keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0}60%{transform:translate(-50%,-50%) scale(1.15);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        ::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}
