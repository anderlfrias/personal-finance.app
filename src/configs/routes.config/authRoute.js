import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: React.lazy(() => import('views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: React.lazy(() => import('views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: React.lazy(() => import('views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password/:token`,
        component: React.lazy(() => import('views/auth/ResetPassword')),
        authority: [],
    },
    {
        key: 'confirmEmail',
        path: `/confirm-email/:token`,
        component: React.lazy(() => import('views/auth/ConfirmEmail')),
        authority: [],
    },
    {
        key: 'sendConfirmEmail',
        path: `/send-confirm-email/:token`,
        component: React.lazy(() => import('views/auth/SendConfirmationEmail')),
        authority: [],
    }
]

export default authRoute