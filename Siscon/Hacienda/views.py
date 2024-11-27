from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .models import Empleado, Contratador, Departamento, Puesto, Salario
from django.shortcuts import render

class EmpleadoAPIView(APIView):
    def get(self, request):
        if request.accepts('text/html'):
            return render(request, 'empleados/empleados.html')
        empleados = list(Empleado.objects.values())
        return JsonResponse(empleados, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            empleado = Empleado.objects.create(
                cedula=request.data.get('cedula'),
                nombre=request.data.get('nombre'),
                apellido=request.data.get('apellido'),
                fecha_nacimiento=request.data.get('fecha_nacimiento'),
                correo=request.data.get('correo'),
                telefono=request.data.get('telefono')
            )
            return JsonResponse({'mensaje': 'Empleado guardado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ContratadorAPIView(APIView):
    def get(self, request):
        if request.accepts('text/html'):
            return render(request, 'empleados/contratadores.html')
        contratadores = list(Contratador.objects.values())
        return JsonResponse(contratadores, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            contratador = Contratador.objects.create(
                cedula=request.data.get('cedula'),
                nombre=request.data.get('nombre'),
                apellido=request.data.get('apellido'),
                correo=request.data.get('correo'),
                telefono=request.data.get('telefono'),
                Empleado_id=request.data.get('empleado_id')
            )
            return JsonResponse({'mensaje': 'Contratador guardado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DepartamentoAPIView(APIView):
    def get(self, request):
        if request.accepts('text/html'):
            return render(request, 'empleados/departamentos.html')
        departamentos = list(Departamento.objects.values())
        return JsonResponse(departamentos, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            departamento = Departamento.objects.create(
                nombre=request.data.get('nombre'),
                contratador_id=request.data.get('contratador_id'),
                Empleado_id=request.data.get('empleado_id')
            )
            return JsonResponse({'mensaje': 'Departamento guardado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PuestoAPIView(APIView):
    def get(self, request):
        if request.accepts('text/html'):
            return render(request, 'empleados/puestos.html')
        puestos = list(Puesto.objects.values())
        return JsonResponse(puestos, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            puesto = Puesto.objects.create(
                nombre=request.data.get('nombre'),
                departamento_id=request.data.get('departamento_id'),
                Empleado_id=request.data.get('empleado_id')
            )
            return JsonResponse({'mensaje': 'Puesto guardado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SalarioAPIView(APIView):
    def get(self, request):
        if request.accepts('text/html'):
            return render(request, 'empleados/salarios.html')
        salarios = list(Salario.objects.values())
        return JsonResponse(salarios, safe=False, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            salario = Salario.objects.create(
                fecha_inicio=request.data.get('fecha_inicio'),
                fecha_fin=request.data.get('fecha_fin'),
                monto=request.data.get('monto'),
                puesto_id=request.data.get('puesto_id')
            )
            return JsonResponse({'mensaje': 'Salario guardado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
