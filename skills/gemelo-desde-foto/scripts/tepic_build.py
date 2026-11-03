# Cargar en Blender como texto y ejecutar con exec(); ver SKILL.md

import bpy, bmesh, math
from mathutils import Vector
# ---------- medidas en PÍXELES tomadas de la foto (1024x368) ----------
M = dict(
  fascia_top_v=94.0, fascia_bot_v=115.5, fascia_end_du=483.4,          # du = distancia horizontal al eje u0
  col_du=[77.75, 211.0, 350.0], col_head_v=178.5, base_v=278.75,
  peak_du=[164.6, 313.1],                                               # +0 al centro
  glass_end_du_L=356.0, glass_end_du_R=354.0, endpanel_L_du=376.0, endpanel_R_du=369.0,
  leftblock_top_v=165.0, leftblock_edge_du=377.5,
  glass_apex_v=140.0,
  col_w_px=9.0, fillet_px=2.2,                                        # cabeza de columna medida a 10x                                                   # remate del vidrio: a media crujía, plano de columnas
)
def cam(): return dict(bpy.data.scenes["Tepic"]["CAM"])
def to_world(du, v, Y):
    C=cam(); s=Y/C["F"]; return du*s, C["CAMZ"]+(C["VH"]-v)*s
def derive():
    C=cam()
    Yb=C["F"]*C["CAMZ"]/(M["base_v"]-C["VH"])           # plano de columnas/vidrio (suelo en base_v)
    mids=[(M["col_du"][1]+M["col_du"][2])/2,(M["col_du"][0]+M["col_du"][1])/2]
    k=sum(p/m for p,m in zip(M["peak_du"][::-1],mids))/2  # escala frente/fondo
    Yf=Yb/k
    G=dict(Yb=Yb, Yf=Yf, k=k)
    G["colX"]=[to_world(d,0,Yb)[0] for d in M["col_du"]]
    G["headZ"]=to_world(0,M["col_head_v"],Yb)[1]
    G["peakX"]=[to_world(d,0,Yf)[0] for d in M["peak_du"]]
    G["fasX"]=to_world(M["fascia_end_du"],0,Yf)[0]
    G["fasZ0"]=to_world(0,M["fascia_bot_v"],Yf)[1]; G["fasZ1"]=to_world(0,M["fascia_top_v"],Yf)[1]
    G["Yback"]=Yb+(Yb-Yf)
    G["colW"]=M["col_w_px"]*Yb/C["F"]; G["filletR"]=M["fillet_px"]*Yb/C["F"]                                 # pirámides cuadradas en planta
    G["glassXL"]=-to_world(M["glass_end_du_L"],0,Yb)[0]; G["glassXR"]=to_world(M["glass_end_du_R"],0,Yb)[0]
    G["panelXL"]=-to_world(M["endpanel_L_du"],0,Yb)[0]; G["panelXR"]=to_world(M["endpanel_R_du"],0,Yb)[0]
    G["glassApexZ"]=to_world(0,M["glass_apex_v"],Yb)[1]
    G["lbZ"]=to_world(0,M["leftblock_top_v"],Yb)[1]; G["lbX"]=-to_world(M["leftblock_edge_du"],0,Yb)[0]
    return G
def mk(name, verts, faces, mat, coll):
    me=bpy.data.meshes.new(name); me.from_pydata(verts,[],faces); me.update()
    if mat: me.materials.append(mat)
    o=bpy.data.objects.new(name,me); coll.objects.link(o); return o
def boxv(x0,y0,z0,x1,y1,z1):
    v=[(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]
    f=[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]; return v,f
def mats():
    def m(name,col,rough=.6,emit=0):
        mm=bpy.data.materials.get(name) or bpy.data.materials.new(name); mm.use_nodes=True
        b=next(n for n in mm.node_tree.nodes if n.type=="BSDF_PRINCIPLED")
        b.inputs["Base Color"].default_value=(*col,1); b.inputs["Roughness"].default_value=rough
        b.inputs["Emission Color"].default_value=(1,1,1,1); b.inputs["Emission Strength"].default_value=emit
        return mm
    return dict(clay=m("T_Clay",(.75,.75,.75)), dark=m("T_Dark",(.08,.08,.08)), glass=m("T_Glass",(.12,.12,.13),.15),
                ground=m("T_Ground",(.05,.05,.05),.9))
def build_masses():
    G=derive(); MT=mats()
    col=bpy.data.collections.get("T_Masses")
    if not col: col=bpy.data.collections.new("T_Masses"); bpy.data.scenes["Tepic"].collection.children.link(col)
    for o in list(col.objects): bpy.data.objects.remove(o,do_unlink=True)
    Yf,Yb,Ybk=G["Yf"],G["Yb"],G["Yback"]
    # losa con faldón (fascia)
    v,f=boxv(-G["fasX"],Yf-0.02,G["fasZ0"]+0.02,G["fasX"],Ybk,G["fasZ1"]); mk("Slab",v,f,MT["clay"],col)
    v,f=boxv(-G["fasX"],Yf-0.02,G["fasZ0"],G["fasX"],Yf,G["fasZ0"]+0.02); mk("FasciaLip",v,f,MT["clay"],col)
    # pirámides invertidas: bordes en los picos medidos (plano frontal), ápice sobre la columna
    cx=sorted([-x for x in G["colX"]]+G["colX"])
    bx=sorted([-G["fasX"]]+[-x for x in G["peakX"]]+[0.0]+G["peakX"]+[G["fasX"]])
    # columna + paraguas invertido en una sola malla: el fondo del paraguas es la sección de la
    # columna (en la foto el plafón termina en una U plana del ancho de la columna, no en un punto)
    # y la unión lleva un chaflán redondeado (bevel con normales endurecidas: sin líneas falsas)
    import bmesh
    cw=G["colW"]/2
    for i,c in enumerate(cx):
        l,r=bx[i],bx[i+1]; z=G["fasZ0"]; zh=G["headZ"]
        bm=bmesh.new(); bw=bm.edges.layers.float.new("bevel_weight_edge")
        b0=[bm.verts.new(p) for p in [(c-cw,Yb-cw,0),(c+cw,Yb-cw,0),(c+cw,Yb+cw,0),(c-cw,Yb+cw,0)]]
        h=[bm.verts.new(p) for p in [(c-cw,Yb-cw,zh),(c+cw,Yb-cw,zh),(c+cw,Yb+cw,zh),(c-cw,Yb+cw,zh)]]
        tp=[bm.verts.new(p) for p in [(l,Yf,z),(r,Yf,z),(r,Ybk,z),(l,Ybk,z)]]
        for k in range(4):
            bm.faces.new([b0[k],b0[(k+1)%4],h[(k+1)%4],h[k]])      # caras de la columna
            bm.faces.new([h[k],h[(k+1)%4],tp[(k+1)%4],tp[k]])      # caras del paraguas
        bm.faces.new(b0[::-1])
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        ring=set()
        for e in bm.edges:
            if all(abs(v.co.z-zh)<1e-4 for v in e.verts): e[bw]=1.0; ring.add(e.index)
        bm.edges.index_update(); ring={e.index for e in bm.edges if e[bw]>0}
        me=bpy.data.meshes.new(f"Umbrella{i+1}"); bm.to_mesh(me); bm.free()
        for p in me.polygons: p.use_smooth=True
        # todas las aristas vivas (pliegues del paraguas, aristas de columna) quedan "sharp":
        # solo la unión columna–paraguas se suaviza
        sh=me.attributes.get("sharp_edge") or me.attributes.new("sharp_edge",'BOOLEAN','EDGE')
        for k,e in enumerate(me.edges): sh.data[k].value = (k not in ring)
        me.materials.append(MT["clay"])
        o=bpy.data.objects.new(f"Umbrella{i+1}",me); col.objects.link(o)
        bv=o.modifiers.new("Capitel","BEVEL"); bv.limit_method='WEIGHT'; bv.width=G["filletR"]; bv.segments=6
        bv.profile=0.5; bv.harden_normals=False; bv.miter_outer='MITER_ARC'
    # muro de vidrio en el plano de columnas con remate a dos aguas por crujía
    pts=[(G["glassXL"],0)]
    xs=[G["glassXL"]]+cx+[G["glassXR"]]
    prof=[]
    for i in range(len(cx)):
        prof += [(cx[i],G["headZ"])]
        if i<len(cx)-1: prof += [((cx[i]+cx[i+1])/2,G["glassApexZ"])]
    # extremos: del borde del vidrio al primer/último ápice siguiendo la cara lateral de la pirámide extrema
    def zface(x, c, b): return G["headZ"]+(G["glassApexZ"]-G["headZ"])*abs(x-c)/abs((cx[1]-cx[0])/2)
    top=[(G["glassXL"],zface(G["glassXL"],cx[0],bx[0]))]+prof+[(G["glassXR"],zface(G["glassXR"],cx[-1],bx[-1]))]
    verts=[(x,Yb+0.05,0) for x,_ in top]+[(x,Yb+0.05,z) for x,z in top]
    n=len(top); faces=[(i,i+1,n+i+1,n+i) for i in range(n-1)]
    mk("GlassWall",verts,faces,MT["glass"],col)
    # paneles oscuros extremos y bloque izquierdo
    v,f=boxv(G["panelXL"],Yb,0,G["glassXL"],Yb+2,zface(G["panelXL"],cx[0],bx[0])); mk("EndPanelL",v,f,MT["dark"],col)
    v,f=boxv(G["glassXR"],Yb,0,G["panelXR"],Yb+2,zface(G["panelXR"],cx[-1],bx[-1])); mk("EndPanelR",v,f,MT["dark"],col)
    v,f=boxv(-140,Yb,0,G["lbX"],Yb+40,G["lbZ"]); mk("LeftBlock",v,f,MT["clay"],col)
    v,f=boxv(-20000,-50,-0.02,20000,40000,0); mk("Ground",v,f,MT["ground"],col)
    return G

FINS_U=[155,167,180,190,200,211,220,231,241,251,262,272,282,292,304,315,326,335,345,356,366,376,387,396,407,418,428,438,449,460,470,480,490,500,512,523,534,545,554,563,573,586,603,614,624,635,645,656,666,676,687,698,708,720,729,739,750,761,771,784,792,803,815,824,834,844,854,868]
F_MEAS = dict(band_top_v=179.0, band_bot_v=187.0, transom_v=[221.5, 233.0],
              portals=[dict(u0=216,u1=282,top_v=240.0,door_u0=219,door_u1=281,door_v=251.0),
                       dict(u0=480,u1=548,top_v=240.0,door_u0=483,door_u1=541,door_v=251.0)],
              portal_base_v=280.0)
def build_facade():
    G=derive(); MT=mats(); C=cam()
    col=bpy.data.collections.get("T_Facade")
    if not col: col=bpy.data.collections.new("T_Facade"); bpy.data.scenes["Tepic"].collection.children.link(col)
    for o in list(col.objects): bpy.data.objects.remove(o,do_unlink=True)
    fin=bpy.data.materials.get("T_Fin") or mats()["dark"]
    Yb=G["Yb"]; s=Yb/C["F"]
    cx=sorted([-x for x in G["colX"]]+G["colX"])
    def gtop(x):
        # remate del vidrio en x (perfil a dos aguas entre columnas)
        pts=[(G["glassXL"],None)]
        xs=cx; 
        if x<=xs[0]: return G["headZ"]+(G["glassApexZ"]-G["headZ"])*abs(x-xs[0])/((xs[1]-xs[0])/2)
        if x>=xs[-1]: return G["headZ"]+(G["glassApexZ"]-G["headZ"])*abs(x-xs[-1])/((xs[-1]-xs[-2])/2)
        for a,b in zip(xs,xs[1:]):
            if a<=x<=b:
                m=(a+b)/2; return G["headZ"]+(G["glassApexZ"]-G["headZ"])*(1-abs(x-m)/((b-a)/2))
    # aletas verticales en su posición medida
    V=[];Fc=[]
    for u in FINS_U:
        x=(u-C["U0"])*s
        if any(abs(x-c)<0.9 for c in cx): continue
        if x<G["glassXL"] or x>G["glassXR"]: continue
        z1=gtop(x); w=0.09
        v,f=boxv(x-w,Yb-0.6,0,x+w,Yb,z1); n=len(V); V+=v; Fc+=[tuple(i+n for i in ff) for ff in f]
    mk("Fins",V,Fc,fin,col)
    # travesaños horizontales (entre columnas, en el plano del vidrio)
    V=[];Fc=[]
    for vv in [F_MEAS["band_bot_v"]]+F_MEAS["transom_v"]:
        z=C["CAMZ"]+(C["VH"]-vv)*s
        v,f=boxv(G["glassXL"],Yb-0.35,z-0.09,G["glassXR"],Yb,z+0.09); n=len(V); V+=v; Fc+=[tuple(i+n for i in ff) for ff in f]
    mk("Transoms",V,Fc,fin,col)
    # franja de luz interior (cielo iluminado) justo detrás del vidrio
    z0=C["CAMZ"]+(C["VH"]-F_MEAS["band_bot_v"])*s; z1=C["CAMZ"]+(C["VH"]-F_MEAS["band_top_v"])*s
    lm=bpy.data.materials.get("T_Light") or bpy.data.materials.new("T_Light"); lm.use_nodes=True
    b=next(n for n in lm.node_tree.nodes if n.type=="BSDF_PRINCIPLED"); b.inputs["Base Color"].default_value=(1,1,1,1)
    b.inputs["Emission Color"].default_value=(1,.93,.82,1); b.inputs["Emission Strength"].default_value=3.0
    v,f=boxv(G["glassXL"],Yb+0.3,z0,G["glassXR"],Yb+0.4,z1); mk("LightBand",v,f,lm,col)
    # pórticos de acceso (cajas que sobresalen) con vano de puerta
    Yp=C["F"]*C["CAMZ"]/(F_MEAS["portal_base_v"]-C["VH"]); sp=Yp/C["F"]
    for i,p in enumerate(F_MEAS["portals"]):
        x0=(p["u0"]-C["U0"])*sp; x1=(p["u1"]-C["U0"])*sp; zt=C["CAMZ"]+(C["VH"]-p["top_v"])*sp
        dx0=(p["door_u0"]-C["U0"])*sp; dx1=(p["door_u1"]-C["U0"])*sp; dz=C["CAMZ"]+(C["VH"]-p["door_v"])*sp
        # marco: dintel + jambas (caja con vano)
        parts=[(x0,Yp,dz,x1,Yb,zt),(x0,Yp,0,dx0,Yb,dz),(dx1,Yp,0,x1,Yb,dz)]
        V=[];Fc=[]
        for (a,b2,c,d,e,f2) in parts:
            v,f=boxv(a,b2,c,d,e,f2); n=len(V); V+=v; Fc+=[tuple(k+n for k in ff) for ff in f]
        mk(f"Portal{i+1}",V,Fc,MT["clay"],col)
        v,f=boxv(dx0,Yp+0.6,0,dx1,Yp+0.7,dz); mk(f"PortalDoor{i+1}",v,f,MT["glass"],col)
    return G

CTX = dict(
  sidewalk_edge_v=288.0, curb_v=297.0, road_v=304.0, dash_v=336.0,
  dashes_u=[(140,227),(445,520),(732,832)],
  van=dict(u0=765,u1=885,top_v=255.0,base_v=297.0),
  tall_posts=[(33,300.0,207.0),(893,300.0,198.0)], short_posts=[(118,299.0),(215,298.0),(417,299.0),(691,299.0)],
  people_u=[27,33,43,53,95,115,123,132,143,153,182,197,217,243,257,267,303,312,323,343,353,397,417,423,452,457,493,503,
            553,572,580,618,625,645,660,713,745,755,895,900,913,923,937,945,963,970,987],
  palms=[(10,232.0),(54,228.0),(85,230.0),(955,186.0),(1016,190.0)],
  walkway=dict(u0=885,top_v=226.0,bot_v=230.0,post_base_v=282.0),
  sign=dict(text1="AEROPUERTO INTERNACIONAL DE TEPIC RIVIERA - NAYARIT", u1a=45, u1b=425,
            text2="AMADO NERVO", u2a=437, u2b=556, top_v=98.5, bot_v=109.5),
)
def Yground(v): C=cam(); return C["F"]*C["CAMZ"]/(v-C["VH"])
def X_at(u,Y): C=cam(); return (u-C["U0"])*Y/C["F"]
def Z_at(v,Y): C=cam(); return C["CAMZ"]+(C["VH"]-v)*Y/C["F"]
def build_context():
    G=derive(); MT=mats(); C=cam()
    col=bpy.data.collections.get("T_Context")
    if not col: col=bpy.data.collections.new("T_Context"); bpy.data.scenes["Tepic"].collection.children.link(col)
    for o in list(col.objects): bpy.data.objects.remove(o,do_unlink=True)
    def M(name,col_,em=0):
        m=bpy.data.materials.get(name) or bpy.data.materials.new(name); m.use_nodes=True
        b=next(n for n in m.node_tree.nodes if n.type=="BSDF_PRINCIPLED"); b.inputs["Base Color"].default_value=(*col_,1)
        b.inputs["Emission Color"].default_value=(1,1,1,1); b.inputs["Emission Strength"].default_value=em; return m
    pave=M("T_Pave",(.5,.5,.5)); asph=M("T_Asphalt",(.06,.06,.065)); paint=M("T_Paint",(.9,.9,.9),.6)
    Ys=Yground(CTX["sidewalk_edge_v"]); Yc=Yground(CTX["curb_v"]); Yr=Yground(CTX["road_v"])
    v,f=boxv(-300,Ys,-0.002,300,G["Yb"],0.0); mk("Sidewalk",v,f,pave,col)
    v,f=boxv(-300,Yc,-0.15,300,Ys,-0.002); mk("DropLane",v,f,asph,col)
    v,f=boxv(-300,Yr,-0.15,300,Yc,0.0); mk("Median",v,f,pave,col)
    v,f=boxv(-300,-60,-0.3,300,Yr,-0.15); mk("Road",v,f,asph,col)
    Yd=Yground(CTX["dash_v"])
    for i,(a,b) in enumerate(CTX["dashes_u"]):
        v,f=boxv(X_at(a,Yd),Yd-0.08,-0.15,X_at(b,Yd),Yd+0.08,-0.14); mk(f"Dash{i}",v,f,paint,col)
    # postes
    for i,(u,vb,vt) in enumerate(CTX["tall_posts"]):
        Y=Yground(vb); x=X_at(u,Y); z=Z_at(vt,Y)
        v,f=boxv(x-.09,Y-.09,0,x+.09,Y+.09,z); mk(f"LampPost{i}",v,f,MT["dark"],col)
        v,f=boxv(x-.09,Y-.09,z-.12,x+.9,Y+.09,z); mk(f"LampArm{i}",v,f,MT["dark"],col)
    for i,(u,vb) in enumerate(CTX["short_posts"]):
        Y=Yground(vb); x=X_at(u,Y)
        v,f=boxv(x-.08,Y-.08,0,x+.08,Y+.08,1.6); mk(f"Post{i}",v,f,MT["dark"],col)
    build_van()
    # pasillo cubierto a la derecha (losa delgada + apoyos en V)
    wk=CTX["walkway"]; Y=Yground(wk["post_base_v"]); xa=X_at(wk["u0"],Y); zt=Z_at(wk["top_v"],Y); zb=Z_at(wk["bot_v"],Y)
    v,f=boxv(xa,Y-1,zb,xa+40,Y+1,zt); mk("WalkwayRoof",v,f,MT["clay"],col)
    k=0
    for xp in [xa+3+i*5.5 for i in range(7)]:
        for dx in (-1.2,1.2):
            a=(xp,Y,0); b=(xp+dx,Y,zb)
            d=bpy.data.meshes.new("vp"); 
            vv=[(a[0]-.07,Y-.07,0),(a[0]+.07,Y-.07,0),(a[0]+.07,Y+.07,0),(a[0]-.07,Y+.07,0),(b[0]-.07,Y-.07,zb),(b[0]+.07,Y-.07,zb),(b[0]+.07,Y+.07,zb),(b[0]-.07,Y+.07,zb)]
            mk(f"WalkwayV{k}",vv,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],MT["dark"],col); k+=1
    # letrero en el faldón (texto 3D sobre la cara frontal)
    sg=CTX["sign"]; Yf=G["Yf"]
    for key,ua,ub,tag in (("text1","u1a","u1b","Sign1"),("text2","u2a","u2b","Sign2")):
        cu=bpy.data.curves.new(tag,'FONT'); cu.body=sg[key]; cu.extrude=0.06
        for fp in ["/System/Library/Fonts/Supplemental/Arial Bold.ttf","/Library/Fonts/Arial Bold.ttf","/System/Library/Fonts/Helvetica.ttc"]:
            import os
            if os.path.exists(fp): cu.font=bpy.data.fonts.load(fp,check_existing=True); break
        o=bpy.data.objects.new(tag,cu); col.objects.link(o); o.data.materials.append(M("T_SignWhite",(.95,.95,.95),.8))
        o.rotation_euler=(1.5708,0,0)
        bpy.context.view_layer.update()
        z0=Z_at(sg["bot_v"],Yf); z1=Z_at(sg["top_v"],Yf); x0=X_at(sg[ua],Yf); x1=X_at(sg[ub],Yf)
        o.data.size=1.0; bpy.context.view_layer.update()
        w=o.dimensions.x; h=o.dimensions.y   # tras rotar 90° en X, la altura del texto es el eje Y local
        o.scale=((x1-x0)/w, (z1-z0)/h, 1)
        bpy.context.view_layer.update()
        bb=[o.matrix_world @ __import__("mathutils").Vector(c) for c in o.bound_box]
        mnx=min(p.x for p in bb); mnz=min(p.z for p in bb)
        o.location=(o.location.x+(x0-mnx), Yf-0.07, o.location.z+(z0-mnz))
    return G

# ---------- Van (Sprinter): perfil medido a 10x en la foto (u,v); lado cercano en el plano de las ruedas ----------
VAN = dict(
  wheel_base_v=297.4,
  # lado CERCANO medido a 14x: el frente cercano está en u≈777; lo que se ve a su izquierda (765–777)
  # es la cara frontal en perspectiva (cámara a la izquierda de la van), no un cofre largo
  profile=[(778.0,293.6),(776.6,289.0),(776.6,281.0),(778.6,277.8),(789.2,275.2),(800.6,261.0),(803.0,256.3),
           (807.0,254.6),(880.5,254.6),(884.3,256.6),(885.0,292.6),(882.5,294.0)],
  nose_u=(776.6,789.2), nose_sweep=0.0,
  wheels=[(787.0,290.8),(867.0,290.8)], wheel_r_px=6.6,
  win_front=[(791.8,274.4),(810.0,274.4),(810.0,261.9),(801.4,261.9)],
  win_side=[(814.5,274.6),(864.0,274.6),(864.0,261.6),(814.5,261.6)],
  strip=[(797,858),(876,884.5)], strip_v=(287.8,290.2),
  stripes=[[(848,254.8),(852,254.8),(868,276),(864,276)],[(856,254.8),(860,254.8),(876,276),(872,276)],
           [(864,254.8),(868,254.8),(884.6,276.5),(880.5,276.5)],[(872,254.8),(876,254.8),(884.6,266),(884.6,271)],
           [(853,277),(857,277),(868,292),(864,292)],[(861,277),(865,277),(876,292),(872,292)],[(869,277),(873,277),(884.6,292.5),(880.5,292.5)]],
  mirror=(790.5,268.5,272.5), width=2.0,
)
def build_van():
    import bmesh
    C=cam(); col=bpy.data.collections["T_Context"]
    for n in [o.name for o in col.objects if o.name.startswith("Van")]: bpy.data.objects.remove(bpy.data.objects[n],do_unlink=True)
    Y=C["F"]*C["CAMZ"]/(VAN["wheel_base_v"]-C["VH"]); Wd=VAN["width"]
    def P(u,v): return ((u-C["U0"])*Y/C["F"], C["CAMZ"]+(C["VH"]-v)*Y/C["F"])
    def mat(name,col_,rough=.4,em=0):
        m=bpy.data.materials.get(name) or bpy.data.materials.new(name); m.use_nodes=True
        b=next(n for n in m.node_tree.nodes if n.type=="BSDF_PRINCIPLED"); b.inputs["Base Color"].default_value=(*col_,1); b.inputs["Roughness"].default_value=rough
        b.inputs["Emission Color"].default_value=(1,1,1,1); b.inputs["Emission Strength"].default_value=em; return m
    white=mat("T_VanWhite",(.86,.86,.85),.3); glass=mat("T_VanGlass",(.035,.04,.045),.08); tire=mat("T_Tire",(.025,.025,.025),.8)
    hub=mat("T_Hub",(.32,.32,.33),.3); stripe=mat("T_VanStripe",(.6,.53,.36),.4); trim=mat("T_VanTrim",(.09,.09,.09),.6)
    lamp=mat("T_VanLamp",(.9,.86,.78),.2,em=0.45)
    u0,u1=VAN["nose_u"]
    def sweep(u):  # retroceso del costado lejano en el frente (planta redondeada / en cuña)
        if u>=u1: return 0.0
        t=(u1-u)/(u1-u0); return VAN["nose_sweep"]*t*t
    pts=[(u,v,)+P(u,v) for u,v in VAN["profile"]]
    bm=bmesh.new()
    near=[bm.verts.new((x,Y,z)) for u,v,x,z in pts]
    mid=[bm.verts.new((x+sweep(u)*0.35,Y+Wd*0.5,z)) for u,v,x,z in pts]
    far=[bm.verts.new((x+sweep(u),Y+Wd,z)) for u,v,x,z in pts]
    bm.faces.new(near[::-1]); bm.faces.new(far)
    n=len(pts)
    for i in range(n):
        j=(i+1)%n
        bm.faces.new([near[i],near[j],mid[j],mid[i]]); bm.faces.new([mid[i],mid[j],far[j],far[i]])
    bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
    me=bpy.data.meshes.new("VanBody"); bm.to_mesh(me); bm.free(); me.materials.append(white)
    for p in me.polygons: p.use_smooth=False
    body=bpy.data.objects.new("VanBody",me); col.objects.link(body)
    bv=body.modifiers.new("R","BEVEL"); bv.width=0.1; bv.segments=3; bv.limit_method='ANGLE'; bv.angle_limit=0.6
    def plate(name, uv, m, off, y=None):
        vv=[(*P(u,v),) for u,v in uv]; vv=[(x,(Y if y is None else y)-off,z) for x,z in vv]
        mm=bpy.data.meshes.new(name); mm.from_pydata(vv,[],[tuple(range(len(vv)))]); mm.materials.append(m)
        o=bpy.data.objects.new(name,mm); col.objects.link(o); return o
    plate("VanWinFront",VAN["win_front"],glass,0.012); plate("VanWinSide",VAN["win_side"],glass,0.012)
    for i,s_ in enumerate(VAN["stripes"]): plate(f"VanStripe{i}",s_,stripe,0.008)
    va,vb=VAN["strip_v"]
    for i,(ua,ub) in enumerate(VAN["strip"]): plate(f"VanStrip{i}",[(ua,va),(ub,va),(ub,vb),(ua,vb)],trim,0.014)
    # parabrisas en la cara inclinada, a todo lo ancho
    a=P(789.2,275.2); b=P(800.6,261.0)
    vv=[(a[0]-0.012,Y+0.1,a[1]),(b[0]-0.012,Y+0.1,b[1]),(b[0]-0.012+sweep(800.5)*0.3,Y+Wd-0.1,b[1]),(a[0]-0.012+sweep(788)*0.3,Y+Wd-0.1,a[1])]
    mm=bpy.data.meshes.new("VanWindshield"); mm.from_pydata(vv,[],[(0,1,2,3)]); mm.materials.append(glass); col.objects.link(bpy.data.objects.new("VanWindshield",mm))
    # frente: parrilla oscura y faros sobre la cara en cuña
    xg0,zg0=P(776.6,287.5); xg1,zg1=P(776.6,281.2)
    def front_quad(name,z0,z1,y0,y1,m):
        q=[(xg0-0.015,yy,zz) for yy,zz in ((y0,z0),(y1,z0),(y1,z1),(y0,z1))]
        mm=bpy.data.meshes.new(name); mm.from_pydata(q,[],[(0,1,2,3)]); mm.materials.append(m); col.objects.link(bpy.data.objects.new(name,mm))
    # parrilla Sprinter: marco oscuro con dos lamas claras; faros alargados en las esquinas
    front_quad("VanGrille",zg0,zg1,Y+0.5,Y+1.5,trim)
    for k,zz in enumerate((zg1-0.17,zg1-0.36)): front_quad(f"VanSlat{k}",zz-0.04,zz,Y+0.56,Y+1.44,white)
    front_quad("VanLampN",zg1-0.2,zg1+0.02,Y+0.08,Y+0.42,lamp); front_quad("VanLampF",zg1-0.2,zg1+0.02,Y+1.58,Y+1.92,lamp)
    # espejo lateral
    mu,mv0,mv1=VAN["mirror"]; mx,mz0=P(mu,mv1); _,mz1=P(mu,mv0)
    v_,f_=boxv(mx-0.05,Y-0.18,mz0+0.05,mx+0.05,Y,mz1-0.05); mk("VanMirror",v_,f_,trim,col)
    xb0,zb0=P(776.6,293.6); xb1,zb1=P(779.5,288.6)
    v_,f_=boxv(xb0-0.06,Y-0.02,zb0+0.03,xb1,Y+Wd-0.02,zb1); mk("VanBumper",v_,f_,trim,col)
    # ruedas (llanta + rin) a ambos lados
    r=VAN["wheel_r_px"]*Y/C["F"]
    for j,(u,v) in enumerate(VAN["wheels"]):
        x,z=P(u,v)
        for side,yy in (("N",Y+0.13),("F",Y+Wd-0.13)):
            bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=r,depth=0.26,location=(x,yy,r),rotation=(1.5708,0,0))
            w=bpy.context.object; w.name=f"VanTire{j}{side}"; w.data.materials.append(tire)
            for c in w.users_collection: c.objects.unlink(w)
            col.objects.link(w)
        bpy.ops.mesh.primitive_cylinder_add(vertices=24,radius=r*0.46,depth=0.02,location=(x,Y-0.005,r),rotation=(1.5708,0,0))
        h=bpy.context.object; h.name=f"VanHub{j}"; h.data.materials.append(hub)
        for c in h.users_collection: c.objects.unlink(h)
        col.objects.link(h)
