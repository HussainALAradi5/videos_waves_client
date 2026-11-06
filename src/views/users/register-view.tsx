'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { REGISTER_FIELDS } from '@/constants/users/auth/auth-form-fields.constants'
import { registerFormSchema, type RegisterFormValues } from '@/validations/users/auth/register-form.validation'
import { useRegister } from '@/hooks/users/auth/use-register'
import { GenericForm } from '@/components/common/forms/generic-form'
import { AuthCard } from '@/components/users/auth/auth-card'

const EMPTY_REGISTRATION = { userName: '', email: '', phone: '', password: '' } as Partial<RegisterFormValues>

export function RegisterView() {
  const { register, isPending } = useRegister()
  return (
    <AuthCard
      title={MESSAGES.AUTH.REGISTER_TITLE}
      description={MESSAGES.AUTH.REGISTER_DESCRIPTION}
      footerText={MESSAGES.AUTH.HAS_ACCOUNT}
      footerLinkLabel={MESSAGES.NAV.LOGIN}
      footerHref={PAGE_ROUTES.LOGIN}
    >
      <GenericForm
        schema={registerFormSchema}
        fields={REGISTER_FIELDS}
        defaultValues={EMPTY_REGISTRATION}
        submitLabel={MESSAGES.AUTH.REGISTER_SUBMIT}
        onSubmit={register}
        isSubmitting={isPending}
      />
    </AuthCard>
  )
}
