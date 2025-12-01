def company_info(request):
    from django.conf import settings
    return {
        'company_name': settings.COMPANY_NAME,
        'company_phone': settings.COMPANY_PHONE,
        'company_whatsapp': '5491160971596',
        'company_email': settings.COMPANY_EMAIL,
        'company_instagram': 'homedetailzonanorte',
        'company_tiktok': 'homedetailzonanorte',
        'company_address': settings.COMPANY_ADDRESS,
        'business_hours': 'Lunes a Sábado de 8:00 a 20:00',
        'year': 2024,
    }