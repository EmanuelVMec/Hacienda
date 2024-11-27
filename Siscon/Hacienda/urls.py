from django.urls import path
from .views import EmpleadoAPIView, ContratadorAPIView, DepartamentoAPIView, PuestoAPIView, SalarioAPIView

urlpatterns = [
    path('empleados/', EmpleadoAPIView.as_view(), name='empleado_list_create'),
    path('contratadores/', ContratadorAPIView.as_view(), name='contratador_list_create'),
    path('departamentos/', DepartamentoAPIView.as_view(), name='departamento_list_create'),
    path('puestos/', PuestoAPIView.as_view(), name='puesto_list_create'),
    path('salarios/', SalarioAPIView.as_view(), name='salario_list_create'),
]
