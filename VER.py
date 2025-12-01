# verificar_staticos.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

print("🔍 Verificando archivos estáticos...")

# Archivos requeridos
required_files = [
    'static/css/main.css',
    'static/js/main.js',
    'static/images/logos/homedetail.png',
]

for file in required_files:
    path = BASE_DIR / file
    if path.exists():
        print(f"✅ {file} - EXISTE ({path.stat().st_size} bytes)")
    else:
        print(f"❌ {file} - NO EXISTE")

# Verificar staticfiles
staticfiles_dir = BASE_DIR / 'staticfiles'
if staticfiles_dir.exists():
    print(f"\n📁 staticfiles/ existe con {len(list(staticfiles_dir.rglob('*')))} archivos")
else:
    print("\n📁 staticfiles/ NO existe - Ejecuta: python manage.py collectstatic")