import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'login',
                title: 'Inicio de Sesión',
                loadComponent: () => import('./dashboard/pages/login/login.component')
            },
            {
                path: 'my-pets',
                title: 'Mis Mascotas',
                loadComponent: () => import('./dashboard/pages/my-pets/my-pets.component')
            },
            {
                path: 'my-profile',
                title: 'Mi Perfil',
                loadComponent: () => import('./dashboard/pages/my-user/my-user.component')
            },
            {
                path: 'recover-password',
                title: 'Recuperar Contraseña',
                loadComponent: () => import('./dashboard/pages/recover-password/recover-password.component')
            },
            {
                path: 'register',
                title: 'Registro',
                loadComponent: () => import('./dashboard/pages/register/register.component')
            },
            {
                path: 'happy-dogs',
                title: '¿Que Es Happy Dogs?',
                loadComponent: () => import('./dashboard/pages/what-its-happy-dogs/what-its-happy-dogs.component')
            },
            {
                path: '', redirectTo: 'control-flow', pathMatch: 'full'
            }
        ]
    },
    {
        //ruta por defecto, en esta te inicializa la aplicación:
        path: '',
        redirectTo: '/dashboard/happy-dogs',
        pathMatch: 'full'
    }
];
