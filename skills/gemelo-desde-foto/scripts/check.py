# Cargar en Blender como texto y ejecutar con exec(); ver SKILL.md

import bpy, numpy as np, os
def lines_pass(sc, out, scale=2, thick=1.0):
    vl=sc.view_layers[0]
    sc.render.use_freestyle=True; sc.render.line_thickness_mode='ABSOLUTE'; sc.render.line_thickness=thick
    fs=vl.freestyle_settings; fs.crease_angle=3.05  # ~175°: cualquier pliegue real cuenta
    if not fs.linesets: fs.linesets.new("L")
    ls=fs.linesets[0]; ls.select_by_visibility=True; ls.visibility='VISIBLE'
    ls.select_silhouette=True; ls.select_border=True; ls.select_crease=True; ls.select_edge_mark=True
    ls.linestyle.color=(1,1,0); ls.linestyle.thickness=thick
    m=bpy.data.materials.get("T_LinesBlack") or bpy.data.materials.new("T_LinesBlack"); m.use_nodes=True
    nt=m.node_tree; nt.nodes.clear(); o=nt.nodes.new("ShaderNodeOutputMaterial"); e=nt.nodes.new("ShaderNodeEmission"); e.inputs[0].default_value=(0,0,0,1)
    nt.links.new(e.outputs[0],o.inputs[0])
    old=vl.material_override; vl.material_override=m
    rx,ry=sc.render.resolution_x, sc.render.resolution_y; sc.render.resolution_percentage=100*scale
    try: sc.eevee.taa_render_samples=4
    except: pass
    sc.render.filepath=out; sc.render.image_settings.file_format='PNG'
    bpy.ops.render.render(write_still=True, scene=sc.name)
    vl.material_override=old; sc.render.resolution_percentage=100; sc.render.use_freestyle=False
def overlay_lines(photo, lines_png, out_full, crops=(), k=2):
    ns={}; exec(bpy.data.texts["measure.py"].as_string(),ns)
    P=ns["load_np"](photo); L=ns["load_np"](lines_png)
    Hs,Ws=L.shape[:2]; Hp,Wp=P.shape[:2]; f=Ws//Wp
    Pu=np.repeat(np.repeat(P,f,0),f,1)
    a=np.clip(L[...,:3].max(2)*1.5,0,1)[...,None]
    O=Pu.copy(); O[...,:3]=Pu[...,:3]*0.75*(1-a)+np.array([1,1,0])*a
    ns["save_np"](O,out_full)
    for name,(x0,y0,x1,y1) in crops:
        ns["crop_ruler"](O[::1,::1], x0*f,y0*f,x1*f,y1*f, k, os.path.dirname(out_full)+"/"+name+".png", minor=10*f, major=50*f)


import bpy, numpy as np, os
def _override_render(sc, out, mode, scale):
    vl=sc.view_layers[0]
    m=bpy.data.materials.get("T_OV_"+mode) or bpy.data.materials.new("T_OV_"+mode); m.use_nodes=True
    nt=m.node_tree; nt.nodes.clear(); o=nt.nodes.new("ShaderNodeOutputMaterial"); e=nt.nodes.new("ShaderNodeEmission")
    if mode=="normal":
        g=nt.nodes.new("ShaderNodeNewGeometry"); vm=nt.nodes.new("ShaderNodeVectorMath"); vm.operation='MULTIPLY_ADD'
        vm.inputs[1].default_value=(.5,.5,.5); vm.inputs[2].default_value=(.5,.5,.5)
        nt.links.new(g.outputs["Normal"],vm.inputs[0]); nt.links.new(vm.outputs[0],e.inputs[0])
    else:
        # ID de objeto por índice (no por "Random": dos vecinos con tono parecido no dejaban arista y el plano
        # salía con líneas punteadas). Cada objeto recibe un pass_index único; color = fract(i·k) por canal.
        for i,ob in enumerate(sorted(sc.objects, key=lambda o:o.name)): ob.pass_index=i+1
        oi=nt.nodes.new("ShaderNodeObjectInfo"); cc=nt.nodes.new("ShaderNodeCombineColor")
        for ch,k in enumerate((0.6180339,0.4142135,0.7320508)):
            mu=nt.nodes.new("ShaderNodeMath"); mu.operation='MULTIPLY'; mu.inputs[1].default_value=k
            fr=nt.nodes.new("ShaderNodeMath"); fr.operation='FRACT'
            nt.links.new(oi.outputs["Object Index"],mu.inputs[0]); nt.links.new(mu.outputs[0],fr.inputs[0]); nt.links.new(fr.outputs[0],cc.inputs[ch])
        nt.links.new(cc.outputs[0],e.inputs[0])
    nt.links.new(e.outputs[0],o.inputs[0])
    old=vl.material_override; vl.material_override=m
    vt=sc.view_settings.view_transform; sc.view_settings.view_transform='Raw' if 'Raw' in [i.identifier for i in bpy.types.ColorManagedViewSettings.bl_rna.properties['view_transform'].enum_items] else 'Standard'
    sc.render.use_freestyle=False; sc.render.resolution_percentage=100*scale
    try: sc.eevee.taa_render_samples=1
    except: pass
    sc.render.filepath=out; sc.render.image_settings.file_format='PNG'
    bpy.ops.render.render(write_still=True, scene=sc.name)
    vl.material_override=old; sc.render.resolution_percentage=100; sc.view_settings.view_transform=vt
def edge_map(sc, outdir, scale=2):
    ns={}; exec(bpy.data.texts["measure.py"].as_string(),ns)
    _override_render(sc, outdir+"_n.png","normal",scale); _override_render(sc, outdir+"_id.png","id",scale)
    N=ns["load_np"](outdir+"_n.png")[...,:3]; I=ns["load_np"](outdir+"_id.png")[...,:3]
    def grad(A,th):
        d=np.zeros(A.shape[:2],bool)
        dx=np.abs(np.diff(A,axis=1)).max(2)>th; dy=np.abs(np.diff(A,axis=0)).max(2)>th
        d[:,1:]|=dx; d[1:,:]|=dy; return d
    E=grad(N,0.08)|grad(I,0.02)
    return E
def overlay_edges(photo, E, out_full):
    ns={}; exec(bpy.data.texts["measure.py"].as_string(),ns)
    P=ns["load_np"](photo); f=E.shape[1]//P.shape[1]
    Pu=np.repeat(np.repeat(P,f,0),f,1); O=Pu.copy(); O[...,:3]*=0.75
    O[E,:3]=(1,1,0); ns["save_np"](O,out_full); return O
def pair(photo, O, name, x0,y0,x1,y1,k, outdir):
    ns={}; exec(bpy.data.texts["measure.py"].as_string(),ns)
    P=ns["load_np"](photo); f=O.shape[1]//P.shape[1]; Pu=np.repeat(np.repeat(P,f,0),f,1)
    A=O[y0*f:y1*f, x0*f:x1*f]; B=Pu[y0*f:y1*f, x0*f:x1*f]
    S=np.concatenate([B, np.ones((4,B.shape[1],4)), A],0); S=np.repeat(np.repeat(S,k,0),k,1); ns["save_np"](S,outdir+name+".png")


def compare_region(sc, photo, box, out, k=3, samples=48):
    """Foto / modelo / plano del mismo recorte (coords de la foto), apilados: para juzgar proporción, no solo bordes."""
    import numpy as np
    ms={}; exec(bpy.data.texts["measure.py"].as_string(),ms)
    ck={}; exec(bpy.data.texts["check.py"].as_string(),ck)
    tmp=out.replace(".png","_m.png")
    try: sc.eevee.taa_render_samples=samples
    except: pass
    sc.render.resolution_percentage=200; sc.render.image_settings.file_format='PNG'; sc.render.filepath=tmp
    bpy.ops.render.render(write_still=True, scene=sc.name); sc.render.resolution_percentage=100
    Mo=ms["load_np"](tmp)
    E=ck["edge_map"](sc, out.replace(".png","_e"), 4).astype(np.float32)
    H,W=E.shape; E2=np.clip(E.reshape(H//2,2,W//2,2).mean((1,3))*1.6,0,1)
    navy=np.array([23,23,38])/255; peri=np.array([154,166,255])/255
    Pl=navy*np.ones((H//2,W//2,3)); Pl=Pl*(1-E2[...,None])+peri*E2[...,None]; Pl=np.dstack([Pl,np.ones((H//2,W//2))])
    Ph=ms["load_np"](photo); Ph=np.repeat(np.repeat(Ph,2,0),2,1)
    x0,y0,x1,y1=box; c=lambda A: A[y0*2:y1*2,x0*2:x1*2]
    sep=np.ones((3,(x1-x0)*2,4))
    S=np.concatenate([c(Ph),sep,c(Mo),sep,c(Pl)],0); S=np.repeat(np.repeat(S,k,0),k,1); ms["save_np"](S.astype(np.float32),out)
