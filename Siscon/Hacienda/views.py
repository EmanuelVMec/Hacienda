# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Empleado, Contratador, Departamento, Puesto, Salario
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

class EmpleadoView(APIView):
    def get(self, request, cedula=None):
        if cedula:
            empleado = get_object_or_404(Empleado, cedula=cedula)
            return Response({
                'cedula': empleado.cedula,
                'nombre': empleado.nombre,
                'apellido': empleado.apellido,
                'fecha_nacimiento': empleado.fecha_nacimiento,
                'correo': empleado.correo,
                'telefono': empleado.telefono
            })
        empleados = Empleado.objects.all()
        return Response([{
            'cedula': e.cedula,
            'nombre': e.nombre,
            'apellido': e.apellido,
            'fecha_nacimiento': e.fecha_nacimiento,
            'correo': e.correo,
            'telefono': e.telefono
        } for e in empleados])

    def post(self, request):
        data = request.data
        try:
            empleado = Empleado.objects.create(
                cedula=data['cedula'],
                nombre=data['nombre'],
                apellido=data['apellido'],
                fecha_nacimiento=data['fecha_nacimiento'],
                correo=data['correo'],
                telefono=data['telefono']
            )
            return Response({
                'cedula': empleado.cedula,
                'nombre': empleado.nombre,
                'apellido': empleado.apellido,
                'fecha_nacimiento': empleado.fecha_nacimiento,
                'correo': empleado.correo,
                'telefono': empleado.telefono
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, cedula):
        empleado = get_object_or_404(Empleado, cedula=cedula)
        data = request.data
        empleado.nombre = data.get('nombre', empleado.nombre)
        empleado.apellido = data.get('apellido', empleado.apellido)
        empleado.fecha_nacimiento = data.get('fecha_nacimiento', empleado.fecha_nacimiento)
        empleado.correo = data.get('correo', empleado.correo)
        empleado.telefono = data.get('telefono', empleado.telefono)
        empleado.save()
        return Response({
            'cedula': empleado.cedula,
            'nombre': empleado.nombre,
            'apellido': empleado.apellido,
            'fecha_nacimiento': empleado.fecha_nacimiento,
            'correo': empleado.correo,
            'telefono': empleado.telefono
        })

    def delete(self, request, cedula):
        empleado = get_object_or_404(Empleado, cedula=cedula)
        empleado.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContratadorView(APIView):
    def get(self, request, cedula=None):
        if cedula:
            contratador = get_object_or_404(Contratador, cedula=cedula)
            return Response({
                'cedula': contratador.cedula,
                'nombre': contratador.nombre,
                'apellido': contratador.apellido,
                'correo': contratador.correo,
                'telefono': contratador.telefono,
                'empleado': contratador.Empleado.cedula
            })
        contratadores = Contratador.objects.all()
        return Response([{
            'cedula': c.cedula,
            'nombre': c.nombre,
            'apellido': c.apellido,
            'correo': c.correo,
            'telefono': c.telefono,
            'empleado': c.Empleado.cedula
        } for c in contratadores])

    def post(self, request):
        data = request.data
        try:
            contratador = Contratador.objects.create(
                cedula=data['cedula'],
                nombre=data['nombre'],
                apellido=data['apellido'],
                correo=data['correo'],
                telefono=data['telefono'],
                Empleado_id=data['empleado_id']
            )
            return Response({
                'cedula': contratador.cedula,
                'nombre': contratador.nombre,
                'apellido': contratador.apellido,
                'correo': contratador.correo,
                'telefono': contratador.telefono,
                'empleado': contratador.Empleado.cedula
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, cedula):
        contratador = get_object_or_404(Contratador, cedula=cedula)
        data = request.data
        contratador.nombre = data.get('nombre', contratador.nombre)
        contratador.apellido = data.get('apellido', contratador.apellido)
        contratador.correo = data.get('correo', contratador.correo)
        contratador.telefono = data.get('telefono', contratador.telefono)
        contratador.Empleado_id = data.get('empleado_id', contratador.Empleado_id)
        contratador.save()
        return Response({
            'cedula': contratador.cedula,
            'nombre': contratador.nombre,
            'apellido': contratador.apellido,
            'correo': contratador.correo,
            'telefono': contratador.telefono,
            'empleado': contratador.Empleado.cedula
        })

    def delete(self, request, cedula):
        contratador = get_object_or_404(Contratador, cedula=cedula)
        contratador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DepartamentoView(APIView):

    def get(self, request, nombre=None):
        print(f"GET request received for nombre: {nombre}")  # Mensaje de depuración
        if nombre:
            departamento = get_object_or_404(Departamento, nombre=nombre)
            print(f"Found Departamento: {departamento.nombre}")  # Depuración al encontrar el departamento
            return Response({
                'nombre': departamento.nombre,
                'contratador': departamento.contratador.cedula,
                'empleado': departamento.empleado.cedula
            })
        
        departamentos = Departamento.objects.all()
        print(f"Found {len(departamentos)} departamentos")  # Mensaje de depuración de cuántos departamentos se encontraron
        return Response([{
            'nombre': d.nombre,
            'contratador': d.contratador.cedula,
            'empleado': d.empleado.cedula
        } for d in departamentos])

    def post(self, request):
        print("POST request received")  # Mensaje de depuración de la solicitud POST
        data = request.data
        try:
            # Crear un nuevo Departamento
            departamento = Departamento.objects.create(
                nombre=data['nombre'],
                contratador_id=data['contratador_id'],  # Usar ID de Contratador
                empleado_id=data['empleado_id'],  # Usar ID de Empleado
            )
            print(f"Departamento created: {departamento.nombre}")  # Mensaje de depuración al crear el departamento
            return Response({
                'nombre': departamento.nombre,
                'contratador': departamento.contratador.cedula,
                'empleado': departamento.empleado.cedula
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            print(f"Error: Missing field {e}")  # Depuración cuando falta un campo
            return JsonResponse({'error': f'Missing field: {e}'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, nombre):
        print(f"PUT request received for departamento: {nombre}")  # Depuración para PUT
        departamento = get_object_or_404(Departamento, nombre=nombre)
        data = request.data
        departamento.nombre = data.get('nombre', departamento.nombre)
        departamento.contratador_id = data.get('contratador_id', departamento.contratador_id)
        departamento.empleado_id = data.get('empleado_id', departamento.empleado_id)
        departamento.save()
        print(f"Departamento updated: {departamento.nombre}")  # Depuración al actualizar el departamento
        return Response({
            'nombre': departamento.nombre,
            'contratador': departamento.contratador.cedula,
            'empleado': departamento.empleado.cedula
        })

    def delete(self, request, nombre):
        print(f"DELETE request received for departamento: {nombre}")  # Depuración para DELETE
        departamento = get_object_or_404(Departamento, nombre=nombre)
        departamento.delete()
        print(f"Departamento deleted: {nombre}")  # Depuración al eliminar el departamento
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class PuestoView(APIView):

    def get(self, request, departamento_nombre=None):
        print(f"GET request received for departamento: {departamento_nombre}")  # Depuración
        if departamento_nombre:
            departamento = get_object_or_404(Departamento, nombre=departamento_nombre)
            puestos = departamento.puestos.all()  # Relacionado con el departamento
            return Response([
                {
                    'nombre': puesto.nombre,
                    'empleado': puesto.Empleado.cedula  # O lo que necesites de Empleado
                } for puesto in puestos
            ])
        
        # Si no hay nombre de departamento, retorna todos los puestos
        puestos = Puesto.objects.all()
        return Response([
            {
                'nombre': puesto.nombre,
                'departamento': puesto.departamento.nombre,
                'empleado': puesto.Empleado.cedula  # O lo que necesites de Empleado
            } for puesto in puestos
        ])

    def post(self, request, departamento_nombre=None):
        print("POST request received")  # Depuración
        data = request.data
        try:
            # Obtén el departamento al que agregar el puesto
            departamento = get_object_or_404(Departamento, nombre=departamento_nombre)
            # Crea el puesto
            puesto = Puesto.objects.create(
                nombre=data['nombre'],
                departamento=departamento,
                Empleado_id=data['empleado']  # Usar ID de Empleado
            )
            return Response({
                'nombre': puesto.nombre,
                'departamento': puesto.departamento.nombre,
                'empleado': puesto.Empleado.cedula
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error creating puesto: {e}")  # Depuración
            return JsonResponse({'error': f'Error al crear puesto: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class SalarioView(APIView):
    def get(self, request, id=None):
        if id:
            salario = get_object_or_404(Salario, id=id)
            return Response({
                'id': salario.id,
                'fecha_inicio': salario.fecha_inicio,
                'fecha_fin': salario.fecha_fin,
                'monto': salario.monto,
                'puesto': salario.puesto.nombre
            })
        salarios = Salario.objects.all()
        return Response([{
            'id': s.id,
            'fecha_inicio': s.fecha_inicio,
            'fecha_fin': s.fecha_fin,
            'monto': s.monto,
            'puesto': s.puesto.nombre
        } for s in salarios])

    def post(self, request):
        data = request.data
        try:
            salario = Salario.objects.create(
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data.get('fecha_fin', None),
                monto=data['monto'],
                puesto_id=data['puesto_id']
            )
            return Response({
                'id': salario.id,
                'fecha_inicio': salario.fecha_inicio,
                'fecha_fin': salario.fecha_fin,
                'monto': salario.monto,
                'puesto': salario.puesto.nombre
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        salario = get_object_or_404(Salario, id=id)
        data = request.data
        salario.fecha_inicio = data.get('fecha_inicio', salario.fecha_inicio)
        salario.fecha_fin = data.get('fecha_fin', salario.fecha_fin)
        salario.monto = data.get('monto', salario.monto)
        salario.puesto_id = data.get('puesto_id', salario.puesto_id)
        salario.save()
        return Response({
            'id': salario.id,
            'fecha_inicio': salario.fecha_inicio,
            'fecha_fin': salario.fecha_fin,
            'monto': salario.monto,
            'puesto': salario.puesto.nombre
        })

    def delete(self, request, id):
        salario = get_object_or_404(Salario, id=id)
        salario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
