import cv2, numpy as np, sys, json
img=cv2.imread(sys.argv[1]); out=sys.argv[2]
g=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
lsd=cv2.createLineSegmentDetector(cv2.LSD_REFINE_ADV)
L=lsd.detect(g)[0].reshape(-1,4)
ln=np.hypot(L[:,2]-L[:,0],L[:,3]-L[:,1]); L=L[ln>35]; ln=ln[ln>35]
ang=(np.degrees(np.arctan2(L[:,3]-L[:,1],L[:,2]-L[:,0]))+180)%180
H,_=np.histogram(ang,bins=36,range=(0,180),weights=ln)
print("hist(5deg):",[(i*5,int(h)) for i,h in enumerate(H) if h>200])
json.dump({"L":L.tolist()},open(out,"w"))
vis=img.copy()
for (x1,y1,x2,y2),a in zip(L,ang):
    c=(0,0,255) if 15<a<60 else (0,255,0) if 120<a<165 else (255,0,255) if 75<a<105 else (200,200,200)
    cv2.line(vis,(int(x1),int(y1)),(int(x2),int(y2)),c,1)
cv2.imwrite(out.replace(".json",".png"),vis)
