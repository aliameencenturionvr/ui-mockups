import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const T = {
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(255,255,255,0.05)",cb:"rgba(255,64,129,0.15)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",g:"rgba(255,64,129,0.35)",tx:"#FFF",ts:"#DDD",tm:"#888",td:"#444",co:"#FFD740",ge:"#40C4FF",bb:"rgba(255,255,255,0.08)",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",pg:"0 0 60px rgba(255,64,129,0.5),0 10px 40px rgba(255,64,129,0.25)",s1:"#1a0510",s2:"#2a1525",s3:"#0d1a0d",fl:"rgba(255,200,150,0.15)"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(255,255,255,0.04)",cb:"rgba(245,197,66,0.12)",a:"#F5C542",ad:"#C49000",al:"#FFE082",g:"rgba(245,197,66,0.3)",tx:"#FFF",ts:"#C8D0E8",tm:"#7888B0",td:"#3A4568",co:"#F5C542",ge:"#64B5F6",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",pg:"0 0 60px rgba(245,197,66,0.45),0 10px 40px rgba(245,197,66,0.2)",s1:"#0a0e20",s2:"#141e38",s3:"#0a150a",fl:"rgba(255,220,130,0.2)"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(255,255,255,0.04)",cb:"rgba(76,175,80,0.15)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",g:"rgba(76,175,80,0.3)",tx:"#FFF",ts:"#C0D8C2",tm:"#6E9E72",td:"#2E5032",co:"#FFD740",ge:"#40C4FF",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",pg:"0 0 60px rgba(76,175,80,0.45),0 10px 40px rgba(76,175,80,0.2)",s1:"#050e06",s2:"#0f2215",s3:"#0a1f0a",fl:"rgba(200,255,200,0.12)"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(255,255,255,0.03)",cb:"rgba(0,229,255,0.12)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",g:"rgba(0,229,255,0.35)",tx:"#FFF",ts:"#B8D8E8",tm:"#6090B0",td:"#2A4860",co:"#FFD740",ge:"#00E5FF",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",pg:"0 0 60px rgba(0,229,255,0.5),0 10px 40px rgba(0,229,255,0.25)",s1:"#050812",s2:"#0c1428",s3:"#061008",fl:"rgba(150,240,255,0.18)"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(255,255,255,0.04)",cb:"rgba(255,179,0,0.12)",a:"#FFB300",ad:"#E65100",al:"#FFE082",g:"rgba(255,179,0,0.3)",tx:"#FFF",ts:"#D8CFC0",tm:"#9A8A70",td:"#4A3E2E",co:"#FFB300",ge:"#64B5F6",bb:"rgba(255,255,255,0.06)",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",pg:"0 0 60px rgba(255,179,0,0.45),0 10px 40px rgba(255,179,0,0.2)",s1:"#100c04",s2:"#1a1408",s3:"#0c120a",fl:"rgba(255,210,120,0.18)"},
};

const matchData = {
  result:"WIN",team:"\u{1F1EE}\u{1F1F3} INDIA",opponent:"\u{1F1E6}\u{1F1FA} AUSTRALIA",overs:"3",difficulty:"CLUB",
  score:{runs:47,wickets:1,overs:"3.0"},oppScore:{runs:38,wickets:3,overs:"3.0"},
  isNewHighScore:true,leaderboardRank:142,
  xp:{earned:135,current:780,needed:1000,level:12},coins:{earned:85},gems:{earned:5},
};

const shots=[
  {a:10,l:1,r:6},{a:340,l:1,r:6},{a:45,l:1,r:6},
  {a:30,l:.88,r:4},{a:355,l:.85,r:4},{a:320,l:.82,r:4},{a:60,l:.9,r:4},
  {a:280,l:.45,r:2},{a:250,l:.55,r:2},{a:15,l:.35,r:1},{a:340,l:.3,r:1},
  {a:90,l:.5,r:3},{a:200,l:.4,r:1},{a:310,l:.38,r:2},{a:70,l:.32,r:1},
  {a:5,l:.12,r:0},{a:350,l:.1,r:0},
];
const SC={6:"#FF4444",4:"#4CAF50",run:"#FFB300",dot:"#666"};
const shotColor=r=>r>=6?SC[6]:r>=4?SC[4]:r>0?SC.run:SC.dot;

function StadiumBg({t}){return(<div style={{position:"absolute",inset:0,overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${t.s1} 0%,${t.s2} 30%,${t.s3} 60%,${t.s1} 100%)`}}/>
  <div style={{position:"absolute",top:"6%",left:"-5%",right:"-5%",height:"30%",background:`linear-gradient(180deg,${t.s2}ee 0%,${t.s2}55 60%,transparent 100%)`,borderRadius:"0 0 50% 50%",filter:"blur(10px)"}}/>
  <div style={{position:"absolute",top:"3%",left:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  <div style={{position:"absolute",top:"3%",right:"6%",width:"18%",height:"28%",background:`radial-gradient(ellipse,${t.fl} 0%,transparent 70%)`,filter:"blur(25px)"}}/>
  {[...Array(15)].map((_,i)=><div key={i} style={{position:"absolute",top:`${8+Math.random()*22}%`,left:`${3+Math.random()*94}%`,width:`${2+Math.random()*4}px`,height:`${2+Math.random()*4}px`,borderRadius:"50%",background:t.fl,filter:`blur(${1+Math.random()*3}px)`,opacity:.3+Math.random()*.4}}/>)}
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 45%,transparent 30%,${t.bg}bb 75%)`}}/>
</div>)}

function Wagon({t,s,size,isPh}){
  const half=size/2;
  return(
    <div style={{width:size,height:size,position:"relative",flexShrink:0}}>
      <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle,#0a2e10 0%,#071a08 60%,#040e04 100%)",border:`${1.5*s}px solid rgba(255,255,255,0.08)`}}/>
      <div style={{position:"absolute",top:"22%",left:"22%",right:"22%",bottom:"22%",borderRadius:"50%",border:`${1*s}px dashed rgba(255,255,255,0.08)`}}/>
      <div style={{position:"absolute",top:"30%",left:"48%",width:"4%",height:"40%",background:"rgba(200,180,120,0.12)",borderRadius:2*s}}/>
      {shots.map((sh,i)=>{
        const len=half*0.85*sh.l;
        const col=shotColor(sh.r);
        const w=sh.r>=6?3.5*s:sh.r>=4?2.5*s:sh.r>0?1.8*s:1*s;
        const op=sh.r>=4?.9:sh.r>0?.65:.35;
        return(<div key={i} style={{position:"absolute",left:half,top:half,width:w,height:len,background:`linear-gradient(180deg,transparent 0%,${col} 40%,${col} 100%)`,transformOrigin:"top center",transform:`rotate(${sh.a}deg)`,opacity:op,borderRadius:`0 0 ${2*s}px ${2*s}px`}}>
          <div style={{position:"absolute",bottom:-3*s,left:"50%",transform:"translateX(-50%)",width:(sh.r>=4?7:5)*s,height:(sh.r>=4?7:5)*s,borderRadius:"50%",background:col,boxShadow:sh.r>=6?`0 0 ${8*s}px ${col}`:"none"}}/>
        </div>);
      })}
      <div style={{position:"absolute",top:half-4*s,left:half-4*s,width:8*s,height:8*s,borderRadius:"50%",background:t.a,opacity:.7}}/>
      <div style={{position:"absolute",top:half-2*s,left:half-2*s,width:4*s,height:4*s,borderRadius:"50%",background:"#fff",opacity:.8}}/>
      {[{a:0,l:"Straight"},{a:45,l:"Cover"},{a:90,l:"Point"},{a:135,l:"3rd Man"},{a:225,l:"Fine Leg"},{a:270,l:"Mid Wkt"},{a:315,l:"Mid On"}].map((z,i)=>{
        const rad=(z.a-90)*Math.PI/180;
        return <div key={i} style={{position:"absolute",left:half+Math.cos(rad)*(half*.72),top:half+Math.sin(rad)*(half*.72),transform:"translate(-50%,-50%)",fontSize:(isPh?6:8)*s,fontWeight:700,color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap",pointerEvents:"none"}}>{z.l}</div>
      })}
    </div>
  );
}

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

export default function EndOfMatch(){
  const navigate = useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const t=T[theme],md=matchData;
  const dv=devices[dev];
  const isPh=dev==="iphone";
  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  const isP=ori==="portrait";
  const isPhL=isPh&&!isP;
  const iW=isP?dv.pw:dv.lw,iH=isP?dv.ph:dv.lh;
  let dW=Math.min(ws.w-20,1100),dH=dW/(iW/iH);
  if(dH>ws.h-130){dH=ws.h-130;dW=dH*(iW/iH)}
  const s=dW/iW;
  const win=md.result==="WIN",rCol=win?"#4CAF50":"#EF5350",rGlow=win?"rgba(76,175,80,0.4)":"rgba(239,83,80,0.4)";
  const wSize=isPhL?Math.min(dH*0.48,dW*0.3):isP?Math.min((isPh?260:340)*s,dW*.5):Math.min((isPh?220:300)*s,dH*.48);
  const sixes=shots.filter(x=>x.r>=6).length,fours=shots.filter(x=>x.r===4).length;
  const r13=shots.filter(x=>x.r>0&&x.r<4),dots=shots.filter(x=>x.r===0).length;
  const totalR=shots.reduce((a,x)=>a+x.r,0),sr=((totalR/shots.length)*100).toFixed(1);
  const legend=[{color:SC[6],label:"SIXES",count:sixes,rv:sixes*6},{color:SC[4],label:"FOURS",count:fours,rv:fours*4},{color:SC.run,label:"1s, 2s, 3s",count:r13.length,rv:r13.reduce((a,x)=>a+x.r,0)},{color:SC.dot,label:"DOTS",count:dots,rv:0}];

  return(
    <div style={{minHeight:"100vh",background:"#111118",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 6px",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"auto"}}>
      {/* Back + Controls */}
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
        <StadiumBg t={t}/>
        <div style={{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>

          {/* RESULT BANNER */}
          <div style={{textAlign:"center",padding:`${(isPh?10:16)*s}px ${(isPh?12:20)*s}px ${(isPh?6:10)*s}px`,background:`linear-gradient(180deg,${t.bg}f0,${t.bg}88)`,backdropFilter:"blur(12px)",flexShrink:0}}>
            {md.isNewHighScore&&<div style={{display:"inline-flex",alignItems:"center",gap:(isPh?5:8)*s,background:`linear-gradient(135deg,${t.co}22,${t.co}11)`,border:`${1.5*s}px solid ${t.co}66`,borderRadius:30*s,padding:`${(isPh?3:4)*s}px ${(isPh?10:16)*s}px`,marginBottom:(isPh?4:6)*s,boxShadow:`0 0 ${30*s}px ${t.co}33`}}>
              <span style={{fontSize:(isPh?13:18)*s}}>{"\u{1F3C6}"}</span>
              <span style={{fontSize:(isPh?10:14)*s,fontWeight:900,color:t.co,letterSpacing:(isPh?2:3)*s}}>NEW HIGH SCORE!</span>
              <span style={{fontSize:(isPh?9:12)*s,fontWeight:800,color:t.ts}}>#{md.leaderboardRank}</span>
            </div>}
            <div style={{fontSize:(isPh?28:40)*s,fontWeight:900,color:rCol,letterSpacing:(isPh?5:8)*s,textShadow:`0 0 ${30*s}px ${rGlow}`,lineHeight:1}}>{md.result}</div>
            <div style={{fontSize:(isPh?10:14)*s,color:t.ts,marginTop:(isPh?3:4)*s,fontWeight:700}}>{md.team} vs {md.opponent} &bull; {md.overs} Overs &bull; {md.difficulty}</div>
          </div>

          {/* CONTENT */}
          <div style={{flex:1,overflow:"hidden",padding:`0 ${isP?(isPh?10:20)*s:(isPhL?10:28)*s}px ${(isPh?8:12)*s}px`,display:"flex",flexDirection:isP?"column":"row",gap:(isPhL?6:isPh?8:12)*s}}>
          {isPhL?(
            <>
            {/* PhL LEFT: Scorecard + Rewards */}
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:5*s,minHeight:0}}>
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:12*s,backdropFilter:"blur(20px)",padding:`${8*s}px ${10*s}px`,flexShrink:0}}>
                <div style={{fontSize:8*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:4*s}}>SCORECARD</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{textAlign:"center"}}><div style={{fontSize:9*s,fontWeight:800,color:t.ts}}>{"\u{1F1EE}\u{1F1F3}"} INDIA</div><div style={{fontSize:22*s,fontWeight:900,color:t.tx,lineHeight:1,marginTop:1*s}}>{md.score.runs}<span style={{fontSize:11*s,color:t.tm}}>/{md.score.wickets}</span></div><div style={{fontSize:7*s,color:t.tm,marginTop:1*s}}>({md.score.overs} ov)</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:9*s,fontWeight:900,color:rCol,letterSpacing:2*s}}>VS</div><div style={{fontSize:7*s,color:t.tm}}>Won by {md.score.runs-md.oppScore.runs} runs</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:9*s,fontWeight:800,color:t.ts}}>{"\u{1F1E6}\u{1F1FA}"} AUSTRALIA</div><div style={{fontSize:22*s,fontWeight:900,color:t.tm,lineHeight:1,marginTop:1*s}}>{md.oppScore.runs}<span style={{fontSize:11*s,color:t.td}}>/{md.oppScore.wickets}</span></div><div style={{fontSize:7*s,color:t.td,marginTop:1*s}}>({md.oppScore.overs} ov)</div></div>
                </div>
              </div>
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:12*s,backdropFilter:"blur(20px)",padding:`${8*s}px ${10*s}px`,flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
                <div style={{fontSize:8*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:4*s}}>REWARDS</div>
                <div style={{marginBottom:4*s}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:2*s}}><span style={{fontSize:8*s,fontWeight:800,color:t.ts}}>{"\u2b50"} XP</span><span style={{fontSize:8*s,fontWeight:800,color:t.a}}>+{md.xp.earned} XP</span></div>
                  <div style={{height:7*s,borderRadius:6*s,background:t.bb,overflow:"hidden"}}><div style={{width:`${((md.xp.current+md.xp.earned)/md.xp.needed)*100}%`,height:"100%",borderRadius:6*s,background:`linear-gradient(90deg,${t.a},${t.al})`,boxShadow:`0 0 ${8*s}px ${t.g}`}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:2*s}}><span style={{fontSize:7*s,color:t.tm}}>Level {md.xp.level}</span><span style={{fontSize:7*s,color:t.tm}}>{md.xp.current+md.xp.earned}/{md.xp.needed}</span></div>
                </div>
                <div style={{display:"flex",gap:5*s,flex:1,minHeight:0}}>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5*s,background:t.card,border:`${1*s}px solid ${t.cb}`,borderRadius:10*s,padding:`${5*s}px ${5*s}px`}}><span style={{fontSize:18*s}}>{"\u{1FA99}"}</span><div><div style={{fontSize:14*s,fontWeight:900,color:t.co}}>+{md.coins.earned}</div><div style={{fontSize:7*s,color:t.tm,fontWeight:700}}>COINS</div></div></div>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5*s,background:t.card,border:`${1*s}px solid ${t.cb}`,borderRadius:10*s,padding:`${5*s}px ${5*s}px`}}><span style={{fontSize:18*s}}>{"\u{1F48E}"}</span><div><div style={{fontSize:14*s,fontWeight:900,color:t.ge}}>+{md.gems.earned}</div><div style={{fontSize:7*s,color:t.tm,fontWeight:700}}>GEMS</div></div></div>
                </div>
                <button style={{width:"100%",marginTop:4*s,padding:`${6*s}px 0`,borderRadius:10*s,border:`${2*s}px solid ${t.co}55`,cursor:"pointer",background:`linear-gradient(135deg,${t.co}22,${t.co}11)`,color:t.co,fontSize:9*s,fontWeight:900,letterSpacing:2*s,display:"flex",alignItems:"center",justifyContent:"center",gap:4*s,flexShrink:0}}>
                  <span style={{fontSize:10*s}}>{"\u25b6"}</span>DOUBLE COINS<span style={{fontSize:7*s,fontWeight:700,color:t.tm,background:`${t.bg}88`,padding:`${2*s}px ${4*s}px`,borderRadius:4*s}}>AD</span>
                </button>
              </div>
            </div>
            {/* PhL RIGHT: Wagon Wheel */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:12*s,backdropFilter:"blur(20px)",padding:`${8*s}px ${10*s}px`,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{fontSize:8*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:4*s,alignSelf:"flex-start"}}>WAGON WHEEL</div>
                <Wagon t={t} s={s} size={wSize} isPh={isPh}/>
                <div style={{display:"flex",gap:6*s,flexWrap:"wrap",justifyContent:"center",marginTop:4*s}}>
                  {legend.map((it,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:3*s}}>
                    <div style={{width:6*s,height:6*s,borderRadius:2*s,background:it.color,flexShrink:0,boxShadow:i<2?`0 0 ${6*s}px ${it.color}44`:"none"}}/>
                    <span style={{fontSize:7*s,fontWeight:800,color:t.ts}}>{it.label}</span>
                    <span style={{fontSize:7*s,color:t.tm}}>{it.count}&times;</span>
                  </div>))}
                </div>
                <div style={{display:"flex",gap:12*s,justifyContent:"center",marginTop:4*s}}>
                  {[{l:"BALLS",v:shots.length},{l:"RUNS",v:totalR},{l:"SR",v:sr}].map((x,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:6*s,fontWeight:700,color:t.tm,letterSpacing:1*s}}>{x.l}</div><div style={{fontSize:10*s,fontWeight:900,color:t.a}}>{x.v}</div></div>))}
                </div>
              </div>
            </div>
            </>
          ):(
            <>
            <div style={{flex:isP?"none":"1",display:"flex",flexDirection:"column",gap:(isPh?8:12)*s}}>
              {/* SCORECARD */}
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:(isPh?12:16)*s,backdropFilter:"blur(20px)",padding:`${(isPh?10:16)*s}px ${(isPh?12:20)*s}px`}}>
                <div style={{fontSize:(isPh?8:10)*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:(isPh?5:8)*s}}>SCORECARD</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{textAlign:"center"}}><div style={{fontSize:(isPh?9:12)*s,fontWeight:800,color:t.ts}}>{"\u{1F1EE}\u{1F1F3}"} INDIA</div><div style={{fontSize:(isPh?24:36)*s,fontWeight:900,color:t.tx,lineHeight:1,marginTop:2*s}}>{md.score.runs}<span style={{fontSize:(isPh?12:17)*s,color:t.tm}}>/{md.score.wickets}</span></div><div style={{fontSize:(isPh?8:11)*s,color:t.tm,marginTop:2*s}}>({md.score.overs} ov)</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:(isPh?9:12)*s,fontWeight:900,color:rCol,letterSpacing:2*s}}>VS</div><div style={{fontSize:(isPh?8:10)*s,color:t.tm}}>Won by {md.score.runs-md.oppScore.runs} runs</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:(isPh?9:12)*s,fontWeight:800,color:t.ts}}>{"\u{1F1E6}\u{1F1FA}"} AUSTRALIA</div><div style={{fontSize:(isPh?24:36)*s,fontWeight:900,color:t.tm,lineHeight:1,marginTop:2*s}}>{md.oppScore.runs}<span style={{fontSize:(isPh?12:17)*s,color:t.td}}>/{md.oppScore.wickets}</span></div><div style={{fontSize:(isPh?8:11)*s,color:t.td,marginTop:2*s}}>({md.oppScore.overs} ov)</div></div>
                </div>
              </div>
              {/* WAGON WHEEL + LEGEND */}
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:(isPh?12:16)*s,backdropFilter:"blur(20px)",padding:`${(isPh?10:16)*s}px ${(isPh?10:18)*s}px`}}>
                <div style={{fontSize:(isPh?8:10)*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:(isPh?6:10)*s}}>WAGON WHEEL</div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:(isPh?6:10)*s}}>
                  <Wagon t={t} s={s} size={wSize} isPh={isPh}/>
                  <div style={{display:"flex",gap:(isPh?8:12)*s,flexWrap:"wrap",justifyContent:"center"}}>
                    {legend.map((it,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:(isPh?3:5)*s}}>
                      <div style={{width:(isPh?7:10)*s,height:(isPh?7:10)*s,borderRadius:2*s,background:it.color,flexShrink:0,boxShadow:i<2?`0 0 ${6*s}px ${it.color}44`:"none"}}/>
                      <span style={{fontSize:(isPh?8:10)*s,fontWeight:800,color:t.ts}}>{it.label}</span>
                      <span style={{fontSize:(isPh?8:10)*s,color:t.tm}}>{it.count}&times;</span>
                    </div>))}
                  </div>
                  <div style={{display:"flex",gap:(isPh?14:20)*s,justifyContent:"center"}}>
                    {[{l:"BALLS",v:shots.length},{l:"RUNS",v:totalR},{l:"SR",v:sr}].map((x,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:(isPh?7:9)*s,fontWeight:700,color:t.tm,letterSpacing:1*s}}>{x.l}</div><div style={{fontSize:(isPh?12:16)*s,fontWeight:900,color:t.a}}>{x.v}</div></div>))}
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT COL - REWARDS */}
            <div style={{flex:isP?"none":"1",display:"flex",flexDirection:"column",gap:(isPh?8:12)*s}}>
              <div style={{background:`${t.bg}66`,border:`${1.5*s}px solid ${t.cb}`,borderRadius:(isPh?12:16)*s,backdropFilter:"blur(20px)",padding:`${(isPh?10:14)*s}px ${(isPh?12:20)*s}px`}}>
                <div style={{fontSize:(isPh?8:10)*s,fontWeight:900,color:t.tm,letterSpacing:2*s,marginBottom:(isPh?6:10)*s}}>REWARDS</div>
                <div style={{marginBottom:(isPh?6:10)*s}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:(isPh?3:4)*s}}><span style={{fontSize:(isPh?9:11)*s,fontWeight:800,color:t.ts}}>{"\u2b50"} XP</span><span style={{fontSize:(isPh?9:11)*s,fontWeight:800,color:t.a}}>+{md.xp.earned} XP</span></div>
                  <div style={{height:(isPh?8:11)*s,borderRadius:6*s,background:t.bb,overflow:"hidden"}}><div style={{width:`${((md.xp.current+md.xp.earned)/md.xp.needed)*100}%`,height:"100%",borderRadius:6*s,background:`linear-gradient(90deg,${t.a},${t.al})`,boxShadow:`0 0 ${8*s}px ${t.g}`}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:3*s}}><span style={{fontSize:(isPh?7:9)*s,color:t.tm}}>Level {md.xp.level}</span><span style={{fontSize:(isPh?7:9)*s,color:t.tm}}>{md.xp.current+md.xp.earned}/{md.xp.needed}</span></div>
                </div>
                <div style={{display:"flex",gap:(isPh?6:10)*s}}>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:(isPh?6:10)*s,background:t.card,border:`${1*s}px solid ${t.cb}`,borderRadius:(isPh?10:14)*s,padding:`${(isPh?12:18)*s}px ${(isPh?10:16)*s}px`}}><span style={{fontSize:(isPh?24:36)*s}}>{"\u{1FA99}"}</span><div><div style={{fontSize:(isPh?16:24)*s,fontWeight:900,color:t.co}}>+{md.coins.earned}</div><div style={{fontSize:(isPh?8:11)*s,color:t.tm,fontWeight:700}}>COINS EARNED</div></div></div>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:(isPh?6:10)*s,background:t.card,border:`${1*s}px solid ${t.cb}`,borderRadius:(isPh?10:14)*s,padding:`${(isPh?12:18)*s}px ${(isPh?10:16)*s}px`}}><span style={{fontSize:(isPh?24:36)*s}}>{"\u{1F48E}"}</span><div><div style={{fontSize:(isPh?16:24)*s,fontWeight:900,color:t.ge}}>+{md.gems.earned}</div><div style={{fontSize:(isPh?8:11)*s,color:t.tm,fontWeight:700}}>GEMS EARNED</div></div></div>
                </div>
                <button style={{width:"100%",marginTop:(isPh?6:10)*s,padding:`${(isPh?8:12)*s}px 0`,borderRadius:(isPh?10:14)*s,border:`${2*s}px solid ${t.co}55`,cursor:"pointer",background:`linear-gradient(135deg,${t.co}22,${t.co}11)`,color:t.co,fontSize:(isPh?10:14)*s,fontWeight:900,letterSpacing:2*s,display:"flex",alignItems:"center",justifyContent:"center",gap:(isPh?5:8)*s}}>
                  <span style={{fontSize:(isPh?12:16)*s}}>{"\u25b6"}</span>DOUBLE COINS<span style={{fontSize:(isPh?8:10)*s,fontWeight:700,color:t.tm,background:`${t.bg}88`,padding:`${2*s}px ${(isPh?5:7)*s}px`,borderRadius:5*s}}>AD</span>
                </button>
              </div>
            </div>
            </>
          )}
          </div>

          {/* ACTION BUTTONS */}
          <div style={{flexShrink:0,padding:`${(isPh?6:10)*s}px ${isP?(isPh?10:20)*s:(isPh?16:28)*s}px ${(isPh?8:14)*s}px`,background:`linear-gradient(0deg,${t.bg}f8,${t.bg}cc)`,backdropFilter:"blur(12px)",borderTop:`${1*s}px solid ${t.cb}`,display:"flex",flexDirection:"column",gap:(isPh?5:8)*s}}>
            <button style={{width:"100%",padding:`${(isPh?10:16)*s}px 0`,borderRadius:30*s,border:"none",cursor:"pointer",background:t.pb,color:t.pt,fontSize:(isPh?13:17)*s,fontWeight:900,letterSpacing:(isPh?3:4)*s,boxShadow:t.pg,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,width:"200%",height:"100%",background:"linear-gradient(100deg,transparent 20%,rgba(255,255,255,0.18) 50%,transparent 80%)",animation:"shimmer 2.5s ease-in-out infinite"}}/>
              <span style={{position:"relative",zIndex:1}}>{"\u25b6"}   PLAY AGAIN</span>
            </button>
            <div style={{display:"flex",gap:(isPh?6:10)*s}}>
              <button style={{flex:1,padding:`${(isPh?8:13)*s}px 0`,borderRadius:30*s,border:`${2*s}px solid ${t.cb}`,cursor:"pointer",background:t.card,color:t.ts,fontSize:(isPh?11:15)*s,fontWeight:800,letterSpacing:2*s,display:"flex",alignItems:"center",justifyContent:"center",gap:(isPh?4:6)*s}}><span style={{fontSize:(isPh?13:18)*s}}>{"\u{1F4E4}"}</span>SHARE</button>
              <button onClick={()=>navigate("/")} style={{flex:1,padding:`${(isPh?8:13)*s}px 0`,borderRadius:30*s,border:`${2*s}px solid ${t.cb}`,cursor:"pointer",background:t.card,color:t.tm,fontSize:(isPh?11:15)*s,fontWeight:800,letterSpacing:2*s,display:"flex",alignItems:"center",justifyContent:"center",gap:(isPh?4:6)*s}}><span style={{fontSize:(isPh?12:16)*s}}>{"\u2302"}</span>MENU</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes shimmer{0%,100%{transform:translateX(-60%)}50%{transform:translateX(20%)}}::-webkit-scrollbar{display:none}*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
