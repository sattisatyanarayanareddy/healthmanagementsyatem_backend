from django.db import models
import uuid


class doctor_registeration(models.Model):
    doctor_id = models.CharField(
        auto_created=True, max_length=255, unique=True, primary_key=True)
    doctor_first_name = models.CharField(max_length=255)
    doctor_last_name = models.CharField(max_length=255)
    doctor_specialization = models.CharField(max_length=255)
    doctor_experience = models.IntegerField(null=True)
    doctor_profile_picture = models.CharField(max_length=255, default='null')
    doctor_dob = models.CharField(max_length=100, null=True)

    def save(self, *args, **kwargs):
        if not self.doctor_id:
            prefix = "VTSD2024"
            unique_id = self.generate_id(prefix)
            self.doctor_id = unique_id
        super().save(*args, **kwargs)

    def generate_id(self, prefix):
        last_doctor = doctor_registeration.objects.filter(
            doctor_id__startswith=prefix).order_by('-doctor_id').first()

        if last_doctor:
            last_id = int(last_doctor.doctor_id[len(prefix):])
            new_id = last_id + 1
        else:
            new_id = 1
        return f"{prefix}{new_id:04d}"


class doctor_login_credentials(models.Model):
    doctor_id = models.CharField(max_length=100, null=True)
    doctor_email = models.CharField(max_length=255)
    doctor_password = models.CharField(max_length=255)
    u_type = models.CharField(max_length=10, default='doctor')


class Appointment_Details_doctor(models.Model):
    name = models.CharField(max_length=100, null=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=100, null=True)
    height = models.CharField(max_length=50, null=True)
    weight = models.CharField(max_length=50, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    doctorname = models.CharField(max_length=100, null=True)
    doctor_id = models.CharField(max_length=100, null=True)
    specialization = models.CharField(max_length=100, null=True)
    health_concerns = models.CharField(max_length=100, null=True)
    patient_id = models.CharField(max_length=100, null=True)
    treatment = models.CharField(max_length=50, null=True, default="not")


class doctor_in_patients(models.Model):
    doctor_id = models.CharField(max_length=100, null=True)
    patient_id = models.CharField(max_length=100, null=True)
    update_pname = models.CharField(max_length=100, null=True)
    update_jdate = models.DateField(null=True)
    update_symptoms = models.CharField(max_length=255, null=True)
    update_history = models.TextField(max_length=255, null=True)
    update_plan = models.CharField(max_length=255, null=True)
    update_med = models.TextField(max_length=255, null=True)
    update_note = models.TextField(max_length=255, null=True)
    update_status = models.BooleanField(default=False)

# Vicky module


class Report(models.Model):
    report_id = models.CharField(max_length=10, unique=True)
    patient_name = models.CharField(max_length=100, default='Null')
    doctor_name = models.CharField(max_length=100, default='Null')
    test_name = models.CharField(max_length=100, default='Null')
    date = models.CharField(max_length=100, default='Null')
    status = models.CharField(max_length=20, default='Null')
    dofb = models.CharField(max_length=50, default='Null')
    phone = models.CharField(max_length=50, default='Null')
    gender = models.CharField(max_length=50, default='Null')
    email = models.EmailField(max_length=50, default='Null')
