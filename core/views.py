from django.shortcuts import render

def home(request):
    context = {
        'title': 'Home Detail | Hidrolavado Profesional en Zona Norte',
        'meta_description': 'Servicio de hidrolavado profesional en Zona Norte, Nordelta y GBA. Limpieza de pisos, fachadas, decks y techos. Presupuesto sin cargo.',
    }
    return render(request, 'core/home.html', context)