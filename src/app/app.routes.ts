import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./dashboard/pages/login/login.component')
            },
            {
                path: 'my-pets',
                title: 'My Pets',
                loadComponent: () => import('./dashboard/pages/my-pets/my-pets.component')
            },
            {
                path: 'my-profile',
                title: 'My profile',
                loadComponent: () => import('./dashboard/pages/my-user/my-user.component')
            },
            {
                path: 'recover-password',
                title: 'Recover Password',
                loadComponent: () => import('./dashboard/pages/recover-password/recover-password.component')
            },
            {
                path: 'register',
                title: 'Register',
                loadComponent: () => import('./dashboard/pages/register/register.component')
            },
            {
                path: '', redirectTo: 'control-flow', pathMatch: 'full'
            }
        ]
    },
    {
        //ruta por defecto, en esta te inicializa la aplicación:
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
