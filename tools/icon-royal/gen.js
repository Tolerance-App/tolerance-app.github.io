const S=1024;
function squircle(){const n=5,a=S/2,pts=[];for(let i=0;i<=200;i++){const t=i/200*Math.PI*2,c=Math.cos(t),s=Math.sin(t);pts.push((a+a*Math.sign(c)*Math.pow(Math.abs(c),2/n)).toFixed(1)+","+(a+a*Math.sign(s)*Math.pow(Math.abs(s),2/n)).toFixed(1));}return "M"+pts.join("L")+"Z";}
const SQ=squircle();
const lin=(id,stops)=>(stops=typeof stops[0]==="string"?[[0,stops[0]],[1,stops[1]]]:stops,`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</linearGradient>`);
function roundPoly(pts,r){const out=[],n=pts.length;pts.forEach((P,i)=>{const ri=r[i];if(!ri){out.push(P);return}const A=pts[(i-1+n)%n],B=pts[(i+1)%n];const nrm=([x,y])=>{const l=Math.hypot(x,y);return [x/l,y/l]};const ua=nrm([A[0]-P[0],A[1]-P[1]]),ub=nrm([B[0]-P[0],B[1]-P[1]]);const c=[P[0]+(ua[0]+ub[0])*ri,P[1]+(ua[1]+ub[1])*ri];const s=[P[0]+ua[0]*ri-c[0],P[1]+ua[1]*ri-c[1]],e=[P[0]+ub[0]*ri-c[0],P[1]+ub[1]*ri-c[1]];const a0=Math.atan2(s[1],s[0]);let d=Math.atan2(e[1],e[0])-a0;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;for(let j=0;j<=8;j++){const a=a0+d*j/8;out.push([c[0]+ri*Math.cos(a),c[1]+ri*Math.sin(a)]);}});return out;}
function plusOutline(cu,cv,L,T,r,ri=0){const h=L/2,t=T/2;const p=[[-t,-h],[t,-h],[t,-t],[h,-t],[h,t],[t,t],[t,h],[-t,h],[-t,t],[-h,t],[-h,-t],[-t,-t]].map(([u,v])=>[cu+u,cv+v]);return roundPoly(p,[r,r,ri,r,r,ri,r,r,ri,r,r,ri]);}
const barOutline=(cu,cv,W,T,r)=>roundPoly([[-W/2,-T/2],[W/2,-T/2],[W/2,T/2],[-W/2,T/2]].map(([u,v])=>[cu+u,cv+v]),[r,r,r,r]);
const flat=(out,s,cx,cy,dx=0,dy=0)=>"M"+out.map(([u,v])=>(cx+u*s+dx).toFixed(1)+","+(cy-v*s+dy).toFixed(1)).join("L")+"Z";
function btnGlyph(id,pieces,s,cx,cy,lg){let defs="",led="",fac="";pieces.forEach((q,i)=>{defs+=lin(`g${i}_${id}`,q.face);led+=`<path d="${flat(q.out,s,cx,cy,0,lg)}" fill="${q.ledge}"/>`;fac+=`<path d="${flat(q.out,s,cx,cy)}" fill="url(#g${i}_${id})"/>`;});return `<defs>${defs}</defs><g filter="url(#bs${id})">${led}</g>${fac}`;}
// clip=true: preview as iOS clips it; false: the square PNG export (iOS/Android round it themselves)
window.icon=function(clip){const id="i",L=60,tone=[["#2961DE","#1A48C0"],["#15368F","#0E2872"]];
 const T=.828,Tm=T*.82,gap=.57,pv=.55,mv=pv-1.5-gap-Tm/2;
 const pl=plusOutline(0,pv,3,T,.267*T,.1*T), mi=barOutline(0,mv,3,Tm,.27*Tm);const mid=((pv+1.5)+(mv-Tm/2))/2, cy=430+mid*148+44-(84-L)/2;
 const head=`<defs>${lin("bf"+id,tone[0])}${lin("bl"+id,tone[1])}${lin("bh"+id,[[0,"#fff",.28],[.45,"#fff",0]])}<clipPath id="ic${id}"><path d="${SQ}"/></clipPath><filter id="bs${id}" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".22"/></filter></defs>`;
 const body=`<rect width="1024" height="1024" fill="url(#bl${id})"/><path d="${SQ}" transform="translate(0 ${-L*0.55})" fill="#000" opacity=".16"/><rect width="1024" height="${S/2}" fill="url(#bf${id})" y="${-L}"/><path d="${SQ}" transform="translate(0 ${-L})" fill="url(#bf${id})"/>`
 +btnGlyph(id,[{out:mi,face:["#FFA04A","#FF8A1F"],ledge:"#B35A00"},{out:pl,face:["#FFFFFF","#F1F5FC"],ledge:"#B9C9E6"}],148,512,cy,30)
 +`<path d="${SQ}" transform="translate(0 ${-L})" fill="url(#bh${id})"/>`;
 return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">${head}${clip?`<g clip-path="url(#ic${id})">${body}</g>`:body}</svg>`};
