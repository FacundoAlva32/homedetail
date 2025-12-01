#!/usr/bin/env bash
# build.sh - Script de construcción para Render

echo "========================================="
echo "🚀 INICIANDO DEPLOYMENT DE HOME DETAIL"
echo "========================================="

# Mostrar información del entorno
echo "Python version: $(python --version)"
echo "Pip version: $(pip --version)"
echo "Current directory: $(pwd)"
echo "Listando archivos:"
ls -la

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
pip install --upgrade pip
pip install -r requirements.txt

# 2. Verificar que static existe
echo "📁 Verificando directorios estáticos..."
mkdir -p static/css
mkdir -p static/js
mkdir -p static/images
mkdir -p static/media/videos
ls -la static/

# 3. Recolectar archivos estáticos (IMPORTANTE: hacerlo ANTES de migrate)
echo "🎨 Recolectando archivos estáticos..."
python manage.py collectstatic --noinput --clear -v 3

# Verificar que se recolectaron los estáticos
echo "📊 Verificando archivos estáticos recolectados..."
if [ -d "staticfiles" ]; then
    echo "✓ Directorio staticfiles creado"
    echo "Contenido de staticfiles:"
    find staticfiles -type f | head -20
else
    echo "✗ ERROR: staticfiles no se creó"
    exit 1
fi

# 4. Aplicar migraciones de base de datos
echo "🗄️ Aplicando migraciones..."
python manage.py migrate --noinput

# 5. Verificar que todo esté correcto
echo "🔍 Verificando configuración..."
python manage.py check --deploy

# 6. Crear superusuario si no existe (opcional, para desarrollo)
if [ "$DEBUG" = "True" ] && [ -z "$(python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(is_superuser=True).count())")" ]; then
    echo "👤 Creando superusuario por defecto..."
    echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'admin123')" | python manage.py shell
fi

echo "========================================="
echo "✅ DEPLOYMENT COMPLETADO EXITOSAMENTE"
echo "========================================="
echo "STATIC_ROOT: $(python manage.py shell -c "from django.conf import settings; print(settings.STATIC_ROOT)")"
echo "STATIC_URL: $(python manage.py shell -c "from django.conf import settings; print(settings.STATIC_URL)")"