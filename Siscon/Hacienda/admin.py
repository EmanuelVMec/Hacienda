from django.contrib import admin

# Register your models here.

from .models import Empleado, Departamento, Contratador, Puesto, Salario

admin.site.register(Empleado)

admin.site.register(Departamento)

admin.site.register(Contratador)

admin.site.register(Puesto)

admin.site.register(Salario)