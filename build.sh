#!/usr/bin/env bash
# build.sh - Script de construcción para Render

echo "========================================="
echo "🚀 INICIANDO DEPLOYMENT DE HOME DETAIL"
echo "========================================="

# Mostrar información del entorno
echo "Python version: $(python --version)"
echo "Pip version: $(pip --version)"

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
pip install --upgrade pip
pip install -r requirements.txt

# 2. Recolectar archivos estáticos
echo "🎨 Recolectando archivos estáticos..."
python manage.py collectstatic --noinput --clear

# 3. Aplicar migraciones de base de datos
echo "🗄️ Aplicando migraciones..."
python manage.py migrate --noinput

# 4. Verificar que todo esté correcto
echo "🔍 Verificando configuración..."
python manage.py check --deploy

echo "========================================="
echo "✅ DEPLOYMENT COMPLETADO EXITOSAMENTE"
echo "========================================="