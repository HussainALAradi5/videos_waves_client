'use client'

import { useSearchParams } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES, REDIRECT_QUERY_PARAM } from '@/constants/common/routes.constants'
import { LOGIN_FIELDS } from '@/constants/users/auth/auth-form-fields.constants'
import { loginFormSchema } from '@/validations/users/auth/login-form.validation'
import { useLogin } from '@/hooks/users/auth/use-login'
import { GenericForm } from '@/components/common/forms/generic-form'
import { AuthCard } from '@/components/users/auth/auth-card'

export function LoginView() {
  const redirectTo = useSearchParams().get(REDIRECT_QUERY_PARAM)
  const { login, isPending } = useLogin(redirectTo)

  return (
    <AuthCard
      title={MESSAGES.AUTH.LOGIN_TITLE}
      description={MESSAGES.AUTH.LOGIN_DESCRIPTION}
      footerText={MESSAGES.AUTH.NO_ACCOUNT}
      footerLinkLabel={MESSAGES.NAV.REGISTER}
      footerHref={PAGE_ROUTES.REGISTER}
    >
      <GenericForm
        schema={loginFormSchema}
        fields={LOGIN_FIELDS}
        defaultValues={{ identifier: '', password: '' }}
        submitLabel={MESSAGES.AUTH.LOGIN_SUBMIT}
        onSubmit={login}
        isSubmitting={isPending}
      />
    </AuthCard>
  )
}
