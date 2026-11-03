# Cargar en Blender como texto y ejecutar con exec(); ejemplo de modelo paramétrico — ver lamina-tecnica/SKILL.md

import bpy, bmesh, math
from mathutils import Vector, Matrix
# ---------------- Buque refrigerado tipo "tres islas", años 40 (ilustrativo) ----------------
# Proa hacia +X, babor +Y, quilla en Z=0. Metros.
P = dict(L=92.0, Bh=6.7, D=7.4, T=5.8,                     # eslora entre extremos de casco, semimanga, puntal, calado
         sheer_f=1.8, sheer_a=0.9, rake=4.5, forefoot=3.2, cutup=4.5, overhang=4.0,
         fcle=(77.0, 2.5), bridge=(38.0, 57.0, 2.4), poop=(12.5, 2.4))
def sstep(x):
    x=max(0.0,min(1.0,x)); return x*x*(3-2*x)
def half_b(u):
    Bh=P["Bh"]
    if u>0.6: t=(u-0.6)/0.4; return Bh*max(0.0,1-t**2.0)**0.7
    if u<0.22: t=(0.22-u)/0.22; return Bh*max(0.0,1-t**2.4)**0.55
    return Bh
def n_exp(u):
    s=max(0.0,min(1.0,u/0.22,(1-u)/0.32)); return 1.15+6.0*s
def deck_z(x):
    L=P["L"]; u=x/L
    z=P["D"]+P["sheer_f"]*max(0,(u-0.5)/0.5)**2+P["sheer_a"]*max(0,(0.5-u)/0.5)**2
    z+=P["fcle"][1]*sstep((x-(P["fcle"][0]-0.5))/1.0)
    b0,b1,bh=P["bridge"]; z+=bh*sstep((x-(b0-0.5))/1.0)*sstep(((b1+0.5)-x)/1.0)
    z+=P["poop"][1]*sstep(((P["poop"][0]+0.5)-x)/1.0)
    return z
def keel_z(u):
    z=0.0
    if u>0.94: z+=P["forefoot"]*((u-0.94)/0.06)**2
    if u<0.10: z+=P["cutup"]*((0.10-u)/0.10)**1.5
    return z
def hull_pt(u,t,side=1):
    L=P["L"]; x0=u*L
    xs=0.0
    if u>0.9: xs+=P["rake"]*t*((u-0.9)/0.1)
    if u<0.12: xs-=P["overhang"]*(t**0.6)*((0.12-u)/0.12)
    zk=keel_z(u); zd=deck_z(x0+xs)
    n=n_exp(u); b=half_b(u)
    y=b*(1-(1-t)**n)**(1.0/n)
    return Vector((x0+xs, side*y, zk+t*(zd-zk)))
def coll(name):
    sc=bpy.data.scenes["Barco1944"]
    c=bpy.data.collections.get(name)
    if not c: c=bpy.data.collections.new(name); sc.collection.children.link(c)
    return c
def mesh_obj(name, verts, faces, c, smooth=False):
    me=bpy.data.meshes.new(name); me.from_pydata(verts,[],faces); me.update()
    if smooth:
        for p in me.polygons: p.use_smooth=True
    o=bpy.data.objects.new(name,me); c.objects.link(o); return o
def build_hull(U=360, V=28):
    c=coll("S_Hull")
    for o in list(c.objects): bpy.data.objects.remove(o,do_unlink=True)
    us=[i/(U-1) for i in range(U)]
    ts=[(j/(V-1))**1.6 for j in range(V)]          # más densidad cerca del pantoque
    verts=[]; faces=[]
    for u in us:
        row=[hull_pt(u,t,-1) for t in reversed(ts)]+[hull_pt(u,t,1) for t in ts[1:]]
        verts+=list(map(tuple,row))
    W=2*V-1
    for i in range(U-1):
        for j in range(W-1):
            a=i*W+j; faces.append((a,a+1,a+1+W,a+W))
    h=mesh_obj("Hull",verts,faces,c,smooth=True)
    # cubierta con brusca (camber) entre las aristas de cubierta
    dv=[];df=[]; K=7
    for u in us:
        pR=hull_pt(u,1.0,1); pL=hull_pt(u,1.0,-1)
        for k in range(K):
            s=k/(K-1); y=pL.y+(pR.y-pL.y)*s; camber=0.15*(1-(2*s-1)**2)*(pR.y/P["Bh"])
            dv.append((pR.x, y, pR.z+camber))
    for i in range(U-1):
        for k in range(K-1):
            a=i*K+k; df.append((a,a+K,a+K+1,a+1))
    d=mesh_obj("Deck",dv,df,c,smooth=True)
    return h,d

P["cutup"]=5.5
def box(name,x0,x1,y0,y1,z0,z1,c):
    v=[(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]
    f=[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
    return mesh_obj(name,v,f,c)
def join_into(name, parts, c, smooth=False):
    """parts: lista de (verts, faces) → un solo objeto"""
    V=[];F=[]
    for v,f in parts:
        n=len(V); V+=list(v); F+=[tuple(i+n for i in ff) for ff in f]
    return mesh_obj(name,V,F,c,smooth)
def cyl_parts(p0,p1,r0,r1=None,seg=12):
    r1=r0 if r1 is None else r1
    p0=Vector(p0); p1=Vector(p1); d=(p1-p0); L=d.length
    q=Vector((0,0,1)).rotation_difference(d.normalized())
    v=[];f=[]
    for k,(r,z) in enumerate(((r0,0),(r1,L))):
        for i in range(seg):
            a=2*math.pi*i/seg; v.append(tuple(p0+q@Vector((r*math.cos(a),r*math.sin(a),z))))
    for i in range(seg):
        j=(i+1)%seg; f.append((i,j,seg+j,seg+i))
    f.append(tuple(range(seg))[::-1]); f.append(tuple(range(seg,2*seg)))
    return v,f
def ellipsoid_parts(c,ax,rot=None,seg=16,rings=10):
    v=[];f=[]
    R=rot or Matrix.Identity(3)
    for i in range(rings+1):
        th=math.pi*i/rings
        for j in range(seg):
            ph=2*math.pi*j/seg
            p=Vector((ax[0]*math.sin(th)*math.cos(ph), ax[1]*math.sin(th)*math.sin(ph), ax[2]*math.cos(th)))
            v.append(tuple(Vector(c)+R@p))
    for i in range(rings):
        for j in range(seg):
            a=i*seg+j; b=i*seg+(j+1)%seg; f.append((a,b,b+seg,a+seg))
    return v,f
def deck_edge(x, inset=0.12):
    L=P["L"]; u=max(0.0,min(1.0,x/L)); return half_b(u)-inset, deck_z(x)
def rail_parts(pts, h=1.0, post=1.6, r=0.03):
    """barandal: pasamanos a h y h/2 siguiendo pts (x,y,z) + candeleros"""
    parts=[]
    for k in range(len(pts)-1):
        a=Vector(pts[k]); b=Vector(pts[k+1])
        for hh in (h, h*0.5):
            parts.append(cyl_parts(a+Vector((0,0,hh)), b+Vector((0,0,hh)), r, seg=6))
    acc=0.0; last=None
    poly=[Vector(p) for p in pts]
    d=0.0; nxt=0.0
    for k in range(len(poly)-1):
        a,b=poly[k],poly[k+1]; seg=(b-a).length
        while nxt<=d+seg:
            p=a+(b-a)*((nxt-d)/seg if seg>0 else 0); parts.append(cyl_parts(p,p+Vector((0,0,h)),r*1.1,seg=6)); nxt+=post
        d+=seg
    return parts
def edge_path(x0,x1,side,inset=0.15,step=0.8):
    n=max(2,int(abs(x1-x0)/step)+1); pts=[]
    for i in range(n):
        x=x0+(x1-x0)*i/(n-1); y,z=deck_edge(x,inset); pts.append((x,side*y,z))
    return pts
def build_super():
    c=coll("S_Super")
    for o in list(c.objects): bpy.data.objects.remove(o,do_unlink=True)
    L=P["L"]; b0,b1,_=P["bridge"]
    zb=deck_z(47.5)
    H1=(40.0,55.0,4.8,zb,zb+2.5); H2=(45.5,53.0,4.0,H1[4],H1[4]+2.4); WH=(49.6,53.0,3.6,H2[4],H2[4]+2.3)
    for nm,(x0,x1,yy,z0,z1) in (("House1",H1),("House2",H2),("Wheelhouse",WH)):
        box(nm,x0,x1,-yy,yy,z0,z1,c)
    box("WheelhouseRoof",WH[0]-0.2,WH[1]+0.25,-WH[2]-0.2,WH[2]+0.2,WH[4],WH[4]+0.15,c)
    # alas del puente con sus mamparas
    z=H2[4]
    box("WingFloor",51.8,53.0,-6.6,6.6,z-0.15,z,c)
    box("WingScreenP",51.8,53.0,6.45,6.6,z,z+1.1,c); box("WingScreenS",51.8,53.0,-6.6,-6.45,z,z+1.1,c)
    box("WingFrontP",52.85,53.0,WH[2],6.6,z,z+1.1,c); box("WingFrontS",52.85,53.0,-6.6,-WH[2],z,z+1.1,c)
    # ventanas del puente (frente y costados)
    parts=[]
    for k in range(7):
        y0=-2.9+k*0.85; parts.append((lambda b: b)(( [(WH[1],y0,WH[3]+1.05),(WH[1]+0.04,y0,WH[3]+1.05),(WH[1]+0.04,y0+0.65,WH[3]+1.05),(WH[1],y0+0.65,WH[3]+1.05),
                                                     (WH[1],y0,WH[3]+1.85),(WH[1]+0.04,y0,WH[3]+1.85),(WH[1]+0.04,y0+0.65,WH[3]+1.85),(WH[1],y0+0.65,WH[3]+1.85)],
                                                    [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)])))
    for s in (1,-1):
        for k in range(3):
            x0=WH[0]+0.5+k*1.0; yy=s*(WH[2]+0.04)
            v=[(x0,s*WH[2],WH[3]+1.05),(x0+0.7,s*WH[2],WH[3]+1.05),(x0+0.7,yy,WH[3]+1.05),(x0,yy,WH[3]+1.05),
               (x0,s*WH[2],WH[3]+1.85),(x0+0.7,s*WH[2],WH[3]+1.85),(x0+0.7,yy,WH[3]+1.85),(x0,yy,WH[3]+1.85)]
            parts.append((v,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]))
    join_into("Windows",parts,c)
    # portillos: costados de la casa 1 y del castillo central
    parts=[]
    for s in (1,-1):
        x=41.0
        while x<54.5:
            parts.append(cyl_parts((x,s*4.8,zb+1.35),(x,s*4.86,zb+1.35),0.2,seg=14)); x+=1.7
        x=39.2
        while x<56.5:
            y,zz=deck_edge(x,0.0); parts.append(cyl_parts((x,s*(y+0.0),deck_z(x)-1.15),(x,s*(y+0.06),deck_z(x)-1.15),0.2,seg=14)); x+=2.2
        for x in (79.5,81.5,83.5):
            y,zz=deck_edge(x,0.0); parts.append(cyl_parts((x,s*y,deck_z(x)-1.1),(x,s*(y+0.06),deck_z(x)-1.1),0.18,seg=14))
    join_into("Portholes",parts,c)
    # chimenea elíptica inclinada con banda
    fz0=H1[4]; fh=7.5; rake=math.radians(12); fx=44.2
    def funnel_ring(z,ax,ay,seg=32):
        return [(fx+(z-fz0)*math.tan(rake)+ax*math.cos(2*math.pi*i/seg), ay*math.sin(2*math.pi*i/seg), z) for i in range(seg)]
    seg=32; rings=[funnel_ring(fz0+fh*k/8,1.75,1.3) for k in range(9)]
    V=[p for r in rings for p in r]; F=[]
    for k in range(8):
        for i in range(seg): j=(i+1)%seg; F.append((k*seg+i,k*seg+j,(k+1)*seg+j,(k+1)*seg+i))
    F.append(tuple(range(8*seg,9*seg)))
    mesh_obj("Funnel",V,F,c,smooth=True)
    band=[funnel_ring(fz0+fh*0.62,1.79,1.34),funnel_ring(fz0+fh*0.80,1.79,1.34)]
    V=[p for r in band for p in r]; F=[(i,(i+1)%seg,seg+(i+1)%seg,seg+i) for i in range(seg)]
    mesh_obj("FunnelBand",V,F,c,smooth=True)
    cap=[funnel_ring(fz0+fh,1.84,1.39),funnel_ring(fz0+fh+0.25,1.84,1.39)]
    V=[p for r in cap for p in r]; F=[(i,(i+1)%seg,seg+(i+1)%seg,seg+i) for i in range(seg)]
    mesh_obj("FunnelCap",V,F,c,smooth=True)
    # botes salvavidas sobre la cubierta de botes, con pescantes
    parts=[]; dav=[]
    for s in (1,-1):
        parts.append(ellipsoid_parts((44.2,s*3.4,H1[4]+0.85),(3.4,1.0,0.62)))
        for xd in (41.4,47.0):
            p0=Vector((xd,s*4.55,H1[4])); p1=Vector((xd,s*4.55,H1[4]+1.7)); p2=Vector((xd,s*3.9,H1[4]+2.5)); p3=Vector((xd,s*3.4,H1[4]+2.35))
            for a,b in ((p0,p1),(p1,p2),(p2,p3)): dav.append(cyl_parts(a,b,0.09,seg=8))
    join_into("Lifeboats",parts,c,smooth=True); join_into("Davits",dav,c,smooth=True)
    # barandales: castillo, toldilla, castillo central, cubierta de botes y de navegación
    R=[]
    fx0=P["fcle"][0]+0.3; px1=P["poop"][0]-0.3
    for s in (1,-1):
        R+=rail_parts(edge_path(fx0,L+2.0,s)); R+=rail_parts(edge_path(-3.2,px1,s)); R+=rail_parts(edge_path(b0+0.3,b1-0.3,s))
    for x in (fx0,px1,b0+0.3,b1-0.3):
        y,z=deck_edge(x,0.15); R+=rail_parts([(x,-y,z),(x,y,z)])
    for yy in (4.65,-4.65):
        R+=rail_parts([(40.2,yy,H1[4]),(54.8,yy,H1[4])],h=0.9)
    R+=rail_parts([(40.2,-4.65,H1[4]),(40.2,4.65,H1[4])],h=0.9)
    R+=rail_parts([(45.7,-3.85,H2[4]),(51.8,-3.85,H2[4]),(51.8,-6.5,H2[4])],h=0.9)+rail_parts([(45.7,3.85,H2[4]),(51.8,3.85,H2[4]),(51.8,6.5,H2[4])],h=0.9)
    R+=rail_parts([(WH[0],-3.4,WH[4]+0.15),(WH[1],-3.4,WH[4]+0.15),(WH[1],3.4,WH[4]+0.15),(WH[0],3.4,WH[4]+0.15),(WH[0],-3.4,WH[4]+0.15)],h=0.8)
    join_into("Rails",R,c,smooth=True)
    return dict(zb=zb,H1=H1,H2=H2,WH=WH)
def build_cargo():
    c=coll("S_Cargo")
    for o in list(c.objects): bpy.data.objects.remove(o,do_unlink=True)
    L=P["L"]
    hatches=[(14.5,21.5),(25.5,33.0),(58.5,65.5),(69.0,76.0)]
    for i,(x0,x1) in enumerate(hatches):
        z=deck_z((x0+x1)/2)
        box(f"Coaming{i+1}",x0,x1,-3.3,3.3,z-0.1,z+0.95,c)
        parts=[]
        n=6
        for k in range(1,n):
            xx=x0+(x1-x0)*k/n
            parts.append(([(xx-0.06,-3.35,z+0.95),(xx+0.06,-3.35,z+0.95),(xx+0.06,3.35,z+0.95),(xx-0.06,3.35,z+0.95),
                           (xx-0.06,-3.35,z+1.05),(xx+0.06,-3.35,z+1.05),(xx+0.06,3.35,z+1.05),(xx-0.06,3.35,z+1.05)],
                          [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]))
        join_into(f"Battens{i+1}",parts,c)
    masts=[]
    for nm,xm in (("Fore",67.2),("Aft",23.5)):
        z=deck_z(xm)
        box(f"MastHouse{nm}",xm-1.2,xm+1.2,-1.6,1.6,z-0.1,z+2.3,c)
        top=z+23.0
        parts=[cyl_parts((xm,0,z+2.3),(xm,0,top),0.32,0.17,seg=16)]
        parts.append(cyl_parts((xm,-1.9,z+17.0),(xm,1.9,z+17.0),0.1,seg=8))
        parts+=[ellipsoid_parts((xm,0,top+0.2),(0.22,0.22,0.22),seg=10,rings=6)]
        join_into(f"Mast{nm}",parts,c,smooth=True)
        # plumas (derricks) arboladas hacia las escotillas, con amantillos
        D=[]
        for sgn in (1,-1):
            p0=Vector((xm+sgn*0.45,0,z+3.0)); p1=Vector((xm+sgn*6.0,0,z+10.5))   # penol sobre el centro de la escotilla que sirve
            D.append(cyl_parts(p0,p1,0.16,0.09,seg=10))
            D.append(cyl_parts(p1,Vector((xm,0,z+16.5)),0.03,seg=6))          # amantillo
            # beta de carga: baja del penol hasta la cubierta/escotilla, con el gancho trincado (navegando)
            zl=deck_z(p1.x)
            for hx0,hx1 in hatches:
                if hx0-0.3<=p1.x<=hx1+0.3: zl=deck_z((hx0+hx1)/2)+1.05
            D.append(cyl_parts(p1,Vector((p1.x,0,zl+0.55)),0.025,seg=6))
            D.append(ellipsoid_parts((p1.x,0,zl+0.42),(0.14,0.14,0.2),seg=10,rings=6))      # motón del gancho
            D.append(cyl_parts((p1.x,0,zl+0.22),(p1.x,0,zl),0.02,seg=6))                     # trinca al cáncamo
        # obenques
        for s in (1,-1):
            for dx in (-1.6,1.6):
                y,zz=deck_edge(xm+dx,0.2); D.append(cyl_parts((xm,0,z+16.8),(xm+dx,s*y,zz+0.1),0.03,seg=6))
        join_into(f"Rigging{nm}",D,c,smooth=True)
        masts.append((xm,top))
        # ventiladores de manguera junto a la casa de maquinillas
        V=[]
        for s in (1,-1):
            V.append(cyl_parts((xm,s*2.35,z),(xm,s*2.35,z+2.6),0.28,seg=14))
            V.append(ellipsoid_parts((xm+0.25,s*2.35,z+2.75),(0.45,0.42,0.42),seg=14,rings=8))
        join_into(f"Vents{nm}",V,c,smooth=True)
    # estays: proa, popa y antena entre palos
    (xf,tf),(xa,ta)=masts
    S=[cyl_parts((xf,0,tf),(L+P["rake"]+0.3,0,deck_z(L+4)+1.0),0.03,seg=6),
       cyl_parts((xa,0,ta),(-3.3,0,deck_z(-3)+1.0),0.03,seg=6),
       cyl_parts((xf,0,tf-0.6),(xa,0,ta-0.6),0.02,seg=6)]
    join_into("Stays",S,c,smooth=True)
    # molinete de anclas y bitas
    zf=deck_z(86); box("Windlass",85.0,87.0,-1.5,1.5,zf,zf+1.0,c)
    B=[]
    for x in (79.5,88.0,-1.5,9.5,40.0,55.5):
        y,zz=deck_edge(x,0.9)
        for s in (1,-1):
            for dx in (-0.3,0.3): B.append(cyl_parts((x+dx,s*y,zz),(x+dx,s*y,zz+0.6),0.16,seg=10))
    join_into("Bitts",B,c,smooth=True)
def build_underwater():
    c=coll("S_Under")
    for o in list(c.objects): bpy.data.objects.remove(o,do_unlink=True)
    box("SolePiece",-1.9,9.5,-0.25,0.25,0.0,0.35,c)
    box("Sternpost",2.9,3.4,-0.3,0.3,0.0,keel_z(3.15/P["L"])+0.3,c)
    # timón semicompensado de perfil redondeado (años 40), extruido ±0.18 m
    prof=[(-0.25,0.35),(-0.25,4.9),(-0.5,5.05),(-2.15,4.88),(-2.42,4.55),(-2.3,0.8),(-2.05,0.48),(-1.65,0.35)]
    V=[(x,-0.18,z) for x,z in prof]+[(x,0.18,z) for x,z in prof]; n=len(prof)
    F=[tuple(range(n))[::-1],tuple(range(n,2*n))]+[(i,(i+1)%n,n+(i+1)%n,n+i) for i in range(n)]
    mesh_obj("Rudder",V,F,c)
    parts=[cyl_parts((-1.05,0,5.0),(-1.05,0,6.6),0.16,seg=10)]
    parts.append(cyl_parts((0.9,0,2.1),(2.9,0,2.1),0.32,0.42,seg=16))   # núcleo + tubo de bocina
    for k in range(4):
        a=math.radians(45+90*k)
        R=Matrix.Rotation(a,3,'X')@Matrix.Rotation(math.radians(28),3,'Z')
        cpos=Vector((1.6,0,2.1))+Matrix.Rotation(a,3,'X')@Vector((0,0,1.05))
        parts.append(ellipsoid_parts(tuple(cpos),(0.22,0.55,0.95),rot=R,seg=12,rings=8))
    join_into("Propeller",parts,c,smooth=True)
    # escobenes de anclas
    A=[]
    for s in (1,-1):
        p=hull_pt(0.972,0.86,s); A.append(cyl_parts((p.x,p.y,p.z),(p.x,p.y+s*0.08,p.z),0.42,seg=16))
    join_into("Hawse",A,c,smooth=True)
