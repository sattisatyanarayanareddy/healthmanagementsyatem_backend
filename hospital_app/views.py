from django.shortcuts import render,redirect,get_object_or_404
from .models import Technician,Emergency,Admins,Patient_details,Appointment_Details,Patient_history,Doctor_Appointment,Patient_bills,Otp_forget
from django.db.models import Q
from django.conf import settings
import json
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required,user_passes_test
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.mail import send_mail
from django.http import JsonResponse
import string
import random
from doctor_app.models import doctor_login_credentials,doctor_registeration



# Create your views here.
def landing(request):
    return render(request,'index.html')
    
def patient_register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        mobile = request.POST.get('mobile_number')
        name = request.POST.get('name')
        password = request.POST.get('password')
        exiting = Patient_details.objects.filter(Q(email=email) or Q(mobile=mobile)).exists()
        exist4 = User.objects.filter(username = email).exists()
        if exiting or exist4:
            error_message = "User with this email or mobile number already exists..."
            print("user exists........")
            return render(request, 'registration.html', {'error_message': error_message})
        else:
            Patient_details.objects.create(
                email=email,
                mobile=mobile,
                name=name,
                password = password
            )
            user = User.objects.create_user(username=email)
            user.set_password(password)
            user.save()
            
            return render(request,'registration.html')
    else:
        return render(request,'registration.html')

def patient_sign_in(request):
    
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        patient = Patient_details.objects.filter(Q(email=email)).first()
        if patient is not None:
            print("in login..............")
            if patient.password == password:
                user = authenticate(request, username=email, password=password)
                if user is not None and patient.u_type == 'patient':
                    
                    login(request, user)
                    url_ = reverse('patient_dashboard')
                    query_string = f"?id={patient.patient_id}"
                    url = f"{url_}{query_string}"
                    return redirect(url)
            else:
                error_msg = "Wrong password"
                return render(request,'Registration.html',{'error_message':error_msg})
        else:
            error_msg = "user not exists"
            return render(request,'Registration.html',{'error_message':error_msg})

    return render(request,'Registration.html')

@login_required(login_url='patient_sign_in')
def patient_dashboard(request):
    patient_id = request.GET.get('id')
    print("in login redirection..............")
    if not patient_id:
        return JsonResponse({'error': 'No patient ID provided'}, status=400)
    data = Patient_details.objects.filter(patient_id = patient_id)
    name = ""
    for data_ in data:
        name = data_.name
        p_id = data_.patient_id
    upcoming_appointments = Appointment_Details.objects.filter(patient_id = patient_id)
    payment_hist = Patient_history.objects.filter(patient_id = patient_id)
    bills = Patient_bills.objects.filter(patient_id = patient_id)
    doctors_list = doctor_registeration.objects.all()

    data4 = []
    data5 = []
    data6 = []
    data7 = []

    if doctors_list is not None:
        for doc in doctors_list:
            data_sent = {
                'doc_id':doc.doctor_id,
                'doc_fname':doc.doctor_first_name,
                'doc_spec':doc.doctor_specialization,
                'doc_exp':doc.doctor_experience,
                'doc_img':doc.doctor_profile_picture
            }
            data7.append(data_sent)

    if upcoming_appointments is not None:
        for record in upcoming_appointments:
            data_to_sent = {
                'd_name':record.name,
                'date':record.date,
                'time':record.time,
                'problem':record.health_concerns
            }
            data4.append(data_to_sent)
    else:
        print("no upcoming appointments")

    
    if payment_hist is not None:
        for hist in payment_hist:
            data_to_sent2 = {
                'date':hist.date_of_pay,
                'amount':hist.payment_amount,
                'status':hist.status
            }
            data5.append(data_to_sent2)
    if bills is not None:
        for bill in bills:
            data_to_sent3 = {
                'date':bill.date,
                'bill':bill.bill,
            }
            data6.append(data_to_sent3)
            
    return render(request,'home.html',{'data_apointment':data4,'data_pay_hist':data5,'data_bill':data6,'name':name,'id':p_id,'doctors_list':data7})

def logout(request):
    auth_logout(request)
    return redirect('patient_sign_in')

#@login_required(login_url='patient_sign_in')
def patient_appointment(request):
    url = "landing"
    if request.method == 'POST':
        name = request.POST.get('name')
        dob = request.POST.get('dob')
        gender = request.POST.get('gender')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        date = request.POST.get('date')
        time = request.POST.get('time')
        doctorname = request.POST.get('doctor')
        specialization = request.POST.get('specialization')
        health_concerns = request.POST.get('concern')
        patient_id = request.GET.get('id')
        patient_details = Patient_details.objects.filter(patient_id = patient_id)
        print(patient_id)
        Appointment_Details.objects.create(
            name=name,
            dob=dob,
            gender=gender,
            height=height,
            weight=weight,
            date=date,
            time=time,
            doctorname=doctorname,
            specialization=specialization,
            health_concerns=health_concerns,
            patient_id = patient_id
        )
        url_ = reverse('patient_dashboard')
        query_string = f"?id={patient_id}"
        url = f"{url_}{query_string}"
    return redirect(url)


#needs to handle through javascript body 
def validate_mail_gen_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        email = data.get('mail_verify')
        print(email)
        #otp = data.get('otp')
        credentials = Patient_details.objects.filter(email=email).first()
        if credentials is not None:
            p_id = credentials.patient_id
            mail = credentials.email
            s = make_email(mail,p_id)
            if s:
                return JsonResponse({'msg':'otp sent successfully'},status=200)
            else:
                return JsonResponse({'msg':'otp sent fail'},status=401)
        else:
            return JsonResponse({'msg':'User not found'},status=404)

def gene_otp(length=6):
    digits = string.digits
    otp = ''.join(random.choices(digits, k=length))
    return otp

def make_email(to_mail,p_id):
    subject = 'Hi im venkat'
    otp = gene_otp()
    print(f"{otp}.............................!")
    Otp_forget.objects.create(patient_id = p_id,otp=otp,email=to_mail)
    message = f"verify OTP for reset your password : {otp}"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [to_mail]
        
    send_mail(subject, message, email_from, recipient_list)
    return True

def validate_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('mail')  
        password = data.get('password')        
        credentials_ = Patient_details.objects.filter(email=email).first()
        if credentials_ is not None:
            credentials_.password = password 
            credentials_.save()
            user = get_object_or_404(User, username=email)
            user.set_password(password)
            user.save()
            print('Password updated successfully.')
            return render(request, 'registration.html', {'error_msg': 'Password updated successfully...!'})
        else:
            print('Invalid credentials.')
            return render(request, 'registration.html', {'error_msg': 'Invalid credentials'})
    else:
        return render(request, 'registration.html')

def admin_login(request):
    if request.method == 'POST':
        username = request.POST.get('email')
        password = request.POST.get('password')
        print(username,password)
        existing_admin = Admins.objects.filter(username=username).first()
        if existing_admin is not None and existing_admin.password == password:
            print("admin dashboard...................!")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('admin_dashboard')
        else:
            return render(request,'admin_log.html',{'err_msg':'Invalid admin credentials'})
    return render(request,'admin_log.html')

def doctor_appointment(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        dob = request.POST.get('dob')
        gender = request.POST.get('gender')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        date = request.POST.get('date')
        time = request.POST.get('time')
        doctorname = request.POST.get('doctor')
        specialization = request.POST.get('specialization')
        health_concerns = request.POST.get('concern')
        patient_id = request.GET.get('id')
        patient_details = Patient_details.objects.filter(patient_id = patient_id)
        print(patient_id)
        Appointment_Details.objects.create(
            name=name,
            dob=dob,
            gender=gender,
            height=height,
            weight=weight,
            date=date,
            time=time,
            doctorname=doctorname,
            specialization=specialization,
            health_concerns=health_concerns,
            patient_id = patient_id
        )
    return render(request, 'home.html')

def get_data_admin():
    appointments = Appointment_Details.objects.all()
    appointments_list = []
    for ap in appointments:
        appi = {
            'name': ap.name,
            'date': ap.date,
            'time': ap.time,
            'doctor': ap.doctorname
        }
        appointments_list.append(appi)

    doctors = doctor_registeration.objects.all()
    doctors_list = []
    docs = {}
    for doc in doctors:
        docs = {
            'doc_name':doc.doctor_first_name
        }
        doctors_list.append(docs)
    print(doctors_list)
    return appointments_list,doctors_list


@login_required(login_url='admin_login')
def admin_dashboard(request):
    appointments_list,doctors_list = get_data_admin()
    return render(request, 'admin.html', {'appointment_list': appointments_list,'doctors_list':doctors_list})

def add_admin(request):
    if request.method == 'GET':
        try:
            username = 'admin'
            password = 'admin'
            user = Admins.objects.create(username=username,password=password)
            user1 = User.objects.create_user(username=username)
            user1.set_password(password)
            user1.save()
            print("admin added.......")
        except:
            print("admin already exists")
        return HttpResponse("admin added")
            
def admin_logout(request):
    auth_logout(request)
    next_page = request.GET.get('next', 'admin_login')
    return redirect(next_page)

def doctor_login(request):
    if request.method == 'POST':
        username = request.POST.get('email')
        password = request.POST.get('password')
        existing_doc = doctor_login_credentials.objects.filter(doctor_email=username).first()
        if existing_doc is not None and existing_doc.doctor_password == password and existing_doc.u_type == 'doctor':
            print("admin dashboard...................!")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('doctor_dashboard')
            else:
                return redirect('landing')
        else:
            return render(request,'dr_login.html',{'err_msg':"Invalid Credentials"})
    return render(request,'dr_login.html')

"""def emergency_call(request):
    if request.method == 'POST':
        p_name = request.POST.get('p_name')
        p_password = request.POST.get('p_password')
        emergency.objects.create(
            pname=p_name,
            passwd=p_password
        )
    return render(request, 'index.html')"""


@login_required(login_url='laboratory_login')
def labaratory_dashboard(request):
    appointments = Appointment_Details.objects.all()
    appi = {}
    appointments_list = []
    for ap in appointments:
        appi = {
            'name': ap.name,
            'date': ap.date,
            'time': ap.time,
            'doctor': ap.doctorname
        }
        appointments_list.append(appi)
    print(appointments_list)
    return render(request,'index_3.html',{'appointment_list':appointments_list})


def emergency_join(request):
    if request.method == 'POST':
        username = request.POST.get('emergency_username')
        mobile = request.POST.get('emergency_pwd')
        user_check = Emergency.objects.filter(mobile=mobile).exists()
        if not user_check:
            print("emergency enetr............")
            Emergency.objects.create(username=username,mobile=mobile)
            return render(request,'index.html',{'emergency_msg':"Our staff will call you"})
        else:
            return redirect('landing')
    return render(request,'index.html')

def handler404(request,exception):
    return render(request,'404.html',status=404)

def laboratory_reg(request):
    if request.method == 'POST':
        tech_Username = request.POST.get('tech_mail')
        tech_password = request.POST.get('tech_password')
        tech_exists = Technician.objects.filter(tech_Username=tech_Username).exists()
        user_auth7 = User.objects.filter(username=tech_Username).exists()
        if not tech_exists and not user_auth7:
            Technician.objects.create(
                tech_Username=tech_Username,
                tech_password=tech_password
            )
            user7 = User.objects.create_user(username=tech_Username)
            user7.set_password(tech_password)
            user7.save()
            return redirect('admin_dashboard')
        else:
            appointments_list,doctors_list = get_data_admin()
            return render(request, 'admin.html', {'appointment_list': appointments_list,'doctors_list':doctors_list,'err_msg':"User already exists"})
    else:
        return redirect('admin_dashboard')

def laboratory_login(request):
    if request.method == 'POST':
        tech_Username = request.POST.get('email')
        tech_password = request.POST.get('password')
        print(tech_password,tech_Username)
        tech_exists = Technician.objects.filter(tech_Username=tech_Username).first()
        if tech_exists is not None and tech_exists.tech_u_type == 'technician':
            user8 = authenticate(request, username=tech_Username, password=tech_password)
            
            if user8 is not None:
                login(request, user8)
                
                return redirect('labaratory_dashboard')
            else:
                return render(request,'lab_tech_log.html',{'err_msg':"Invalid credentials"})
        else:
            return render(request,"lab_tech_log.html",{'err_msg':"User not Exixts"})
    return render(request,"lab_tech_log.html")

def lab_logout(request):
    auth_logout(request)
    next_page = request.GET.get('next', 'laboratory_login')
    return redirect(next_page)