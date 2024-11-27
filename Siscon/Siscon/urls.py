"""
URL configuration for Siscon project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from Hacienda.views import EmpleadoAPIView, ContratadorAPIView, DepartamentoAPIView, PuestoAPIView, SalarioAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('empleados/', EmpleadoAPIView.as_view(), name='empleado_list_create'),
    path('contratadores/', ContratadorAPIView.as_view(), name='contratador_list_create'),
    path('departamentos/', DepartamentoAPIView.as_view(), name='departamento_list_create'),
    path('puestos/', PuestoAPIView.as_view(), name='puesto_list_create'),
    path('salarios/', SalarioAPIView.as_view(), name='salario_list_create'),
    
    # Asegúrate de incluir las rutas de la aplicación
]
