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
from Hacienda.views import EmpleadoView, ContratadorView, DepartamentoView, PuestoView, SalarioView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Rutas para Empleado
    path('empleados/', EmpleadoView.as_view(), name='empleado-list'),
    path('empleados/<str:cedula>/', EmpleadoView.as_view(), name='empleado-detail'),
    
    # Rutas para Contratador
    path('contratadores/', ContratadorView.as_view(), name='contratador-list'),
    path('contratadores/<str:cedula>/', ContratadorView.as_view(), name='contratador-detail'),
    
    # Rutas para Departamento
    path('departamentos/', DepartamentoView.as_view(), name='departamento-list'),
    path('departamentos/<str:nombre>/', DepartamentoView.as_view(), name='departamento-detail'),
    
    # Rutas para Puesto
    path('puestos/', PuestoView.as_view(), name='puesto-list'),
    path('puestos/<str:nombre>/', PuestoView.as_view(), name='puesto-detail'),
    
    # Rutas para Salario
    path('salarios/', SalarioView.as_view(), name='salario-list'),
    path('salarios/<str:fecha_inicio>/', SalarioView.as_view(), name='salario-detail'),
]

