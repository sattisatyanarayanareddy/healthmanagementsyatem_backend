from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient_details(models.Model):
    patient_id = models.CharField(max_length=20, unique=True,null=True, editable=False)
    email = models.EmailField(unique=True,primary_key=True)
    mobile = models.CharField(max_length=15, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100,null=True)
    password = models.CharField(max_length=100,null=True)
    u_type = models.CharField(max_length = 100,default = 'patient')

    def save(self, *args, **kwargs):
        if not self.patient_id:
            prefix = "VTS2024"
            unique_id = self.generate_id(prefix)
            self.patient_id = unique_id
        super().save(*args, **kwargs)

    def generate_id(self, prefix):
        last_patinet = Patient_details.objects.filter(patient_id__startswith=prefix).order_by('patient_id').last()
        if last_patinet:
            last_id = int(last_patinet.patient_id[len(prefix):])
            new_id = last_id + 1
        else:
            new_id = 1
        return f"{prefix}{new_id:01d}"

class Appointment_Details(models.Model):
    name = models.CharField(max_length=100, null=True)
    dob = models.DateField(null = True)
    gender = models.CharField(max_length=100, null=True)
    height = models.CharField(max_length = 50, null=True)
    weight = models.CharField(max_length = 50, null=True)
    date = models.DateField(null = True)
    time = models.TimeField(null = True)
    doctorname = models.CharField(max_length=100, null=True)
    specialization = models.CharField(max_length=100, null=True)
    health_concerns = models.CharField(max_length=100, null=True)
    patient_id = models.CharField(max_length=100, null=True)
    #patient = models.ForeignKey(Patient_details, on_delete=models.CASCADE, related_name='appointments')
    treatment = models.CharField(max_length = 50,null=True,default = "not")

class Patient_history(models.Model):
    patient_id = models.CharField(max_length=100,null=True)
    payment_amount = models.IntegerField()
    status = models.CharField(max_length=100,null=True)
    date_of_pay = models.DateField(null=True)
class Patient_bills(models.Model):
    patient_id = models.CharField(max_length = 100,null = True)
    bill = models.IntegerField()
    date = models.DateField(null=True)
class Otp_forget(models.Model):
    patient_id = models.CharField(max_length = 100,null = True)
    otp = models.CharField(max_length=10,null=True)
    email = models.CharField(max_length=100,null=True)
class Doctor_Appointment(models.Model):
    name = models.CharField(max_length=100, null=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=100, null=True)
    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    concern = models.CharField(max_length=100, null=True)
    dname = models.CharField(max_length=100, null=True)
    specialization = models.CharField(max_length=100, null=True)
    date = models.DateField(null=True)
    slot_time = models.TimeField(null = True)

class Admins(models.Model):
    username = models.CharField(max_length=100,primary_key=True,default='admin')
    password  = models.CharField(max_length=100,null=True,default='admin')

class Emergency(models.Model):
    username = models.CharField(max_length=100, null=True)
    mobile = models.CharField(max_length=100, null=True)

class Technician(models.Model):
    tech_Username = models.CharField(max_length=100, null=True)
    tech_password = models.CharField(max_length=100, null=True)
    tech_u_type = models.CharField(max_length=100,default='technician')