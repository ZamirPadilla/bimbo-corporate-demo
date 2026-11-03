#!/usr/bin/env python3
"""ETag que reporta S3/Supabase para un archivo subido en partes: md5 de los md5 de cada parte + "-N".

Sirve para comprobar archivos grandes del bucket contra el original (el eTag de una subida en partes no es el
md5 del archivo). Supabase usa partes de 16 MiB en subidas grandes.
Uso: etag_multiparte.py <archivo> [MiB por parte, 16]
"""
import hashlib, sys
parte = int(sys.argv[2] if len(sys.argv) > 2 else 16) * 1024 * 1024
md5s = []
with open(sys.argv[1], 'rb') as f:
    while (b := f.read(parte)):
        md5s.append(hashlib.md5(b).digest())
print(hashlib.md5(b''.join(md5s)).hexdigest() + f'-{len(md5s)}' if len(md5s) > 1 else md5s[0].hex())
