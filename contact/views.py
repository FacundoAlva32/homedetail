from django.shortcuts import render, redirect
from django.contrib import messages

def contact(request):
    if request.method == 'POST':
        # Procesar formulario de contacto
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        zone = request.POST.get('zone')
        message = request.POST.get('message')
        
        # Aquí puedes guardar en la base de datos o enviar email
        messages.success(request, '¡Gracias por tu mensaje! Te contactaremos pronto.')
        return redirect('contact:contact_success')
    
    return render(request, 'contact/contact.html')

def contact_success(request):
    return render(request, 'contact/contact_success.html')