# Cargar en Blender como texto y ejecutar con exec(); ver SKILL.md

import bpy, math
from mathutils import Vector, Matrix, Quaternion
def _upd(): bpy.context.view_layer.update()
def aim(rig, name, d):
    pb=rig.pose.bones[name]; _upd()
    M=pb.matrix.copy(); cur=(M.to_3x3()@Vector((0,1,0))).normalized()
    q=cur.rotation_difference(Vector(d).normalized())
    loc=M.to_translation()
    pb.matrix=Matrix.Translation(loc)@q.to_matrix().to_4x4()@Matrix.Translation(-loc)@M
def rot(rig, name, axis, deg):
    pb=rig.pose.bones[name]; _upd()
    M=pb.matrix.copy(); loc=M.to_translation()
    R=Matrix.Rotation(math.radians(deg),4,Vector(axis))
    pb.matrix=Matrix.Translation(loc)@R@Matrix.Translation(-loc)@M
def arm(rig, s, upper, lower, hand=None):
    aim(rig,f"upperarm01.{s}",upper); aim(rig,f"upperarm02.{s}",upper)
    aim(rig,f"lowerarm01.{s}",lower); aim(rig,f"lowerarm02.{s}",lower)
    aim(rig,f"wrist.{s}",hand or lower)
def leg(rig, s, upper, lower, foot=None):
    aim(rig,f"upperleg01.{s}",upper); aim(rig,f"upperleg02.{s}",upper)
    aim(rig,f"lowerleg01.{s}",lower); aim(rig,f"lowerleg02.{s}",lower)
    if foot: aim(rig,f"foot.{s}",foot)
def curl(rig, s, amt=25):
    for f in range(1,6):
        for j in (1,2,3):
            n=f"finger{f}-{j}.{s}"
            if n in rig.pose.bones:
                pb=rig.pose.bones[n]; pb.rotation_mode='XYZ'; pb.rotation_euler.x=math.radians(amt*(0.5 if f==1 else 1))
def reset(rig):
    for pb in rig.pose.bones:
        pb.matrix_basis=Matrix()
# lado: L=+X, R=-X ; frente=-Y
def relaxed(rig, k=1.0):
    arm(rig,"L",(0.17*k,-0.04,-1),(0.08,-0.22,-1)); arm(rig,"R",(-0.17*k,-0.04,-1),(-0.08,-0.22,-1))
    curl(rig,"L",22); curl(rig,"R",22)
def tablet(rig):
    arm(rig,"L",(0.12,-0.12,-1),(-0.35,-1,0.15),(-0.3,-1,0.0)); arm(rig,"R",(-0.12,-0.12,-1),(0.35,-1,0.15),(0.3,-1,0.0))
    curl(rig,"L",15); curl(rig,"R",15); rot(rig,"neck01",(1,0,0),14); rot(rig,"head",(1,0,0),12)
def hips(rig):
    arm(rig,"L",(0.7,0.2,-0.7),(-0.75,-0.05,-0.55),(-0.9,0.1,-0.3)); arm(rig,"R",(-0.7,0.2,-0.7),(0.75,-0.05,-0.55),(0.9,0.1,-0.3))
    curl(rig,"L",10); curl(rig,"R",10)
def crossed(rig):
    arm(rig,"L",(0.12,-0.3,-1),(-1,-0.3,0.12)); arm(rig,"R",(-0.12,-0.38,-1),(1,-0.22,0.18))
    curl(rig,"L",40); curl(rig,"R",40)
def pointing(rig):
    arm(rig,"R",(-0.35,-1,0.05),(-0.25,-1,0.12)); arm(rig,"L",(0.17,-0.04,-1),(0.08,-0.22,-1))
    curl(rig,"L",22); rot(rig,"neck01",(0,0,1),-10)
def ear(rig):
    arm(rig,"R",(-0.55,-0.25,-0.75),(0.25,-0.2,1)); arm(rig,"L",(0.17,-0.04,-1),(0.08,-0.22,-1))
    curl(rig,"R",35); curl(rig,"L",22); rot(rig,"head",(0,1,0),-6)
def walk(rig, ph=1):
    leg(rig,"L",(0,-0.38*ph,-1),(0,0.15*ph if ph>0 else -0.2,-1)); leg(rig,"R",(0,0.32*ph,-1),(0,0.6*ph if ph>0 else -0.4,-1))
    arm(rig,"L",(0.15,0.28*ph,-1),(0.08,-0.05,-1)); arm(rig,"R",(-0.15,-0.28*ph,-1),(-0.08,-0.4,-1))
    curl(rig,"L",22); curl(rig,"R",22)
def stance(rig, w=0.08):
    leg(rig,"L",(w,0,-1),(0.02,0,-1)); leg(rig,"R",(-w,0.02,-1),(-0.02,0,-1))
def weight_shift(rig):
    leg(rig,"L",(0.10,0.0,-1),(0.0,0.0,-1)); leg(rig,"R",(-0.03,-0.12,-1),(-0.02,0.12,-1))
    rot(rig,"spine04",(0,1,0),-3)
POSES={"relaxed":relaxed,"tablet":tablet,"hips":hips,"crossed":crossed,"pointing":pointing,"ear":ear}
