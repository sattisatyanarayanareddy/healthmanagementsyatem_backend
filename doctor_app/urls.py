from django.urls import path
from doctor_app import views

urlpatterns = [
    path('', views.doctor_registeration_fun, name='doctor_register_fun'),
    path('doctor_login_fun/', views.doctor_login_fun, name='doctor_login_fun'),
    path('doctor_dashboard/', views.doctor_dashboard, name='doctor_dashboard'),
    path('view_patients_fun/', views.view_patients_fun, name='view_patients_fun'),
    # path('doctor_patient_details_fun/', views.doctor_patient_details_fun, name='doctor_patient_details_fun'),
    path('add_doctor/', views.doctor_registeration_fun, name='add_doctor'),
    path('doctor_logout_fun/', views.doctor_logout_fun, name='doctor_logout_fun'),

    # vicky module
    path('lab/', views.index, name='index'),
]
