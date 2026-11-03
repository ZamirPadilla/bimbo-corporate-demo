import cv2, numpy as np, json, sys
L=np.array(json.load(open(sys.argv[1]))["L"]); img=cv2.imread(sys.argv[2])
ln=np.hypot(L[:,2]-L[:,0],L[:,3]-L[:,1]); ang=(np.degrees(np.arctan2(L[:,3]-L[:,1],L[:,2]-L[:,0]))+180)%180
mid=(L[:,:2]+L[:,2:])/2; d=(L[:,2:]-L[:,:2])/ln[:,None]
def hom(l): p=np.array([l[0],l[1],1.]); q=np.array([l[2],l[3],1.]); return np.cross(p,q)
def err(vp,idx):
    v=vp[:2]/vp[2] if abs(vp[2])>1e-9 else None
    if v is None: dirs=np.tile(vp[:2]/np.linalg.norm(vp[:2]),(len(idx),1))
    else:
        dirs=v[None,:]-mid[idx]; dirs/=np.linalg.norm(dirs,axis=1)[:,None]+1e-9
    c=np.abs((dirs*d[idx]).sum(1)); return np.degrees(np.arccos(np.clip(c,0,1)))
def ransac(idx,it=4000,th=1.0,seed=0):
    rng=np.random.default_rng(seed); best=(0,None)
    for _ in range(it):
        i,j=rng.choice(idx,2,replace=False,p=ln[idx]/ln[idx].sum())
        vp=np.cross(hom(L[i]),hom(L[j]))
        if np.linalg.norm(vp)<1e-9: continue
        e=err(vp,idx); s=ln[idx][e<th].sum()
        if s>best[0]: best=(s,vp)
    vp=best[1]; inl=idx[err(vp,idx)<th]
    # refinamiento por mínimos cuadrados (SVD de líneas normalizadas, ponderado por longitud)
    A=np.array([hom(L[k])/np.linalg.norm(hom(L[k])[:2])*np.sqrt(ln[k]) for k in inl])
    vp=np.linalg.svd(A)[2][-1]; inl=idx[err(vp,idx)<th]
    return vp, inl
res={}
groups={"B_bajada":(ang>15)&(ang<65),"A_subida":(ang>115)&(ang<170),"V_vertical":(ang>70)&(ang<110)}
vis=img.copy(); col={"B_bajada":(0,0,255),"A_subida":(0,200,0),"V_vertical":(255,0,255)}
for k,m in groups.items():
    idx=np.where(m)[0]; vp,inl=ransac(idx)
    v=(vp[:2]/vp[2]).tolist(); res[k]=dict(vp=v,n=len(inl),of=len(idx),len=float(ln[inl].sum()))
    print(k, [round(x,1) for x in v], len(inl),"/",len(idx))
    for q in inl:
        x1,y1,x2,y2=L[q]; cv2.line(vis,(int(x1),int(y1)),(int(x2),int(y2)),col[k],2)
    # 2ª familia (p.ej. sombras) con los no-inliers
    rest=np.setdiff1d(idx,inl)
    if len(rest)>10:
        vp2,inl2=ransac(rest,seed=1); print("   2a familia",[round(x,1) for x in vp2[:2]/vp2[2]],len(inl2))
json.dump(res,open(sys.argv[3],"w"),indent=1)
cv2.imwrite(sys.argv[3].replace(".json",".png"),vis)
