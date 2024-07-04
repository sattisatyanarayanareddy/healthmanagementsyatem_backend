from django.urls import path,include
from .views import lab_logout,labaratory_dashboard,laboratory_login,laboratory_reg,emergency_join,landing,doctor_login,patient_register,admin_logout,patient_sign_in,patient_dashboard,doctor_appointment,logout,validate_otp,patient_appointment,validate_mail_gen_otp,admin_login,admin_dashboard,add_admin
from doctor_app.views import doctor_logout_fun

handler404 = 'hospital_app.views.handler404'

urlpatterns = [
    path('',landing,name='landing'),
    path('register/',patient_register,name='patient_register'),
    path('patient_sign_in/',patient_sign_in,name='patient_sign_in'),
    path('patient_dashboard/',patient_dashboard,name='patient_dashboard'),
    path('logout/',logout, name='logout'),
    path('patient_appointment/',patient_appointment,name='patient_appointment'),
    #path('forget_password/',forget_password,name='forget_password'),
    path('validate_mail_gen_otp/',validate_mail_gen_otp,name='validate_mail_gen_otp'),
    path('validate_otp/',validate_otp,name='validate_otp'),
    path('admin_login/',admin_login,name='admin_login'),
    path('doctor_appointment/',doctor_appointment,name='doctor_appointment'),
    path('admin_dashboard/',admin_dashboard,name='admin_dashboard'),
    path('add_admin/',add_admin,name='add_admin'),
    path('admin_logout/',admin_logout,name='admin_logout'),
    path('emergency/',emergency_join,name='emergency_join'),
    path('doctor_login/',doctor_login,name='doctor_login'),
    path('doctor_/',include('doctor_app.urls')),
    path('doctor_logout_fun/',doctor_logout_fun,name='doctor_logout_fun'),
    path('laboratory_dashboard/',labaratory_dashboard,name='labaratory_dashboard'),
    path('laboratory_reg/',laboratory_reg,name='laboratory_reg'),
    path('laboratory_login/',laboratory_login,name='laboratory_login'),
    path('lab_logout/',lab_logout,name='lab_logout')
]