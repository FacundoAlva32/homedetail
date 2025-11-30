from django.shortcuts import render

def service_list(request):
    services = [
        {
            'id': 1,
            'name': 'Veredas y Patios',
            'description': 'Removemos suciedad incrustada, chicles y manchas de aceite en entradas de vehículos y patios traseros.',
            'icon': 'fa-road'
        },
        {
            'id': 2,
            'name': 'Fachadas y Paredes',
            'description': 'Limpieza vertical para frentes de casas, revestimientos texturados (Tarquini) y muros perimetrales.',
            'icon': 'fa-building'
        },
        {
            'id': 3,
            'name': 'Decks y Pérgolas',
            'description': 'Tratamiento suave pero efectivo para maderas y estructuras delicadas, preparándolas para pintar o barnizar.',
            'icon': 'fa-layer-group'
        },
        {
            'id': 4,
            'name': 'Bordes de Piscina',
            'description': 'Eliminación de hongos en los bordes atérmicos y solariums para evitar resbalones y mejorar la estética.',
            'icon': 'fa-swimming-pool'
        },
    ]
    
    context = {
        'services': services,
        'title': 'Nuestros Servicios | Home Detail'
    }
    return render(request, 'services/service_list.html', context)

def service_detail(request, service_id):
    # Lógica para detalle de servicio
    return render(request, 'services/service_detail.html')