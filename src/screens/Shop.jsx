import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ THEMES ============ */
const T={
  darkPink:{name:"DARK PINK",bg:"#0A0A0A",card:"rgba(0,0,0,0.7)",cb:"rgba(255,64,129,0.3)",a:"#FF4081",ad:"#C51162",al:"#FF80AB",tx:"#FFF",ts:"#DDD",tm:"#999",td:"#555",co:"#FFD740",pb:"linear-gradient(135deg,#FF4081,#F50057,#C51162)",pt:"#FFF",green:"#4CAF50",rare:"#42A5F5",epic:"#AB47BC",leg:"#FFB300"},
  stadiumNight:{name:"STADIUM NIGHT",bg:"#080E1F",card:"rgba(0,0,10,0.75)",cb:"rgba(245,197,66,0.25)",a:"#F5C542",ad:"#C49000",al:"#FFE082",tx:"#FFF",ts:"#C8D0E8",tm:"#8898C0",td:"#4A5878",co:"#F5C542",pb:"linear-gradient(135deg,#F5C542,#E6A817,#C49000)",pt:"#0A0E1F",green:"#66BB6A",rare:"#64B5F6",epic:"#CE93D8",leg:"#FFD54F"},
  cricketGreen:{name:"CRICKET GREEN",bg:"#060F08",card:"rgba(0,8,0,0.7)",cb:"rgba(76,175,80,0.25)",a:"#4CAF50",ad:"#2E7D32",al:"#A5D6A7",tx:"#FFF",ts:"#C0D8C2",tm:"#7EAE82",td:"#3E6E42",co:"#FFD740",pb:"linear-gradient(135deg,#66BB6A,#4CAF50,#2E7D32)",pt:"#FFF",green:"#81C784",rare:"#64B5F6",epic:"#CE93D8",leg:"#FFA726"},
  neonSport:{name:"NEON SPORT",bg:"#060810",card:"rgba(0,4,12,0.75)",cb:"rgba(0,229,255,0.25)",a:"#00E5FF",ad:"#0097A7",al:"#80F0FF",tx:"#FFF",ts:"#B8D8E8",tm:"#70A0C0",td:"#3A5870",co:"#FFD740",pb:"linear-gradient(135deg,#00E5FF,#00B8D4,#0097A7)",pt:"#060810",green:"#69F0AE",rare:"#40C4FF",epic:"#EA80FC",leg:"#FFAB40"},
  premiumGold:{name:"PREMIUM GOLD",bg:"#0C0C0C",card:"rgba(6,4,0,0.7)",cb:"rgba(255,179,0,0.25)",a:"#FFB300",ad:"#E65100",al:"#FFE082",tx:"#FFF",ts:"#D8CFC0",tm:"#AA9A80",td:"#5A4E3E",co:"#FFB300",pb:"linear-gradient(135deg,#FFB300,#FF8F00,#E65100)",pt:"#0C0C0C",green:"#A5D6A7",rare:"#64B5F6",epic:"#CE93D8",leg:"#FFB74D"},
};

const devices={
  ipad:{name:"iPad",pw:810,ph:1080,lw:1080,lh:810},
  iphone:{name:"iPhone Pro Max",pw:430,ph:932,lw:932,lh:430},
};

/* ============ DATA ============ */
const shopTabs=["BAT SKINS","BALL SKINS","CELEBRATIONS","BADGES","BUNDLES","GEMS"];

const rc=(r,t)=>r==="COMMON"?t.tm:r==="RARE"?t.rare:r==="EPIC"?t.epic:t.leg;

const itemData=[
  /* 0: Bat Skins */
  [
    {name:"Classic Willow",icon:"\u{1F3CF}",price:0,rarity:"COMMON",owned:true,eq:true,cur:"c"},
    {name:"Golden Edge",icon:"\u{1F3CF}",price:500,rarity:"RARE",cur:"c"},
    {name:"Neon Striker",icon:"\u{1F3CF}",price:1200,rarity:"EPIC",cur:"c"},
    {name:"Dragon Blade",icon:"\u{1F3CF}",price:50,rarity:"LEGENDARY",cur:"g"},
    {name:"Ice Breaker",icon:"\u{1F3CF}",price:800,rarity:"RARE",cur:"c"},
    {name:"Thunder Bat",icon:"\u{1F3CF}",price:2000,rarity:"EPIC",owned:true,cur:"c"},
    {name:"Shadow Blade",icon:"\u{1F3CF}",price:100,rarity:"LEGENDARY",cur:"g"},
    {name:"Retro Wood",icon:"\u{1F3CF}",price:300,rarity:"COMMON",cur:"c"},
    {name:"Carbon Pro",icon:"\u{1F3CF}",price:1500,rarity:"EPIC",cur:"c"},
  ],
  /* 1: Ball Skins */
  [
    {name:"Red Cherry",icon:"\u{1F534}",price:0,rarity:"COMMON",owned:true,eq:true,cur:"c"},
    {name:"White Kook",icon:"\u26AA",price:300,rarity:"COMMON",cur:"c"},
    {name:"Pink Fire",icon:"\u{1F7E3}",price:600,rarity:"RARE",cur:"c"},
    {name:"Golden Orb",icon:"\u{1F31F}",price:40,rarity:"LEGENDARY",cur:"g"},
    {name:"Electric Blue",icon:"\u{1F535}",price:800,rarity:"RARE",cur:"c"},
    {name:"Lava Ball",icon:"\u{1F525}",price:1500,rarity:"EPIC",cur:"c"},
    {name:"Ghost Ball",icon:"\u{1F47B}",price:60,rarity:"LEGENDARY",cur:"g"},
    {name:"Tennis Green",icon:"\u{1F7E2}",price:400,rarity:"COMMON",cur:"c"},
    {name:"Crystal Orb",icon:"\u{1F52E}",price:1000,rarity:"EPIC",cur:"c"},
  ],
  /* 2: Celebrations */
  [
    {name:"Bat Raise",icon:"\u{1F64C}",price:0,rarity:"COMMON",owned:true,eq:true,cur:"c"},
    {name:"Helmet Off",icon:"\u26D1\uFE0F",price:400,rarity:"COMMON",cur:"c"},
    {name:"Backflip",icon:"\u{1F938}",price:1000,rarity:"RARE",cur:"c"},
    {name:"Robot Dance",icon:"\u{1F916}",price:1500,rarity:"EPIC",cur:"c"},
    {name:"Fire Walk",icon:"\u{1F525}",price:80,rarity:"LEGENDARY",cur:"g"},
    {name:"Lightning",icon:"\u26A1",price:2000,rarity:"EPIC",cur:"c"},
    {name:"Champion",icon:"\u{1F3C6}",price:100,rarity:"LEGENDARY",cur:"g"},
    {name:"Dab",icon:"\u{1F4AA}",price:600,rarity:"RARE",cur:"c"},
    {name:"Wave",icon:"\u{1F44B}",price:200,rarity:"COMMON",cur:"c"},
  ],
  /* 3: Badges */
  [
    {name:"Rookie",icon:"\u{1F331}",price:0,rarity:"COMMON",owned:true,eq:true,cur:"c"},
    {name:"Sixer King",icon:"6\uFE0F\u20E3",price:300,rarity:"RARE",cur:"c"},
    {name:"Century Club",icon:"\u{1F4AF}",price:800,rarity:"EPIC",cur:"c"},
    {name:"MVP",icon:"\u2B50",price:50,rarity:"LEGENDARY",cur:"g"},
    {name:"Bowler Pro",icon:"\u{1F3B3}",price:500,rarity:"RARE",cur:"c"},
    {name:"Captain",icon:"\u{1F396}\uFE0F",price:1200,rarity:"EPIC",cur:"c"},
    {name:"Legend",icon:"\u{1F451}",price:75,rarity:"LEGENDARY",cur:"g"},
    {name:"Super Fan",icon:"\u{1F4E3}",price:200,rarity:"COMMON",cur:"c"},
    {name:"All-Rounder",icon:"\u{1F3AF}",price:1000,rarity:"EPIC",cur:"c"},
  ],
];

const bundleData=[
  {name:"Starter Pack",icon:"\u{1F4E6}",price:500,cur:"c",rarity:"RARE",items:"Bat + Ball + Badge",discount:"20% OFF"},
  {name:"Pro Bundle",icon:"\u{1F381}",price:50,cur:"g",rarity:"EPIC",items:"Epic Bat + Ball + Celebration",discount:"30% OFF"},
  {name:"Ultimate",icon:"\u{1F48E}",price:150,cur:"g",rarity:"LEGENDARY",items:"3 Legendary Items + 3 Badges",discount:"40% OFF"},
  {name:"Season Pass",icon:"\u{1F3AB}",price:100,cur:"g",rarity:"LEGENDARY",items:"All Season Items + XP Boost",discount:"BEST VALUE"},
  {name:"Celeb Pack",icon:"\u{1F389}",price:800,cur:"c",rarity:"RARE",items:"3 Celebrations + Badge",discount:"25% OFF"},
  {name:"Batting Kit",icon:"\u{1F3CF}",price:1200,cur:"c",rarity:"EPIC",items:"2 Bat Skins + 2 Ball Skins",discount:"15% OFF"},
];

const gemData=[
  {name:"Handful",gems:50,price:"$0.99",bonus:""},
  {name:"Pouch",gems:120,price:"$1.99",bonus:"+20"},
  {name:"Chest",gems:300,price:"$4.99",bonus:"+50",popular:true},
  {name:"Vault",gems:700,price:"$9.99",bonus:"+100"},
  {name:"Treasury",gems:1500,price:"$19.99",bonus:"+300"},
  {name:"King\u2019s Ransom",gems:4000,price:"$49.99",bonus:"+1000",best:true},
];

const featuredDeal={name:"Dragon Blade",icon:"\u{1F3CF}",rarity:"LEGENDARY",price:50,origPrice:100,cur:"g"};

export default function Shop(){
  const navigate=useNavigate();
  const[theme,setTheme]=useState("darkPink");
  const[ori,setOri]=useState("portrait");
  const[dev,setDev]=useState("ipad");
  const[ws,setWs]=useState({w:window.innerWidth,h:window.innerHeight});
  const[tab,setTab]=useState(0);
  const[countdown,setCountdown]=useState({h:12,m:30,s:45});
  const[spinUsed,setSpinUsed]=useState(false);

  useEffect(()=>{const fn=()=>setWs({w:window.innerWidth,h:window.innerHeight});window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn)},[]);

  useEffect(()=>{
    const id=setInterval(()=>{
      setCountdown(c=>{
        let{h,m,s:sec}=c;
        sec--;if(sec<0){sec=59;m--}if(m<0){m=59;h--}if(h<0){h=23;m=59;sec=59}
        return{h,m,s:sec};
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
  const coins=4250,gems=85;
  const pad2=n=>String(n).padStart(2,"0");
  const timerStr=`${pad2(countdown.h)}:${pad2(countdown.m)}:${pad2(countdown.s)}`;

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

  /* ============ CURRENCY BAR ============ */
  const CurrencyBar=()=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:z(3,8,6,10)}}>
      <div style={{display:"flex",alignItems:"center",gap:z(4,10,8,12)}}>
        <span style={{fontSize:z(16,32,28,36)}}>🛍️</span>
        <div style={{fontSize:z(12,24,20,28),fontWeight:900,color:t.tx,letterSpacing:z(2,4,3,4)}}>SHOP</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:z(3,8,6,10)}}>
        {/* Coins */}
        <div style={{
          display:"flex",alignItems:"center",gap:z(2,4,3,5),
          ...cardBg,borderRadius:z(10,20,16,24),
          border:`${1*s}px solid ${t.co}44`,
          padding:`${z(2,5,4,6)}px ${z(4,10,8,12)}px`,
        }}>
          <span style={{fontSize:z(7,14,12,16)}}>🪙</span>
          <span style={{fontSize:z(7,14,12,16),fontWeight:900,color:t.co}}>{coins.toLocaleString()}</span>
          <div style={{
            width:z(10,20,16,22),height:z(10,20,16,22),borderRadius:"50%",
            background:t.co,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:z(7,14,12,16),fontWeight:900,color:"#000",cursor:"pointer",lineHeight:1,
          }}>+</div>
        </div>
        {/* Gems */}
        <div style={{
          display:"flex",alignItems:"center",gap:z(2,4,3,5),
          ...cardBg,borderRadius:z(10,20,16,24),
          border:`${1*s}px solid #E040FB44`,
          padding:`${z(2,5,4,6)}px ${z(4,10,8,12)}px`,
        }}>
          <span style={{fontSize:z(7,14,12,16)}}>{"\u{1F48E}"}</span>
          <span style={{fontSize:z(7,14,12,16),fontWeight:900,color:"#E040FB"}}>{gems}</span>
          <div style={{
            width:z(10,20,16,22),height:z(10,20,16,22),borderRadius:"50%",
            background:"#E040FB",display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:z(7,14,12,16),fontWeight:900,color:"#FFF",cursor:"pointer",lineHeight:1,
          }}>+</div>
        </div>
      </div>
    </div>
  );

  /* ============ TAB BAR ============ */
  const TabBar=()=>(
    <div style={{display:"flex",gap:z(2,4,3,4),marginBottom:z(3,8,6,10),flexWrap:"wrap"}}>
      {shopTabs.map((tb,i)=>(
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

  /* ============ FEATURED DEAL ============ */
  const FeaturedDeal=()=>(
    <div style={{
      ...cardBg,borderRadius:z(8,16,14,18),
      border:`${1.5*s}px solid ${t.leg}66`,
      padding:`${z(4,10,8,12)}px ${z(6,14,12,16)}px`,
      marginBottom:z(3,8,6,10),
      background:`linear-gradient(135deg, ${t.card}, ${t.leg}10)`,
      backdropFilter:"blur(20px)",
      display:"flex",alignItems:"center",gap:z(5,12,10,14),
    }}>
      <div style={{
        width:z(22,46,40,52),height:z(22,46,40,52),borderRadius:z(6,12,10,14),
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:z(14,28,24,32),flexShrink:0,
        background:`${t.leg}22`,border:`${1.5*s}px solid ${t.leg}44`,
      }}>{featuredDeal.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8),marginBottom:z(1,2,2,3)}}>
          <span style={{fontSize:z(5,9,8,10),fontWeight:800,color:t.leg,letterSpacing:1*s}}>DAILY DEAL</span>
          <span style={{fontSize:z(5,9,8,10),fontWeight:800,color:"#000",background:t.leg,padding:`${1*s}px ${z(3,6,5,7)}px`,borderRadius:z(2,4,3,5)}}>50% OFF</span>
        </div>
        <div style={{fontSize:z(8,16,14,18),fontWeight:900,color:t.tx}}>{featuredDeal.name}</div>
        <div style={{fontSize:z(5,10,9,12),fontWeight:800,color:rc(featuredDeal.rarity,t)}}>{featuredDeal.rarity}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:z(5,10,8,12),color:t.td,textDecoration:"line-through"}}>{featuredDeal.origPrice}{"\u{1F48E}"}</div>
        <div style={{fontSize:z(10,20,18,24),fontWeight:900,color:"#E040FB"}}>{featuredDeal.price}{"\u{1F48E}"}</div>
        <div style={{fontSize:z(5,9,8,11),color:t.tm,fontVariantNumeric:"tabular-nums"}}>{timerStr}</div>
      </div>
    </div>
  );

  /* ============ ITEM CARD ============ */
  const ItemCard=({item})=>{
    const col=rc(item.rarity,t);
    return(
      <div style={{
        ...cardBg,borderRadius:z(6,12,10,14),
        border:`${1.5*s}px solid ${item.owned?t.green+"44":col+"33"}`,
        padding:`${z(3,7,6,9)}px`,
        display:"flex",flexDirection:"column",alignItems:"center",
        gap:z(1,2,2,3),cursor:"pointer",
        position:"relative",overflow:"hidden",
      }}>
        {item.rarity!=="COMMON"&&<div style={{position:"absolute",top:0,left:0,right:0,height:"40%",background:`linear-gradient(180deg,${col}15,transparent)`,pointerEvents:"none"}}/>}
        <span style={{fontSize:z(16,34,28,38),position:"relative"}}>{item.icon}</span>
        <div style={{fontSize:z(5,10,9,12),fontWeight:800,color:t.tx,textAlign:"center",lineHeight:1.2,position:"relative"}}>{item.name}</div>
        <span style={{fontSize:z(4,7,6,8),fontWeight:800,color:col,letterSpacing:0.5*s,position:"relative"}}>{item.rarity}</span>
        {item.owned?(
          <div style={{
            padding:`${z(2,4,3,5)}px ${z(5,10,8,12)}px`,borderRadius:z(3,6,5,8),
            background:item.eq?`${t.green}22`:`${t.a}22`,
            border:`${1*s}px solid ${item.eq?t.green+"44":t.a+"44"}`,
            color:item.eq?t.green:t.a,fontSize:z(5,9,8,11),fontWeight:900,letterSpacing:0.5*s,
          }}>{item.eq?"EQUIPPED":"EQUIP"}</div>
        ):(
          <div style={{
            padding:`${z(2,4,3,5)}px ${z(5,10,8,12)}px`,borderRadius:z(3,6,5,8),
            background:t.pb,color:t.pt,fontSize:z(5,9,8,11),fontWeight:900,letterSpacing:0.5*s,
            display:"flex",alignItems:"center",gap:z(1,3,2,3),
          }}>{item.price}{item.cur==="g"?"\u{1F48E}":"\u{1FA99}"}</div>
        )}
      </div>
    );
  };

  /* ============ BUNDLE CARD ============ */
  const BundleCard=({b})=>{
    const col=rc(b.rarity,t);
    return(
      <div style={{
        ...cardBg,borderRadius:z(8,16,14,18),
        border:`${1.5*s}px solid ${col}44`,
        padding:`${z(4,10,8,12)}px ${z(6,14,12,16)}px`,
        marginBottom:z(2,5,4,6),
        background:`linear-gradient(135deg, ${t.card}, ${col}08)`,
        backdropFilter:"blur(20px)",
        display:"flex",alignItems:"center",gap:z(5,12,10,14),
      }}>
        <div style={{
          width:z(20,42,36,48),height:z(20,42,36,48),borderRadius:z(6,12,10,14),
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:z(12,24,20,28),flexShrink:0,
          background:`${col}22`,border:`${1*s}px solid ${col}44`,
        }}>{b.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:z(3,6,5,8),marginBottom:z(1,2,2,3)}}>
            <span style={{fontSize:z(7,14,12,16),fontWeight:900,color:t.tx}}>{b.name}</span>
            <span style={{fontSize:z(4,7,6,8),fontWeight:800,color:"#000",background:col,padding:`${1*s}px ${z(3,6,5,7)}px`,borderRadius:z(2,4,3,5)}}>{b.discount}</span>
          </div>
          <div style={{fontSize:z(5,10,9,12),color:t.ts}}>{b.items}</div>
        </div>
        <div style={{
          padding:`${z(3,7,5,8)}px ${z(6,14,12,16)}px`,borderRadius:z(5,10,8,12),
          background:t.pb,color:t.pt,fontSize:z(6,12,10,14),fontWeight:900,
          display:"flex",alignItems:"center",gap:z(2,4,3,5),flexShrink:0,cursor:"pointer",
        }}>{b.price}{b.cur==="g"?"\u{1F48E}":"\u{1FA99}"}</div>
      </div>
    );
  };

  /* ============ GEM PACK CARD ============ */
  const GemPackCard=({g})=>(
    <div style={{
      ...cardBg,borderRadius:z(6,12,10,14),
      border:`${1.5*s}px solid ${g.popular?"#E040FB66":g.best?t.leg+"66":"#E040FB33"}`,
      padding:`${z(4,8,7,10)}px`,
      display:"flex",flexDirection:"column",alignItems:"center",
      gap:z(1,3,2,4),cursor:"pointer",position:"relative",overflow:"hidden",
      background:g.popular||g.best?`linear-gradient(135deg,${t.card},${g.best?t.leg:"#E040FB"}10)`:t.card,
      backdropFilter:"blur(20px)",
    }}>
      {(g.popular||g.best)&&(
        <div style={{
          position:"absolute",top:z(2,4,3,5),right:z(2,4,3,5),
          fontSize:z(4,7,6,8),fontWeight:900,
          color:g.best?"#000":"#FFF",background:g.best?t.leg:"#E040FB",
          padding:`${1*s}px ${z(3,5,4,6)}px`,borderRadius:z(2,4,3,5),
        }}>{g.best?"BEST":"POPULAR"}</div>
      )}
      <span style={{fontSize:z(14,28,24,32)}}>{"\u{1F48E}"}</span>
      <div style={{fontSize:z(10,22,18,26),fontWeight:900,color:"#E040FB"}}>{g.gems.toLocaleString()}</div>
      {g.bonus&&<div style={{fontSize:z(4,8,7,9),fontWeight:800,color:t.green}}>{g.bonus} BONUS</div>}
      <div style={{fontSize:z(5,9,8,11),fontWeight:700,color:t.tm}}>{g.name}</div>
      <div style={{
        padding:`${z(3,6,5,7)}px ${z(6,12,10,14)}px`,borderRadius:z(4,8,6,10),
        background:"#E040FB",color:"#FFF",fontSize:z(6,12,10,14),fontWeight:900,cursor:"pointer",
      }}>{g.price}</div>
    </div>
  );

  /* ============ FREE SPIN ============ */
  const FreeSpin=()=>(
    <div onClick={()=>setSpinUsed(true)} style={{
      ...cardBg,borderRadius:z(8,16,14,18),
      border:`${1.5*s}px solid ${spinUsed?t.td+"44":t.green+"66"}`,
      padding:`${z(4,10,8,12)}px ${z(6,14,12,16)}px`,
      marginTop:z(3,8,6,10),
      display:"flex",alignItems:"center",justifyContent:"space-between",
      cursor:"pointer",opacity:spinUsed?0.5:1,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:z(4,10,8,12)}}>
        <span style={{fontSize:z(14,28,24,32)}}>{spinUsed?"\u2705":"\u{1F3B0}"}</span>
        <div>
          <div style={{fontSize:z(7,14,12,16),fontWeight:900,color:spinUsed?t.tm:t.tx}}>FREE DAILY SPIN</div>
          <div style={{fontSize:z(5,10,9,12),color:t.tm}}>
            {spinUsed?"Come back tomorrow!":"Watch an ad for a free item!"}
          </div>
        </div>
      </div>
      {!spinUsed&&(
        <div style={{
          padding:`${z(3,8,6,10)}px ${z(6,16,12,18)}px`,borderRadius:z(5,10,8,12),
          background:t.green,color:"#FFF",fontSize:z(6,12,10,14),fontWeight:900,letterSpacing:0.5*s,
        }}>{"\u{1F4FA}"} SPIN</div>
      )}
    </div>
  );

  /* ============ LAYOUT BUILDER ============ */
  const buildLayout=(padTop,width,maxW)=>(
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:width?"center":"stretch",overflow:"hidden"}}>
      <BackBtn/>
      <div style={{width:width||"auto",maxWidth:maxW,display:"flex",flexDirection:"column",flex:1,paddingTop:padTop,...(!width&&{padding:`${padTop}px ${z(0,14,0,14)}px ${z(0,10,0,10)}px`})}}>
        <CurrencyBar/>
        <TabBar/>
        <div style={{flex:1,overflow:"auto"}}>
          {tab<4&&<FeaturedDeal/>}
          {tab<4&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:z(3,7,6,8)}}>
              {itemData[tab].map((item,i)=><ItemCard key={i} item={item}/>)}
            </div>
          )}
          {tab===4&&bundleData.map((b,i)=><BundleCard key={i} b={b}/>)}
          {tab===5&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:z(3,7,6,8)}}>
              {gemData.map((g,i)=><GemPackCard key={i} g={g}/>)}
            </div>
          )}
          {tab<5&&<FreeSpin/>}
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

  /* ============ BACKGROUND ============ */
  const Bg=()=>(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 60% 15%, #E040FB10 0%, transparent 40%), radial-gradient(ellipse at 30% 75%, ${t.co}08 0%, transparent 40%), ${t.bg}`}}/>
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
