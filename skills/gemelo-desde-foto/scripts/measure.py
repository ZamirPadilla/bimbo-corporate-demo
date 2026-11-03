# Cargar en Blender como texto y ejecutar con exec(); ver SKILL.md

import bpy, numpy as np
def load_np(path):
    im=bpy.data.images.load(path, check_existing=False)   # nunca reutilizar caché: los renders cambian
    W,H=im.size; A=np.array(im.pixels[:],dtype=np.float32).reshape(H,W,4)[::-1]  # fila 0 = arriba
    bpy.data.images.remove(im)
    return A
def save_np(A, out):
    H,W=A.shape[:2]; im=bpy.data.images.new("tmp_np",W,H,alpha=True)
    im.pixels[:]=A[::-1].ravel(); im.filepath_raw=out; im.file_format='PNG'; im.save(); bpy.data.images.remove(im)
def crop_ruler(A, x0,y0,x1,y1, k, out, minor=10, major=50, marks=()):
    """Recorte ampliado k veces con regla: líneas cada `minor` px (cian tenue) y `major` px (rojo), en coordenadas absolutas."""
    C=A[y0:y1,x0:x1].copy()
    C=np.repeat(np.repeat(C,k,0),k,1)
    for v in range(((x0+minor-1)//minor)*minor, x1, minor):
        X=(v-x0)*k; c=(1,0.15,0.15,1) if v%major==0 else (0,0.9,1,1); a=0.9 if v%major==0 else 0.35
        C[:,X]=C[:,X]*(1-a)+np.array(c)*a
    for v in range(((y0+minor-1)//minor)*minor, y1, minor):
        Y=(v-y0)*k; c=(1,0.15,0.15,1) if v%major==0 else (0,0.9,1,1); a=0.9 if v%major==0 else 0.35
        C[Y,:]=C[Y,:]*(1-a)+np.array(c)*a
    for (mx,my) in marks:
        X=int((mx-x0)*k); Y=int((my-y0)*k)
        C[max(0,Y-k*2):Y+k*2, max(0,X-1):X+1]=(1,1,0,1); C[max(0,Y-1):Y+1, max(0,X-k*2):X+k*2]=(1,1,0,1)
    save_np(C,out)
