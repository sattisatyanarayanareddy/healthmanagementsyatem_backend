from django.shortcuts import *
from .models import *
from django.contrib.auth import login, logout, authenticate
from django.db.models import Q
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
import random
import array
from django.contrib.auth.decorators import login_required
from datetime import date
from hospital_app.models import Appointment_Details, Emergency
import cloudinary.uploader
# from hospital_erp_project.hospital_app import models


def rand_password():
    max_len = 8

    upcase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
              'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q',
              'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
              'Z']

    locase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
              'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q',
              'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
              'z']

    symbols = ['@', '#', '$', '%', '=', ':', '?', '.',
               '/', '|', '~',    '>', '*', '(', ')', '<']

    digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    combined_list = upcase+locase+symbols+digits

    temp = random.choice(upcase)+random.choice(locase) + \
        random.choice(symbols)+random.choice(digits)

    for i in range(max_len-4):
        temp = temp+random.choice(combined_list)
        temp_list = array.array('u', temp)
        random.shuffle(temp_list)
    password = ""
    for x in temp_list:
        password = password+x
    return password


def doctor_registeration_fun(request):
    print("at standing doctor registration")
    if (request.method == 'POST'):
        # blue ones are tables, orange ones are input field names
        doctor_first_name = request.POST.get('doc_fname')
        doctor_last_name = request.POST.get('doc_lname')
        doctor_specialization = request.POST.get('doc_spec')
        doctor_experience = request.POST.get('doc_exp')
        doctor_email = request.POST.get('doc_mail')
        doctor_password = request.POST.get('doc_pwd')
        doctor_dob = request.POST.get('doc_dob')
        image = request.FILES['doc_image']
        # doctor_profile_picture=request.POST.get('doc_')
        existing = doctor_login_credentials.objects.filter(
            doctor_email=doctor_email).exists()
        exist3 = User.objects.filter(username=doctor_email).exists()
        if existing or exist3:
            error_message = "This email is already registered"
            print("user exixts doctor ")
            return render(request, 'admin.html', {'err_msg': "User already exists"})
        else:
            folder_name = "hospital_doctor_profiles"
            upload_result = cloudinary.uploader.upload(
                image, folder=folder_name)
            image_url = upload_result['url']

            doctor_registeration_obj = doctor_registeration.objects.create(
                doctor_first_name=doctor_first_name,
                doctor_last_name=doctor_last_name,
                doctor_specialization=doctor_specialization,
                doctor_experience=doctor_experience,
                doctor_dob=doctor_dob,
                doctor_profile_picture=image_url

            )
            request.session['doctor_id'] = doctor_registeration_obj.doctor_id
            doctor_login_credentials.objects.create(
                doctor_id=request.session['doctor_id'],
                doctor_email=doctor_email,
                doctor_password=doctor_password,
            )
            user3 = User.objects.create_user(username=doctor_email)
            user3.set_password(doctor_password)
            user3.save()
            print("doctor added.....!")
            return redirect('admin_dashboard')
    else:
        return render(request, "admin_login.html", {})


def doctor_login_fun(request):
    if request.method == 'POST':
        doctor_email = request.POST['email']
        doctor_password = request.POST['password']
        doctor = doctor_login_credentials.objects.filter(
            Q(doctor_email=doctor_email)).first()

        # doctor_id=doctor.doctor_id
        try:
            users = doctor_login_credentials.objects.get(
                doctor_email=doctor_email)
            if users is not None and doctor is not None:
                doctor_id = users.doctor_id
                if doctor_password == users.doctor_password:
                    request.session['doctor_id'] = users.doctor_id
                    view_patients = doctor_in_patients.objects.all()
                    return render(request, 'doctor.html', {'view_patients': view_patients})
                else:
                    return render(request, 'dr_login.html')
            else:
                return render(request, 'dr_login.html')
        except:
            return render(request, 'dr_login.html')
    else:
        return render(request, 'dr_login.html')


@login_required(login_url='doctor_login')
def doctor_dashboard(request):
    request.session.get('doctor_id')
    doctor_id = request.session.get('doctor_id')
    print(doctor_id)
    view_patients = Appointment_Details.objects.all()
    emergencies = Emergency.objects.all()
    patient_data = []
    emergencies_list = []
    if view_patients is not None:
        for patients in view_patients:
            patient_data_sent = {
                'p_name': patients.name,
                'date': patients.date,
                'symptoms' : patients.health_concerns
            }
            print(f"{patient_data_sent}...........................@@@@@@")
            patient_data.append(patient_data_sent)

    if emergencies is not None:
        for em in emergencies:
            emergency_to_sent = {
                'username': em.username,
                'mobile': em.mobile
            }
            emergencies_list.append(emergency_to_sent)
    return render(request, 'doctor.html', {'view_patients': patient_data, 'alerts_list': emergencies_list})


def view_patients_fun(request):
    doctor_id = request.session.get('doctor_id')
    print(doctor_id)
    view_patients = Appointment_Details.objects.all()
    print(view_patients)
    patient_data = []
    if view_patients is not None:
        for patients in view_patients:
            patient_data_sent = {
                'p_name': patients.name,
                'date': patients.date
            }
            print(f"{patient_data_sent}...........................@@@@@@")
            patient_data.append(patient_data_sent)
    return render(request, 'doctor.html', {'patient_data_present': patient_data})


# @login_required(login_url='doctor_login_fun')
"""def doctor_patient_details_fun(request):
    if request.method=='POST':
        patient_name=doctor_patient_obj.patient_name
        update_jdate=request.POST.get('update_jdate')
        update_symptoms=request.POST.get('update_symptoms')
        update_history=request.POST.get('update_history')
        update_plan=request.POST.get('update_plan')
        update_med=request.POST.get('update_med')
        update_note=request.POST.get('update_note')
        update_status=request.POST.get('update_status')
        Appointment_Details_obj=Appointment_Details.objects.all()
        request.session['patient_id']=Appointment_Details_obj.patient_id
        patient_id=request.session.get('patient_id')
        doctor_patient_obj=doctor_in_patients.objects.all()
        if patient_id==doctor_patient_obj.patient_id:
            doctor_patient_details_obj = get_object_or_404(doctor_in_patients, patient_id=patient_id)
            doctor_patient_details_obj.update_jdate=update_jdate
            doctor_patient_details_obj.update_symptoms=update_symptoms
            doctor_patient_details_obj.update_history = update_history
            doctor_patient_details_obj.update_plan = update_plan
            doctor_patient_details_obj.update_med = update_med
            doctor_patient_details_obj.update_note = update_note
            doctor_patient_details_obj.update_status = update_status
            doctor_patient_details_obj.save()
        return render(request, 'doctor_app/doctor.html')
    else:
        return render(request, 'doctor_app/doctor.html')"""


def doctor_logout_fun(request):
    logout(request)

    return redirect("doctor_login")


# vickey module
def index(request):
    """reports = Report.objects.all()
    print(reports)"""
    # r=Report_Details.objects.all()
    # print(r)
    return render(request, 'index.html', {'reports': "reports"})
