#!/usr/bin/env bash
# build.sh

echo "🚀 Iniciando build de Home Detail..."

# Instalar dependencias
pip install -r requirements.txt

# Recolectar archivos estáticos
python manage.py collectstatic --noinput

# Aplicar migraciones
python manage.py migrate

echo "✅ Build completado!"