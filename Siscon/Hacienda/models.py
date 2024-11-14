from django.db import models

# Create your models here.

class Empleado(models.Model):
    cedula = models.CharField(primary_key=10,unique=True,blank=False,max_length=10)
    nombre = models.CharField(max_length=50,blank=False,null=True)
    apellido = models.CharField(max_length=50, blank=False, null=True)
    fecha_nacimiento = models.DateField()
    correo = models.EmailField(unique=True,blank=False)
    telefono = models.CharField(max_length=10, blank=False, null=True)

    def __str__(self):
        return self.cedula

class Contratador(models.Model):
    cedula = models.CharField(max_length=30, blank=False, null=True)
    nombre = models.CharField(max_length=50, blank=False, null=True)
    apellido = models.CharField(max_length=50, blank=False, null=True)
    correo = models.EmailField()
    telefono = models.CharField(max_length=10, blank=False, null=True)
    Empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)

    def __str__(self):
        return self.cedula
    
class Departamento(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=True)
    contratador = models.ForeignKey(Contratador, on_delete=models.CASCADE)
    Empleado = models.ForeignKey(Empleado, on_delete=models.RESTRICT)
    
    def __str__(self):
        return self.nombre
    
class Puesto(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=True)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    Empleado = models.ForeignKey(Empleado, on_delete=models.RESTRICT)
    
    def __str__(self):
        return self.nombre
    
class Salario(models.Model):
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    puesto = models.ForeignKey(Puesto, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.monto)