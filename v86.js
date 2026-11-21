/* ===== v86 (2026-11-21): bar-chart demos become pictures (2 of 3): code and ML =====
   Same approach as v85 (pic85/wrap85, H85 helpers, reinstalled after build()). Same sliders, keys, readouts, ideas.
   Python division and range, MATLAB colon and product sizes, C pointer offsets, function composition, shared
   default lists, late-binding closures, array vs linked list, conv output size, model memory on a chip, pooled vs
   group error, holding out whole machines. */
try{FB.ver="b86"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["14 more demos are pictures now: number lines for Python and MATLAB, memory cells for C, function pipelines, and pictures for the machine-learning models."]})}catch(e){}

const NL86=(x0,x1,lo,hi,y,step)=>{const {l,t}=H85,X=v=>x0+(v-lo)/(hi-lo||1)*(x1-x0);let g=l(x0,y,x1,y,"var(--mu)",1.2);for(let v=Math.ceil(lo/step)*step;v<=hi+1e-9;v+=step)g+=l(X(v),y-3,X(v),y+3,"var(--mu)",1)+t(X(v),y+15,H85.n(v,2),"middle","var(--mu)",9);return {g,X}};
const listCols86=(n,leftT,rightT)=>{const {r,t}=H85;let g=t(85,14,leftT,"middle","var(--orange)",9.5)+t(240,14,rightT,"middle","var(--ok)",9.5);
 for(let k=1;k<=n;k++){const y=14+k*15;g+=t(14,y+9,"call "+k,"start","var(--mu)",9);for(let j=0;j<k;j++)g+=r(58+j*11,y,9,10,"var(--orange)",.3,1);g+=r(200,y,9,10,"var(--ok)",.3,1)}
 return {g,h:30+n*15}};

/* ---------- Python ---------- */
pic85("code-python-1",v=>{const {r,t,svg}=H85,a=Math.round(+v.a),b=Math.max(1,Math.round(+v.b)),q=Math.floor(a/b),m=a%b,top=Math.max(a,1),X=k=>20+k/top*280;let g="";
 for(let k=0;k<q;k++)g+=r(X(k*b),40,X((k+1)*b)-X(k*b),26,"var(--blue)",k%2?.35:.18,1);
 if(m)g+=r(X(q*b),40,X(a)-X(q*b),26,"var(--orange)",.35,1);
 g+=t(20,84,"0","start","var(--mu)",9)+t(300,84,String(a),"end","var(--mu)",9)+t(160,28,a+" split into groups of "+b,"middle","var(--mu)",10);
 g+=t(20,108,"a // b = "+q+" full group"+(q==1?"":"s"),"start","var(--blue)")+t(300,108,"a % b = "+m+" left over","end","var(--orange)")+t(160,128,q+" × "+b+" + "+m+" = "+a,"middle","var(--tx)");
 return svg(138,g)});
pic85("code-python-2",v=>{const {c,t,svg}=H85,a=Math.round(+v.a),b=Math.round(+v.b),s=Math.max(1,Math.round(+v.s)),N=NL86(16,304,0,20,70,5);let g=N.g,cnt=0;
 for(let x=a;x<b;x+=s){g+=c(N.X(x),70,4.5,"var(--blue)","var(--blue)");cnt++}
 g+=c(N.X(b),70,7,"var(--bad)","none",1.6)+t(N.X(b),50,"b = "+b+" (stops, not included)",b>12?"end":"start","var(--bad)",9.5)+t(N.X(a),102,"start a = "+a,a>14?"end":"start","var(--blue)",9.5);
 g+=t(160,128,"range("+a+", "+b+", "+s+") gives "+cnt+" value"+(cnt==1?"":"s"),"middle","var(--tx)");return svg(138,g)});
pic85("code-python-3",v=>{const n=Math.round(+v.n),L=listCols86(n,"xs=[]: one shared list","xs=None: new each call");return H85.svg(L.h,L.g)});

/* ---------- MATLAB ---------- */
pic85("code-matlab-1",v=>{const {c,t,svg}=H85,a=+v.a,b=+v.b,h=+v.h,N=NL86(16,304,0,20,70,5),cnt=Math.floor((b-a)/h+1e-9)+1,last=a+(cnt-1)*h;let g=N.g;
 for(let k=0;k<cnt;k++)g+=c(N.X(a+k*h),70,3.5,"var(--blue)","var(--blue)");
 g+=c(N.X(last),70,6,"var(--orange)","none",1.6)+t(N.X(last),48,"last "+H85.n(last,2),last>14?"end":"start","var(--orange)",9.5);
 if(Math.abs(last-b)>1e-9)g+=`<path d="M${N.X(b).toFixed(1)} 58V82" stroke="var(--bad)" stroke-width="1.4" stroke-dasharray="2 2" fill="none"/>`+t(N.X(b),100,"b = "+H85.n(b,2)+" not reached","middle","var(--bad)",9.5);
 g+=t(160,128,H85.n(a,2)+":"+H85.n(h,2)+":"+H85.n(b,2)+" has "+cnt+" element"+(cnt==1?"":"s"),"middle","var(--tx)");return svg(138,g)});
pic85("code-matlab-2",v=>{const {r,t,svg}=H85,n=Math.round(+v.n),c=Math.min(13,110/n);let g="";
 for(let i=0;i<n;i++)for(let j=0;j<n;j++)g+=r(20+j*c,34+i*c,c-1,c-1,"var(--blue)",.25,.6);
 g+=t(20,24,"x'*x is "+n+"×"+n,"start","var(--blue)",10);
 for(let j=0;j<n;j++)g+=r(180+j*c,34,c-1,c-1,"var(--ok)",.25,.6);g+=t(180,24,"x.*x is 1×"+n,"start","var(--ok)",10);
 g+=r(180,84,13,13,"var(--orange)",.35,.8)+t(180,76,"x*x' is 1×1","start","var(--orange)",10)+t(198,95,"= "+(n*(n+1)*(2*n+1)/6),"start","var(--orange)",10);
 g+=t(160,Math.max(34+n*c,110)+18,"x = 1:"+n+" is a 1×"+n+" row","middle","var(--mu)",9.5);return svg(Math.max(34+n*c,110)+26,g)});

/* ---------- C ---------- */
pic85("code-c-2",v=>{const {r,l,t,a,dim,svg}=H85,base=Math.round(+v.base),i=Math.round(+v.i),sz=Math.round(+v.sz),w=18,x0=16;let g="";
 for(let k=0;k<16;k++){g+=r(x0+k*w,56,w-1,28,k==i?"var(--orange)":"var(--blue)",k==i?.4:.12,1);for(let b=1;b<sz;b++)g+=l(x0+k*w+(w-1)*b/sz,78,x0+k*w+(w-1)*b/sz,84,"var(--fa)",.6)}
 g+=t(x0,40,"base = "+base,"start","var(--blue)",10)+a(x0+8,44,x0+8,54,"var(--blue)",1.2);
 g+=dim(x0,x0+Math.max(i*w,1),100,"","var(--mu)",true)+t(x0,114,"offset i × size = "+i*sz+" bytes","start","var(--mu)",9.5)+t(Math.min(300,Math.max(20,x0+i*w+8)),130,"a["+i+"] at "+(base+i*sz),"middle","var(--orange)");
 g+=t(304,40,sz+" byte"+(sz>1?"s":"")+" per element","end","var(--mu)",9.5);return svg(140,g)});

/* ---------- functions ---------- */
pic85("code-functions-2",v=>{const {r,t,a,svg}=H85,x=+v.argument,G=+v.outerGain,i1=2*x,o=G*i1;let g="";
 g+=r(8,46,56,30,"var(--mu)",.15)+t(36,66,"x = "+H85.n(x,2));
 g+=a(66,61,100,61,"var(--tx)",1.4)+r(102,46,78,30,"var(--blue)",.2)+t(141,58,"inner","middle","var(--blue)",9)+t(141,71,"2 · x","middle","var(--tx)",10);
 g+=a(182,61,212,61,"var(--tx)",1.4)+t(197,52,H85.n(i1,2),"middle","var(--blue)",10)+r(214,46,98,30,"var(--orange)",.2)+t(263,58,"outer","middle","var(--orange)",9)+t(263,71,G+" · inner","middle","var(--tx)",10);
 g+=t(263,100,"returns "+H85.n(o,2),"middle","var(--orange)")+t(160,128,"outer(inner(x)): the inner call runs first","middle","var(--mu)",9.5);return svg(138,g)});
pic85("code-functions-3",v=>{const n=Math.round(+v.calls),L=listCols86(n,"reused default list","fresh list each call");return H85.svg(L.h,L.g)});
pic85("code-functions-4",v=>{const {r,t,svg}=H85,n=Math.round(+v.count),w=Math.min(28,280/n);let g=t(20,20,"late lookup: every function reads i after the loop ends","start","var(--bad)",9.5);
 for(let k=0;k<n;k++)g+=r(20+k*w,28,w-2,22,"var(--bad)",.2,1)+t(20+k*w+(w-2)/2,43,String(n-1),"middle","var(--tx)",9.5);
 g+=t(300,64,"sum "+n*(n-1),"end","var(--bad)",9.5)+t(20,88,"captured: each function keeps its own i","start","var(--ok)",9.5);
 for(let k=0;k<n;k++)g+=r(20+k*w,96,w-2,22,"var(--ok)",.2,1)+t(20+k*w+(w-2)/2,111,String(k),"middle","var(--tx)",9.5);
 g+=t(300,132,"sum "+n*(n-1)/2,"end","var(--ok)",9.5);return svg(140,g)});

/* ---------- array or linked list (registered demo) ---------- */
wrap85("arrlist",v=>{const {r,t,a,l,svg}=H85,n=Math.round(+v.n),i=Math.min(Math.round(+v.i),n-1),hops=Math.min(+v.i,n);let g=t(10,16,"Array: jump straight to slot i","start","var(--blue)",9.5);
 const lab=["[0]","[1]","[2]","…","["+i+"]","…","["+(n-1)+"]"];lab.forEach((s,k)=>{const x=10+k*43;g+=r(x,24,40,22,k==4?"var(--orange)":"var(--blue)",k==4?.35:.12,1)+t(x+20,39,s,"middle","var(--tx)",9)});
 g+=`<path d="M30 50 Q 115 76 192 50" stroke="var(--orange)" stroke-width="1.6" fill="none"/>`+t(110,80,"1 step","middle","var(--orange)",9.5);
 g+=t(10,104,"List: follow links from the head","start","var(--ok)",9.5);[0,1,2].forEach(k=>{const x=10+k*60;g+=r(x,112,40,22,"var(--ok)",.12,1)+t(x+20,127,String(k),"middle","var(--tx)",9)+a(x+41,123,x+58,123,"var(--ok)",1.2)});
 g+=t(205,127,"…","middle")+r(236,112,40,22,"var(--orange)",.35,1)+t(256,127,String(i),"middle","var(--tx)",9)+t(160,152,hops+" hop"+(hops==1?"":"s")+" to reach position "+i,"middle","var(--ok)",9.5);
 g+=t(160,172,"Insert at the front: array shifts "+n+", list changes 1 link","middle","var(--mu)",9.5);return svg(180,g)});

/* ---------- ML ---------- */
pic85("ml-nn-3",v=>{const {r,t,l,svg}=H85,N=Math.round(+v.N),k=Math.round(+v.k),p=Math.round(+v.p),s=Math.round(+v.s),T=N+2*p,u=280/T,x0=20,out=Math.floor((N+2*p-k)/s)+1;let g="";
 g+=r(x0,52,p*u,18,"var(--fa)",.2,0)+r(x0+(p+N)*u,52,p*u,18,"var(--fa)",.2,0)+r(x0+p*u,52,N*u,18,"var(--blue)",.18,1);
 for(let j=0;j<Math.min(3,out);j++){const xa=x0+j*s*u,xb=xa+k*u,y=44-j*9;g+=l(xa,y,xb,y,"var(--orange)",2)+l(xa,y,xa,52,"var(--orange)",.8,"2 2")+l(xb,y,xb,52,"var(--orange)",.8,"2 2")}
 const uo=280/Math.max(out,1);g+=r(x0,104,out*Math.min(uo,u*s),18,"var(--ok)",.25,1);
 g+=t(x0,88,"input "+N+(p?" + "+2*p+" padding":""),"start","var(--blue)",9.5)+t(300,88,"window "+k+", step "+s,"end","var(--orange)",9.5)+t(x0,140,"output width "+out,"start","var(--ok)",10);
 return svg(150,g)});
pic85("ml-nn-4",v=>{const {r,t,svg}=H85,P=+v.P,b=+v.b,mem=+v.mem,wm=P*b/8,mx=Math.max(mem,wm),S=x=>120*Math.sqrt(x/mx),ok=wm<=mem,col=H85.ok(ok);let g="";
 g+=r(40,140-S(mem),S(mem),S(mem),"var(--blue)",.12,1.6)+t(40,156,"blue: chip memory "+H85.n(mem,2)+" MB","start","var(--blue)",9.5);
 g+=r(40,140-S(wm),S(wm),S(wm),col,.3,1.4)+t(190,70,"weights","start",col,10)+t(190,86,H85.n(P,2)+" M × "+b+" bits","start","var(--mu)",9.5)+t(190,102,"= "+H85.n(wm,2)+" MB","start",col,10)+t(190,124,ok?"fits on the chip":"does not fit","start",col,10);
 return svg(164,g)});
pic85("ml-overfitting-validation-2",v=>{const {c,t,svg}=H85,ea=Math.round(+v.errorsA),eb=Math.round(+v.errorsB);let g="";
 for(let k=0;k<20;k++){const x=14+(k%2)*11,y=30+Math.floor(k/2)*11;g+=c(x,y,3.6,k<ea?"var(--bad)":"var(--fa)",k<ea?"var(--bad)":"none",1)}
 for(let k=0;k<180;k++){const x=70+(k%20)*11.6,y=30+Math.floor(k/20)*11;g+=c(x,y,3.6,k<eb?"var(--bad)":"var(--fa)",k<eb?"var(--bad)":"none",1)}
 g+=t(20,18,"A","middle","var(--mu)",9.5)+t(180,18,"B (180 rows)","middle","var(--mu)",9.5)+t(20,148,H85.n(100*ea/20,1)+"%","middle","var(--tx)",9.5)+t(180,148,H85.n(100*eb/180,1)+"% wrong","middle","var(--tx)",9.5);
 g+=t(160,170,"pooled "+H85.n(100*(ea+eb)/200,1)+"% · average of groups "+H85.n(50*(ea/20+eb/180),1)+"%","middle","var(--orange)",9.5);return svg(178,g)});
pic85("ml-overfitting-validation-3",v=>{const {r,c,t,svg}=H85,h=Math.round(+v.heldMachines);let g="";
 for(let m=0;m<10;m++){const held=m>=10-h,x=12+(m%5)*61,y=26+Math.floor(m/5)*62,col=held?"var(--orange)":"var(--blue)";g+=r(x,y,54,48,col,held?.25:.1,1.2)+t(x+27,y+12,"#"+(m+1),"middle","var(--tx)",9);
  for(let k=0;k<20;k++)g+=c(x+8+(k%10)*4.4,y+24+Math.floor(k/10)*8,1.5,col,col,.6)}
 g+=t(12,16,"train on "+(10-h)+" machines ("+(10-h)*20+" rows)","start","var(--blue)",9.5)+t(308,16,"test on "+h+" unseen ("+h*20+")","end","var(--orange)",9.5);
 return svg(156,g)});

inst85();
try{const _bu86=build;build=function(){const r=_bu86.apply(this,arguments);try{inst85()}catch(e){}return r}}catch(e){}
try{TF48.unshift({b:"b86",k:"bd86",t:"Code and ML demos → pictures (14)",c:"Python // and %, range, shared default list, MATLAB colon and sizes, C offsets, composition, closures, array vs list, conv width, chip memory, pooled error, held-out machines.",go:["lab","code-python-1"]})}catch(e){}
